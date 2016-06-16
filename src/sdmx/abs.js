define(["require", "exports", "sdmx/registry", "sdmx"], function (require, exports, registry, sdmx) {
    var ABS = (function () {
        function ABS(agency, service, options) {
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
        ABS.prototype.getRemoteRegistry = function () {
            return this;
        };
        ABS.prototype.getRepository = function () {
            return null; //this;
        };
        ABS.prototype.clear = function () {
            this.local.clear();
        };
        ABS.prototype.query = function (s) {
        };
        ABS.prototype.load = function (struct) {
            console.log("abs load");
            this.local.load(struct);
        };
        ABS.prototype.unload = function (struct) {
            this.local.unload(struct);
        };
        ABS.prototype.makeRequest = function (opts) {
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
        ABS.prototype.retrieve = function (urlString) {
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
            opts.headers = {};
            return this.makeRequest(opts).then(function (a) {
                return sdmx.SdmxIO.parseStructure(a);
            });
        };
        ABS.prototype.retrieve2 = function (urlString) {
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
            return this.makeRequest(opts).then(function (a) {
                return a;
            });
        };
        ABS.prototype.findDataStructure = function (ref) {
            var dst = this.local.findDataStructure(ref);
            if (dst != null) {
                var promise = new Promise(function (resolve, reject) {
                    resolve(dst);
                }.bind(this));
                return promise;
            }
            else {
                return null;
            }
        };
        ABS.prototype.listDataflows = function () {
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
        ABS.prototype.getServiceURL = function () { return this.serviceURL; };
        ABS.prototype.findDataflow = function (ref) { return null; };
        ABS.prototype.findCode = function (ref) { return null; };
        ABS.prototype.findCodelist = function (ref) { return null; };
        ABS.prototype.findItemType = function (item) { return null; };
        ABS.prototype.findConcept = function (ref) { return null; };
        ABS.prototype.findConceptScheme = function (ref) { return null; };
        ABS.prototype.searchDataStructure = function (ref) { return null; };
        ABS.prototype.searchDataflow = function (ref) { return null; };
        ABS.prototype.searchCodelist = function (ref) { return null; };
        ABS.prototype.searchItemType = function (item) { return null; };
        ABS.prototype.searchConcept = function (ref) { return null; };
        ABS.prototype.searchConceptScheme = function (ref) { return null; };
        ABS.prototype.getLocalRegistry = function () {
            return this.local;
        };
        ABS.prototype.save = function () { };
        return ABS;
    })();
    exports.ABS = ABS;
});

//# sourceMappingURL=abs.js.map
