/// <amd-module name='sdmx20'/>
///<reference path="sax.d.ts"/>
import commonreferences = require("commonreferences");
import sax = require("sax");
import structure = require("structure");
import message = require("message");
import interfaces = require("interfaces");
import xml = require("xml");
import common = require("common");
export function parseXml(s: string): any {
    var parseXml: DOMParser;
    parseXml = new DOMParser();
    var xmlDoc = parseXml.parseFromString(s, "text/xml");
    return xmlDoc;
}

export class Sdmx20StructureParser implements interfaces.SdmxParserProvider {
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
    toStructureType(structureNode: any): message.StructureType {
        this.struct = new message.StructureType();
        var structures = new structure.Structures();
        this.struct.setStructures(structures);
        var childNodes = structureNode.childNodes;
        this.struct.setHeader(this.toHeader(this.findNodeName("Header", childNodes)));
        structures.setCodeLists(this.toCodelists(this.findNodeName("CodeLists", childNodes)));
        structures.setConcepts(this.toConcepts(this.findNodeName("Concepts", childNodes)));
        structures.setDataStructures(this.toKeyFamilies(this.findNodeName("KeyFamilies", childNodes)));
        return this.struct;
    }
    toHeader(headerNode: any) {
        var header: message.Header = new message.Header()
        header.setId(this.findNodeName("ID", headerNode.childNodes).childNodes[0].nodeValue);
        var test: string = this.findNodeName("Test", headerNode.childNodes).childNodes[0].nodeValue;
        header.setTest(test == "true");
        // truncated not in sdmx 2.1
        //var truncated:string= this.findNodeName("Truncated",headerNode.childNodes).childNodes[0].nodeValue;
        //header.setTruncated(truncated=="true");
        var prepared: string = this.findNodeName("Prepared", headerNode.childNodes).childNodes[0].nodeValue;
        var prepDate: xml.DateTime = xml.DateTime.fromString(prepared);
        header.setPrepared(new message.HeaderTimeType(prepDate));
        header.setSender(this.toSender(this.findNodeName("Sender", headerNode.childNodes)));
        return header;
    }
    toSender(senderNode: any): message.Sender {
        var sender: string = senderNode.childNodes[0].nodeValue;

        var senderType: message.Sender = new message.Sender();
        var senderId: string = senderNode.getAttribute("id");
        var senderID: commonreferences.ID = new commonreferences.ID(senderId);
        senderType.setId(senderID);
        return senderType;
    }
    toNames(node: any): Array<common.Name> {
        var names: Array<common.Name> = [];
        var senderNames = this.searchNodeName("Name", node.childNodes);
        for (var i: number = 0; i < senderNames.length; i++) {
            names.push(this.toName(senderNames[i]));
        }
        return names;
    }
    toName(node: any): common.Name {
        var lang = node.getAttribute("xml:lang");
        var text = node.childNodes[0].nodeValue;
        var name: common.Name = new common.Name(lang, text);
        return name;
    }
    toDescriptions(node: any): Array<common.Description> {
        var names: Array<common.Description> = [];
        var senderNames = this.searchNodeName("Description", node.childNodes);
        for (var i: number = 0; i < senderNames.length; i++) {
            names.push(this.toDescription(senderNames[i]));
        }
        return names;
    }
    toDescription(node: any): common.Description {
        var lang = node.getAttribute("xml:lang");
        var text = node.childNodes[0].nodeValue;
        var desc: common.Description = new common.Description(lang, text);
        return desc;
    }
    toTextType(node: any): common.TextType {
        var lang = node.getAttribute("xml:lang");
        var text = node.childNodes[0].nodeValue;
        var textType: common.TextType = new common.TextType(lang, text);
        return textType;
    }
    toPartyType(node: any): message.PartyType {
        var pt = new message.PartyType();
        return pt;
    }
    toCodelists(codelistsNode: any) {
        if (codelistsNode == null) return null;
        var codelists: structure.CodeLists = new structure.CodeLists();
        var codes = this.searchNodeName("CodeList", codelistsNode.childNodes);
        for (var i: number = 0; i < codes.length; i++) {
            codelists.getCodelists().push(this.toCodelist(codes[i]));
        }
        return codelists;
    }
    toID(node: any): commonreferences.ID {
        if (node == null) return null;
        return new commonreferences.ID(node.getAttribute("id"));
    }
    toNestedNCNameID(node: any): commonreferences.NestedNCNameID {
        if (node == null) return null;
        return new commonreferences.NestedNCNameID(node.getAttribute("agencyID"));
    }
    toVersion(node: any): commonreferences.Version {
        if (node == null) return null;
        return new commonreferences.Version(node.getAttribute("version"));
    }
    toCodelist(codelistNode: any) {
        var cl: structure.Codelist = new structure.Codelist();
        cl.setNames(this.toNames(codelistNode));
        cl.setId(this.toID(codelistNode));
        cl.setAgencyID(this.toNestedNCNameID(codelistNode));
        cl.setVersion(this.toVersion(codelistNode));
        var codeNodes = this.searchNodeName("Code", codelistNode.childNodes);
        for (var i: number = 0; i < codeNodes.length; i++) {
            cl.getItems().push(this.toCode(codeNodes[i]));
        }
        return cl;
    }
    toCode(codeNode: any): structure.CodeType {
        var c: structure.CodeType = new structure.CodeType();
        c.setDescriptions(this.toDescriptions(codeNode));
        c.setId(this.toValue(codeNode));
        if (codeNode.getAttribute("parentCode") != null) {
            var ref: commonreferences.Ref = new commonreferences.Ref();
            ref.setMaintainableParentId(new commonreferences.ID(codeNode.getAttribute("parentCode")));
            var reference: commonreferences.Reference = new commonreferences.Reference(ref, null);
            c.setParent(reference);
        }
        return c;
    }
    getParentCode(codeNode: any): commonreferences.ID {
        var id = codeNode.getAttribute("parentCode");
        if (id == null) { return null; }
        else {
            return new commonreferences.ID(id);
        }
    }
    toValue(codeNode: any): commonreferences.ID {
        if (codeNode == null) return null;
        var id = codeNode.getAttribute("value");
        return new commonreferences.ID(id);
    }
    toConcepts(conceptsNode: any) {
        if (conceptsNode == null) return null;
        var concepts: structure.Concepts = new structure.Concepts();
        this.struct.getStructures().setConcepts(concepts);
        var conNodes = this.searchNodeName("Concept", conceptsNode.childNodes);
        for (var i: number = 0; i < conNodes.length; i++) {
            var conceptScheme: structure.ConceptSchemeType = this.findStandaloneConceptScheme(this.toNestedNCNameID(conNodes[i]));
            this.toConcept(conceptScheme, conNodes[i]);
        }
        return concepts;
    }
    findStandaloneConceptScheme(ag: commonreferences.NestedNCNameID): structure.ConceptSchemeType {
        var ref: commonreferences.Ref = new commonreferences.Ref();
        ref.setAgencyId(ag);
        ref.setMaintainableParentId(new commonreferences.ID("STANDALONE_CONCEPT_SCHEME"));
        ref.setVersion(null);
        var reference: commonreferences.Reference = new commonreferences.Reference(ref, null);
        var cs: structure.ConceptSchemeType = this.struct.findConceptScheme(reference);
        if (cs == null) {
            cs = new structure.ConceptSchemeType();
            cs.setAgencyID(ag);
            cs.setId(new commonreferences.ID("STANDALONE_CONCEPT_SCHEME"));
            cs.setVersion(commonreferences.Version.ONE);
            var name: common.Name = new common.Name("en", "Standalone Concept Scheme");
            cs.setNames([name]);
            this.struct.getStructures().getConcepts().getConceptSchemes().push(cs);
        }
        return cs;
    }
    toConceptScheme(conceptSchemeNode: any) {
        if (conceptSchemeNode == null) return null;
        var cs: structure.ConceptSchemeType = new structure.ConceptSchemeType();
        cs.setNames(this.toNames(conceptSchemeNode))
        cs.setAgencyID(this.toNestedNCNameID(conceptSchemeNode));
        cs.setVersion(this.toVersion(conceptSchemeNode));
        return cs;
    }
    toConcept(conceptScheme: structure.ConceptSchemeType, conceptNode: any) {
        if (conceptNode == null) {
            return null;
        }
        var con: structure.ConceptType = new structure.ConceptType();
        con.setNames(this.toNames(conceptNode));
        con.setDescriptions(this.toDescriptions(conceptNode));
        con.setId(this.toID(conceptNode));
        conceptScheme.getItems().push(con);
    }
    toKeyFamilies(keyFamiliesNode: any) {
        return null;
    } 
    getStructureType(): message.StructureType {
        return this.struct;
    }
    findNodeName(s: string, childNodes: any) {
        for (var i: number = 0; i < childNodes.length; i++) {
            var nn: string = childNodes[i].nodeName;
            //alert("looking for:"+s+": name="+childNodes[i].nodeName);
            if (nn.indexOf(s) != -1) {
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
            if (nn.indexOf(s) != -1) {
                //alert("found node:"+s);
                result.push(childNodes[i]);
            }
        }
        if (result.length == 0) {
            alert("cannot find any " + s + " in node");
        }
        return result;
    }
    findTextNode(node: any): string {
        if (node == null) return "";
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

