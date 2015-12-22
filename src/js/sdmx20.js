define("sdmx20", ["require", "exports", "commonreferences", "sax", "structure", "message", "xml", "common"], function (require, exports, commonreferences, sax, structure, message, xml, common) {
    function parseXml(s) {
        var parseXml;
        parseXml = new DOMParser();
        var xmlDoc = parseXml.parseFromString(s, "text/xml");
        return xmlDoc;
    }
    exports.parseXml = parseXml;
    var Sdmx20StructureParser = (function () {
        function Sdmx20StructureParser() {
        }
        Sdmx20StructureParser.prototype.getVersionIdentifier = function () {
            return 2.1;
        };
        Sdmx20StructureParser.prototype.canParse = function (input) {
            if (input == null)
                return false;
            if (this.isStructure(input))
                return true;
            if (this.isData(input))
                return true;
        };
        Sdmx20StructureParser.prototype.isStructure = function (input) {
            if (input.indexOf("Structure") != -1 && input.indexOf("http://www.SDMX.org/resources/SDMXML/schemas/v2_0/message") != -1) {
                return true;
            }
            else
                return false;
        };
        Sdmx20StructureParser.prototype.isData = function (header) {
            return false;
        };
        Sdmx20StructureParser.prototype.isMetadata = function (header) {
            return false;
        };
        Sdmx20StructureParser.prototype.parseStructure = function (input) {
            var srt = new Sdmx20StructureReaderTools(input);
            return srt.getStructureType();
        };
        Sdmx20StructureParser.prototype.parseData = function (input) {
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
                console.log("open:" + node);
            };
            parser.onclosetag = function (e) {
                console.log("close:" + e);
            };
            parser.onattribute = function (attr) {
                // an attribute.  attr has "name" and "value"
            };
            parser.onend = function () {
                // parser stream is done, and ready to have more stuff written to it.
            };
            parser.write(input).close();
            return null;
        };
        return Sdmx20StructureParser;
    })();
    exports.Sdmx20StructureParser = Sdmx20StructureParser;
    var Sdmx20StructureReaderTools = (function () {
        function Sdmx20StructureReaderTools(s) {
            this.struct = null;
            var dom = parseXml(s);
            this.struct = this.toStructureType(dom.documentElement);
        }
        Sdmx20StructureReaderTools.prototype.toStructureType = function (structu) {
            this.struct = new message.StructureType();
            var childNodes = structu.childNodes;
            this.toHeader(this.findNodeName("Header", childNodes));
            this.toCodelists(this.findNodeName("CodeLists", childNodes));
            this.toConcepts(this.findNodeName("Concepts", childNodes));
            this.toKeyFamilies(this.findNodeName("KeyFamilies", childNodes));
            return this.struct;
        };
        Sdmx20StructureReaderTools.prototype.toHeader = function (headerNode) {
            var header = new message.Header();
            header.setId(this.findNodeName("ID", headerNode.childNodes).childNodes[0].nodeValue);
            var test = this.findNodeName("Test", headerNode.childNodes).childNodes[0].nodeValue;
            header.setTest(test == "true");
            // truncated not in sdmx 2.1
            //var truncated:string= this.findNodeName("Truncated",headerNode.childNodes).childNodes[0].nodeValue;
            //header.setTruncated(truncated=="true");
            var prepared = this.findNodeName("Prepared", headerNode.childNodes).childNodes[0].nodeValue;
            var prepDate = xml.DateTime.fromString(prepared);
            header.setPrepared(new message.HeaderTimeType(prepDate));
            header.setSender(this.toSender(this.findNodeName("Sender", headerNode.childNodes)));
            var childNodes = headerNode.childNodes;
            for (var i = 0; i < childNodes.length; i++) {
                alert(childNodes[i].nodeName + ":" + childNodes[i].nodeName);
            }
            return header;
        };
        Sdmx20StructureReaderTools.prototype.toSender = function (senderNode) {
            var sender = senderNode.childNodes[0].nodeValue;
            var senderType = new message.Sender();
            var senderId = senderNode.getAttribute("id");
            var senderID = new commonreferences.ID(senderId);
            senderType.setId(senderID);
            return senderType;
        };
        Sdmx20StructureReaderTools.prototype.toNames = function (node) {
            var names = [];
            var senderNames = this.searchNodeName("Name", node.childNodes);
            for (var i = 0; i < senderNames.length; i++) {
                names.push(this.toName(senderNames[i]));
            }
            return names;
        };
        Sdmx20StructureReaderTools.prototype.toName = function (node) {
            var lang = node.getAttribute("xml:lang");
            var text = node.childNodes[0].nodeValue;
            var name = new common.Name(lang, text);
            return name;
        };
        Sdmx20StructureReaderTools.prototype.toDescriptions = function (node) {
            var names = [];
            var senderNames = this.searchNodeName("Description", node.childNodes);
            for (var i = 0; i < senderNames.length; i++) {
                names.push(this.toDescription(senderNames[i]));
            }
            return names;
        };
        Sdmx20StructureReaderTools.prototype.toDescription = function (node) {
            var lang = node.getAttribute("xml:lang");
            var text = node.childNodes[0].nodeValue;
            var desc = new common.Description(lang, text);
            return desc;
        };
        Sdmx20StructureReaderTools.prototype.toTextType = function (node) {
            var lang = node.getAttribute("xml:lang");
            var text = node.childNodes[0].nodeValue;
            var textType = new common.TextType(lang, text);
            return textType;
        };
        Sdmx20StructureReaderTools.prototype.toPartyType = function (node) {
            var pt = new message.PartyType();
            return pt;
        };
        Sdmx20StructureReaderTools.prototype.toCodelists = function (codelistsNode) {
            if (codelistsNode == null)
                return null;
            var codelists = new structure.CodeLists();
            var codes = this.searchNodeName("CodeList", codelistsNode.childNodes);
            for (var i = 0; i < codes.length; i++) {
                codelists.getCodelists().push(this.toCodelist(codes[i]));
            }
            return codelists;
        };
        Sdmx20StructureReaderTools.prototype.toID = function (node) {
            if (node == null)
                return null;
            return new commonreferences.ID(node.getAttribute("id"));
        };
        Sdmx20StructureReaderTools.prototype.toNestedNCNameID = function (node) {
            if (node == null)
                return null;
            return new commonreferences.NestedNCNameID(node.getAttribute("agencyID"));
        };
        Sdmx20StructureReaderTools.prototype.toCodelist = function (codelistNode) {
            var cl = new structure.Codelist();
            cl.setNames(this.toNames(codelistNode));
            cl.setId(this.toID(codelistNode));
            cl.setAgencyID(this.toNestedNCNameID(codelistNode));
            var codeNodes = this.searchNodeName("Code", codelistNode.childNodes);
            for (var i = 0; i < codeNodes.length; i++) {
                cl.getItems().push(this.toCode(codeNodes[i]));
            }
            alert(JSON.stringify(cl));
            return cl;
        };
        Sdmx20StructureReaderTools.prototype.toCode = function (codeNode) {
            var c = new structure.CodeType();
            c.setDescriptions(this.toDescriptions(codeNode));
            c.setId(this.toValue(codeNode));
            return c;
        };
        Sdmx20StructureReaderTools.prototype.toValue = function (codeNode) {
            if (codeNode == null)
                return null;
            var id = codeNode.getAttribute("value");
            return new commonreferences.ID(id);
        };
        Sdmx20StructureReaderTools.prototype.toConcepts = function (conceptsNode) {
            return null;
        };
        Sdmx20StructureReaderTools.prototype.toKeyFamilies = function (keyFamiliesNode) {
            return null;
        };
        Sdmx20StructureReaderTools.prototype.getStructureType = function () {
            return this.struct;
        };
        Sdmx20StructureReaderTools.prototype.myLoop = function (x) {
            var i, y, xLen, txt;
            txt = "";
            x = x.childNodes;
            xLen = x.length;
            for (i = 0; i < xLen; i++) {
                y = x[i];
                if (y.nodeType != 3) {
                    if (y.childNodes[0] != undefined) {
                        txt += this.myLoop(y);
                    }
                }
                else {
                    txt += y.nodeValue + "<br>";
                }
            }
            return txt;
        };
        Sdmx20StructureReaderTools.prototype.myLoop2 = function (x) {
            var i, y, xLen, txt;
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
                }
                else {
                    txt += y.nodeValue + "<br>";
                }
            }
            return txt;
        };
        Sdmx20StructureReaderTools.prototype.findNodeName = function (s, childNodes) {
            for (var i = 0; i < childNodes.length; i++) {
                var nn = childNodes[i].nodeName;
                //alert("looking for:"+s+": name="+childNodes[i].nodeName);
                if (nn.indexOf(s) != -1) {
                    //alert("found node:"+s);
                    return childNodes[i];
                }
            }
            alert("not found node:" + s);
            return null;
        };
        Sdmx20StructureReaderTools.prototype.searchNodeName = function (s, childNodes) {
            var result = [];
            for (var i = 0; i < childNodes.length; i++) {
                var nn = childNodes[i].nodeName;
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
        };
        Sdmx20StructureReaderTools.prototype.findTextNode = function (node) {
            if (node == null)
                return "";
            var childNodes = node.childNodes;
            for (var i = 0; i < childNodes.length; i++) {
                var nodeType = childNodes[i].nodeType;
                if (nodeType == 3) {
                    return childNodes[i].nodeValue;
                }
            }
            return "";
        };
        return Sdmx20StructureReaderTools;
    })();
    exports.Sdmx20StructureReaderTools = Sdmx20StructureReaderTools;
});

//# sourceMappingURL=sdmx20.js.map
