/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import interfaces = require("sdmx/interfaces");
import registry = require("sdmx/registry");
import structure = require("sdmx/structure");
import message = require("sdmx/message");
import commonreferences = require("sdmx/commonreferences");
import common = require("sdmx/common");
import sdmx = require("sdmx");
export function parseXml(s: string): any {
    var parseXml: DOMParser;
    parseXml = new DOMParser();
    var xmlDoc = parseXml.parseFromString(s, "text/xml");
    return xmlDoc;
}
export class NOMISRESTServiceRegistry //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
{
    private agency: string = "";
    private serviceURL: string = "";
    private options: string = "";
    private local: interfaces.Registry = new registry.LocalRegistry();

    private dataflowList: Array<structure.Dataflow> = null;

    constructor(agency: string, service: string, options: string) {
        this.serviceURL = service;
        this.agency = agency;
        this.options = options;
    }

    load(struct: message.StructureType) {
        console.log("nomis load");
        this.local.load(struct);
    }

    unload(struct: message.StructureType) {
        this.local.unload(struct);
    }
    public retrieve(urlString: string): message.StructureType {
        console.log("nomis retrieve:" + urlString);
        var s: string = this.options;
        if (urlString.indexOf("?") == -1) {
            s = "?" + s + "&random=" + new Date().getTime();
        } else {
            s = "&" + s + "&random=" + new Date().getTime();
        }
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", urlString, false, "", "");
        xhttp.send(null);
        return sdmx.SdmxIO.parseStructure(xhttp.responseText);
    }
    public retrieve2(urlString: string): string {
        console.log("nomis retrieve:" + urlString);
        var s: string = this.options;
        if (urlString.indexOf("?") == -1) {
            s = "?" + s + "&random=" + new Date().getTime();
        } else {
            s = "&" + s + "&random=" + new Date().getTime();
        }
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", urlString, false, "", "");
        xhttp.send(null);
        return xhttp.responseText;
    }
    /*
      This function ignores the version argument!!!
      ILO stat does not use version numbers.. simply take the latest
     */

    public findDataStructure(ref: commonreferences.Reference): structure.DataStructure {
        var dst: structure.DataStructure = this.local.findDataStructure(ref);
        if (dst == null) {
            var geogIndex = ref.getMaintainableParentId().toString().lastIndexOf("_");
            var geog: string = ref.getMaintainableParentId().toString().substring(geogIndex + 1, ref.getMaintainableParentId().toString().length);
            var geography_string: string = "geography=" + geog;
            if ("NOGEOG" == geog) {
                geography_string = "";
            }
            var id: string = ref.getMaintainableParentId().toString().substring(0, geogIndex);
            var st: message.StructureType = this.retrieve(this.getServiceURL() + "/v01/dataset/" + id + ".structure.sdmx.xml?" + geography_string);
            st.getStructures().getDataStructures().getDataStructures()[0].setId(ref.getMaintainableParentId());
            st.getStructures().getDataStructures().getDataStructures()[0].setVersion(ref.getVersion());
            this.load(st);
            return this.local.findDataStructure(ref);
        }
        return dst;
    }

