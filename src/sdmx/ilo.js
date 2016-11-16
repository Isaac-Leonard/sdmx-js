define(["require", "exports", "sdmx/registry", "sdmx/structure", "sdmx/commonreferences", "sdmx/common", "sdmx"], function (require, exports, registry, structure, commonreferences, common, sdmx) {
    "use strict";
    var ILO = (function () {
        function ILO(agency, service, options) {
            this.agency = "ILO";
            //http://stats.oecd.org/restsdmx/sdmx.ashx/GetDataStructure/ALL/OECD
            this.serviceURL = "http://cors-anywhere.herokuapp.com/http://www.ilo.org/ilostat/sdmx/ws/rest";
            //private serviceURL: string = "http://stat.abs.gov.au/restsdmx/sdmx.ashx/";
            this.options = "";
            this.local = new registry.LocalRegistry();
            this.dataflowList = null;
            this.classifications = null;
            this.indicatorsArrayCodelist = [];
            if (service != null) {
                this.serviceURL = service;
            }
            if (agency != null) {
                this.agency = agency;
            }
            if (options != null) {
                this.options = options;
            }
        }
        ILO.prototype.getRemoteRegistry = function () {
            return this;
        };
        ILO.prototype.getRepository = function () {
            return this; //this;
        };
        ILO.prototype.clear = function () {
            this.local.clear();
        };
        ILO.prototype.query = function (q) {
            var url = this.serviceURL + "/data/" + q.getDataflow().getId().toString() + "/" + q.getQueryString() + "/all?startPeriod=" + q.getStartDate().getFullYear() + "&endPeriod=" + q.getEndDate().getFullYear();
            return this.retrieveData(q.getDataflow(), url);
        };
        ILO.prototype.retrieveData = function (dataflow, urlString) {
            console.log("ilo retrieveData:" + urlString);
            var s = this.options;
            if (urlString.indexOf("?") == -1) {
                s = "?" + s + "&random=" + new Date().getTime();
            }
            else {
                s = "&" + s + "&random=" + new Date().getTime();
            }
            var opts = {};
            opts.url = urlString;
            opts.method = "GET";
            opts.headers = { "Origin": document.location };
            return this.makeRequest(opts).then(function (a) {
                console.log("Got Data Response");
                var dm = sdmx.SdmxIO.parseData(a);
                var payload = new common.PayloadStructureType();
                payload.setStructure(dataflow.getStructure());
                dm.getHeader().setStructures([payload]);
                return dm;
            });
        };
        ILO.prototype.load = function (struct) {
            console.log("abs load");
            this.local.load(struct);
        };
        ILO.prototype.unload = function (struct) {
            this.local.unload(struct);
        };
        ILO.prototype.makeRequest = function (opts) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open(opts.method, opts.url);
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(xhr.response);
                    }
                    else {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    }
                };
                xhr.onerror = function () {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                };
                if (opts.headers) {
                    Object.keys(opts.headers).forEach(function (key) {
                        xhr.setRequestHeader(key, opts.headers[key]);
                    });
                }
                var params = opts.params;
                // We'll need to stringify if we've been given an object
                // If we have a string, this is skipped.
                if (params && typeof params === 'object') {
                    params = Object.keys(params).map(function (key) {
                        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                    }).join('&');
                }
                xhr.send(params);
            });
        };
        ILO.prototype.retrieve = function (urlString) {
            console.log("nomis retrieve:" + urlString);
            var s = this.options;
            if (urlString.indexOf("?") == -1) {
                s = "?" + s + "&random=" + new Date().getTime();
            }
            else {
                s = "&" + s + "&random=" + new Date().getTime();
            }
            var opts = {};
            opts.url = urlString;
            opts.method = "GET";
            opts.headers = { "Origin": document.location };
            return this.makeRequest(opts).then(function (a) {
                return sdmx.SdmxIO.parseStructure(a);
            });
        };
        ILO.prototype.retrieve2 = function (urlString) {
            console.log("nomis retrieve:" + urlString);
            var s = this.options;
            if (urlString.indexOf("?") == -1) {
                s = "?" + s + "&random=" + new Date().getTime();
            }
            else {
                s = "&" + s + "&random=" + new Date().getTime();
            }
            var opts = {};
            opts.url = urlString;
            opts.method = "GET";
            opts.headers = { "Origin": document.location };
            return this.makeRequest(opts).then(function (a) {
                return a;
            });
        };
        ILO.prototype.findDataStructure = function (ref) {
            var dst = this.local.findDataStructure(ref);
            if (dst != null) {
                var promise = new Promise(function (resolve, reject) {
                    resolve(dst);
                }.bind(this));
                return promise;
            }
            else {
                return this.retrieve(this.getServiceURL() + "/datastructure/" + ref.getAgencyId().toString() + "/" + ref.getMaintainableParentId().toString() + "?references=children").then(function (structure) {
                    this.local.load(structure);
                    return structure.getStructures().findDataStructure(ref);
                }.bind(this));
            }
        };
        ILO.prototype.listDataflows = function () {
            if (this.dataflowList != null) {
                var promise = new Promise(function (resolve, reject) {
                    resolve(this.dataflowList);
                }.bind(this));
                return promise;
            }
            else {
                var r = new commonreferences.Ref();
                r.setAgencyId(new commonreferences.NestedNCNameID(this.agency));
                r.setMaintainableParentId(new commonreferences.ID("CL_COLLECTION"));
                r.setVersion(null);
                var ref = new commonreferences.Reference(r, null);
                var prom = this.findCodelist(ref);
                var dataflowList = [];
                var indicatorsCodelist = [];
                return prom.then(function (classifications) {
                    this.classifications = classifications;
                    var indicatorsArray = [];
                    for (var i = 0; i < classifications.size(); i++) {
                        var code = classifications.getItem(i);
                        var cod = code.getId().toString();
                        var r2 = new commonreferences.Ref();
                        r2.setAgencyId(new commonreferences.NestedNCNameID(this.agency));
                        r2.setMaintainableParentId(new commonreferences.ID("CL_INDICATOR_" + cod));
                        r2.setVersion(null);
                        var ref = new commonreferences.Reference(r2, null);
                        indicatorsArray.push(ref);
                    }
                    return indicatorsArray;
                }.bind(this)).map(function (item, idex, length) {
                    return this.findCodelist(item);
                }.bind(this)).then(function (indicatorArray) {
                    this.indicatorsArrayCodelist = indicatorArray;
                    console.log(JSON.stringify(indicatorArray));
                    var indic = null;
                    var dataflowList = [];
                    for (var i = 0; i < this.classifications.size(); i++) {
                        var col1 = this.classifications.getItem(i);
                        var con = col1.getId().toString();
                        indic = this.indicatorsArrayCodelist[i];
                        for (var k = 0; k < indic.size(); k++) {
                            var dataflow = new structure.Dataflow();
                            dataflow.setAgencyId(this.classifications.getAgencyId());
                            var indicid = indic.getItem(k).getId().toString();
                            dataflow.setId(new commonreferences.ID("DF_" + con + "_ALL_" + indicid));
                            dataflow.setVersion(null);
                            var r3 = new commonreferences.Ref();
                            r3.setAgencyId(this.classifications.getAgencyId());
                            r3.setMaintainableParentId(new commonreferences.ID(con + "_ALL_" + indicid));
                            r3.setVersion(null);
                            var names = [];
                            var langs = ["en", "fr", "es"];
                            for (var lang = 0; lang < langs.length; lang++) {
                                var name = new common.Name(langs[lang], col1.findName(langs[lang]).getText() + " - " + indic.getItem(k).findName(langs[lang]).getText());
                                names.push(name);
                            }
                            dataflow.setNames(names);
                            var reference = new commonreferences.Reference(r3, null);
                            dataflow.setStructure(reference);
                            dataflowList.push(dataflow);
                        }
                    }
                    this.dataflowList = dataflowList;
                    return this.dataflowList;
                }.bind(this));
            }
        };
        ILO.prototype.getServiceURL = function () { return this.serviceURL; };
        ILO.prototype.findDataflow = function (ref) { return null; };
        ILO.prototype.findCode = function (ref) { return null; };
        ILO.prototype.findCodelist = function (ref) {
            var dst = this.local.findCodelist(ref);
            if (dst != null) {
                var promise = new Promise(function (resolve, reject) {
                    resolve(dst);
                }.bind(this));
                return promise;
            }
            else {
                return this.retrieve(this.getServiceURL() + "/codelist/" + ref.getAgencyId().toString() + "/" + ref.getMaintainableParentId() + (ref.getVersion() == null ? "/latest" : ref.getVersion().toString())).then(function (structure) {
                    this.local.load(structure);
                    var cl = structure.getStructures().findCodelist(ref);
                    return cl;
                }.bind(this));
            }
        };
        ILO.prototype.findItemType = function (item) { return null; };
        ILO.prototype.findConcept = function (ref) { return null; };
        ILO.prototype.findConceptScheme = function (ref) {
            var dst = this.local.findConceptScheme(ref);
            if (dst != null) {
                var promise = new Promise(function (resolve, reject) {
                    resolve(dst);
                }.bind(this));
                return promise;
            }
            else {
                return this.retrieve(this.getServiceURL() + "/conceptscheme/" + ref.getAgencyId().toString() + "/" + ref.getMaintainableParentId() + (ref.getVersion() == null ? "/latest" : ref.getVersion().toString())).then(function (structure) {
                    this.local.load(structure);
                    return structure.getStructures().findConceptScheme(ref);
                }.bind(this));
            }
        };
        ILO.prototype.searchDataStructure = function (ref) { return null; };
        ILO.prototype.searchDataflow = function (ref) { return null; };
        ILO.prototype.searchCodelist = function (ref) { return null; };
        ILO.prototype.searchItemType = function (item) { return null; };
        ILO.prototype.searchConcept = function (ref) { return null; };
        ILO.prototype.searchConceptScheme = function (ref) { return null; };
        ILO.prototype.getLocalRegistry = function () {
            return this.local;
        };
        ILO.prototype.save = function () { };
        return ILO;
    }());
    exports.ILO = ILO;
});

//# sourceMappingURL=ilo.js.map
