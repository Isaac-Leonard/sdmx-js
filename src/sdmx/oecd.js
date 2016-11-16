define(["require", "exports", "sdmx/registry", "sdmx/common", "sdmx"], function (require, exports, registry, common, sdmx) {
    "use strict";
    var OECD = (function () {
        function OECD(agency, service, options) {
            this.agency = "OECD";
            //http://stats.oecd.org/restsdmx/sdmx.ashx/GetDataStructure/ALL/OECD
            this.serviceURL = "http://stats.oecd.org/restsdmx/sdmx.ashx/";
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
        OECD.prototype.getRemoteRegistry = function () {
            return this;
        };
        OECD.prototype.getRepository = function () {
            return this; //this;
        };
        OECD.prototype.clear = function () {
            this.local.clear();
        };
        OECD.prototype.query = function (q) {
            var url = this.serviceURL + "GetData/" + q.getDataflow().getId().toString() + "/" + q.getQueryString() + "/all?startTime=" + q.getStartDate().getFullYear() + "&endTime=" + q.getEndDate().getFullYear() + "&format=compact_v2";
            return this.retrieveData(q.getDataflow(), url);
            //http://stats.oecd.org/restsdmx/sdmx.ashx/GetData/QNA/AUS+AUT.GDP+B1_GE.CUR+VOBARSA.Q/all?startTime=2009-Q2&endTime=2011-Q4&format=compact_v2
        };
        OECD.prototype.load = function (struct) {
            console.log("oecd load");
            this.local.load(struct);
        };
        OECD.prototype.unload = function (struct) {
            this.local.unload(struct);
        };
        OECD.prototype.makeRequest = function (opts) {
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
        OECD.prototype.retrieve = function (urlString) {
            console.log("oecd retrieve:" + urlString);
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
        OECD.prototype.retrieveData = function (dataflow, urlString) {
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
        OECD.prototype.retrieve2 = function (urlString) {
            console.log("oecd retrieve:" + urlString);
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
        OECD.prototype.findDataStructure = function (ref) {
            var dst = this.local.findDataStructure(ref);
            if (dst != null) {
                var promise = new Promise(function (resolve, reject) {
                    resolve(dst);
                }.bind(this));
                return promise;
            }
            else {
                return this.retrieve(this.serviceURL + "GetDataStructure/" + ref.getMaintainableParentId() + "/" + this.agency).then(function (st) {
                    this.load(st);
                    return st.findDataStructure(ref);
                }.bind(this));
            }
        };
        OECD.prototype.listDataflows = function () {
            if (this.dataflowList != null) {
                var promise = new Promise(function (resolve, reject) {
                    resolve(this.dataflowList);
                }.bind(this));
                return promise;
            }
            else {
                return this.retrieve(this.serviceURL + "GetDataStructure/ALL/" + this.agency).then(function (st) {
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
        OECD.prototype.getServiceURL = function () { return this.serviceURL; };
        OECD.prototype.findDataflow = function (ref) {
            if (this.dataflowList == null) {
                this.listDataflows().then(function (dataflows) {
                    for (var i = 0; i < dataflows.length; i++) {
                        if (dataflows[i].identifiesMe(ref.getAgencyId(), ref.getMaintainableParentId(), ref.getVersion())) {
                            return dataflows[i];
                        }
                    }
                });
            }
            var p = new Promise(function (resolve, reject) {
                for (var i = 0; i < this.dataflowList.length; i++) {
                    if (this.dataflowList[i].identifiesMe(ref.getAgencyId(), ref.getMaintainableParentId(), ref.getVersion())) {
                        resolve(this.dataflowList[i]);
                    }
                }
                reject(null);
            });
            return p;
        };
        OECD.prototype.findCode = function (ref) { return null; };
        OECD.prototype.findCodelist = function (ref) { return null; };
        OECD.prototype.findItemType = function (item) { return null; };
        OECD.prototype.findConcept = function (ref) { return null; };
        OECD.prototype.findConceptScheme = function (ref) { return null; };
        OECD.prototype.searchDataStructure = function (ref) { return null; };
        OECD.prototype.searchDataflow = function (ref) { return null; };
        OECD.prototype.searchCodelist = function (ref) { return null; };
        OECD.prototype.searchItemType = function (item) { return null; };
        OECD.prototype.searchConcept = function (ref) { return null; };
        OECD.prototype.searchConceptScheme = function (ref) { return null; };
        OECD.prototype.getLocalRegistry = function () {
            return this.local;
        };
        OECD.prototype.save = function () { };
        return OECD;
    }());
    exports.OECD = OECD;
});

//# sourceMappingURL=oecd.js.map
