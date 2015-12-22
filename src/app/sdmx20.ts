/// <amd-module name='sdmx20'/>
///<reference path="sax.d.ts"/>
import sax = require("sax");
import structure = require("structure");
import message = require("message");
import parser = require("parser");
import sdmx = require("sdmx");
import xml = require("xml");
export function parseXml(s: string): any {
    var parseXml:DOMParser;
    parseXml = new DOMParser();
    var xmlDoc = parseXml.parseFromString(s,"text/xml");
    return xmlDoc;
}

export class Sdmx20StructureParser implements parser.SdmxParserProvider {
    constructor() {

    }
    getVersionIdentifier(): number {
        return 2.1;
    }
    canParse(input: string): boolean {
        if (input == null) return false;
        if (this.isStructure(input)) return true;
        if (this.isData(input)) return true;
    }
    isStructure(input: string): boolean {
        if (input.indexOf("Structure") != -1 && input.indexOf("http://www.SDMX.org/resources/SDMXML/schemas/v2_0/message") != -1) {
            return true;
        } else return false;
    }
    isData(header: string): boolean {
        return false;
    }
    isMetadata(header: string): boolean {
        return false;
    }
    parseStructure(input: string): message.StructureType {
        var srt: Sdmx20StructureReaderTools = new Sdmx20StructureReaderTools(input);
        return srt.getStructureType();

    }
    parseData(input: string): message.DataMessage {
        var opts: sax.SAXOptions = <sax.SAXOptions>{};
        var parser: sax.SAXParser = sax.parser(/*strict=*/true,/*SaxOptions*/opts);

        parser.onerror = function(e) {
            // an error happened.
        };
        parser.ontext = function(t) {
            // got some text.  t is the string of text.
        };
        parser.onopentag = function(node) {
            // opened a tag.  node has "name" and "attributes"
            console.log("open:" + node);
        };
        parser.onclosetag = function(e) {
            console.log("close:" + e);

        }
        parser.onattribute = function(attr) {
            // an attribute.  attr has "name" and "value"
        };
        parser.onend = function() {
            // parser stream is done, and ready to have more stuff written to it.
        };

        parser.write(input).close();
        return null;
    }
}
export class Sdmx20StructureReaderTools {
    private struct: message.StructureType = null;

    constructor(s: string) {
        var dom: any = parseXml(s);
        this.struct = this.toStructureType(dom.documentElement);
    }
    toStructureType(structure: any): message.StructureType {
        this.struct = new message.StructureType();
        var childNodes = structure.childNodes;

        this.toHeader(structure.getElementsByTagName("Header"));
        this.toCodelists(structure.getElementsByTagName("CodeLists"));
        this.toConcepts(structure.getElementsByTagName("Concepts"));
        this.toKeyFamilies(structure.getElementsByTagName("KeyFamilies"));
        return this.struct;
    }
    toHeader(headerNode: any) {
        var header: message.Header = new message.Header()
        header.setId(headerNode.getElementsByTagName("ID")[0].childNodes[0].nodeValue);
        var test:string= headerNode.getElementsByTagName("Test")[0].childNodes[0].nodeValue;
        header.setTest(test=="true");
        var prepared:string =headerNode.getElementsByTagName("Prepared")[0].childNodes[0].nodeValue;
        var prepDate: xml.DateTime = xml.DateTime.fromString(prepared);
        header.setPrepared(new message.HeaderTimeType(prepDate));

                var childNodes = headerNode.childNodes;
        for (var i: number = 0; i < childNodes.length; i++) {
            alert(childNodes[i].nodeName + ":" + childNodes[i].nodeName);
        }

        return header;
    }
    toCodelists(codelistsNode: any) {
        return null;
    }
    toConcepts(conceptsNode: any) {
        return null;
    }
    toKeyFamilies(keyFamiliesNode: any) {
        return null;
    }
    getStructureType(): message.StructureType {
        return this.struct;
    }
    myLoop(x: any): string {
        var i: number, y: any, xLen: number, txt: string;
        txt = "";
        x = x.childNodes;
        xLen = x.length;
        for (i = 0; i < xLen; i++) {
            y = x[i];
            if (y.nodeType != 3) {
                if (y.childNodes[0] != undefined) {
                    txt += this.myLoop(y);
                }
            } else {
                txt += y.nodeValue + "<br>";
            }
        }
        return txt;
    }
    myLoop2(x: any): string {
        var i: number, y: any, xLen: number, txt: string;
        txt = "";
        x = x.childNodes;
        xLen = x.length;
        for (i = 0; i < xLen; i++) {
            y = x[i];
            if (y.nodeType != 3) {
                alert(y.nodeName + ":" + y.nodeValue);
                if (y.childNodes[0] != undefined) {
                    txt += this.myLoop2(y);
                }
            } else {
                txt += y.nodeValue + "<br>";

            }
        }
        return txt;
    }
    findNodeName(s: string, childNodes: any) {
        for (var i: number = 0; i < childNodes.length; i++) {
            var nn: string = childNodes[i].nodeName;
            if (nn.indexOf(s) != -1) {
                alert("found node:"+s);
                return childNodes[i];
            }
        }
        alert("not found node:"+s);
        return null;
    }
    findTextNode(node: any): string {
        if( node == null ) return "";
        var childNodes = node.childNodes;
        for (var i: number = 0; i < childNodes.length; i++) {
            var nodeType = childNodes[i].nodeType;
            if (nodeType == 3) {
                return childNodes[i].nodeValue;
            }
        }
        return "";
    }

}




sdmx.SdmxIO.registerParserProvider(new Sdmx20StructureParser());