    public listDataflows(): Array<structure.Dataflow> {
        if (this.dataflowList != null) {
            return this.dataflowList;
        }
        var st: message.StructureType = this.retrieve(this.serviceURL + "/v01/dataset/def.sdmx.xml");
        var list: Array<structure.DataStructure> = st.getStructures().getDataStructures().getDataStructures();
        var dfs: Array<structure.Dataflow> = [];
        for (var i: number = 0; i < list.length; i++) {
            
            var dst: structure.DataStructure = list[i];
            var cubeId: string = structure.NameableType.toIDString(dst);
            var cubeName: string = dst.findName("en").getText();
            var url: string = this.serviceURL + "/v01/dataset/" + cubeId + ".overview.xml";
            var geogList: Array<NOMISGeography> = this.parseGeography(this.retrieve2(url), cubeId, cubeName);
            for (var j = 0; j < geogList.length; j++) {
                var dataFlow: structure.Dataflow = new structure.Dataflow();
                dataFlow.setAgencyID(new commonreferences.NestedNCNameID((this.agency)));
                dataFlow.setId(new commonreferences.ID(cubeId + "_" + geogList[j].getGeography()));
                var name: common.Name = new common.Name("en", cubeName + " " + geogList[j].getGeographyName());
                var names: Array<common.Name> = [];
                names.push(name);
                dataFlow.setNames(names);
                var ref: commonreferences.Ref = new commonreferences.Ref();
                ref.setAgencyId(new commonreferences.NestedNCNameID(this.agency));
                ref.setMaintainableParentId(dataFlow.getId());
                ref.setVersion(commonreferences.Version.ONE);
                var reference = new commonreferences.Reference(ref, null);
                dataFlow.setStructure(reference);
                dfs.push(dataFlow);
            }
            if (geogList.length == 0) {
                var dataFlow: structure.Dataflow = new structure.Dataflow();
                dataFlow.setAgencyID(new commonreferences.NestedNCNameID((this.agency)));
                dataFlow.setId(new commonreferences.ID(cubeId + "_NOGEOG"));
                var name: common.Name = new common.Name("en", cubeName);
                var names: Array<common.Name> = [];
                names.push(name);
                dataFlow.setNames(names);
                var ref: commonreferences.Ref = new commonreferences.Ref();
                ref.setAgencyId(new commonreferences.NestedNCNameID(this.agency));
                ref.setMaintainableParentId(dataFlow.getId());
                ref.setVersion(commonreferences.Version.ONE);
                var reference = new commonreferences.Reference(ref, null);
                dataFlow.setStructure(reference);
                dfs.push(dataFlow);
            }
        }
        return dfs;
    }
    public getServiceURL(): string {
        return this.serviceURL;
    }
    public parseGeography(doc: string, cubeId: string, cubeName: string): Array<NOMISGeography> {
        var geogList: Array<NOMISGeography> = [];
        var tagContent: string = null;
        var lastLang: string = null;
        var xmlDoc = parseXml(doc);
        var dimNode = this.findNodeName("Dimensions",xmlDoc.documentElement.childNodes);
        var dimsNode = this.searchNodeName("Dimension",dimNode.childNodes);
        var geogNode = null;
        for (var i = 0; i < dimsNode.length;i++) {
            if( dimsNode[i].getAttribute("concept")=="geography") {
                geogNode=dimsNode[i];
            }
        }
        if( geogNode==null ) return geogList;
        var typesNode = this.findNodeName("Types",geogNode.childNodes);
        if( typesNode == null ) return geogList;
        var typeArray = this.searchNodeName("Type",typesNode.childNodes);
        if(typeArray.length==0) {
            return geogList;
        }
        for (var i: number = 0; i < typeArray.length;i++) {
            var ng: NOMISGeography = new NOMISGeography(typeArray[i].getAttribute("value"),typeArray[i].getAttribute("name"),cubeName,cubeId);
            geogList.push(ng);
        }
        return geogList;
    }
    recurseDomChildren(start: any, output: any) {
        var nodes;
        if (start.childNodes) {
            nodes = start.childNodes;
            this.loopNodeChildren(nodes, output);
        }
    }

    loopNodeChildren(nodes: Array<any>, output: any) {
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
    }
    outputNode(node: any) {
        var whitespace = /^\s+$/g;
        if (node.nodeType === 1) {
            console.log("element: " + node.tagName);
        } else if (node.nodeType === 3) {
            //clear whitespace text nodes
            node.data = node.data.replace(whitespace, "");
            if (node.data) {
                console.log("text: " + node.data);
            }
        }
    }
    findNodeName(s: string, childNodes: any) {
        for (var i: number = 0; i < childNodes.length; i++) {
            var nn: string = childNodes[i].nodeName;
            //alert("looking for:"+s+": name="+childNodes[i].nodeName);
            if (nn.indexOf(s) == 0) {
                //alert("found node:"+s);
                return childNodes[i];
            }
        }
        return null;
    }
    searchNodeName(s: string, childNodes: any): Array<any> {
        var result: Array<any> = [];
        for (var i: number = 0; i < childNodes.length; i++) {
            var nn: string = childNodes[i].nodeName;
            //alert("looking for:"+s+": name="+childNodes[i].nodeName);
            if (nn.indexOf(s) == 0) {
                //alert("found node:"+s);
                result.push(childNodes[i]);
            }
        }
        if (result.length == 0) {
            //alert("cannot find any " + s + " in node");
        }
        return result;
    }
}
export class NOMISGeography {
    private geography: string = "";
    private geographyName: string = "";
    private cubeName: string = "";
    private cubeId: string = "";
    constructor(geography: string, geographyName: string, cubeName: string, cubeId: string) {
        this.geography = geography;
        this.geographyName = geographyName;
        this.cubeName = cubeName;
        this.cubeId = cubeId;

    }
    getGeography() {
        return this.geography;
    }
    getCubeName() { return this.cubeName; }
    getCubeId() {
        return this.cubeId;
    }
    getGeographyName() {
        return this.geographyName;
    }
}
