define(["require", "exports", "sdmx/registry", "sdmx/structure", "sdmx/commonreferences", "sdmx/common", "sdmx"], function (require, exports, registry, structure, commonreferences, common, sdmx) {
    function parseXml(s) {
        var parseXml;
        parseXml = new DOMParser();
        var xmlDoc = parseXml.parseFromString(s, "text/xml");
        return xmlDoc;
    }
    exports.parseXml = parseXml;
    var NOMISRESTServiceRegistry //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
     = (function () {
        function NOMISRESTServiceRegistry //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
            (agency, service, options) {
            this.agency = "";
            this.serviceURL = "";
            this.options = "";
            this.local = new registry.LocalRegistry();
            this.dataflowList = null;
            this.serviceURL = service;
            this.agency = agency;
            this.options = options;
        }
        NOMISRESTServiceRegistry //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.load = function (struct) {
            console.log("nomis load");
            this.local.load(struct);
        };
        NOMISRESTServiceRegistry //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.unload = function (struct) {
            this.local.unload(struct);
        };
        NOMISRESTServiceRegistry //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.retrieve = function (urlString) {
            console.log("nomis retrieve:" + urlString);
            var s = this.options;
            if (urlString.indexOf("?") == -1) {
                s = "?" + s + "&random=" + new Date().getTime();
            }
            else {
                s = "&" + s + "&random=" + new Date().getTime();
            }
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", urlString, false, "", "");
            xhttp.send(null);
            return sdmx.SdmxIO.parseStructure(xhttp.responseText);
        };
        NOMISRESTServiceRegistry //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.retrieve2 = function (urlString) {
            console.log("nomis retrieve:" + urlString);
            var s = this.options;
            if (urlString.indexOf("?") == -1) {
                s = "?" + s + "&random=" + new Date().getTime();
            }
            else {
                s = "&" + s + "&random=" + new Date().getTime();
            }
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", urlString, false, "", "");
            xhttp.send(null);
            return xhttp.responseText;
        };
        /*
          This function ignores the version argument!!!
          ILO stat does not use version numbers.. simply take the latest
         */
        NOMISRESTServiceRegistry //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.findDataStructure = function (ref) {
            var dst = this.local.findDataStructure(ref);
            if (dst == null) {
                var geogIndex = ref.getMaintainableParentId().toString().lastIndexOf("_");
                var geog = ref.getMaintainableParentId().toString().substring(geogIndex + 1, ref.getMaintainableParentId().toString().length);
                var geography_string = "geography=" + geog;
                if ("NOGEOG" == geog) {
                    geography_string = "";
                }
                var id = ref.getMaintainableParentId().toString().substring(0, geogIndex);
                var st = this.retrieve(this.getServiceURL() + "/v01/dataset/" + id + ".structure.sdmx.xml?" + geography_string);
                st.getStructures().getDataStructures().getDataStructures()[0].setId(ref.getMaintainableParentId());
                st.getStructures().getDataStructures().getDataStructures()[0].setVersion(ref.getVersion());
                this.load(st);
                return this.local.findDataStructure(ref);
            }
            return dst;
        };
        NOMISRESTServiceRegistry //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.listDataflows = function () {
            if (this.dataflowList != null) {
                return this.dataflowList;
            }
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
            return dfs;
        };
        NOMISRESTServiceRegistry //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.getServiceURL = function () {
            return this.serviceURL;
        };
        NOMISRESTServiceRegistry //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
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
        NOMISRESTServiceRegistry //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        .prototype.recurseDomChildren = function (start, output) {
            var nodes;
            if (start.childNodes) {
                nodes = start.childNodes;
                this.loopNodeChildren(nodes, output);
            }
        };
        NOMISRESTServiceRegistry //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
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
        NOMISRESTServiceRegistry //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
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
        NOMISRESTServiceRegistry //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
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
        NOMISRESTServiceRegistry //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
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
        return NOMISRESTServiceRegistry //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
        ;
    })();
    exports.NOMISRESTServiceRegistry //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
     = NOMISRESTServiceRegistry //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
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

//# sourceMappingURL=nomis.js.map
