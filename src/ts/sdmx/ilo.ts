/*
    This file is part of sdmx-js.

    sdmx-js is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    sdmx-js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with sdmx-js.  If not, see <http://www.gnu.org/licenses/>.
    Copyright (C) 2016 James Gardner
*/
///<reference path="../bluebird.d.ts"/>
import interfaces = require("sdmx/interfaces");
import registry = require("sdmx/registry");
import structure = require("sdmx/structure");
import message = require("sdmx/message");
import commonreferences = require("sdmx/commonreferences");
import common = require("sdmx/common");
import data = require("sdmx/data");
import sdmx = require("sdmx");
export class ILO implements interfaces.Queryable, interfaces.RemoteRegistry, interfaces.Repository {
    private agency: string = "ILO";
    //http://stats.oecd.org/restsdmx/sdmx.ashx/GetDataStructure/ALL/OECD
    private serviceURL: string = "http://cors-anywhere.herokuapp.com/http://www.ilo.org/ilostat/sdmx/ws/rest";
    //private serviceURL: string = "http://stat.abs.gov.au/restsdmx/sdmx.ashx/";
    private options: string = "";
    private local: interfaces.LocalRegistry = new registry.LocalRegistry();

    private dataflowList: Array<structure.Dataflow> = null;
    private classifications: structure.Codelist = null;

    getRemoteRegistry(): interfaces.RemoteRegistry {
        return this;
    }

    getRepository(): interfaces.Repository {
        return this;//this;
        
    }

    clear() {
        this.local.clear();
    }
    query(q: data.Query): Promise<message.DataMessage> {
        var url = this.serviceURL + "GetData/" + q.getDataflow().getId().toString() + "/" + q.getQueryString() + "/all?startTime=" + q.getStartDate().getFullYear() + "&endTime=" + q.getEndDate().getFullYear();
        return this.retrieveData(q.getDataflow(), url);
    }
    public retrieveData(dataflow: structure.Dataflow, urlString: string): Promise<message.DataMessage> {
        console.log("ilo retrieveData:" + urlString);
        var s: string = this.options;
        if (urlString.indexOf("?") == -1) {
            s = "?" + s + "&random=" + new Date().getTime();
        } else {
            s = "&" + s + "&random=" + new Date().getTime();
        }
        var opts: any = {};
        opts.url = urlString;
        opts.method = "GET";
        opts.headers = { "Origin": document.location};
        return this.makeRequest(opts).then(function(a) {
            console.log("Got Data Response");
            var dm = sdmx.SdmxIO.parseData(a);
            var payload = new common.PayloadStructureType();
            payload.setStructure(dataflow.getStructure());
            dm.getHeader().setStructures([payload]);
            return dm;
        });
    }
    constructor(agency: string, service: string, options: string) {
        if (service != null) { this.serviceURL = service; }
        if (agency != null) { this.agency = agency; }
        if (options != null) { this.options = options; }
    }

    load(struct: message.StructureType) {
        console.log("abs load");
        this.local.load(struct);
    }

    unload(struct: message.StructureType) {
        this.local.unload(struct);
    }
    makeRequest(opts): Promise<string> {
        return new Promise<string>(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(opts.method, opts.url);
            xhr.onload = function() {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function() {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            if (opts.headers) {
                Object.keys(opts.headers).forEach(function(key) {
                    xhr.setRequestHeader(key, opts.headers[key]);
                });
            }
            var params = opts.params;
            // We'll need to stringify if we've been given an object
            // If we have a string, this is skipped.
            if (params && typeof params === 'object') {
                params = Object.keys(params).map(function(key) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                }).join('&');
            }
            xhr.send(params);
        });
    }
    public retrieve(urlString: string): Promise<message.StructureType> {
        console.log("nomis retrieve:" + urlString);
        var s: string = this.options;
        if (urlString.indexOf("?") == -1) {
            s = "?" + s + "&random=" + new Date().getTime();
        } else {
            s = "&" + s + "&random=" + new Date().getTime();
        }
        var opts: any = {};
        opts.url = urlString;
        opts.method = "GET";
        opts.headers = { "Origin": document.location};
        return this.makeRequest(opts).then(function(a) {
            return sdmx.SdmxIO.parseStructure(a);
        });
    }
    public retrieve2(urlString: string): Promise<string> {
        console.log("nomis retrieve:" + urlString);
        var s: string = this.options;
        if (urlString.indexOf("?") == -1) {
            s = "?" + s + "&random=" + new Date().getTime();
        } else {
            s = "&" + s + "&random=" + new Date().getTime();
        }
        var opts: any = {};
        opts.url = urlString;
        opts.method = "GET";
        opts.headers = { "Origin": document.location};
        return this.makeRequest(opts).then(function(a) {
            return a;
        });
    }

    public findDataStructure(ref: commonreferences.Reference): Promise<structure.DataStructure> {
        var dst: structure.DataStructure = this.local.findDataStructure(ref);
        if (dst != null) {
            var promise = new Promise<structure.DataStructure>(function(resolve, reject) {
                resolve(dst);
            }.bind(this));
            return promise;
        } else {
            return <Promise<structure.DataStructure>>this.retrieve(this.getServiceURL() + "GetDataStructure/" + ref.getMaintainableParentId().toString() + "/" + ref.getAgencyId().toString()).then(function(structure: message.StructureType) {
                this.local.load(structure);
                return structure.getStructures().findDataStructure(ref);
            }.bind(this));
        }
    }




