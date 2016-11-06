define("sdmx/sdmx20", ["require", "exports", "sdmx/commonreferences", "sdmx/structure", "sdmx/message", "sdmx/registry", "sdmx/xml", "sdmx/common", "sdmx/data", "sdmx"], function (require, exports, commonreferences, structure, message, registry, xml, common, data, sdmx) {
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
            return 2.0;
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
        Sdmx20StructureParser.prototype.isData = function (input) {
            if (input.indexOf("CompactData") != -1 && input.indexOf("http://www.SDMX.org/resources/SDMXML/schemas/v2_0/message") != -1) {
                return true;
            }
            if (input.indexOf("MessageGroup") != -1 && input.indexOf("http://www.SDMX.org/resources/SDMXML/schemas/v2_0/message") != -1) {
                return true;
            }
            else
                return false;
        };
        Sdmx20StructureParser.prototype.isMetadata = function (header) {
            return false;
        };
        Sdmx20StructureParser.prototype.parseStructureWithRegistry = function (input, reg) {
            var srt = new Sdmx20StructureReaderTools(input, reg);
            return srt.getStructureType();
        };
        Sdmx20StructureParser.prototype.parseStructure = function (input) {
            var srt = new Sdmx20StructureReaderTools(input, null);
            return srt.getStructureType();
        };
        Sdmx20StructureParser.prototype.parseData = function (input) {
            var parser = new Sdmx20DataReaderTools(input);
            return parser.getDataMessage();
        };
        return Sdmx20StructureParser;
    })();
    exports.Sdmx20StructureParser = Sdmx20StructureParser;
    var Sdmx20DataReaderTools = (function () {
        function Sdmx20DataReaderTools(s) {
            this.msg = null;
            this.dw = new data.FlatDataSetWriter();
            //console.log("sdmx20 parsing data");
            var dom = parseXml(s);
            //console.log("sdmx20 creating DataMessage");
            this.msg = this.toDataMessage(dom.documentElement);
        }
        Sdmx20DataReaderTools.prototype.getDataMessage = function () { return this.msg; };
        Sdmx20DataReaderTools.prototype.toDataMessage = function (dm) {
            var msg = new message.DataMessage();
            var childNodes = dm.childNodes;
            msg.setHeader(this.toHeader(this.findNodeName("Header", childNodes)));
            var dss = this.toDataSets(this.searchNodeName("DataSet", childNodes));
            for (var i = 0; i < dss.length; i++) {
                msg.addDataSet(dss[i]);
            }
            return msg;
        };
        Sdmx20DataReaderTools.prototype.toDataSets = function (dm) {
            var dss = [];
            for (var i = 0; i < dm.length; i++) {
                dss.push(this.toDataSet(dm[i].childNodes));
            }
            return dss;
        };
        Sdmx20DataReaderTools.prototype.toDataSet = function (ds) {
            this.dw.newDataSet();
            var series = this.searchNodeName("Series", ds);
            if (series.length == 0) {
                var obsArray = this.searchNodeName("Obs", ds);
                for (var i = 0; i < obsArray.length; i++) {
                    this.dw.newObservation();
                    var atts = obsArray[i].attributes;
                    for (var av = 0; av < atts.length; av++) {
                        this.dw.writeObservationComponent(atts[av].nodeName, atts[av].value);
                    }
                    this.dw.finishObservation();
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
        Sdmx20DataReaderTools.prototype.toHeader = function (headerNode) {
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
        Sdmx20DataReaderTools.prototype.toSender = function (senderNode) {
            //var sender: string = senderNode.childNodes[0].nodeValue;
            var senderType = new message.Sender();
            var senderId = senderNode.getAttribute("id");
            var senderID = new commonreferences.ID(senderId);
            senderType.setId(senderID);
            return senderType;
        };
        Sdmx20DataReaderTools.prototype.toNames = function (node) {
            var names = [];
            var senderNames = this.searchNodeName("Name", node.childNodes);
            for (var i = 0; i < senderNames.length; i++) {
                names.push(this.toName(senderNames[i]));
            }
            return names;
        };
        Sdmx20DataReaderTools.prototype.toName = function (node) {
            var lang = node.getAttribute("xml:lang");
            var text = node.childNodes[0].nodeValue;
            var name = new common.Name(lang, text);
            sdmx.SdmxIO.registerLanguage(lang);
            return name;
        };
        Sdmx20DataReaderTools.prototype.toDescriptions = function (node) {
            var names = [];
            var senderNames = this.searchNodeName("Description", node.childNodes);
            for (var i = 0; i < senderNames.length; i++) {
                names.push(this.toDescription(senderNames[i]));
            }
            return names;
        };
        Sdmx20DataReaderTools.prototype.toDescription = function (node) {
            var lang = node.getAttribute("xml:lang");
            var text = node.childNodes[0].nodeValue;
            var desc = new common.Description(lang, text);
            sdmx.SdmxIO.registerLanguage(lang);
            return desc;
        };
        Sdmx20DataReaderTools.prototype.toTextType = function (node) {
            var lang = node.getAttribute("xml:lang");
            var text = node.childNodes[0].nodeValue;
            var textType = new common.TextType(lang, text);
            sdmx.SdmxIO.registerLanguage(lang);
            return textType;
        };
        Sdmx20DataReaderTools.prototype.toPartyType = function (node) {
            var pt = new message.PartyType();
            return pt;
        };
        Sdmx20DataReaderTools.prototype.findNodeName = function (s, childNodes) {
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
        Sdmx20DataReaderTools.prototype.searchNodeName = function (s, childNodes) {
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
        Sdmx20DataReaderTools.prototype.findTextNode = function (node) {
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
        Sdmx20DataReaderTools.prototype.recurseDomChildren = function (start, output) {
            var nodes;
            if (start.childNodes) {
                nodes = start.childNodes;
                this.loopNodeChildren(nodes, output);
            }
        };
        Sdmx20DataReaderTools.prototype.loopNodeChildren = function (nodes, output) {
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
        Sdmx20DataReaderTools.prototype.outputNode = function (node) {
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
        return Sdmx20DataReaderTools;
    })();
    exports.Sdmx20DataReaderTools = Sdmx20DataReaderTools;
    var Sdmx20StructureReaderTools = (function () {
        function Sdmx20StructureReaderTools(s, reg) {
            this.registry = null;
            this.struct = null;
            this.currentKeyFamilyAgency = null;
            this.registry = reg;
            var dom = parseXml(s);
            this.struct = this.toStructureType(dom.documentElement);
        }
        Sdmx20StructureReaderTools.prototype.toStructureType = function (structureNode) {
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
            structures.setCodeLists(this.toCodelists(this.findNodeName("CodeLists", childNodes)));
            structures.setConcepts(this.toConcepts(this.findNodeName("Concepts", childNodes)));
            structures.setDataStructures(this.toKeyFamilies(this.findNodeName("KeyFamilies", childNodes)));
            structures.setDataflows(this.toDataflows(null));
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
            return header;
        };
        Sdmx20StructureReaderTools.prototype.toSender = function (senderNode) {
            if (senderNode == null || senderNode.childNodes == null)
                return null;
            //var sender: string = senderNode.childNodes[0].nodeValue;
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
            sdmx.SdmxIO.registerLanguage(lang);
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
            if (node.childNodes.length == 0) {
                // <structure:Description xml:lang="en" />
                return new common.Description(lang, "");
            }
            var text = node.childNodes[0].nodeValue;
            var desc = new common.Description(lang, text);
            sdmx.SdmxIO.registerLanguage(lang);
            return desc;
        };
        Sdmx20StructureReaderTools.prototype.toCodeNames = function (node) {
            var names = [];
            var senderNames = this.searchNodeName("Description", node.childNodes);
            for (var i = 0; i < senderNames.length; i++) {
                names.push(this.toCodeName(senderNames[i]));
            }
            return names;
        };
        Sdmx20StructureReaderTools.prototype.toCodeName = function (node) {
            var lang = node.getAttribute("xml:lang");
            if (node.childNodes.length == 0) {
                // <structure:Description xml:lang="en" />
                return new common.Name(lang, "");
            }
            var text = node.childNodes[0].nodeValue;
            var name = new common.Name(lang, text);
            sdmx.SdmxIO.registerLanguage(lang);
            return name;
        };
        Sdmx20StructureReaderTools.prototype.toTextType = function (node) {
            var lang = node.getAttribute("xml:lang");
            var text = node.childNodes[0].nodeValue;
            var textType = new common.TextType(lang, text);
            sdmx.SdmxIO.registerLanguage(lang);
            return textType;
        };
        Sdmx20StructureReaderTools.prototype.toPartyType = function (node) {
            var pt = new message.PartyType();
            return pt;
        };
        Sdmx20StructureReaderTools.prototype.toDataflows = function (dataflowsNode) {
            var dl = new structure.DataflowList();
            return dl;
        };
        Sdmx20StructureReaderTools.prototype.toDataflow = function (dataflowNode) {
            var df = new structure.Dataflow();
            df.setNames(this.toNames(dataflowNode));
            df.setId(this.toID(dataflowNode));
            df.setAgencyId(this.toNestedNCNameID(dataflowNode));
            df.setVersion(this.toVersion(dataflowNode));
            return df;
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
        Sdmx20StructureReaderTools.prototype.toVersion = function (node) {
            if (node == null)
                return null;
            if (node.getAttribute("version") == "" || node.getAttribute("version") == null) {
                return commonreferences.Version.ONE;
            }
            return new commonreferences.Version(node.getAttribute("version"));
        };
        Sdmx20StructureReaderTools.prototype.toCodelist = function (codelistNode) {
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
        Sdmx20StructureReaderTools.prototype.toCode = function (codeNode) {
            var c = new structure.CodeType();
            // Codes in SDMX 2.1 have Names, not Descriptions.. here we change the
            // description to a name instead.
            //c.setDescriptions(this.toDescriptions(codeNode));
            c.setNames(this.toCodeNames(codeNode));
            c.setId(this.toValue(codeNode));
            if (codeNode.getAttribute("parentCode") != null) {
                var ref = new commonreferences.Ref();
                ref.setMaintainableParentId(new commonreferences.ID(codeNode.getAttribute("parentCode")));
                var reference = new commonreferences.Reference(ref, null);
                c.setParent(reference);
            }
            return c;
        };
        Sdmx20StructureReaderTools.prototype.getParentCode = function (codeNode) {
            var id = codeNode.getAttribute("parentCode");
            if (id == null) {
                return null;
            }
            else {
                return new commonreferences.ID(id);
            }
        };
        Sdmx20StructureReaderTools.prototype.toValue = function (codeNode) {
            if (codeNode == null)
                return null;
            var id = codeNode.getAttribute("value");
            return new commonreferences.ID(id);
        };
        Sdmx20StructureReaderTools.prototype.toConcepts = function (conceptsNode) {
            if (conceptsNode == null)
                return null;
            var concepts = new structure.Concepts();
            this.struct.getStructures().setConcepts(concepts);
            var csNodes = this.searchNodeName("ConceptScheme", conceptsNode.childNodes);
            for (var i = 0; i < csNodes.length; i++) {
                concepts.getConceptSchemes().push(this.toConceptScheme(csNodes[i]));
            }
            if (csNodes.length == 0) {
                var conNodes = this.searchNodeName("Concept", conceptsNode.childNodes);
                for (var i = 0; i < conNodes.length; i++) {
                    var conceptScheme = this.findStandaloneConceptScheme(this.toNestedNCNameID(conNodes[i]));
                    this.toConcept(conceptScheme, conNodes[i]);
                }
            }
            return concepts;
        };
        Sdmx20StructureReaderTools.prototype.findStandaloneConceptScheme = function (ag) {
            var ref = new commonreferences.Ref();
            ref.setAgencyId(ag);
            ref.setMaintainableParentId(new commonreferences.ID("STANDALONE_CONCEPT_SCHEME"));
            ref.setVersion(null);
            var reference = new commonreferences.Reference(ref, null);
            var cs = this.struct.findConceptScheme(reference);
            if (cs == null) {
                cs = new structure.ConceptSchemeType();
                cs.setAgencyId(ag);
                cs.setId(new commonreferences.ID("STANDALONE_CONCEPT_SCHEME"));
                cs.setVersion(commonreferences.Version.ONE);
                var name = new common.Name("en", "Standalone Concept Scheme");
                cs.setNames([name]);
                this.struct.getStructures().getConcepts().getConceptSchemes().push(cs);
            }
            return cs;
        };
        Sdmx20StructureReaderTools.prototype.toConceptScheme = function (conceptSchemeNode) {
            if (conceptSchemeNode == null)
                return null;
            var cs = new structure.ConceptSchemeType();
            cs.setNames(this.toNames(conceptSchemeNode));
            cs.setAgencyId(this.toNestedNCNameID(conceptSchemeNode));
            cs.setId(this.toID(conceptSchemeNode));
            cs.setVersion(this.toVersion(conceptSchemeNode));
            var conceptNodes = this.searchNodeName("Concept", conceptSchemeNode.childNodes);
            for (var i = 0; i < conceptNodes.length; i++) {
                this.toConcept(cs, conceptNodes[i]);
            }
            return cs;
        };
        Sdmx20StructureReaderTools.prototype.toConcept = function (conceptScheme, conceptNode) {
            if (conceptNode == null) {
                return null;
            }
            var con = new structure.ConceptType();
            con.setNames(this.toNames(conceptNode));
            con.setDescriptions(this.toDescriptions(conceptNode));
            con.setId(this.toID(conceptNode));
            conceptScheme.getItems().push(con);
        };
        Sdmx20StructureReaderTools.prototype.toKeyFamilies = function (keyFamiliesNode) {
            if (keyFamiliesNode == null)
                return null;
            var dst = new structure.DataStructures();
            var kfNodes = this.searchNodeName("KeyFamily", keyFamiliesNode.childNodes);
            for (var i = 0; i < kfNodes.length; i++) {
                dst.getDataStructures().push(this.toDataStructure(kfNodes[i]));
            }
            return dst;
        };
        Sdmx20StructureReaderTools.prototype.toDataStructure = function (keyFamilyNode) {
            var dst = new structure.DataStructure();
            dst.setNames(this.toNames(keyFamilyNode));
            dst.setId(this.toID(keyFamilyNode));
            this.currentKeyFamilyAgency = keyFamilyNode.getAttribute("agencyID");
            dst.setAgencyId(this.toNestedNCNameID(keyFamilyNode));
            dst.setVersion(this.toVersion(keyFamilyNode));
            dst.setDataStructureComponents(this.toDataStructureComponents(this.findNodeName("Components", keyFamilyNode.childNodes)));
            //this.recurseDomChildren(keyFamilyNode, true);
            return dst;
        };
        Sdmx20StructureReaderTools.prototype.toDataStructureComponents = function (dsc) {
            if (dsc == null)
                return null;
            var components = new structure.DataStructureComponents();
            var dimensions = this.searchNodeName("Dimension", dsc.childNodes);
            var timedimension = this.findNodeName("TimeDimension", dsc.childNodes);
            // TimeDimension gets stuck in dimensions sometimes :)
            collections.arrays.remove(dimensions, timedimension);
            var primaryMeasure = this.findNodeName("PrimaryMeasure", dsc.childNodes);
            var attributes = this.searchNodeName("Attribute", dsc.childNodes);
            components.setDimensionList(this.toDimensionList(dimensions));
            if (timedimension != null) {
                this.toTimeDimension(components, timedimension);
            }
            this.toPrimaryMeasure(components, primaryMeasure);
            components.setAttributeList(this.toAttributeList(attributes));
            /*
            for (var i: number = 0; i < dimensions.length; i++) {
                this.recurseDomChildren(dimensions[i].childNodes, true);
            }
            this.recurseDomChildren(timedimension.childNodes, true);
            this.recurseDomChildren(primaryMeasure.childNodes, true);
            for (var i: number = 0; i < attributes.length; i++) {
                this.recurseDomChildren(attributes[i].childNodes, true);
            }
            */
            return components;
        };
        Sdmx20StructureReaderTools.prototype.toDimensionList = function (dims) {
            var dimList = new structure.DimensionList();
            var dimArray = [];
            for (var i = 0; i < dims.length; i++) {
                if (dims[i].getAttribute("isMeasureDimension") == "true") {
                    dimList.setMeasureDimension(this.toMeasureDimension(dims[i]));
                }
                else {
                    // Sometimes Time Dimension seems to get mistakenly sucked
                    // into this list too :(
                    if (dims[i].nodeName.indexOf("TimeDimension") == -1) {
                        dimArray.push(this.toDimension(dims[i]));
                    }
                }
            }
            dimList.setDimensions(dimArray);
            return dimList;
        };
        Sdmx20StructureReaderTools.prototype.toAttributeList = function (dims) {
            var dimList = new structure.AttributeList();
            var dimArray = [];
            for (var i = 0; i < dims.length; i++) {
                dimArray.push(this.toAttribute(dims[i]));
            }
            dimList.setAttributes(dimArray);
            return dimList;
        };
        Sdmx20StructureReaderTools.prototype.toTimeDimension = function (comps, dim) {
            var dim2 = new structure.TimeDimension();
            var cs = this.getConceptScheme(dim);
            var cl = this.getCodelist(dim);
            var con = this.getConcept(cs, dim);
            if (dim.getAttribute("conceptRef") != null) {
                dim2.setId(new commonreferences.ID(dim.getAttribute("conceptRef")));
            }
            if (con != null) {
                var ref = new commonreferences.Ref();
                ref.setAgencyId(cs.getAgencyId());
                ref.setMaintainableParentId(cs.getId());
                ref.setVersion(cs.getVersion());
                ref.setId(con.getId());
                var reference = new commonreferences.Reference(ref, null);
                dim2.setConceptIdentity(reference);
            }
            if (cl != null) {
                var ttf = this.toTextFormatType(this.findNodeName("TextFormat", dim.childNodes));
                dim2.setLocalRepresentation(this.toLocalRepresentation(cl, ttf));
            }
            else {
                var ttf = this.toTextFormatType(this.findNodeName("TextFormat", dim.childNodes));
                dim2.setLocalRepresentation(this.toLocalRepresentation(null, ttf));
            }
            comps.getDimensionList().setTimeDimension(dim2);
        };
        Sdmx20StructureReaderTools.prototype.toPrimaryMeasure = function (comps, dim) {
            var dim2 = new structure.PrimaryMeasure();
            var cs = this.getConceptScheme(dim);
            var cl = this.getCodelist(dim);
            var con = this.getConcept(cs, dim);
            if (dim.getAttribute("conceptRef") != null) {
                dim2.setId(new commonreferences.ID(dim.getAttribute("conceptRef")));
            }
            if (con != null) {
                var ref = new commonreferences.Ref();
                ref.setAgencyId(cs.getAgencyId());
                ref.setMaintainableParentId(cs.getId());
                ref.setVersion(cs.getVersion());
                ref.setId(con.getId());
                var reference = new commonreferences.Reference(ref, null);
                dim2.setConceptIdentity(reference);
            }
            else {
                alert("con is null cs=" + JSON.stringify(cs) + "con=" + JSON.stringify(con));
            }
            if (cl != null) {
                var ttf = this.toTextFormatType(this.findNodeName("TextFormat", dim.childNodes));
                dim2.setLocalRepresentation(this.toLocalRepresentation(cl, ttf));
            }
            else {
                var ttf = this.toTextFormatType(this.findNodeName("TextFormat", dim.childNodes));
                dim2.setLocalRepresentation(this.toLocalRepresentation(null, ttf));
            }
            comps.getMeasureList().setPrimaryMeasure(dim2);
        };
        Sdmx20StructureReaderTools.prototype.toDimension = function (dim) {
            var dim2 = new structure.Dimension();
            var cs = this.getConceptScheme(dim);
            var cl = this.getCodelist(dim);
            var con = this.getConcept(cs, dim);
            if (dim.getAttribute("conceptRef") != null) {
                dim2.setId(new commonreferences.ID(dim.getAttribute("conceptRef")));
            }
            if (con != null) {
                var ref = new commonreferences.Ref();
                ref.setAgencyId(cs.getAgencyId());
                ref.setMaintainableParentId(cs.getId());
                ref.setVersion(cs.getVersion());
                ref.setId(con.getId());
                var reference = new commonreferences.Reference(ref, null);
                dim2.setConceptIdentity(reference);
            }
            if (cl != null) {
                var ttf = this.toTextFormatType(this.findNodeName("TextFormat", dim.childNodes));
                dim2.setLocalRepresentation(this.toLocalRepresentation(cl, ttf));
            }
            else {
                var ttf = this.toTextFormatType(this.findNodeName("TextFormat", dim.childNodes));
                dim2.setLocalRepresentation(this.toLocalRepresentation(null, ttf));
            }
            return dim2;
        };
        Sdmx20StructureReaderTools.prototype.toAttribute = function (dim) {
            var dim2 = new structure.Attribute();
            var cs = this.getConceptScheme(dim);
            var cl = this.getCodelist(dim);
            var con = this.getConcept(cs, dim);
            if (dim.getAttribute("conceptRef") != null) {
                dim2.setId(new commonreferences.ID(dim.getAttribute("conceptRef")));
            }
            if (con != null) {
                var ref = new commonreferences.Ref();
                ref.setAgencyId(cs.getAgencyId());
                ref.setMaintainableParentId(cs.getId());
                ref.setVersion(cs.getVersion());
                ref.setId(con.getId());
                var reference = new commonreferences.Reference(ref, null);
                dim2.setConceptIdentity(reference);
            }
            if (cl != null) {
                var ttf = this.toTextFormatType(this.findNodeName("TextFormat", dim.childNodes));
                dim2.setLocalRepresentation(this.toLocalRepresentation(cl, ttf));
            }
            else {
                var ttf = this.toTextFormatType(this.findNodeName("TextFormat", dim.childNodes));
                dim2.setLocalRepresentation(this.toLocalRepresentation(null, ttf));
            }
            return dim2;
        };
        Sdmx20StructureReaderTools.prototype.toTextFormatType = function (tft) {
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
        Sdmx20StructureReaderTools.prototype.toLocalRepresentation = function (codelist, ttf) {
            var lr2 = new structure.RepresentationType();
            lr2.setTextFormat(ttf);
            if (codelist != null) {
                var ref = new commonreferences.Ref();
                ref.setAgencyId(codelist.getAgencyId());
                ref.setMaintainableParentId(codelist.getId());
                ref.setVersion(codelist.getVersion());
                var reference = new commonreferences.Reference(ref, null);
                reference.setPack(commonreferences.PackageTypeCodelistType.CODELIST);
                reference.setRefClass(commonreferences.ObjectTypeCodelistType.CODELIST);
                lr2.setEnumeration(reference);
            }
            return lr2;
        };
        Sdmx20StructureReaderTools.prototype.toLocalRepresentationConceptScheme = function (conceptScheme, ttf) {
            var lr2 = new structure.RepresentationType();
            lr2.setTextFormat(ttf);
            if (conceptScheme != null) {
                var ref = new commonreferences.Ref();
                ref.setAgencyId(conceptScheme.getAgencyId());
                ref.setMaintainableParentId(conceptScheme.getId());
                ref.setVersion(conceptScheme.getVersion());
                var reference = new commonreferences.Reference(ref, null);
                reference.setPack(commonreferences.PackageTypeCodelistType.CONCEPTSCHEME);
                reference.setRefClass(commonreferences.ObjectTypeCodelistType.CONCEPTSCHEME);
                lr2.setEnumeration(reference);
            }
            return lr2;
        };
        Sdmx20StructureReaderTools.prototype.getCodelist = function (dim) {
            if (dim.getAttribute("codelist") == null) {
                return null;
            }
            var code = null;
            if (dim.getAttribute("codelistAgency") == null && dim.getAttribute("codelistVersion") == null) {
                // All we have is a codelist name
                var ref = new commonreferences.Ref();
                ref.setAgencyId(new commonreferences.NestedNCNameID(this.currentKeyFamilyAgency));
                ref.setMaintainableParentId(new commonreferences.ID(dim.getAttribute("codelist")));
                ref.setVersion(null);
                var reference = new commonreferences.Reference(ref, null);
                code = this.registry.findCodelist(reference);
            }
            else if (dim.getAttribute("codelistAgency") != null && dim.getAttribute("codelistVersion") != null) {
                var ref = new commonreferences.Ref();
                ref.setAgencyId(new commonreferences.NestedNCNameID(dim.getAttribute("codelistAgency")));
                ref.setMaintainableParentId(new commonreferences.ID(dim.getAttribute("codelist")));
                ref.setVersion(new commonreferences.Version(dim.getAttribute("codelistVersion")));
                var reference = new commonreferences.Reference(ref, null);
                code = this.registry.findCodelist(reference);
            }
            else if (dim.getAttribute("codelistAgency") != null && dim.getAttribute("codelistVersion") == null) {
                var ref = new commonreferences.Ref();
                ref.setAgencyId(new commonreferences.NestedNCNameID(dim.getAttribute("codelistAgency")));
                ref.setMaintainableParentId(new commonreferences.ID(dim.getAttribute("codelist")));
                ref.setVersion(null);
                var reference = new commonreferences.Reference(ref, null);
                code = this.registry.findCodelist(reference);
            }
            return code;
        };
        Sdmx20StructureReaderTools.prototype.getConceptScheme = function (dim) {
            if ((dim.getAttribute("conceptSchemeAgency") != null || dim.getAttribute("conceptAgency") != null) && dim.getAttribute("conceptSchemeRef") != null && dim.getAttribute("conceptRef") != null) {
                var csa = new commonreferences.NestedNCNameID(dim.getAttribute("conceptSchemeAgency") == null ? dim.getAttribute("conceptAgency") : dim.getAttribute("conceptSchemeAgency"));
                var csi = new commonreferences.ID(dim.getAttribute("conceptSchemeRef"));
                var vers = dim.getAttribute("conceptVersion") == null ? null : new commonreferences.Version(dim.getAttribute("conceptVersion"));
                var csref = new commonreferences.Ref();
                csref.setAgencyId(csa);
                csref.setMaintainableParentId(csi);
                csref.setVersion(vers);
                var reference = new commonreferences.Reference(csref, null);
                var cst = null;
                cst = this.struct.findConceptScheme(reference);
                if (cst != null)
                    return cst;
                cst = this.registry.findConceptScheme(reference);
                if (cst != null)
                    return cst;
            }
            else if (dim.getAttribute("conceptSchemeRef") != null && dim.getAttribute("conceptRef") != null) {
                var csa = new commonreferences.NestedNCNameID(this.currentKeyFamilyAgency);
                var csi = new commonreferences.ID(dim.getAttribute("conceptSchemeRef"));
                var vers = dim.getAttribute("conceptVersion") == null ? null : new commonreferences.Version(dim.getAttribute("conceptVersion"));
                var csref = new commonreferences.Ref();
                csref.setAgencyId(csa);
                csref.setMaintainableParentId(csi);
                csref.setVersion(vers);
                var reference = new commonreferences.Reference(csref, null);
                var cst = null;
                cst = this.struct.findConceptScheme(reference);
                if (cst != null)
                    return cst;
                cst = this.registry.findConceptScheme(reference);
                if (cst != null)
                    return cst;
            }
            else if (dim.getAttribute("conceptRef") != null && dim.getAttribute("conceptAgency") == null) {
                var csa = new commonreferences.NestedNCNameID(this.currentKeyFamilyAgency);
                var csi = new commonreferences.ID("STANDALONE_CONCEPT_SCHEME");
                var vers = dim.getAttribute("conceptVersion") == null ? null : new commonreferences.Version(dim.getAttribute("conceptVersion"));
                var csref = new commonreferences.Ref();
                csref.setAgencyId(csa);
                csref.setMaintainableParentId(csi);
                csref.setVersion(vers);
                var reference = new commonreferences.Reference(csref, null);
                var cst = null;
                cst = this.struct.findConceptScheme(reference);
                if (cst != null) {
                    if (cst.findItemString(dim.getAttribute("conceptRef")) != null) {
                        return cst;
                    }
                    else {
                    }
                }
                cst = this.registry.findConceptScheme(reference);
                if (cst != null) {
                    if (cst.findItemString(dim.getAttribute("conceptRef")) != null) {
                        return cst;
                    }
                    else {
                    }
                }
                // 
                // This is a trick for ABS SDMX Documents, which have
                // a Primary Measure and all it has is a conceptRef of "OBS_VALUE"
                // this points to a Primary Measure Concept that belongs to the OECD Agency :(
                // this code looks through the structure's conceptschemes, and finds a concept
                // in the document that has the same ID as the conceptRef..
                // this is really all i can do with this situation :(
                var css = this.struct.getStructures().getConcepts().getConceptSchemes();
                for (var i = 0; i < css.length; i++) {
                    for (var j = 0; j < css[i].size(); j++) {
                        var concept = css[i].getItem(j);
                        if (concept.getId().equalsString(dim.getAttribute("conceptRef"))) {
                            return css[i];
                        }
                    }
                }
                alert("Can't find concept scheme for concept: " + dim.getAttribute("conceptRef"));
                return null;
            }
            else if (dim.getAttribute("conceptRef")() != null && dim.getAttribute("conceptAgency") != null) {
                var csa = new commonreferences.NestedNCNameID(dim.getAttribute("conceptAgency"));
                var csi = new commonreferences.ID("STANDALONE_CONCEPT_SCHEME");
                var ref = new commonreferences.Ref();
                ref.setAgencyId(csa);
                ref.setId(csi);
                ref.setVersion(commonreferences.Version.ONE);
                var ref2 = new commonreferences.Reference(ref, null);
                var cst = null;
                cst = this.struct.findConceptScheme(ref2);
                if (cst != null)
                    return cst;
                cst = this.registry.findConceptScheme(ref2);
                if (cst != null)
                    return cst;
            }
            if (dim.getAttribute("conceptRef") != null) {
                // 
                // This is a trick for ABS SDMX Documents, which have
                // a Primary Measure and all it has is a conceptRef of "OBS_VALUE"
                // this points to a Primary Measure Concept that belongs to the OECD Agency :(
                var css = this.struct.getStructures().getConcepts().getConceptSchemes();
                for (var i = 0; i < css.length; i++) {
                    for (var j = 0; j < css[i].size(); j++) {
                        var concept = css[i].getItem(j);
                        if (concept.getId().equalsString(dim.getAttribute("conceptRef"))) {
                            return css[i];
                        }
                    }
                }
                alert("Can't find concept scheme for concept: " + dim.getAttribute("conceptRef"));
                return null;
            }
            alert("Falling through getConceptScheme");
            return null;
        };
        Sdmx20StructureReaderTools.prototype.getConcept = function (cs, dim) {
            if (cs != null) {
                var concept = cs.findItemString(dim.getAttribute("conceptRef"));
                return concept;
            }
            else
                return null;
        };
        Sdmx20StructureReaderTools.prototype.findConcept = function (conceptRef) {
            var csa = new commonreferences.NestedNCNameID(this.currentKeyFamilyAgency);
            var csi = new commonreferences.ID(conceptRef);
            var ref = new commonreferences.Ref();
            ref.setAgencyId(csa);
            ref.setId(csi);
            var reference = new commonreferences.Reference(ref, null);
            var ct = this.registry.findConcept(reference);
            if (ct == null) {
                var ref2 = new commonreferences.Ref();
                ref2.setId(csi);
                var reference2 = new commonreferences.Reference(ref2, null);
                return this.registry.findConcept(reference2);
            }
            return ct;
        };
        Sdmx20StructureReaderTools.prototype.toMeasureDimension = function (dim) {
            var dim2 = new structure.MeasureDimension();
            var cs = this.getConceptScheme(dim);
            var cl = this.getCodelist(dim);
            var con = this.getConcept(cs, dim);
            if (dim.getAttribute("conceptRef") != null) {
                dim2.setId(new commonreferences.ID(dim.getAttribute("conceptRef")));
            }
            if (con != null) {
                var ref = new commonreferences.Ref();
                ref.setAgencyId(cs.getAgencyId());
                ref.setMaintainableParentId(cs.getId());
                ref.setVersion(cs.getVersion());
                ref.setId(con.getId());
                var reference = new commonreferences.Reference(ref, null);
                dim2.setConceptIdentity(reference);
            }
            // Sdmx 2.1 files have concept schemes
            // for cross sectional measures...
            var createdConceptScheme = new structure.ConceptSchemeType();
            createdConceptScheme.setAgencyId(cl.getAgencyId());
            createdConceptScheme.setId(cl.getId());
            createdConceptScheme.setVersion(cl.getVersion());
            createdConceptScheme.setNames(cl.getNames());
            createdConceptScheme.setDescriptions(cl.getDescriptions());
            for (var i = 0; i < cl.size(); i++) {
                var code = cl.getItem(i);
                var concept = new structure.ConceptType();
                concept.setId(code.getId());
                concept.setParent(code.getParent());
                concept.setURN(code.getURN());
                concept.setURI(code.getURI());
                concept.setNames(code.getNames());
                concept.setDescriptions(code.getDescriptions());
                concept.setAnnotations(code.getAnnotations());
                createdConceptScheme.addItem(concept);
            }
            if (this.struct.getStructures().getConcepts() == null) {
                this.struct.getStructures().setConcepts(new structure.Concepts());
            }
            this.struct.getStructures().getConcepts().getConceptSchemes().push(createdConceptScheme);
            if (cl != null) {
                var ttf = this.toTextFormatType(this.findNodeName("TextFormat", dim.childNodes));
                dim2.setLocalRepresentation(this.toLocalRepresentationConceptScheme(cl, ttf));
            }
            else {
                var ttf = this.toTextFormatType(this.findNodeName("TextFormat", dim.childNodes));
                dim2.setLocalRepresentation(this.toLocalRepresentation(null, ttf));
            }
            return dim2;
        };
        Sdmx20StructureReaderTools.prototype.getStructureType = function () {
            return this.struct;
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
            //console.log("can't find node:"+s);
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
        Sdmx20StructureReaderTools.prototype.recurseDomChildren = function (start, output) {
            var nodes;
            if (start.childNodes) {
                nodes = start.childNodes;
                this.loopNodeChildren(nodes, output);
            }
        };
        Sdmx20StructureReaderTools.prototype.loopNodeChildren = function (nodes, output) {
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
        Sdmx20StructureReaderTools.prototype.outputNode = function (node) {
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
        return Sdmx20StructureReaderTools;
    })();
    exports.Sdmx20StructureReaderTools = Sdmx20StructureReaderTools;
});

//# sourceMappingURL=sdmx20.js.map
