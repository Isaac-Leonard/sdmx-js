define(["require", "exports", "sdmx/registry", "sdmx/structure", "sdmx/commonreferences", "sdmx/common", "sdmx"], function (require, exports, registry, structure, commonreferences, common, sdmx) {
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
            this.serviceURL = "https://www.nomisweb.co.uk/api";
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
        NOMISRESTServiceRegistry.prototype.getRemoteRegistry = function () {
            return this;
        };
        NOMISRESTServiceRegistry.prototype.getRepository = function () {
            return null;
        };
        NOMISRESTServiceRegistry.prototype.clear = function () {
            this.local.clear();
        };
        NOMISRESTServiceRegistry.prototype.query = function (flow, s) {
            var geogIndex = flow.getMaintainableParentId().getString().lastIndexOf("_");
            var geog = flow.getMaintainableParentId().toString().substring(geogIndex + 1, flow.getMaintainableParentId().toString().length);
            var geography_string = "&geography=" + geog;
            if ("NOGEOG" == geog) {
                geography_string = "";
            }
            var id = flow.getMaintainableParentId().toString().substring(0, geogIndex);
            var dst_ref = flow.cloneRef();
            dst_ref.setId(new commonreferences.ID(id));
            var dst_reference = new commonreferences.Reference(dst_ref, null);
            var dst = this.findDataStructure(dst_reference);
            return dst.then(function (struc) {
                struc.dump();
                return this.retrieveData("http://www.nomisweb.co.uk/api/v01/dataset/NM_1_1.compact.sdmx.xml?GEOGRAPHY=8388609&SEX=5&ITEM=1&MEASURES=20100&FREQ=M&time=2008-01,2008-02,2008-03,2008-04,2008-05,2008-06,2008-07,2008-08,2008-09,2008-10,2008-11,2008-12,2009-01,2009-02,2009-03,2009-04,2009-05,2009-06,2009-07,2009-08,2009-09,2009-10,2009-11,2009-12,2010-01,2010-02,2010-03,2010-04,2010-05,2010-06,2010-07,2010-08,2010-09,2010-10,2010-11,2010-12,2011-01,2011-02,2011-03,2011-04,2011-05,2011-06,2011-07,2011-08,2011-09,2011-10,2011-11,2011-12,2012-01,2012-02,2012-03,2012-04,2012-05,2012-06,2012-07,2012-08,2012-09,2012-10,2012-11,2012-12,2013-01,2013-02,2013-03,2013-04,2013-05,2013-06,2013-07,2013-08,2013-09,2013-10,2013-11,2013-12,2014-01,2014-02,2014-03,2014-04,2014-05,2014-06,2014-07,2014-08,2014-09,2014-10,2014-11,2014-12&geography=TYPE2&" + this.options);
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
            StringBuilder times = new StringBuilder();
            try {
                StructureType st = retrieve3(getServiceURL() + "/v01/dataset/" + id + "/time/def.sdmx.xml");
                CodelistType timesCL = st.getStructures().getCodelists().getCodelists().get(0);
                String startTime = message.getQuery().getDataWhere().getAnd().get(0).getTimeDimensionValue().get(0).getStart().toString();
                String endTime = message.getQuery().getDataWhere().getAnd().get(0).getTimeDimensionValue().get(0).getEnd().toString();
                RegularTimePeriod rtpStart = TimeUtil.parseTime("", startTime);
                RegularTimePeriod rtpEnd = TimeUtil.parseTime("", endTime);
                boolean comma = true;
                for (int i = 0; i < timesCL.size(); i++) {
                    RegularTimePeriod rtp = TimeUtil.parseTime("", timesCL.getCode(i).getId().toString());
                    if ((rtp.getStart().getTime() == rtpStart.getStart().getTime() || rtp.getStart().after(rtpStart.getStart())) && (rtp.getEnd().before(rtpEnd.getEnd()) || rtp.getEnd().getTime() == rtpEnd.getEnd().getTime())) {
                        if (!comma) {
                            times.append(",");
                        }
                        times.append(timesCL.getCode(i).getId().toString());
                        comma = false;
                    }
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
        NOMISRESTServiceRegistry.prototype.retrieve = function (urlString) {
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
            return this.makeRequest(opts).then(function (a) {
                return sdmx.SdmxIO.parseStructure(a);
            });
        };
        NOMISRESTServiceRegistry.prototype.retrieveData = function (urlString) {
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
            return this.makeRequest(opts).then(function (a) {
                return sdmx.SdmxIO.parseData(a);
            });
        };
        NOMISRESTServiceRegistry.prototype.retrieve2 = function (urlString) {
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
        NOMISRESTServiceRegistry.prototype.findDataStructure = function (ref) {
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
        NOMISRESTServiceRegistry.prototype.listDataflows = function () {
            if (this.dataflowList != null) {
                var promise = new Promise(function (resolve, reject) {
                    resolve(this.dataflowList);
                }.bind(this));
                return promise;
            }
            else {
                var promise = new Promise(function (resolve, reject) {
                    var st = this.retrieve(this.serviceURL + "/v01/dataset/def.sdmx.xml");
                    var list = st.getStructures().getDataStructures().getDataStructures();
                    var dfs = [];
                    for (var i = 0; i < list.length; i++) {
                        var dst = list[i];
                        var cubeId = structure.NameableType.toIDString(dst);
                        var cubeName = dst.findName("en").getText();
                        var url = this.serviceURL + "/v01/dataset/" + cubeId + ".overview.xml";
                        var geogList = this.parseGeography(this.retrieve2(url), cubeId, cubeName);
                        for (var j = 0; j < geogList.length; j++) {
                            var dataFlow = new structure.Dataflow();
                            dataFlow.setAgencyID(new commonreferences.NestedNCNameID((this.agency)));
                            dataFlow.setId(new commonreferences.ID(cubeId + "_" + geogList[j].getGeography()));
                            var name = new common.Name("en", cubeName + " " + geogList[j].getGeographyName());
                            var names = [];
                            names.push(name);
                            dataFlow.setNames(names);
                            var ref = new commonreferences.Ref();
                            ref.setAgencyId(new commonreferences.NestedNCNameID(this.agency));
                            ref.setMaintainableParentId(dataFlow.getId());
                            ref.setVersion(commonreferences.Version.ONE);
                            var reference = new commonreferences.Reference(ref, null);
                            dataFlow.setStructure(reference);
                            dfs.push(dataFlow);
                        }
                        if (geogList.length == 0) {
                            var dataFlow = new structure.Dataflow();
                            dataFlow.setAgencyID(new commonreferences.NestedNCNameID((this.agency)));
                            dataFlow.setId(new commonreferences.ID(cubeId + "_NOGEOG"));
                            var name = new common.Name("en", cubeName);
                            var names = [];
                            names.push(name);
                            dataFlow.setNames(names);
                            var ref = new commonreferences.Ref();
                            ref.setAgencyId(new commonreferences.NestedNCNameID(this.agency));
                            ref.setMaintainableParentId(dataFlow.getId());
                            ref.setVersion(commonreferences.Version.ONE);
                            var reference = new commonreferences.Reference(ref, null);
                            dataFlow.setStructure(reference);
                            dfs.push(dataFlow);
                        }
                    }
                    this.dataflowList = dfs;
                    resolve(dfs);
                }.bind(this));
                return promise;
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