    public listDataflows(): Promise<Array<structure.Dataflow>> {
        if (this.dataflowList != null) {
            var promise = new Promise<Array<structure.Dataflow>>(function(resolve, reject) {
                resolve(this.dataflowList);
            }.bind(this));
            return promise;
        } else {
            var r: commonreferences.Ref = new commonreferences.Ref();
            r.setAgencyId(new commonreferences.NestedNCNameID(this.agency));
            r.setMaintainableParentId(new commonreferences.ID("CL_COLLECTION"));
            r.setVersion(null);
            var ref: commonreferences.Reference = new commonreferences.Reference(r, null);
            var prom: Promise<any> = this.findCodelist(ref);
            var dataflowList: Array<structure.Dataflow> = [];
            prom.then(function(classifications: structure.Codelist) {
                this.classifications = classifications;
                for (var i: number = 0; i < classifications.size(); i++) {
                    var code: structure.CodeType = <structure.CodeType>classifications.getItem(i);
                    var cod: string = code.getId().toString();
                    var r2: commonreferences.Ref = new commonreferences.Ref();
                    r2.setAgencyId(new commonreferences.NestedNCNameID(this.agency));
                    r2.setMaintainableParentId(new commonreferences.ID("CL_INDICATOR_" + cod));
                    r2.setVersion(null);
                    var ref: commonreferences.Reference = new commonreferences.Reference(r, null);
                    prom = prom.then(this.findCodelist(ref));
                }
                return prom.map(function(indicators: Array<structure.Codelist>) {
                    for (var i: number = 0; i < classifications.size(); i++) {
                        var col1 = classifications.getItem(i);
                        var con = col1.getId().toString();
                        var indic: structure.Codelist = null;
                        for (var j = 0; j < indicators.length; j++) {
                            if (indicators[j].getId().equalsString("CL_INDICATOR_" + con)) {
                                indic = indicators[j];
                            }
                        }
                        for (var k = 0; k < indic.size(); k++) {
                            var dataflow = new structure.Dataflow();
                            dataflow.setAgencyId(classifications.getAgencyId());
                            var indicid: string = indic.getId().toString();
                            dataflow.setId(new commonreferences.ID("DF_" + con + "_ALL_" + indicid));
                            dataflow.setVersion(null);
                            var r3: commonreferences.Ref = new commonreferences.Ref();
                            r3.setAgencyId(classifications.getAgencyId());
                            r3.setMaintainableParentId(new commonreferences.ID(con + "_ALL_" + indicid));
                            r3.setVersion(null);
                            var names: Array<common.Name> = [];
                            var name: common.Name = new common.Name("en", col1.findName("en").getText() + " - " + indic.findName("en").getText());
                            names.push(name);
                            dataflow.setNames(names);
                            dataflowList.push(dataflow);
                        }
                    }
                    this.dataflowList = dataflowList;
                    return dataflowList;
                }.bind(this));
            }.bind(this));
        }
    }
    public getServiceURL(): string { return this.serviceURL; }
    findDataflow(ref: commonreferences.Reference): Promise<structure.Dataflow> { return null; }
    findCode(ref: commonreferences.Reference): Promise<structure.CodeType> { return null; }
    findCodelist(ref: commonreferences.Reference): Promise<structure.Codelist> {
        var dst: structure.Codelist = this.local.findCodelist(ref);
        if (dst != null) {
            var promise = new Promise<structure.Codelist>(function(resolve, reject) {
                resolve(dst);
            }.bind(this));
            return promise;
        } else {
            return <Promise<structure.Codelist>>this.retrieve(this.getServiceURL() + "/codelist/" + ref.getAgencyId().toString() + "/" + ref.getMaintainableParentId() + (ref.getVersion() == null ? "/latest" : ref.getVersion().toString())).then(function(structure: message.StructureType) {
                this.local.load(structure);
                return structure.getStructures().findCodelist(ref);
            }.bind(this));
        }
    }
    findItemType(item: commonreferences.Reference): Promise<structure.ItemType> { return null; }
    findConcept(ref: commonreferences.Reference): Promise<structure.ConceptType> { return null; }
    findConceptScheme(ref: commonreferences.Reference): Promise<structure.ConceptSchemeType> { 
        var dst: structure.ConceptSchemeType = this.local.findConceptScheme(ref);
        if (dst != null) {
            var promise = new Promise<structure.ConceptSchemeType>(function(resolve, reject) {
                resolve(dst);
            }.bind(this));
            return promise;
        } else {
            return <Promise<structure.ConceptSchemeType>>this.retrieve(this.getServiceURL() + "/conceptscheme/" + ref.getAgencyId().toString() + "/" + ref.getMaintainableParentId() + (ref.getVersion() == null ? "/latest" : ref.getVersion().toString())).then(function(structure: message.StructureType) {
                this.local.load(structure);
                return structure.getStructures().findConceptScheme(ref);
            }.bind(this));
        }
    }
    searchDataStructure(ref: commonreferences.Reference): Promise<Array<structure.DataStructure>> { return null; }
    searchDataflow(ref: commonreferences.Reference): Promise<Array<structure.Dataflow>> { return null; }
    searchCodelist(ref: commonreferences.Reference): Promise<Array<structure.Codelist>> { return null; }
    searchItemType(item: commonreferences.Reference): Promise<Array<structure.ItemType>> { return null; }
    searchConcept(ref: commonreferences.Reference): Promise<Array<structure.ConceptType>> { return null; }
    searchConceptScheme(ref: commonreferences.Reference): Promise<Array<structure.ConceptSchemeType>> { return null; }
    getLocalRegistry(): interfaces.LocalRegistry {
        return this.local;
    }
    save(): any { }
}
