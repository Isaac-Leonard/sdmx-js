/// <amd-module name='sdmx20'/>
///<reference path="sax.d.ts"/>
import sax = require("sax");
import structure = require("structure");
import message = require("message");
import parser = require("parser");
import sdmx = require("sdmx");
export class Sdmx20StructureParser implements parser.SdmxParserProvider {
    constructor(){
        
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
        if(input.indexOf("Structure") != -1 && input.indexOf("http://www.SDMX.org/resources/SDMXML/schemas/v2_0/message")!=-1){
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
    parseData(input: string): message.DataMessage {
        return null;
    }
}
sdmx.SdmxIO.registerParserProvider(new Sdmx20StructureParser());