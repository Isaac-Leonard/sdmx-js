define(["require", "exports", "sax"], function (require, exports, sax) {
    var Sdmx20StructureParser = (function () {
        function Sdmx20StructureParser() {
        }
        Sdmx20StructureParser.parse = function (s) {
            var opts = {};
            var parser = sax.parser(/*strict=*/ true, /*SaxOptions*/ opts);
            parser.onerror = function (e) {
                // an error happened.
            };
            parser.ontext = function (t) {
                // got some text.  t is the string of text.
            };
            parser.onopentag = function (node) {
                // opened a tag.  node has "name" and "attributes"
            };
            parser.onattribute = function (attr) {
                // an attribute.  attr has "name" and "value"
            };
            parser.onend = function () {
                // parser stream is done, and ready to have more stuff written to it.
            };
            parser.write('<xml>Hello, <who name="world">world</who>!</xml>').close();
            return null;
        };
        return Sdmx20StructureParser;
    })();
    exports.Sdmx20StructureParser = Sdmx20StructureParser;
});

//# sourceMappingURL=sdmx20.js.map
