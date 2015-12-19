///<reference path="sax.d.ts"/>
import sax = require("sax");
import structure = require("structure");
import message = require("message");
export class Sdmx20StructureParser {
    public static parse(s: string): message.StructureType {
        var opts:sax.SAXOptions = <sax.SAXOptions>{};
        var parser: sax.SAXParser = sax.parser(/*strict=*/true,/*SaxOptions*/opts);

        parser.onerror = function(e) {
            // an error happened.
        };
        parser.ontext = function(t) {
            // got some text.  t is the string of text.
        };
        parser.onopentag = function(node) {
            // opened a tag.  node has "name" and "attributes"
        };
        parser.onattribute = function(attr) {
            // an attribute.  attr has "name" and "value"
        };
        parser.onend = function() {
            // parser stream is done, and ready to have more stuff written to it.
        };

        parser.write('<xml>Hello, <who name="world">world</who>!</xml>').close();
        return null;
    }
}
