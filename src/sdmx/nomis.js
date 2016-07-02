define(["require", "exports", "moment", "sdmx/registry", "sdmx/structure", "sdmx/commonreferences", "sdmx/common", "sdmx", "sdmx/time"], function (require, exports, moment, registry, structure, commonreferences, common, sdmx, time) {
    function parseXml(s) {
        var parseXml;
        parseXml = new DOMParser();
        var xmlDoc = parseXml.parseFromString(s, "text/xml");
        return xmlDoc;
    }
    exports.parseXml = parseXml;
    var NOMISRESTServiceRegistry = (function () {
        function NOMISRESTServiceRegistry(agency, service, options) {
            this.agency = "NOMIS";
            this.serviceURL = "http://www.nomisweb.co.uk/api";
            this.options = "uid=0xad235cca367972d98bd642ef04ea259da5de264f";
            this.local = new registry.LocalRegistry();
            this.dataflowList = null;
            if (service != null) {
                this.serviceURL = service;
            }
            else {
            }
            if (agency != null) {
                this.agency = agency;
            }
            if (options != null) {
                this.options = options;
            }
        }
        NOMISRESTServiceRegistry.prototype.throttle = function (fn, threshhold, scope) {
            threshhold || (threshhold = 250);
            var last, deferTimer;
            return function () {
                var context = scope || this;
                var now = +new Date, args = arguments;
                if (last && now < last + threshhold) {
                    // hold on to it
                    clearTimeout(deferTimer);
                    deferTimer = setTimeout(function () {
                        last = now;
                        fn.apply(context, args);
                    }, threshhold);
                }
                else {
                    last = now;
                    fn.apply(context, args);
                }
            };
        };
        NOMISRESTServiceRegistry.prototype.getRemoteRegistry = function () {
            return this;
        };
        NOMISRESTServiceRegistry.prototype.getRepository = function () {
            return null;
        };
        NOMISRESTServiceRegistry.prototype.clear = function () {
            this.local.clear();
        };
        NOMISRESTServiceRegistry.prototype.query = function (q) {
            var flow = q.getDataflow();
            var startTime = q.getStartDate();
            var endTime = q.getEndDate();
            var geogIndex = flow.getId().toString().lastIndexOf("_");
            var geog = flow.getId().toString().substring(geogIndex + 1, flow.getId().toString().length);
            var geography_string = "&geography=" + geog;
            if ("NOGEOG" == geog) {
                geography_string = "";
            }
            var id = flow.getId().toString().substring(0, geogIndex);
            var dst_ref = new commonreferences.Ref();
            dst_ref.setAgencyId(flow.getAgencyId());
            dst_ref.setId(new commonreferences.ID(id));
            dst_ref.setVersion(flow.getVersion());
            var dst_reference = new commonreferences.Reference(dst_ref, null);
            var st = this.retrieve(this.getServiceURL() + "/v01/dataset/" + id + "/time/def.sdmx.xml");
            return st.then(function (struc) {
                var times = "&TIME=";
                var timeCL = struc.getStructures().getCodeLists().getCodelists()[0];
                var comma = true;
                for (var i = 0; i < timeCL.size(); i++) {
                    var rtp = time.TimeUtil.parseTime("", timeCL.getItems()[i].getId().toString());
                    var ts = moment(rtp.getStart());
                    var te = moment(rtp.getEnd());
                    var startMoment = moment(startTime);
                    var endMoment = moment(endTime);
                    if (ts.isBetween(startMoment, endMoment)) {
                        //console.log(timeCL.getItems()[i].getId().toString() + " is between " + startTime + " and " + endTime);
                        if (!comma) {
                            times += ",";
                            comma = true;
                        }
                        times += timeCL.getItem(i).getId().toString();
                        comma = false;
                    }
                    else {
                        console.log(timeCL.getItems()[i].getId().toString() + " is not between " + startTime + " and " + endTime);
                    }
                }
                var queryString = "";
                var kns = q.getKeyNames();
                for (var i = 0; i < kns.length; i++) {
                    var name = kns[i];
                    var values = q.getQueryKey(kns[i]).getValues();
                    if (i == 0) {
                        queryString += "?";
                    }
                    else {
                        queryString += "&";
                    }
                    queryString += name + "=";
                    for (var j = 0; j < values.length; j++) {
                        queryString += values[j];
                        if (j < values.length - 1) {
                            queryString += ",";
                        }
                    }
                }
                return this.retrieveData(flow, "http://www.nomisweb.co.uk/api/v01/dataset/" + dst_ref.getId() + ".compact.sdmx.xml" + queryString + times + "&" + this.options);
            }.bind(this));
            /*
            StringBuilder q = new StringBuilder();
            for (int i = 0; i < structure.getDataStructureComponents().getDimensionList().size(); i++) {
                DimensionType dim = structure.getDataStructureComponents().getDimensionList().getDimension(i);
                boolean addedParam = false;
                String concept = dim.getConceptIdentity().getId().toString();
                List<String> params = message.getQuery().getDataWhere().getAnd().get(0).getDimensionParameters(concept);
                System.out.println("Params=" + params);
                if (params.size() > 0) {
                    addedParam = true;
                    q.append(concept + "=");
                    for (int j = 0; j < params.size(); j++) {
                        q.append(params.get(j));
                        if (j < params.size() - 1) {
                            q.append(",");
                        }
                    }
                }
                if (addedParam && i < structure.getDataStructureComponents().getDimensionList().size() - 1) {
                    q.append("&");
                }
                addedParam = false;
            }
            DataMessage msg = null;
            msg = query(pparams, getServiceURL() + "/v01/dataset/" + id + ".compact.sdmx.xml?" + q + "&time=" + times.toString() + geography_string +"&" + options);
            */
            //return null;
        };
        NOMISRESTServiceRegistry.prototype.load = function (struct) {
            console.log("nomis load");
            this.local.load(struct);
        };
        NOMISRESTServiceRegistry.prototype.unload = function (struct) {
            this.local.unload(struct);
        };
        NOMISRESTServiceRegistry.prototype.makeRequest = function (opts) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                console.log("nomis retrieve:" + opts.url);
                xhr.open(opts.method, opts.url);
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(xhr.responseText);
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
        /*
         * Modified to always resolve
         *
         */
        NOMISRESTServiceRegistry.prototype.makeRequest2 = function (opts) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                console.log("nomis retrieve:" + opts.url);
                xhr.open(opts.method, opts.url);
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(xhr.responseText);
                    }
                    else {
                        resolve("");
                    }
                };
                xhr.onerror = function () {
                    resolve("");
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
        NOMISRESTServiceRegistry.prototype.retrieve = function (urlString) {
            var s = this.options;
            if (urlString.indexOf("?") == -1) {
                s = "?" + this.options + "&random=" + new Date().getTime();
            }
            else {
                s = "&" + this.options + "&random=" + new Date().getTime();
            }
            var opts = {};
            opts.url = urlString + s;
            opts.method = "GET";
            opts.headers = { "Connection": "close" };
            return this.makeRequest(opts).then(function (a) {
                return sdmx.SdmxIO.parseStructure(a);
            });
        };
        NOMISRESTServiceRegistry.prototype.retrieveData = function (dataflow, urlString) {
            var s = this.options;
            if (urlString.indexOf("?") == -1) {
                s = "?" + s + "&random=" + new Date().getTime();
            }
            else {
                s = "&" + s + "&random=" + new Date().getTime();
            }
            var opts = {};
            opts.url = urlString + s;
            opts.method = "GET";
            opts.headers = { "Connection": "close" };
            return this.makeRequest(opts).then(function (a) {
                var dm = sdmx.SdmxIO.parseData(a);
                var payload = new common.PayloadStructureType();
                payload.setStructure(dataflow.getStructure());
                dm.getHeader().setStructures([payload]);
                return dm;
            });
        };
        NOMISRESTServiceRegistry.prototype.retrieve2 = function (urlString, vals) {
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
            opts.headers = { "Connection": "close" };
            return this.makeRequest2(opts).then(function (a) {
                var pack = { string: a };
                for (var i = 0; i < Object.keys(vals).length; i++) {
                    var k = Object.keys(vals)[i];
                    pack[k] = vals[k];
                }
                return pack;
            });
        };
        /*
          This function ignores the version argument!!!
          ILO stat does not use version numbers.. simply take the latest
         */
        NOMISRESTServiceRegistry.prototype.findDataStructure = function (ref) {
            var dst = this.local.findDataStructure(ref);
            if (dst != null) {
                var promise1 = new Promise(function (resolve, reject) {
                    resolve(dst);
                }.bind(this));
                return promise1;
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
        NOMISRESTServiceRegistry.prototype.listDataflows = function () {
            if (this.dataflowList != null) {
                var promise1 = new Promise(function (resolve, reject) {
                    resolve(this.dataflowList);
                }.bind(this));
                return promise1;
            }
            else {
                var dfs = [];
                var th = this;
                var promise2 = this.retrieve(this.serviceURL + "/v01/dataset/def.sdmx.xml").then(function (st) {
                    var packArray = [];
                    var list = st.getStructures().getDataStructures().getDataStructures();
                    for (var i = 0; i < list.length; i++) {
                        var dst = list[i];
                        var cubeId = structure.NameableType.toIDString(dst);
                        var cubeName = dst.findName("en").getText();
                        var url = th.serviceURL + "/v01/dataset/" + cubeId + ".overview.xml";
                        var pack = { cubeId: cubeId, cubeName: cubeName, url: url };
                        packArray.push(pack);
                    }
                    return packArray;
                });
                return promise2.map(function (item, index, length) {
                    var pack = item;
                    return th.retrieve2(pack.url, pack).then(function (pack) {
                        var cubeId2 = pack.cubeId;
                        var cubeName2 = pack.cubeName;
                        var url2 = pack.url;
                        var doc = pack.string;
                        var parsedDataflows = [];
                        try {
                            var geogList = th.parseGeography(doc, cubeId2, cubeName2);
                            for (var j = 0; j < geogList.length; j++) {
                                var dataFlow = new structure.Dataflow();
                                dataFlow.setAgencyId(new commonreferences.NestedNCNameID((th.agency)));
                                dataFlow.setId(new commonreferences.ID(cubeId2 + "_" + geogList[j].getGeography()));
                                var name = new common.Name("en", cubeName2 + " " + geogList[j].getGeographyName());
                                var names = [];
                                names.push(name);
                                dataFlow.setNames(names);
                                var ref = new commonreferences.Ref();
                                ref.setAgencyId(new commonreferences.NestedNCNameID(th.agency));
                                ref.setMaintainableParentId(dataFlow.getId());
                                ref.setVersion(commonreferences.Version.ONE);
                                var reference = new commonreferences.Reference(ref, null);
                                dataFlow.setStructure(reference);
                                parsedDataflows.push(dataFlow);
                            }
                            if (geogList.length == 0) {
                                var dataFlow = new structure.Dataflow();
                                dataFlow.setAgencyId(new commonreferences.NestedNCNameID((th.agency)));
                                dataFlow.setId(new commonreferences.ID(cubeId2 + "_NOGEOG"));
                                var name = new common.Name("en", cubeName2);
                                var names = [];
                                names.push(name);
                                dataFlow.setNames(names);
                                var ref = new commonreferences.Ref();
                                ref.setAgencyId(new commonreferences.NestedNCNameID(th.agency));
                                ref.setMaintainableParentId(dataFlow.getId());
                                ref.setVersion(commonreferences.Version.ONE);
                                var reference = new commonreferences.Reference(ref, null);
                                dataFlow.setStructure(reference);
                                parsedDataflows.push(dataFlow);
                            }
                        }
                        catch (error) {
                            console.log("error!:" + error);
                        }
                        return parsedDataflows;
                    });
                }, { concurrency: 5 }).delay(1300).then(function (stuff) {
                    // works with delay of 1000, put 1300 to be safe =D
                    var dfs = [];
                    for (var i = 0; i < stuff.length; i++) {
                        for (var j = 0; j < stuff[i].length; j++) {
                            dfs.push(stuff[i][j]);
                        }
                    }
                    this.dataflowList = dfs;
                    return dfs;
                }.bind(this));
            }
        };
        NOMISRESTServiceRegistry.prototype.getServiceURL = function () {
            return this.serviceURL;
        };
        NOMISRESTServiceRegistry.prototype.parseGeography = function (doc, cubeId, cubeName) {
            var geogList = [];
            var tagContent = null;
            var lastLang = null;
            var xmlDoc = parseXml(doc);
            var dimNode = this.findNodeName("Dimensions", xmlDoc.documentElement.childNodes);
            if (dimNode == null) {
                return geogList;
            }
            var dimsNode = this.searchNodeName("Dimension", dimNode.childNodes);
            if (dimsNode == null || dimsNode.length == 0) {
                return geogList;
            }
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
        NOMISRESTServiceRegistry.prototype.recurseDomChildren = function (start, output) {
            var nodes;
            if (start.childNodes) {
                nodes = start.childNodes;
                this.loopNodeChildren(nodes, output);
            }
        };
        NOMISRESTServiceRegistry.prototype.loopNodeChildren = function (nodes, output) {
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
        NOMISRESTServiceRegistry.prototype.outputNode = function (node) {
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
        NOMISRESTServiceRegistry.prototype.findNodeName = function (s, childNodes) {
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
        NOMISRESTServiceRegistry.prototype.searchNodeName = function (s, childNodes) {
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
        NOMISRESTServiceRegistry.prototype.findDataflow = function (ref) {
            return null;
        };
        NOMISRESTServiceRegistry.prototype.findCode = function (ref) { return null; };
        NOMISRESTServiceRegistry.prototype.findCodelist = function (ref) { return null; };
        NOMISRESTServiceRegistry.prototype.findItemType = function (item) { return null; };
        NOMISRESTServiceRegistry.prototype.findConcept = function (ref) { return null; };
        NOMISRESTServiceRegistry.prototype.findConceptScheme = function (ref) { return null; };
        NOMISRESTServiceRegistry.prototype.searchDataStructure = function (ref) { return null; };
        NOMISRESTServiceRegistry.prototype.searchDataflow = function (ref) { return null; };
        NOMISRESTServiceRegistry.prototype.searchCodelist = function (ref) { return null; };
        NOMISRESTServiceRegistry.prototype.searchItemType = function (item) { return null; };
        NOMISRESTServiceRegistry.prototype.searchConcept = function (ref) { return null; };
        NOMISRESTServiceRegistry.prototype.searchConceptScheme = function (ref) { return null; };
        NOMISRESTServiceRegistry.prototype.getLocalRegistry = function () {
            return this.local;
        };
        NOMISRESTServiceRegistry.prototype.save = function () { };
        return NOMISRESTServiceRegistry;
    })();
    exports.NOMISRESTServiceRegistry = NOMISRESTServiceRegistry;
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

//# sourceMappingURL=nomis.js.map
