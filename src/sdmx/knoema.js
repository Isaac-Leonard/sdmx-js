define(["require", "exports", "sdmx/registry", "sdmx/common", "sdmx"], function (require, exports, registry, common, sdmx) {
    var Knoema = (function () {
        function Knoema(agency, service, options) {
            this.agency = "Knoema";
            //http://stats.oecd.org/restsdmx/sdmx.ashx/GetDataStructure/ALL/OECD
            this.serviceURL = "http://knoema.com/api/1.0/sdmx";
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
        Knoema.prototype.getRemoteRegistry = function () {
            return this;
        };
        Knoema.prototype.getRepository = function () {
            return null; //this;
        };
        Knoema.prototype.clear = function () {
            this.local.clear();
        };
        Knoema.prototype.query = function (q) {
            var qs = "";
            for (var i = 0; i < q.size(); i++) {
                var k = q.getKeyNames()[i];
                var qk = q.getQueryKey(k);
                qs += k + "=";
                for (var j = 0; j < qk.getValues().length; j++) {
                    var v = qk.getValues()[j];
                    qs += v;
                    if (j < qk.getValues().length - 1) {
                        qs += "%2C";
                    }
                }
                if (i < q.size() - 1) {
                    qs += "&";
                }
            }
            var url = this.serviceURL + "/2.1/get?id=" + q.getDataflow().getId().toString() + "&" + qs + "&startTime=" + q.getStartDate().getFullYear() + "&endTime=" + q.getEndDate().getFullYear();
            return this.retrieveData(q.getDataflow(), url);
        };
        Knoema.prototype.retrieveData = function (dataflow, urlString) {
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
        Knoema.prototype.load = function (struct) {
            console.log("abs load");
            this.local.load(struct);
        };
        Knoema.prototype.unload = function (struct) {
            this.local.unload(struct);
        };
        Knoema.prototype.makeRequest = function (opts) {
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
        Knoema.prototype.retrieve = function (urlString) {
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
        Knoema.prototype.retrieve2 = function (urlString) {
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
        Knoema.prototype.findDataStructure = function (ref) {
            var dst = this.local.findDataStructure(ref);
            if (dst != null) {
                var promise = new Promise(function (resolve, reject) {
                    resolve(dst);
                }.bind(this));
                return promise;
            }
            else {
                return this.retrieve(this.getServiceURL() + "/2.1/" + ref.getMaintainableParentId()).then(function (structure) {
                    this.local.load(structure);
                    return structure.getStructures().findDataStructure(ref);
                }.bind(this));
            }
        };
        Knoema.prototype.listDataflows = function () {
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
        Knoema.prototype.getServiceURL = function () { return this.serviceURL; };
        Knoema.prototype.findDataflow = function (ref) { return null; };
        Knoema.prototype.findCode = function (ref) { return null; };
        Knoema.prototype.findCodelist = function (ref) { return null; };
        Knoema.prototype.findItemType = function (item) { return null; };
        Knoema.prototype.findConcept = function (ref) { return null; };
        Knoema.prototype.findConceptScheme = function (ref) { return null; };
        Knoema.prototype.searchDataStructure = function (ref) { return null; };
        Knoema.prototype.searchDataflow = function (ref) { return null; };
        Knoema.prototype.searchCodelist = function (ref) { return null; };
        Knoema.prototype.searchItemType = function (item) { return null; };
        Knoema.prototype.searchConcept = function (ref) { return null; };
        Knoema.prototype.searchConceptScheme = function (ref) { return null; };
        Knoema.prototype.getLocalRegistry = function () {
            return this.local;
        };
        Knoema.prototype.save = function () { };
        return Knoema;
    })();
    exports.Knoema = Knoema;
});

//# sourceMappingURL=knoema.js.map
