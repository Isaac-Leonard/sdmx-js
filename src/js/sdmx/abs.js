define(["require", "exports", "sdmx/registry", "sdmx"], function (require, exports, registry, sdmx) {
    function parseXml(s) {
        var parseXml;
        parseXml = new DOMParser();
        var xmlDoc = parseXml.parseFromString(s, "text/xml");
        return xmlDoc;
    }
    exports.parseXml = parseXml;
    var ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
     = (function () {
        function ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
            (agency, service, options) {
            this.agency = "ABS";
            this.serviceURL = "http://stat.abs.gov.au/restsdmx/sdmx.ashx/";
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
        ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.getRegistry = function () {
            return null; //this;
        };
        ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.getRepository = function () {
            return null; //this;
        };
        ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.clear = function () {
            this.local.clear();
        };
        ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.query = function (s) {
        };
        ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.load = function (struct) {
            console.log("abs load");
            this.local.load(struct);
        };
        ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.unload = function (struct) {
            this.local.unload(struct);
        };
        ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.makeRequest = function (opts) {
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
        ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.retrieve = function (urlString) {
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
        ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.retrieve2 = function (urlString) {
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
        /*
          This function ignores the version argument!!!
          ILO stat does not use version numbers.. simply take the latest
         */
        ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.findDataStructure = function (ref) {
            var dst = this.local.findDataStructure(ref);
            if (dst != null) {
                var promise = new Promise(function (resolve, reject) {
                    resolve(dst);
                }.bind(this));
                return promise;
            }
            else {
                var geogIndex = ref.getMaintainableParentId().toString().lastIndexOf("_");
                var geog = ref.getMaintainableParentId().toString().substring(geogIndex + 1, ref.getMaintainableParentId().toString().length);
                var geography_string = "geography=" + geog;
                if ("NOGEOG" == geog) {
                    geography_string = "";
                }
                var id = ref.getMaintainableParentId().toString().substring(0, geogIndex);
                return this.retrieve(this.getServiceURL() + "/v01/dataset/" + id + ".structure.sdmx.xml?" + geography_string).then(function (a) {
                    a.getStructures().getDataStructures().getDataStructures()[0].setId(ref.getMaintainableParentId());
                    a.getStructures().getDataStructures().getDataStructures()[0].setVersion(ref.getVersion());
                    this.load(a);
                    return this.local.findDataStructure(ref);
                }.bind(this));
            }
        };
        ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.listDataflows = function () {
            if (this.dataflowList != null) {
                var promise = new Promise(function (resolve, reject) {
                    resolve(this.dataflowList);
                }.bind(this));
                return promise;
            }
            else {
                return this.retrieve(this.serviceURL + "GetDataStructure/ALL/ABS").then(function (st) {
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
        ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.getServiceURL = function () {
            return this.serviceURL;
        };
        ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.parseGeography = function (doc, cubeId, cubeName) {
            var geogList = [];
            var tagContent = null;
            var lastLang = null;
            var xmlDoc = parseXml(doc);
            var dimNode = this.findNodeName("Dimensions", xmlDoc.documentElement.childNodes);
            var dimsNode = this.searchNodeName("Dimension", dimNode.childNodes);
            var geogNode = null;
            for (var i = 0; i < dimsNode.length; i++) {
                if (dimsNode[i].getAttribute("concept") == "geography") {
                    geogNode = dimsNode[i];
                }
            }
            if (geogNode == null)
                return geogList;
            var typesNode = this.findNodeName("Types", geogNode.childNodes);
            if (typesNode == null)
                return geogList;
            var typeArray = this.searchNodeName("Type", typesNode.childNodes);
            if (typeArray.length == 0) {
                return geogList;
            }
            for (var i = 0; i < typeArray.length; i++) {
                var ng = new NOMISGeography(typeArray[i].getAttribute("value"), typeArray[i].getAttribute("name"), cubeName, cubeId);
                geogList.push(ng);
            }
            return geogList;
        };
        ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.recurseDomChildren = function (start, output) {
            var nodes;
            if (start.childNodes) {
                nodes = start.childNodes;
                this.loopNodeChildren(nodes, output);
            }
        };
        ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.loopNodeChildren = function (nodes, output) {
            var node;
            for (var i = 0; i < nodes.length; i++) {
                node = nodes[i];
                if (output) {
                    this.outputNode(node);
                }
                if (node.childNodes) {
                    this.recurseDomChildren(node, output);
                }
            }
        };
        ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.outputNode = function (node) {
            var whitespace = /^\s+$/g;
            if (node.nodeType === 1) {
                console.log("element: " + node.tagName);
            }
            else if (node.nodeType === 3) {
                //clear whitespace text nodes
                node.data = node.data.replace(whitespace, "");
                if (node.data) {
                    console.log("text: " + node.data);
                }
            }
        };
        ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.findNodeName = function (s, childNodes) {
            for (var i = 0; i < childNodes.length; i++) {
                var nn = childNodes[i].nodeName;
                //alert("looking for:"+s+": name="+childNodes[i].nodeName);
                if (nn.indexOf(s) == 0) {
                    //alert("found node:"+s);
                    return childNodes[i];
                }
            }
            return null;
        };
        ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.searchNodeName = function (s, childNodes) {
            var result = [];
            for (var i = 0; i < childNodes.length; i++) {
                var nn = childNodes[i].nodeName;
                //alert("looking for:"+s+": name="+childNodes[i].nodeName);
                if (nn.indexOf(s) == 0) {
                    //alert("found node:"+s);
                    result.push(childNodes[i]);
                }
            }
            if (result.length == 0) {
            }
            return result;
        };
        return ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        ;
    })();
    exports.ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
     = ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
    ;
    var NOMISGeography = (function () {
        function NOMISGeography(geography, geographyName, cubeName, cubeId) {
            this.geography = "";
            this.geographyName = "";
            this.cubeName = "";
            this.cubeId = "";
            this.geography = geography;
            this.geographyName = geographyName;
            this.cubeName = cubeName;
            this.cubeId = cubeId;
        }
        NOMISGeography.prototype.getGeography = function () {
            return this.geography;
        };
        NOMISGeography.prototype.getCubeName = function () { return this.cubeName; };
        NOMISGeography.prototype.getCubeId = function () {
            return this.cubeId;
        };
        NOMISGeography.prototype.getGeographyName = function () {
            return this.geographyName;
        };
        return NOMISGeography;
    })();
    exports.NOMISGeography = NOMISGeography;
});

//# sourceMappingURL=abs.js.map
