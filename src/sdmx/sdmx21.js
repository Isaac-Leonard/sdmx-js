define("sdmx/sdmx21", ["require", "exports", "sdmx/commonreferences", "sdmx/structure", "sdmx/message", "sdmx/registry", "sdmx/xml", "sdmx/common", "sdmx/data", "sdmx"], function (require, exports, commonreferences, structure, message, registry, xml, common, data, sdmx) {
    "use strict";
    function parseXml(s) {
        var parseXml;
        parseXml = new DOMParser();
        var xmlDoc = parseXml.parseFromString(s, "text/xml");
        return xmlDoc;
    }
    exports.parseXml = parseXml;
    var Sdmx21StructureParser = (function () {
        function Sdmx21StructureParser() {
        }
        Sdmx21StructureParser.prototype.getVersionIdentifier = function () {
            return 2.1;
        };
        Sdmx21StructureParser.prototype.canParse = function (input) {
            if (input == null)
                return false;
            if (this.isStructure(input))
                return true;
            if (this.isData(input))
                return true;
        };
        Sdmx21StructureParser.prototype.isStructure = function (input) {
            if (input.indexOf("Structure") != -1 && input.indexOf("http://www.sdmx.org/resources/sdmxml/schemas/v2_1/message") != -1) {
                return true;
            }
            else
                return false;
        };
        Sdmx21StructureParser.prototype.isData = function (input) {
            if (this.isStructureSpecificData(input)) {
                return true;
            }
            else if (this.isGenericData(input)) {
                return true;
            }
            else
                return false;
        };
        Sdmx21StructureParser.prototype.isGenericData = function (input) {
            if (input.indexOf("GenericData") != -1 && input.indexOf("http://www.sdmx.org/resources/sdmxml/schemas/v2_1/message") != -1) {
                return true;
            }
            else
                return false;
        };
        Sdmx21StructureParser.prototype.isStructureSpecificData = function (input) {
            if (input.indexOf("StructureSpecificData") != -1 && input.indexOf("http://www.sdmx.org/resources/sdmxml/schemas/v2_1/message") != -1) {
                return true;
            }
            else
                return false;
        };
        Sdmx21StructureParser.prototype.isMetadata = function (header) {
            return false;
        };
        Sdmx21StructureParser.prototype.parseStructureWithRegistry = function (input, reg) {
            var srt = new Sdmx21StructureReaderTools(input, reg);
            return srt.getStructureType();
        };
        Sdmx21StructureParser.prototype.parseStructure = function (input) {
            var srt = new Sdmx21StructureReaderTools(input, null);
            return srt.getStructureType();
        };
        Sdmx21StructureParser.prototype.parseData = function (input) {
            if (this.isGenericData(input)) {
                var parser = new Sdmx21GenericDataReaderTools(input);
                return parser.getDataMessage();
            }
            else if (this.isStructureSpecificData(input)) {
                var parser2 = new Sdmx21StructureSpecificDataReaderTools(input);
                return parser2.getDataMessage();
            }
        };
        return Sdmx21StructureParser;
    }());
    exports.Sdmx21StructureParser = Sdmx21StructureParser;
    var Sdmx21StructureSpecificDataReaderTools = (function () {
        function Sdmx21StructureSpecificDataReaderTools(s) {
            this.msg = null;
            this.dw = new data.FlatDataSetWriter();
            //console.log("sdmx20 parsing data");
            var dom = parseXml(s);
            //console.log("sdmx20 creating DataMessage");
            this.msg = this.toDataMessage(dom.documentElement);
        }
        Sdmx21StructureSpecificDataReaderTools.prototype.getDataMessage = function () { return this.msg; };
        Sdmx21StructureSpecificDataReaderTools.prototype.toDataMessage = function (dm) {
            var msg = new message.DataMessage();
            var childNodes = dm.childNodes;
            msg.setHeader(this.toHeader(this.findNodeName("Header", childNodes)));
            var dss = this.toDataSets(this.searchNodeName("DataSet", childNodes));
            for (var i = 0; i < dss.length; i++) {
                msg.addDataSet(dss[i]);
            }
            return msg;
        };
        Sdmx21StructureSpecificDataReaderTools.prototype.toDataSets = function (dm) {
            var dss = [];
            for (var i = 0; i < dm.length; i++) {
                dss.push(this.toDataSet(dm[i].childNodes));
            }
            return dss;
        };
        Sdmx21StructureSpecificDataReaderTools.prototype.toDataSet = function (ds) {
            this.dw.newDataSet();
            var series = this.searchNodeName("Series", ds);
            if (series.length == 0) {
                var obsArray = this.searchNodeName("Obs", ds);
                for (var i = 0; i < obsArray.length; i++) {
                    this.dw.newObservation();
                    var atts = obsArray[i].attributes;
                }
            }
            else {
                for (var i = 0; i < series.length; i++) {
                    this.dw.newSeries();
                    var satts = series[i].attributes;
                    for (var av = 0; av < satts.length; av++) {
                        this.dw.writeSeriesComponent(satts[av].nodeName, satts[av].value);
                    }
                    var obsArray = this.searchNodeName("Obs", series[i].childNodes);
                    for (var j = 0; j < obsArray.length; j++) {
                        this.dw.newObservation();
                        var atts = obsArray[j].attributes;
                        for (var av = 0; av < atts.length; av++) {
                            this.dw.writeObservationComponent(atts[av].nodeName, atts[av].value);
                        }
                        this.dw.finishObservation();
                    }
                    this.dw.finishSeries();
                }
            }
            return this.dw.finishDataSet();
        };
        Sdmx21StructureSpecificDataReaderTools.prototype.toHeader = function (headerNode) {
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
            return header;
        };
        Sdmx21StructureSpecificDataReaderTools.prototype.toSender = function (senderNode) {
            var sender = senderNode.childNodes[0].nodeValue;
            var senderType = new message.Sender();
            var senderId = senderNode.getAttribute("id");
            var senderID = new commonreferences.ID(senderId);
            senderType.setId(senderID);
            return senderType;
        };
        Sdmx21StructureSpecificDataReaderTools.prototype.toNames = function (node) {
            var names = [];
            var senderNames = this.searchNodeName("Name", node.childNodes);
            for (var i = 0; i < senderNames.length; i++) {
                names.push(this.toName(senderNames[i]));
            }
            return names;
        };
        Sdmx21StructureSpecificDataReaderTools.prototype.toName = function (node) {
            var lang = node.getAttribute("xml:lang");
            var text = node.childNodes[0].nodeValue;
            var name = new common.Name(lang, text);
            return name;
        };
        Sdmx21StructureSpecificDataReaderTools.prototype.toDescriptions = function (node) {
            var names = [];
            var senderNames = this.searchNodeName("Description", node.childNodes);
            for (var i = 0; i < senderNames.length; i++) {
                names.push(this.toDescription(senderNames[i]));
            }
            return names;
        };
        Sdmx21StructureSpecificDataReaderTools.prototype.toDescription = function (node) {
            var lang = node.getAttribute("xml:lang");
            var text = node.childNodes[0].nodeValue;
            var desc = new common.Description(lang, text);
            return desc;
        };
        Sdmx21StructureSpecificDataReaderTools.prototype.toTextType = function (node) {
            var lang = node.getAttribute("xml:lang");
            var text = node.childNodes[0].nodeValue;
            var textType = new common.TextType(lang, text);
            return textType;
        };
        Sdmx21StructureSpecificDataReaderTools.prototype.toPartyType = function (node) {
            var pt = new message.PartyType();
            return pt;
        };
        Sdmx21StructureSpecificDataReaderTools.prototype.findNodeName = function (s, childNodes) {
            for (var i = 0; i < childNodes.length; i++) {
                var nn = childNodes[i].nodeName;
                //alert("looking for:"+s+": name="+childNodes[i].nodeName);
                if (nn.indexOf(s) != -1) {
                    //alert("found node:"+s);
                    return childNodes[i];
                }
            }
            return null;
        };
        Sdmx21StructureSpecificDataReaderTools.prototype.searchNodeName = function (s, childNodes) {
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
            }
            return result;
        };
        Sdmx21StructureSpecificDataReaderTools.prototype.findTextNode = function (node) {
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
        Sdmx21StructureSpecificDataReaderTools.prototype.recurseDomChildren = function (start, output) {
            var nodes;
            if (start.childNodes) {
                nodes = start.childNodes;
                this.loopNodeChildren(nodes, output);
            }
        };
        Sdmx21StructureSpecificDataReaderTools.prototype.loopNodeChildren = function (nodes, output) {
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
        Sdmx21StructureSpecificDataReaderTools.prototype.outputNode = function (node) {
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
        return Sdmx21StructureSpecificDataReaderTools;
    }());
    exports.Sdmx21StructureSpecificDataReaderTools = Sdmx21StructureSpecificDataReaderTools;
    var Sdmx21GenericDataReaderTools = (function () {
        function Sdmx21GenericDataReaderTools(s) {
            this.msg = null;
            this.dw = new data.FlatDataSetWriter();
            this.dimensionAtObservation = "TIME_PERIOD";
            //console.log("sdmx20 parsing data");
            var dom = parseXml(s);
            //console.log("sdmx20 creating DataMessage");
            this.msg = this.toDataMessage(dom.documentElement);
        }
        Sdmx21GenericDataReaderTools.prototype.getDataMessage = function () { return this.msg; };
        Sdmx21GenericDataReaderTools.prototype.toDataMessage = function (dm) {
            var msg = new message.DataMessage();
            var childNodes = dm.childNodes;
            msg.setHeader(this.toHeader(this.findNodeName("Header", childNodes)));
            var dss = this.toDataSets(this.searchNodeName("DataSet", childNodes));
            for (var i = 0; i < dss.length; i++) {
                msg.addDataSet(dss[i]);
            }
            return msg;
        };
        Sdmx21GenericDataReaderTools.prototype.toDataSets = function (dm) {
            var dss = [];
            for (var i = 0; i < dm.length; i++) {
                dss.push(this.toDataSet(dm[i].childNodes));
            }
            return dss;
        };
        Sdmx21GenericDataReaderTools.prototype.toDataSet = function (ds) {
            this.dw.newDataSet();
            var series = this.searchNodeName("Series", ds);
            if (series.length == 0) {
                var obsArray = this.searchNodeName("Obs", ds);
                for (var i = 0; i < obsArray.length; i++) {
                    this.dw.newObservation();
                    var atts = obsArray[i].attributes;
                }
            }
            else {
                for (var i = 0; i < series.length; i++) {
                    this.dw.newSeries();
                    var satts = series[i].attributes;
                    var seriesKeysNode = this.findNodeName("SeriesKey", series[i].childNodes);
                    var keyNodes = this.searchNodeName("Value", seriesKeysNode.childNodes);
                    for (var av = 0; av < keyNodes.length; av++) {
                        this.dw.writeSeriesComponent(keyNodes[av].getAttribute("id"), keyNodes[av].getAttribute("value"));
                    }
                    var obsArray = this.searchNodeName("Obs", series[i].childNodes);
                    for (var j = 0; j < obsArray.length; j++) {
                        this.dw.newObservation();
                        var obsDimensionNode = this.findNodeName("ObsDimension", obsArray[j].childNodes);
                        this.dw.writeObservationComponent(this.dimensionAtObservation, obsDimensionNode.getAttribute("value"));
                        var obsValueNode = this.findNodeName("ObsValue", obsArray[j].childNodes);
                        // "OBS_VALUE is hard coded into SDMX 2.1
                        this.dw.writeObservationComponent("OBS_VALUE", obsValueNode.getAttribute("value"));
                        var attNode = this.findNodeName("Attributes", obsArray[j].childNodes);
                        if (attNode != null) {
                            var attNodes = this.searchNodeName("Value", attNode.childNodes);
                            for (var av = 0; av < attNodes.length; av++) {
                                this.dw.writeObservationComponent(attNodes[av].getAttribute("id"), attNodes[av].getAttribute("value"));
                            }
                        }
                        this.dw.finishObservation();
                    }
                    this.dw.finishSeries();
                }
            }
            return this.dw.finishDataSet();
        };
        Sdmx21GenericDataReaderTools.prototype.toHeader = function (headerNode) {
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
            header.setStructures([this.toStructure(this.findNodeName("Structure", headerNode.childNodes))]);
            return header;
        };
        Sdmx21GenericDataReaderTools.prototype.toStructure = function (structureNode) {
            this.dimensionAtObservation = structureNode.getAttribute("dimensionAtObservation");
            var refNode = this.findNodeName("Ref", structureNode.childNodes);
            var ref = new commonreferences.Ref();
            ref.setMaintainableParentId(this.toID(refNode));
            ref.setAgencyId(this.toNestedNCNameID(refNode));
            ref.setVersion(this.toVersion(refNode));
            var reference = new commonreferences.Reference(ref, null);
            var payload = new common.PayloadStructureType();
            payload.setStructure(reference);
            return payload;
        };
        Sdmx21GenericDataReaderTools.prototype.toSender = function (senderNode) {
            var sender = senderNode.childNodes[0].nodeValue;
            var senderType = new message.Sender();
            var senderId = senderNode.getAttribute("id");
            var senderID = new commonreferences.ID(senderId);
            senderType.setId(senderID);
            return senderType;
        };
        Sdmx21GenericDataReaderTools.prototype.toNames = function (node) {
            var names = [];
            var senderNames = this.searchNodeName("Name", node.childNodes);
            for (var i = 0; i < senderNames.length; i++) {
                names.push(this.toName(senderNames[i]));
            }
            return names;
        };
        Sdmx21GenericDataReaderTools.prototype.toName = function (node) {
            var lang = node.getAttribute("xml:lang");
            var text = node.childNodes[0].nodeValue;
            var name = new common.Name(lang, text);
            return name;
        };
        Sdmx21GenericDataReaderTools.prototype.toDescriptions = function (node) {
            var names = [];
            var senderNames = this.searchNodeName("Description", node.childNodes);
            for (var i = 0; i < senderNames.length; i++) {
                names.push(this.toDescription(senderNames[i]));
            }
            return names;
        };
        Sdmx21GenericDataReaderTools.prototype.toDescription = function (node) {
            var lang = node.getAttribute("xml:lang");
            var text = node.childNodes[0].nodeValue;
            var desc = new common.Description(lang, text);
            return desc;
        };
        Sdmx21GenericDataReaderTools.prototype.toTextType = function (node) {
            var lang = node.getAttribute("xml:lang");
            var text = node.childNodes[0].nodeValue;
            var textType = new common.TextType(lang, text);
            return textType;
        };
        Sdmx21GenericDataReaderTools.prototype.toPartyType = function (node) {
            var pt = new message.PartyType();
            return pt;
        };
        Sdmx21GenericDataReaderTools.prototype.findNodeName = function (s, childNodes) {
            for (var i = 0; i < childNodes.length; i++) {
                var nn = childNodes[i].nodeName;
                //alert("looking for:"+s+": name="+childNodes[i].nodeName);
                if (nn.indexOf(s) != -1) {
                    //alert("found node:"+s);
                    return childNodes[i];
                }
            }
            return null;
        };
        Sdmx21GenericDataReaderTools.prototype.searchNodeName = function (s, childNodes) {
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
            }
            return result;
        };
        Sdmx21GenericDataReaderTools.prototype.findTextNode = function (node) {
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
        Sdmx21GenericDataReaderTools.prototype.recurseDomChildren = function (start, output) {
            var nodes;
            if (start.childNodes) {
                nodes = start.childNodes;
                this.loopNodeChildren(nodes, output);
            }
        };
        Sdmx21GenericDataReaderTools.prototype.loopNodeChildren = function (nodes, output) {
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
        Sdmx21GenericDataReaderTools.prototype.outputNode = function (node) {
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
        Sdmx21GenericDataReaderTools.prototype.toID = function (node) {
            if (node == null)
                return null;
            return new commonreferences.ID(node.getAttribute("id"));
        };
        Sdmx21GenericDataReaderTools.prototype.toMaintainableParentID = function (node) {
            if (node == null)
                return null;
            return new commonreferences.ID(node.getAttribute("maintainableParentID"));
        };
        Sdmx21GenericDataReaderTools.prototype.toNestedID = function (node) {
            if (node == null)
                return null;
            return new commonreferences.NestedID(node.getAttribute("id"));
        };
        Sdmx21GenericDataReaderTools.prototype.toNestedNCNameID = function (node) {
            if (node == null)
                return null;
            return new commonreferences.NestedNCNameID(node.getAttribute("agencyID"));
        };
        Sdmx21GenericDataReaderTools.prototype.toVersion = function (node) {
            if (node == null)
                return null;
            if (node.getAttribute("version") == "" || node.getAttribute("version") == null) {
                return commonreferences.Version.ONE;
            }
            return new commonreferences.Version(node.getAttribute("version"));
        };
        return Sdmx21GenericDataReaderTools;
    }());
    exports.Sdmx21GenericDataReaderTools = Sdmx21GenericDataReaderTools;
    var Sdmx21StructureReaderTools = (function () {
        function Sdmx21StructureReaderTools(s, reg) {
            this.registry = null;
            this.struct = null;
            this.currentKeyFamilyAgency = null;
            this.registry = reg;
            var dom = parseXml(s);
            this.struct = this.toStructureType(dom.documentElement);
        }
        Sdmx21StructureReaderTools.prototype.toStructureType = function (structureNode) {
            this.struct = new message.StructureType();
            var structures = new structure.Structures();
            this.struct.setStructures(structures);
            if (this.registry == null) {
                this.registry = this.struct;
            }
            else {
                this.registry = new registry.DoubleRegistry(this.registry, this.struct);
            }
            var childNodes = structureNode.childNodes;
            this.struct.setHeader(this.toHeader(this.findNodeName("Header", childNodes)));
            var structuresNode = this.findNodeName("Structures", childNodes);
            childNodes = structuresNode.childNodes;
            structures.setCodeLists(this.toCodelists(this.findNodeName("Codelists", childNodes)));
            structures.setConcepts(this.toConcepts(this.findNodeName("Concepts", childNodes)));
            structures.setDataStructures(this.toDataStructures(this.findNodeName("DataStructures", childNodes)));
            structures.setDataflows(this.toDataflows(this.findNodeName("Dataflows", childNodes)));
            return this.struct;
        };
        Sdmx21StructureReaderTools.prototype.toHeader = function (headerNode) {
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
            var receivers = [];
            for (var i = 0; i < this.searchNodeName("Receiver", headerNode.childNodes).length; i++) {
                receivers.push(this.toReceiver(this.searchNodeName("Receiver", headerNode.childNodes)[i]));
            }
            header.setReceivers(receivers);
            return header;
        };
        Sdmx21StructureReaderTools.prototype.toSender = function (senderNode) {
            //var sender: string = senderNode.childNodes[0].nodeValue;
            var senderType = new message.Sender();
            var senderId = senderNode.getAttribute("id");
            var senderID = new commonreferences.ID(senderId);
            senderType.setId(senderID);
            return senderType;
        };
        Sdmx21StructureReaderTools.prototype.toReceiver = function (receiverNode) {
            //var sender: string = receiverNode.childNodes[0].nodeValue;
            var receiverType = new message.PartyType();
            var senderId = receiverNode.getAttribute("id");
            var senderID = new commonreferences.ID(senderId);
            receiverType.setId(senderID);
            return receiverType;
        };
        Sdmx21StructureReaderTools.prototype.toNames = function (node) {
            var names = [];
            var senderNames = this.searchNodeName("Name", node.childNodes);
            for (var i = 0; i < senderNames.length; i++) {
                names.push(this.toName(senderNames[i]));
            }
            return names;
        };
        Sdmx21StructureReaderTools.prototype.toName = function (node) {
            var lang = node.getAttribute("xml:lang");
            var text = node.childNodes[0].nodeValue;
            var name = new common.Name(lang, text);
            sdmx.SdmxIO.registerLanguage(lang);
            return name;
        };
        Sdmx21StructureReaderTools.prototype.toDescriptions = function (node) {
            var names = [];
            var senderNames = this.searchNodeName("Description", node.childNodes);
            for (var i = 0; i < senderNames.length; i++) {
                names.push(this.toDescription(senderNames[i]));
            }
            return names;
        };
        Sdmx21StructureReaderTools.prototype.toDescription = function (node) {
            var lang = node.getAttribute("xml:lang");
            if (node.childNodes.length == 0) {
                // <structure:Description xml:lang="en" />
                return new common.Description(lang, "");
            }
            var text = node.childNodes[0].nodeValue;
            var desc = new common.Description(lang, text);
            sdmx.SdmxIO.registerLanguage(lang);
            return desc;
        };
        Sdmx21StructureReaderTools.prototype.toTextType = function (node) {
            var lang = node.getAttribute("xml:lang");
            var text = node.childNodes[0].nodeValue;
            var textType = new common.TextType(lang, text);
            sdmx.SdmxIO.registerLanguage(lang);
            return textType;
        };
        Sdmx21StructureReaderTools.prototype.toPartyType = function (node) {
            var pt = new message.PartyType();
            return pt;
        };
        Sdmx21StructureReaderTools.prototype.toDataflows = function (dataflowsNode) {
            if (dataflowsNode == null)
                return null;
            var dl = new structure.DataflowList();
            var dfs = this.searchNodeName("Dataflow", dataflowsNode.childNodes);
            var dataflows = [];
            for (var i = 0; i < dfs.length; i++) {
                dataflows.push(this.toDataflow(dfs[i]));
            }
            dl.setDataflowList(dataflows);
            return dl;
        };
        Sdmx21StructureReaderTools.prototype.toDataflow = function (dataflowNode) {
            var df = new structure.Dataflow();
            df.setNames(this.toNames(dataflowNode));
            df.setId(this.toID(dataflowNode));
            df.setAgencyId(this.toNestedNCNameID(dataflowNode));
            df.setVersion(this.toVersion(dataflowNode));
            var struct = this.findNodeName("Structure", dataflowNode.childNodes);
            var refNode = this.findNodeName("Ref", struct.childNodes);
            var ref = new commonreferences.Ref();
            ref.setAgencyId(this.toNestedNCNameID(refNode));
            ref.setMaintainableParentId(this.toID(refNode));
            ref.setVersion(this.toVersion(refNode));
            var reference = new commonreferences.Reference(ref, null);
            df.setStructure(reference);
            return df;
        };
        Sdmx21StructureReaderTools.prototype.toCodelists = function (codelistsNode) {
            if (codelistsNode == null)
                return null;
            var codelists = new structure.CodeLists();
            var codes = this.searchNodeName("Codelist", codelistsNode.childNodes);
            for (var i = 0; i < codes.length; i++) {
                codelists.getCodelists().push(this.toCodelist(codes[i]));
            }
            return codelists;
        };
        Sdmx21StructureReaderTools.prototype.toID = function (node) {
            if (node == null)
                return null;
            return new commonreferences.ID(node.getAttribute("id"));
        };
        Sdmx21StructureReaderTools.prototype.toMaintainableParentID = function (node) {
            if (node == null)
                return null;
            return new commonreferences.ID(node.getAttribute("maintainableParentID"));
        };
        Sdmx21StructureReaderTools.prototype.toNestedID = function (node) {
            if (node == null)
                return null;
            return new commonreferences.NestedID(node.getAttribute("id"));
        };
        Sdmx21StructureReaderTools.prototype.toNestedNCNameID = function (node) {
            if (node == null)
                return null;
            return new commonreferences.NestedNCNameID(node.getAttribute("agencyID"));
        };
        Sdmx21StructureReaderTools.prototype.toVersion = function (node) {
            if (node == null)
                return null;
            if (node.getAttribute("version") == "" || node.getAttribute("version") == null) {
                return commonreferences.Version.ONE;
            }
            return new commonreferences.Version(node.getAttribute("version"));
        };
        Sdmx21StructureReaderTools.prototype.toCodelist = function (codelistNode) {
            var cl = new structure.Codelist();
            cl.setNames(this.toNames(codelistNode));
            cl.setId(this.toID(codelistNode));
            cl.setAgencyId(this.toNestedNCNameID(codelistNode));
            cl.setVersion(this.toVersion(codelistNode));
            var codeNodes = this.searchNodeName("Code", codelistNode.childNodes);
            for (var i = 0; i < codeNodes.length; i++) {
                cl.getItems().push(this.toCode(codeNodes[i]));
            }
            return cl;
        };
        Sdmx21StructureReaderTools.prototype.toCode = function (codeNode) {
            var c = new structure.CodeType();
            c.setNames(this.toNames(codeNode));
            c.setDescriptions(this.toDescriptions(codeNode));
            c.setId(this.toID(codeNode));
            if (codeNode.getAttribute("parentCode") != null) {
                var ref = new commonreferences.Ref();
                ref.setMaintainableParentId(new commonreferences.ID(codeNode.getAttribute("parentCode")));
                var reference = new commonreferences.Reference(ref, null);
                c.setParent(reference);
            }
            return c;
        };
        Sdmx21StructureReaderTools.prototype.getParentCode = function (codeNode) {
            var id = codeNode.getAttribute("parentCode");
            if (id == null) {
                return null;
            }
            else {
                return new commonreferences.ID(id);
            }
        };
        Sdmx21StructureReaderTools.prototype.toValue = function (codeNode) {
            if (codeNode == null)
                return null;
            var id = codeNode.getAttribute("value");
            return new commonreferences.ID(id);
        };
        Sdmx21StructureReaderTools.prototype.toConcepts = function (conceptsNode) {
            if (conceptsNode == null)
                return null;
            var concepts = new structure.Concepts();
            this.struct.getStructures().setConcepts(concepts);
            var conNodes = this.searchNodeName("ConceptScheme", conceptsNode.childNodes);
            var conceptSchemes = [];
            for (var i = 0; i < conNodes.length; i++) {
                conceptSchemes.push(this.toConceptScheme(conNodes[i]));
            }
            concepts.setConceptSchemes(conceptSchemes);
            return concepts;
        };
        Sdmx21StructureReaderTools.prototype.toConceptScheme = function (conceptSchemeNode) {
            if (conceptSchemeNode == null)
                return null;
            var cs = new structure.ConceptSchemeType();
            cs.setNames(this.toNames(conceptSchemeNode));
            cs.setId(this.toID(conceptSchemeNode));
            cs.setAgencyId(this.toNestedNCNameID(conceptSchemeNode));
            cs.setVersion(this.toVersion(conceptSchemeNode));
            var conNodes = this.searchNodeName("Concept", conceptSchemeNode.childNodes);
            var concepts = [];
            for (var i = 0; i < conNodes.length; i++) {
                cs.getItems().push(this.toConcept(conNodes[i]));
            }
            return cs;
        };
        Sdmx21StructureReaderTools.prototype.toConcept = function (conceptNode) {
            var c = new structure.ConceptType();
            c.setURN(conceptNode.getAttribute("urn"));
            c.setId(this.toID(conceptNode));
            c.setNames(this.toNames(conceptNode));
            c.setDescriptions(this.toDescriptions(conceptNode));
            return c;
        };
        Sdmx21StructureReaderTools.prototype.toDataStructures = function (dsNode) {
            if (dsNode == null)
                return null;
            var dst = new structure.DataStructures();
            var dsNodes = this.searchNodeName("DataStructure", dsNode.childNodes);
            for (var i = 0; i < dsNodes.length; i++) {
                dst.getDataStructures().push(this.toDataStructure(dsNodes[i]));
            }
            return dst;
        };
        Sdmx21StructureReaderTools.prototype.toDataStructure = function (dsNode) {
            var dst = new structure.DataStructure();
            dst.setNames(this.toNames(dsNode));
            dst.setId(this.toID(dsNode));
            dst.setVersion(this.toVersion(dsNode));
            dst.setFinal(dsNode.getAttribute("isFinal") == "true" ? true : false);
            this.currentKeyFamilyAgency = dsNode.getAttribute("agencyID");
            dst.setAgencyId(this.toNestedNCNameID(dsNode));
            dst.setVersion(this.toVersion(dsNode));
            dst.setDataStructureComponents(this.toDataStructureComponents(this.findNodeName("DataStructureComponents", dsNode.childNodes)));
            //this.recurseDomChildren(keyFamilyNode, true);
            return dst;
        };
        Sdmx21StructureReaderTools.prototype.toDataStructureComponents = function (dsc) {
            if (dsc == null)
                return null;
            var components = new structure.DataStructureComponents();
            var dimListNode = this.findNodeName("DimensionList", dsc.childNodes);
            var attListNode = this.findNodeName("AttributeList", dsc.childNodes);
            var measListNode = this.findNodeName("MeasureList", dsc.childNodes);
            components.setDimensionList(this.toDimensionList(dimListNode));
            components.setAttributeList(this.toAttributeList(this.searchNodeName("Attribute", attListNode.childNodes)));
            components.setMeasureList(this.toMeasureList(measListNode));
            return components;
        };
        Sdmx21StructureReaderTools.prototype.toMeasureList = function (measListNode) {
            var ml = new structure.MeasureList();
            var pm = this.findNodeName("PrimaryMeasure", measListNode.childNodes);
            var dim = this.toPrimaryMeasure(pm);
            ml.setPrimaryMeasure(dim);
            return ml;
        };
        Sdmx21StructureReaderTools.prototype.toDimensionList = function (dimListNode) {
            var dimensionList = new structure.DimensionList();
            var dimList = this.searchNodeName("Dimension", dimListNode.childNodes);
            var dimensions = [];
            for (var i = 0; i < dimList.length; i++) {
                if (dimList[i].nodeName.indexOf("TimeDimension") == -1) {
                    var dim = this.toDimension(dimList[i]);
                    dimensions.push(dim);
                }
            }
            dimensionList.setDimensions(dimensions);
            var time = this.findNodeName("TimeDimension", dimListNode.childNodes);
            dimensionList.setTimeDimension(this.toTimeDimension(time));
            var meas = this.findNodeName("MeasureDimension", dimListNode.childNodes);
            if (meas != null) {
                dimensionList.setMeasureDimension(this.toMeasureDimension(meas));
            }
            return dimensionList;
        };
        Sdmx21StructureReaderTools.prototype.toAttributeList = function (dims) {
            var dimList = new structure.AttributeList();
            var dimArray = [];
            for (var i = 0; i < dims.length; i++) {
                dimArray.push(this.toAttribute(dims[i]));
            }
            dimList.setAttributes(dimArray);
            return dimList;
        };
        Sdmx21StructureReaderTools.prototype.toAttribute = function (dim) {
            var dim2 = new structure.Attribute();
            dim2.setId(this.toID(dim));
            dim2.setConceptIdentity(this.getConceptIdentity(dim));
            dim2.setLocalRepresentation(this.getLocalRepresentation(dim));
            return dim2;
        };
        Sdmx21StructureReaderTools.prototype.toTimeDimension = function (dim) {
            var dim2 = new structure.TimeDimension();
            dim2.setId(this.toID(dim));
            dim2.setConceptIdentity(this.getConceptIdentity(dim));
            dim2.setLocalRepresentation(this.getLocalRepresentation(dim));
            return dim2;
        };
        Sdmx21StructureReaderTools.prototype.toMeasureDimension = function (dim) {
            var dim2 = new structure.MeasureDimension();
            dim2.setId(this.toID(dim));
            dim2.setConceptIdentity(this.getConceptIdentity(dim));
            dim2.setLocalRepresentation(this.getLocalRepresentationCrossSectional(dim));
            return dim2;
        };
        Sdmx21StructureReaderTools.prototype.toPrimaryMeasure = function (dim) {
            var dim2 = new structure.PrimaryMeasure();
            dim2.setId(this.toID(dim));
            dim2.setConceptIdentity(this.getConceptIdentity(dim));
            dim2.setLocalRepresentation(this.getLocalRepresentation(dim));
            return dim2;
        };
        Sdmx21StructureReaderTools.prototype.getLocalRepresentation = function (dim) {
            var localRepNode = this.findNodeName("LocalRepresentation", dim.childNodes);
            if (localRepNode == null) {
                return new structure.RepresentationType();
            }
            var enumeration = this.findNodeName("Enumeration", localRepNode.childNodes);
            if (enumeration != null) {
                var refNode = this.findNodeName("Ref", enumeration.childNodes);
                var ref = new commonreferences.Ref();
                ref.setMaintainableParentId(this.toID(refNode));
                ref.setAgencyId(this.toNestedNCNameID(refNode));
                ref.setVersion(this.toVersion(refNode));
                ref.setRefClass(commonreferences.ObjectTypeCodelistType.CODELIST);
                ref.setPackage(commonreferences.PackageTypeCodelistType.CODELIST);
                var reference = new commonreferences.Reference(ref, null);
                var rep = new structure.RepresentationType();
                rep.setEnumeration(reference);
            }
            return rep;
        };
        Sdmx21StructureReaderTools.prototype.getLocalRepresentationCrossSectional = function (dim) {
            var localRepNode = this.findNodeName("LocalRepresentation", dim.childNodes);
            if (localRepNode == null) {
                return new structure.RepresentationType();
            }
            var enumeration = this.findNodeName("Enumeration", localRepNode.childNodes);
            if (enumeration != null) {
                var refNode = this.findNodeName("Ref", enumeration.childNodes);
                var ref = new commonreferences.Ref();
                ref.setMaintainableParentId(this.toID(refNode));
                ref.setAgencyId(this.toNestedNCNameID(refNode));
                ref.setVersion(this.toVersion(refNode));
                ref.setRefClass(commonreferences.ObjectTypeCodelistType.CONCEPTSCHEME);
                var reference = new commonreferences.Reference(ref, null);
                var rep = new structure.RepresentationType();
                rep.setEnumeration(reference);
            }
            return rep;
        };
        Sdmx21StructureReaderTools.prototype.getConceptIdentity = function (dim) {
            var conceptIdentityNode = this.findNodeName("ConceptIdentity", dim.childNodes);
            var refNode = this.findNodeName("Ref", conceptIdentityNode.childNodes);
            var ref = new commonreferences.Ref();
            ref.setMaintainableParentId(this.toMaintainableParentID(refNode));
            ref.setId(this.toID(refNode));
            ref.setAgencyId(this.toNestedNCNameID(refNode));
            ref.setVersion(this.toVersion(refNode));
            var reference = new commonreferences.Reference(ref, null);
            return reference;
        };
        Sdmx21StructureReaderTools.prototype.toDimension = function (dim) {
            var dim2 = new structure.Dimension();
            dim2.setPosition(parseInt(dim.getAttribute("position")));
            dim2.setId(this.toID(dim));
            dim2.setConceptIdentity(this.getConceptIdentity(dim));
            dim2.setLocalRepresentation(this.getLocalRepresentation(dim));
            return dim2;
        };
        Sdmx21StructureReaderTools.prototype.toTextFormatType = function (tft) {
            if (tft == null) {
                return null;
            }
            var tft2 = new structure.TextFormatType();
            if (tft.getAttribute("decimals") != null) {
                tft2.setDecimals(parseInt(tft.getAttribute("decimals")));
            }
            if (tft.getAttribute("endValue") != null) {
                tft2.setEndValue(parseInt(tft.getAttribute("endValue")));
            }
            if (tft.getAttribute("isSequence") != null) {
                tft2.setIsSequence(tft.getAttribute("isSequence") == "true");
                if (tft.getAttribute("interval") != null) {
                    tft2.setInterval(parseInt(tft.getAttribute("interval")));
                }
            }
            if (tft.getAttribute("maxLength") != null) {
                tft2.setMaxLength(parseInt(tft.getAttribute("maxLength")));
            }
            if (tft.getAttribute("pattern") != null) {
                tft2.setPattern(tft.getAttribute("pattern"));
            }
            if (tft.getAttribute("startValue")) {
                tft2.setStartValue(parseInt(tft.getAttribute("startValue")));
            }
            if (tft.getAttribute("textType") != null) {
                tft2.setTextType(common.DataType.fromStringWithException(tft.getAttribute("textType")));
            }
            if (tft.getAttribute("timeInterval") != null) {
                // DO ME!!!!
                tft2.setTimeInterval(null);
            }
            return tft2;
        };
        Sdmx21StructureReaderTools.prototype.getStructureType = function () {
            return this.struct;
        };
        Sdmx21StructureReaderTools.prototype.findNodeName = function (s, childNodes) {
            for (var i = 0; i < childNodes.length; i++) {
                var nn = childNodes[i].nodeName;
                //alert("looking for:"+s+": name="+childNodes[i].nodeName);
                if (nn.indexOf(s) != -1) {
                    //alert("found node:"+s);
                    return childNodes[i];
                }
            }
            //console.log("can't find node:"+s);
            return null;
        };
        Sdmx21StructureReaderTools.prototype.searchNodeName = function (s, childNodes) {
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
            }
            return result;
        };
        Sdmx21StructureReaderTools.prototype.findTextNode = function (node) {
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
        Sdmx21StructureReaderTools.prototype.recurseDomChildren = function (start, output) {
            var nodes;
            if (start.childNodes) {
                nodes = start.childNodes;
                this.loopNodeChildren(nodes, output);
            }
        };
        Sdmx21StructureReaderTools.prototype.loopNodeChildren = function (nodes, output) {
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
        Sdmx21StructureReaderTools.prototype.outputNode = function (node) {
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
        return Sdmx21StructureReaderTools;
    }());
    exports.Sdmx21StructureReaderTools = Sdmx21StructureReaderTools;
});

//# sourceMappingURL=sdmx21.js.map
