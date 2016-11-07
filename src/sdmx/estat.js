define(["require", "exports", "sdmx/registry", "sdmx/common", "sdmx"], function (require, exports, registry, common, sdmx) {
    var ESTAT = (function () {
        function ESTAT(agency, service, options) {
            this.agency = "ESTAT";
            this.serviceURL = "http://cors-anywhere.herokuapp.com/http://www.ec.europa.eu/eurostat/SDMX/diss-web/rest";
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
        ESTAT.prototype.getRemoteRegistry = function () {
            return this;
        };
        ESTAT.prototype.getRepository = function () {
            return this;
        };
        ESTAT.prototype.clear = function () {
            this.local.clear();
        };
        ESTAT.prototype.query = function (q) {
            var startPeriod = q.getStartDate().getFullYear() + "-" + q.getStartDate().getMonth();
            var endPeriod = q.getEndDate().getFullYear() + "-" + q.getEndDate().getMonth();
            var url = this.serviceURL + "/data/" + q.getDataflow().getId().toString() + "/" + q.getQueryString() + "?startPeriod=" + startPeriod + "&endPeriod=" + endPeriod + "";
            return this.retrieveData(q.getDataflow(), url);
        };
        ESTAT.prototype.retrieveData = function (dataflow, urlString) {
            console.log("abs retrieveData:" + urlString);
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
            opts.headers = {
                "Origin": document.location
            };
            return this.makeRequest(opts).then(function (a) {
                console.log("Got Data Response");
                var dm = sdmx.SdmxIO.parseData(a);
                var payload = new common.PayloadStructureType();
                payload.setStructure(dataflow.getStructure());
                dm.getHeader().setStructures([payload]);
                return dm;
            });
        };
        ESTAT.prototype.load = function (struct) {
            console.log("abs load");
            this.local.load(struct);
        };
        ESTAT.prototype.unload = function (struct) {
            this.local.unload(struct);
        };
        ESTAT.prototype.makeRequest = function (opts) {
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
        ESTAT.prototype.retrieve = function (urlString) {
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
        ESTAT.prototype.retrieve2 = function (urlString) {
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
        ESTAT.prototype.findDataStructure = function (ref) {
            var dst = this.local.findDataStructure(ref);
            if (dst != null) {
                var promise = new Promise(function (resolve, reject) {
                    resolve(dst);
                }.bind(this));
                return promise;
            }
            else {
                return this.retrieve(this.getServiceURL() + "/datastructure/" + this.agency + "/" + ref.getMaintainableParentId().toString() + "/" + ref.getVersion().toString() + "?references=all").then(function (structure) {
                    this.local.load(structure);
                    return structure.getStructures().findDataStructure(ref);
                }.bind(this));
            }
        };
        ESTAT.prototype.listDataflows = function () {
            if (this.dataflowList != null) {
                var promise = new Promise(function (resolve, reject) {
                    resolve(this.dataflowList);
                }.bind(this));
                return promise;
            }
            else {
                return this.retrieve(this.serviceURL + "/dataflow/" + this.agency + "/all/latest").then(function (st) {
                    this.dataflowList = st.getStructures().getDataflows().getDataflowList();
                    return this.dataflowList;
                }.bind(this));
            }
        };
        ESTAT.prototype.getServiceURL = function () { return this.serviceURL; };
        ESTAT.prototype.findDataflow = function (ref) { return null; };
        ESTAT.prototype.findCode = function (ref) { return null; };
        ESTAT.prototype.findCodelist = function (ref) { return null; };
        ESTAT.prototype.findItemType = function (item) { return null; };
        ESTAT.prototype.findConcept = function (ref) { return null; };
        ESTAT.prototype.findConceptScheme = function (ref) { return null; };
        ESTAT.prototype.searchDataStructure = function (ref) { return null; };
        ESTAT.prototype.searchDataflow = function (ref) { return null; };
        ESTAT.prototype.searchCodelist = function (ref) { return null; };
        ESTAT.prototype.searchItemType = function (item) { return null; };
        ESTAT.prototype.searchConcept = function (ref) { return null; };
        ESTAT.prototype.searchConceptScheme = function (ref) { return null; };
        ESTAT.prototype.getLocalRegistry = function () {
            return this.local;
        };
        ESTAT.prototype.save = function () { };
        return ESTAT;
    })();
    exports.ESTAT = ESTAT;
});

//# sourceMappingURL=estat.js.map
