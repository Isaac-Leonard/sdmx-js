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
export class ABS //implements interfaces.Registry, interfaces.Repository, interfaces.Queryable {
{
    private agency: string = "ABS";
    private serviceURL: string = "http://stat.abs.gov.au/restsdmx/sdmx.ashx/";
    private options: string = "";
    private local: interfaces.LocalRegistry = new registry.LocalRegistry();

    private dataflowList: Array<structure.Dataflow> = null;

    getRegistry(): interfaces.RemoteRegistry {
        return null;//this;
    }

    getRepository(): interfaces.Repository {
        return null;//this;
        
    }

    clear() {
        this.local.clear();
    }
    query(s: string) {

    }
    constructor(agency: string, service: string, options: string) {
        if(service!=null){this.serviceURL = service;}
        if(agency!=null){this.agency = agency;}
        if(options!=null){this.options = options;}
    }

    load(struct: message.StructureType) {
        console.log("abs load");
        this.local.load(struct);
    }

    unload(struct: message.StructureType) {
        this.local.unload(struct);
    }
    makeRequest(opts): Promise<string> {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(opts.method, opts.url);
            xhr.onload = function() {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function() {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            if (opts.headers) {
                Object.keys(opts.headers).forEach(function(key) {
                    xhr.setRequestHeader(key, opts.headers[key]);
                });
            }
            var params = opts.params;
            // We'll need to stringify if we've been given an object
            // If we have a string, this is skipped.
            if (params && typeof params === 'object') {
                params = Object.keys(params).map(function(key) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                }).join('&');
            }
            xhr.send(params);
        });
    }
    public retrieve(urlString: string): Promise<message.StructureType> {
        console.log("nomis retrieve:" + urlString);
        var s: string = this.options;
        if (urlString.indexOf("?") == -1) {
            s = "?" + s + "&random=" + new Date().getTime();
        } else {
            s = "&" + s + "&random=" + new Date().getTime();
        }
        var opts: any = {};
        opts.url = urlString;
        opts.method = "GET";
        opts.headers = {};
        return this.makeRequest(opts).then(function(a) {
            return sdmx.SdmxIO.parseStructure(a);
        });
    }
    public retrieve2(urlString: string): Promise<string> {
        console.log("nomis retrieve:" + urlString);
        var s: string = this.options;
        if (urlString.indexOf("?") == -1) {
            s = "?" + s + "&random=" + new Date().getTime();
        } else {
            s = "&" + s + "&random=" + new Date().getTime();
        }
        var opts: any = {};
        opts.url = urlString;
        opts.method = "GET";
        return this.makeRequest(opts).then(function(a) {
            return a;
        });
    }
    /*
      This function ignores the version argument!!!
      ILO stat does not use version numbers.. simply take the latest
     */

    public findDataStructure(ref: commonreferences.Reference): Promise<structure.DataStructure> {
        var dst: structure.DataStructure = this.local.findDataStructure(ref);
        if (dst != null) {
            var promise = new Promise(function(resolve, reject) {
                resolve(dst);
            }.bind(this));
            return promise;
        } else {
            var geogIndex = ref.getMaintainableParentId().toString().lastIndexOf("_");
            var geog: string = ref.getMaintainableParentId().toString().substring(geogIndex + 1, ref.getMaintainableParentId().toString().length);
            var geography_string: string = "geography=" + geog;
            if ("NOGEOG" == geog) {
                geography_string = "";
            }
            var id: string = ref.getMaintainableParentId().toString().substring(0, geogIndex);
            return this.retrieve(this.getServiceURL() + "/v01/dataset/" + id + ".structure.sdmx.xml?" + geography_string).then(function(a: message.StructureType) {
                a.getStructures().getDataStructures().getDataStructures()[0].setId(ref.getMaintainableParentId());
                a.getStructures().getDataStructures().getDataStructures()[0].setVersion(ref.getVersion());
                this.load(a);
                return this.local.findDataStructure(ref);
            }.bind(this));
        }
    }
    public listDataflows(): Promise<Array<structure.Dataflow>> {
        if (this.dataflowList != null) {
            var promise = new Promise(function(resolve, reject) {
                resolve(this.dataflowList);
            }.bind(this));
            return promise;
        } else {
            return this.retrieve(this.serviceURL + "GetDataStructure/ALL/ABS").then(function(st: message.StructureType) {
                var array: Array<structure.DataStructure> = st.getStructures().getDataStructures().getDataStructures();
                var dfs:Array<structure.Dataflow> = [];
                for (var i = 0; i < array.length;i++) {
                    dfs.push(array[i].asDataflow());
                }
                this.dataflowList = dfs;
                return dfs;
            }.bind(this)
            );
        }
    }
    public getServiceURL(): string {
        return this.serviceURL;
    }
    public parseGeography(doc: string, cubeId: string, cubeName: string): Array<NOMISGeography> {
        var geogList: Array<NOMISGeography> = [];
        var tagContent: string = null;
        var lastLang: string = null;
        var xmlDoc = parseXml(doc);
        var dimNode = this.findNodeName("Dimensions", xmlDoc.documentElement.childNodes);
        var dimsNode = this.searchNodeName("Dimension", dimNode.childNodes);
        var geogNode = null;
        for (var i = 0; i < dimsNode.length; i++) {
            if (dimsNode[i].getAttribute("concept") == "geography") {
                geogNode = dimsNode[i];
            }
        }
        if (geogNode == null) return geogList;
        var typesNode = this.findNodeName("Types", geogNode.childNodes);
        if (typesNode == null) return geogList;
        var typeArray = this.searchNodeName("Type", typesNode.childNodes);
        if (typeArray.length == 0) {
            return geogList;
        }
        for (var i: number = 0; i < typeArray.length; i++) {
            var ng: NOMISGeography = new NOMISGeography(typeArray[i].getAttribute("value"), typeArray[i].getAttribute("name"), cubeName, cubeId);
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
