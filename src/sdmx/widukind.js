define(["require", "exports", "sdmx/registry", "sdmx/common", "sdmx"], function (require, exports, registry, common, sdmx) {
    "use strict";
    var Widukind = (function () {
        function Widukind(agency, service, options) {
            this.agency = "WIDUKIND";
            //http://stats.oecd.org/restsdmx/sdmx.ashx/GetDataStructure/ALL/OECD
            this.serviceURL = "http://widukind-api.cepremap.org/api/v1/sdmx/";
            //private serviceURL: string = "http://stat.abs.gov.au/restsdmx/sdmx.ashx/";
            this.options = "";
            this.local = new registry.LocalRegistry();
            this.dataflowList = null;
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
        Widukind.prototype.getRemoteRegistry = function () {
            return this;
        };
        Widukind.prototype.getRepository = function () {
            return null; //this;
        };
        Widukind.prototype.clear = function () {
            this.local.clear();
        };
        Widukind.prototype.query = function (q) {
            var url = this.serviceURL + "/getdata?dataflow=" + q.getDataflow().getId().toString() + "&key=" + q.getQueryString() + "&startTime=" + q.getStartDate().getFullYear() + "&endTime=" + q.getEndDate().getFullYear();
            return this.retrieveData(q.getDataflow(), url);
        };
        Widukind.prototype.retrieveData = function (dataflow, urlString) {
            console.log("oecd retrieveData:" + urlString);
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
        Widukind.prototype.load = function (struct) {
            console.log("abs load");
            this.local.load(struct);
        };
        Widukind.prototype.unload = function (struct) {
            this.local.unload(struct);
        };
        Widukind.prototype.makeRequest = function (opts) {
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
        Widukind.prototype.retrieve = function (urlString) {
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
        Widukind.prototype.retrieve2 = function (urlString) {
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
        Widukind.prototype.findDataStructure = function (ref) {
            var dst = this.local.findDataStructure(ref);
            if (dst != null) {
                var promise = new Promise(function (resolve, reject) {
                    resolve(dst);
                }.bind(this));
                return promise;
            }
            else {
                return this.retrieve(this.getServiceURL() + "/" + ref.getMaintainableParentId()).then(function (structure) {
                    this.local.load(structure);
                    return structure.getStructures().findDataStructure(ref);
                }.bind(this));
            }
        };
        Widukind.prototype.listDataflows = function () {
            if (this.dataflowList != null) {
                var promise = new Promise(function (resolve, reject) {
                    resolve(this.dataflowList);
                }.bind(this));
                return promise;
            }
            else {
                return this.retrieve(this.serviceURL).then(function (st) {
                    var array = st.getStructures().getDataStructures().getDataStructures();
                    var dfs = [];
                    for (var i = 0; i < array.length; i++) {
                        dfs.push(array[i].asDataflow());
                    }
                    this.dataflowList = dfs;
                    return dfs;
                }.bind(this));
            }
        };
        Widukind.prototype.getServiceURL = function () { return this.serviceURL; };
        Widukind.prototype.findDataflow = function (ref) { return null; };
        Widukind.prototype.findCode = function (ref) { return null; };
        Widukind.prototype.findCodelist = function (ref) { return null; };
        Widukind.prototype.findItemType = function (item) { return null; };
        Widukind.prototype.findConcept = function (ref) { return null; };
        Widukind.prototype.findConceptScheme = function (ref) { return null; };
        Widukind.prototype.searchDataStructure = function (ref) { return null; };
        Widukind.prototype.searchDataflow = function (ref) { return null; };
        Widukind.prototype.searchCodelist = function (ref) { return null; };
        Widukind.prototype.searchItemType = function (item) { return null; };
        Widukind.prototype.searchConcept = function (ref) { return null; };
        Widukind.prototype.searchConceptScheme = function (ref) { return null; };
        Widukind.prototype.getLocalRegistry = function () {
            return this.local;
        };
        Widukind.prototype.save = function () { };
        return Widukind;
    }());
    exports.Widukind = Widukind;
});

//# sourceMappingURL=widukind.js.map
