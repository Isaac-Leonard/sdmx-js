var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("structure", ["require", "exports", "sdmx/common", "sdmx/commonreferences", "sdmx"], function (require, exports, common, commonreferences, sdmx) {
    var IdentifiableType = (function (_super) {
        __extends(IdentifiableType, _super);
        function IdentifiableType() {
            _super.call(this);
        }
        IdentifiableType.prototype.getId = function () { return this.id; };
        IdentifiableType.prototype.getURN = function () { return this.urn; };
        IdentifiableType.prototype.getURI = function () { return this.uri; };
        IdentifiableType.prototype.setId = function (id) {
            this.id = id;
        };
        IdentifiableType.prototype.setURN = function (urn) {
            this.urn = urn;
        };
        IdentifiableType.prototype.setURI = function (uri) {
            this.uri = uri;
        };
        IdentifiableType.prototype.identifiesMeId = function (oid) {
            if (this.id.equalsID(oid))
                return true;
            else
                return false;
        };
        IdentifiableType.prototype.identifiesMeString = function (oid) {
            if (this.id.equalsString(oid))
                return true;
            else
                return false;
        };
        IdentifiableType.prototype.identifiesMeNestedId = function (oid) {
            if (oid.equalsString(this.id.getString()))
                return true;
            else
                return false;
        };
        return IdentifiableType;
    })(common.AnnotableType);
    exports.IdentifiableType = IdentifiableType;
    var NameableType = (function (_super) {
        __extends(NameableType, _super);
        function NameableType() {
            _super.call(this);
            this.names = [];
            this.descriptions = [];
        }
        /**
         * @return the names
         */
        NameableType.prototype.getNames = function () {
            return this.names;
        };
        /**
         * @param names the names to set
         */
        NameableType.prototype.setNames = function (names1) {
            this.names = names1;
        };
        /**
         * @return the descriptions
         */
        NameableType.prototype.getDescriptions = function () {
            return this.descriptions;
        };
        /**
         * @param descriptions the descriptions to set
         */
        NameableType.prototype.setDescriptions = function (descriptions) {
            this.descriptions = descriptions;
        };
        NameableType.prototype.findName = function (lang) {
            if (this.names == null) {
                return null;
            }
            var def = null;
            for (var i = 0; i < this.names.length; i++) {
                if (lang != null && lang == this.names[i].getLang()) {
                    return this.names[i];
                }
                if (this.names[i].getLang() == null) {
                    def = this.names[i];
                }
            }
            if (def == null && "en" != lang) {
                def = this.findName("en");
            }
            return def;
        };
        NameableType.prototype.findDescription = function (lang) {
            if (this.descriptions == null) {
                return null;
            }
            var def = null;
            for (var i = 0; i < this.descriptions.length; i++) {
                if (lang != null && lang == this.descriptions[i].getLang()) {
                    return this.descriptions[i];
                }
                if (this.descriptions[i].getLang() == null) {
                    def = this.descriptions[i];
                }
            }
            if (def == null && "en" != lang) {
                def = this.findDescription("en");
            }
            return def;
        };
        NameableType.prototype.toString = function () {
            var loc = sdmx.SdmxIO.getLocale();
            var name = this.findName(loc);
            if (name != null) {
                return name.toString();
            }
            var desc = this.findDescription(loc);
            if (desc != null) {
                return desc.getText();
            }
            return "NameableType";
        };
        NameableType.prototype.getName = function () {
            if (sdmx.SdmxIO.isSanitiseNames()) {
                return NameableType.sanitise(NameableType.toString(this));
            }
            else {
                return NameableType.toString(this);
            }
        };
        NameableType.toString = function (named) {
            var loc = sdmx.SdmxIO.getLocale();
            if (named == null) {
                return "";
            }
            var desc = named.findDescription(loc);
            if (desc == null) {
                var name = named.findName(loc);
                if (name == null) {
                    return named.getId().toString();
                }
                return name.getText();
            }
            return desc.getText();
        };
        NameableType.toStringWithLocale = function (named, loc) {
            //if (concept.equals("FREQ")) {
            //    ItemType code2 = getCode();
            //    System.out.println("FREQ Code=" + code2);
            //}
            if (named == null) {
                return "";
            }
            var name = named.findName(loc);
            if (name == null) {
                var desc = named.findDescription(loc);
                if (desc == null) {
                    return named.getId().toString();
                }
                return desc.getText();
            }
            return name.getText();
        };
        NameableType.toIDString = function (named) {
            return named.getId().toString();
        };
        NameableType.sanitise = function (s) {
            if (s.indexOf("'") != -1) {
                s = s.replace("'", "&apos;");
            }
            if (s.indexOf("\"") != -1) {
                s = s.replace("\"", "&quot;");
            }
            return s;
        };
        return NameableType;
    })(IdentifiableType);
    exports.NameableType = NameableType;
    var ItemType = (function (_super) {
        __extends(ItemType, _super);
        function ItemType() {
            _super.apply(this, arguments);
            this.parent = null;
            this.items = new Array();
        }
        /**
         * @return the parent
         */
        ItemType.prototype.getParent = function () {
            return this.parent;
        };
        /**
         * @param parent the parent to set
         */
        ItemType.prototype.setParent = function (parent) {
            this.parent = parent;
        };
        /**
         * @return the items
         */
        ItemType.prototype.getItems = function () {
            return this.items;
        };
        /**
         * @param items the items to set
         */
        ItemType.prototype.setItems = function (items) {
            this.items = items;
        };
        ItemType.prototype.getItem = function (i) {
            return this.items[i];
        };
        ItemType.prototype.setItem = function (i, it) {
            this.items[i] = it;
        };
        ItemType.prototype.removeItem = function (it) {
            collections.arrays.remove(this.items, it);
        };
        ItemType.prototype.addItem = function (it) {
            this.items.push(it);
        };
        ItemType.prototype.size = function () {
            return this.items.length;
        };
        ItemType.prototype.findItemString = function (s) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].identifiesMeString(s))
                    return this.items[i];
            }
            return null;
        };
        ItemType.prototype.findItem = function (id) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].identifiesMeId(id))
                    return this.items[i];
            }
            return null;
        };
        return ItemType;
    })(NameableType);
    exports.ItemType = ItemType;
    var VersionableType = (function (_super) {
        __extends(VersionableType, _super);
        function VersionableType() {
            _super.call(this);
            this.version = commonreferences.Version.ONE;
            this.validFrom = null;
            this.validTo = null;
        }
        ;
        VersionableType.prototype.getVersion = function () {
            return this.version;
        };
        /**
         * @param version the version to set
         */
        VersionableType.prototype.setVersion = function (version) {
            this.version = version;
        };
        VersionableType.prototype.getValidFrom = function () {
            return this.validFrom;
        };
        VersionableType.prototype.setValidFrom = function (validFrom) {
            this.validFrom = validFrom;
        };
        VersionableType.prototype.getValidTo = function () {
            return this.validTo;
        };
        VersionableType.prototype.setValidTo = function (validTo) {
            this.validTo = validTo;
        };
        return VersionableType;
    })(NameableType);
    exports.VersionableType = VersionableType;
    var MaintainableType = (function (_super) {
        __extends(MaintainableType, _super);
        function MaintainableType() {
            _super.apply(this, arguments);
            this.agencyID = null;
            this.isfinal = null;
            this.isexternalReference = null;
            this.externalReferences = null;
        }
        /**
         * @return the agencyID
         */
        MaintainableType.prototype.getAgencyID = function () {
            return this.agencyID;
        };
        MaintainableType.prototype.setAgencyID = function (agencyID) {
            this.agencyID = agencyID;
        };
        MaintainableType.prototype.isFinal = function () {
            return this.isfinal;
        };
        MaintainableType.prototype.setFinal = function (isFinal) {
            this.isfinal = isFinal;
        };
        MaintainableType.prototype.isExternalReference = function () {
            return this.isexternalReference;
        };
        MaintainableType.prototype.setExternalReference = function (isExternalReference) {
            this.isexternalReference = isExternalReference;
        };
        MaintainableType.prototype.getExternalReferences = function () {
            return this.externalReferences;
        };
        MaintainableType.prototype.setExternalReferences = function (externalReferences) {
            this.externalReferences = externalReferences;
        };
        MaintainableType.prototype.identifiesMeStrings = function (agency2, id2, vers2) {
            return this.identifiesMe(new commonreferences.NestedNCNameID(agency2), new commonreferences.ID(id2), new commonreferences.Version(vers2));
        };
        MaintainableType.prototype.identifiesMe = function (agency2, id2, vers2) {
            //System.out.println("Left=" + this.agencyID + "." + this.getId() + "." + this.getVersion());
            //System.out.println("Right=" + agency2 + "." + id2 + "." + vers2);
            if (vers2 == null || this.getVersion() == null) {
                if (this.agencyID.equalsNestedNCNameID(agency2) && this.getId().equalsID(id2)) {
                    return true;
                }
                else {
                    //System.out.println("Doesn't Match!!");
                    return false;
                }
            }
            else {
                if (this.agencyID.equalsNestedNCNameID(agency2) && this.getId().equalsID(id2) && this.getVersion().equalsVersion(vers2)) {
                    return true;
                }
                else {
                    //System.out.println("Doesn't Match!!");
                    return false;
                }
            }
        };
        MaintainableType.prototype.identifiesMeURI = function (uri) {
            var ref = new commonreferences.Reference(null, uri);
            return this.identifiesMe(ref.getAgencyId(), ref.getMaintainableParentId(), ref.getVersion());
        };
        MaintainableType.prototype.asReference = function () {
            var ref = new commonreferences.Ref();
            ref.setAgencyId(this.agencyID);
            ref.setMaintainableParentId(this.getId());
            ref.setMaintainableParentVersion(this.getVersion());
            var reference = new commonreferences.Reference(ref, this.getURI());
            return reference;
        };
        return MaintainableType;
    })(VersionableType);
    exports.MaintainableType = MaintainableType;
    var ItemSchemeType = (function (_super) {
        __extends(ItemSchemeType, _super);
        function ItemSchemeType() {
            _super.call(this);
            this.items = new Array();
            this.partial = false;
        }
        /**
         * @return the items
         */
        ItemSchemeType.prototype.getItems = function () {
            return this.items;
        };
        /**
         * @param items the items to set
         */
        ItemSchemeType.prototype.setItems = function (itms) {
            this.items = itms;
        };
        /**
         * @return the partial
         */
        ItemSchemeType.prototype.isPartial = function () {
            return this.partial;
        };
        /**
         * @param partial the partial to set
         */
        ItemSchemeType.prototype.setPartial = function (partial) {
            this.partial = partial;
        };
        ItemSchemeType.prototype.getItem = function (i) {
            return this.items[i];
        };
        ItemSchemeType.prototype.setItem = function (i, it) {
            this.items[i] = it;
        };
        ItemSchemeType.prototype.removeItem = function (it) {
            this.items.splice(this.items.indexOf(it), 1);
        };
        ItemSchemeType.prototype.addItem = function (it) {
            this.items.push(it);
        };
        ItemSchemeType.prototype.size = function () {
            return this.items.length;
        };
        ItemSchemeType.prototype.findItemString = function (s) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].identifiesMeString(s))
                    return this.items[i];
            }
            return null;
        };
        ItemSchemeType.prototype.findItemId = function (s) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].identifiesMeId(s))
                    return this.items[i];
            }
            return null;
        };
        ItemSchemeType.prototype.findItemNestedId = function (s) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].identifiesMeNestedId(s))
                    return this.items[i];
            }
            return null;
        };
        ItemSchemeType.prototype.findSubItemsString = function (s) {
            return this.findSubItemsId(new commonreferences.ID(s));
        };
        ItemSchemeType.prototype.findSubItemsId = function (id) {
            var result = new Array();
            if (id == null) {
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    if (item.getParent() == null) {
                        result.push(item);
                    }
                }
                return result;
            }
            else {
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    if (item.getParent().getId().equalsID(id)) {
                        result.push(item);
                    }
                }
                return result;
            }
        };
        return ItemSchemeType;
    })(MaintainableType);
    exports.ItemSchemeType = ItemSchemeType;
    var CodeType = (function (_super) {
        __extends(CodeType, _super);
        function CodeType() {
            _super.apply(this, arguments);
        }
        return CodeType;
    })(ItemType);
    exports.CodeType = CodeType;
    var Codelist = (function (_super) {
        __extends(Codelist, _super);
        function Codelist() {
            _super.call(this);
        }
        return Codelist;
    })(ItemSchemeType);
    exports.Codelist = Codelist;
    var ConceptSchemeType = (function (_super) {
        __extends(ConceptSchemeType, _super);
        function ConceptSchemeType() {
            _super.apply(this, arguments);
        }
        return ConceptSchemeType;
    })(ItemSchemeType);
    exports.ConceptSchemeType = ConceptSchemeType;
    var ConceptType = (function (_super) {
        __extends(ConceptType, _super);
        function ConceptType() {
            _super.apply(this, arguments);
        }
        return ConceptType;
    })(ItemType);
    exports.ConceptType = ConceptType;
    var StructureUsageType = (function (_super) {
        __extends(StructureUsageType, _super);
        function StructureUsageType() {
            _super.call(this);
            this.structure = null;
        }
        StructureUsageType.prototype.getStructure = function () {
            return this.structure;
        };
        StructureUsageType.prototype.setStructure = function (struct) {
            this.structure = struct;
        };
        return StructureUsageType;
    })(MaintainableType);
    exports.StructureUsageType = StructureUsageType;
    var RepresentationType = (function () {
        function RepresentationType() {
        }
        return RepresentationType;
    })();
    exports.RepresentationType = RepresentationType;
    var Dataflow = (function (_super) {
        __extends(Dataflow, _super);
        function Dataflow() {
            _super.call(this);
        }
        return Dataflow;
    })(StructureUsageType);
    exports.Dataflow = Dataflow;
    var Component = (function (_super) {
        __extends(Component, _super);
        function Component() {
            _super.call(this);
            this.conceptIdentity = null;
            this.localRepresentation = null;
        }
        Component.prototype.getId = function () {
            if (_super.prototype.getId.call(this) == null) {
                if (this.conceptIdentity == null) {
                    //Thread.dumpStack();
                    return new commonreferences.ID("MISS");
                }
                return this.conceptIdentity.getId().asID();
            }
            return _super.prototype.getId.call(this);
        };
        Component.prototype.getConceptIdentity = function () {
            return this.conceptIdentity;
        };
        Component.prototype.setConceptIdentity = function (ci) {
            this.conceptIdentity = ci;
        };
        Component.prototype.getLocalRepresentation = function () {
            return this.localRepresentation;
        };
        Component.prototype.setLocalRepresentation = function (lr) {
            this.localRepresentation = lr;
        };
        return Component;
    })(IdentifiableType);
    exports.Component = Component;
    var Dimension = (function (_super) {
        __extends(Dimension, _super);
        function Dimension() {
            _super.apply(this, arguments);
        }
        return Dimension;
    })(Component);
    exports.Dimension = Dimension;
    var TimeDimension = (function (_super) {
        __extends(TimeDimension, _super);
        function TimeDimension() {
            _super.apply(this, arguments);
        }
        return TimeDimension;
    })(Component);
    exports.TimeDimension = TimeDimension;
    var Attribute = (function (_super) {
        __extends(Attribute, _super);
        function Attribute() {
            _super.apply(this, arguments);
        }
        return Attribute;
    })(Component);
    exports.Attribute = Attribute;
    var PrimaryMeasure = (function (_super) {
        __extends(PrimaryMeasure, _super);
        function PrimaryMeasure() {
            _super.apply(this, arguments);
        }
        return PrimaryMeasure;
    })(Component);
    exports.PrimaryMeasure = PrimaryMeasure;
    var DimensionList = (function () {
        function DimensionList() {
            this.dimensions = [];
            this.timeDimension = null;
        }
        DimensionList.prototype.getDimensions = function () { return this.dimensions; };
        DimensionList.prototype.getTimeDimension = function () {
            return this.timeDimension;
        };
        return DimensionList;
    })();
    exports.DimensionList = DimensionList;
    var AttributeList = (function () {
        function AttributeList() {
            this.attributes = [];
        }
        AttributeList.prototype.getAttributes = function () { return this.attributes; };
        return AttributeList;
    })();
    exports.AttributeList = AttributeList;
    var MeasureList = (function () {
        function MeasureList() {
            this.primaryMeasure = null;
        }
        MeasureList.prototype.getPrimaryMeasure = function () { return this.primaryMeasure; };
        return MeasureList;
    })();
    exports.MeasureList = MeasureList;
    var DataStructureComponents = (function () {
        function DataStructureComponents() {
            this.dimensionList = null;
            this.measureList = null;
            this.attributeList = null;
        }
        DataStructureComponents.prototype.getDimensionList = function () {
            return this.dimensionList;
        };
        DataStructureComponents.prototype.getMeasureList = function () {
            return this.measureList;
        };
        DataStructureComponents.prototype.getAttributeList = function () {
            return this.attributeList;
        };
        return DataStructureComponents;
    })();
    exports.DataStructureComponents = DataStructureComponents;
    var DataStructure = (function (_super) {
        __extends(DataStructure, _super);
        function DataStructure() {
            _super.apply(this, arguments);
            this.components = null;
        }
        DataStructure.prototype.getDataStructureComponents = function () {
            return this.components;
        };
        DataStructure.prototype.setDataStructureComponents = function (components) {
            this.components = components;
        };
        DataStructure.prototype.dump = function () {
        };
        DataStructure.prototype.findComponentString = function (col) {
            return this.findComponent(new commonreferences.ID(col));
        };
        DataStructure.prototype.findComponent = function (col) {
            /*
            for (DimensionType dim : components.getDimensionList().getDimensions()) {
                if (dim.identifiesMe(col)) {
                    return dim;
                }
            }
            for (AttributeType dim : components.getAttributeList().getAttributes()) {
                if (dim.identifiesMe(col)) {
                    return dim;
                }
            }
            //System.out.println("Measure3="+components.getMeasureList().getMeasures().size());
            if (components.getDimensionList().getMeasureDimension() != null && components.getDimensionList().getMeasureDimension().identifiesMe(col)) {
                return components.getDimensionList().getMeasureDimension();
            }
            TimeDimensionType dim = components.getDimensionList().getTimeDimension();
            if (dim.identifiesMe(col)) {
                return dim;
            }
            PrimaryMeasure dim2 = components.getMeasureList().getPrimaryMeasure();
            if (dim2.identifiesMe(col)) {
                return dim2;
            }
            */
            return null;
        };
        DataStructure.prototype.asReference = function () {
            var ref = new commonreferences.Ref();
            ref.setAgencyId(this.getAgencyID());
            ref.setId(this.getId());
            ref.setVersion(this.getVersion());
            var reference = new commonreferences.Reference(ref, null);
            return reference;
        };
        DataStructure.prototype.asDataflow = function () {
            var dataFlow = new Dataflow();
            dataFlow.setNames(this.getNames());
            dataFlow.setDescriptions(this.getDescriptions());
            dataFlow.setStructure(this.asReference());
            dataFlow.setAnnotations(this.getAnnotations());
            dataFlow.setAgencyID(this.getAgencyID());
            dataFlow.setId(this.getId());
            dataFlow.setVersion(this.getVersion());
            return dataFlow;
        };
        DataStructure.prototype.isDimension = function (s) {
            for (var i = 0; i < this.getDataStructureComponents().getDimensionList().getDimensions().length; i++) {
                var d = this.getDataStructureComponents().getDimensionList().getDimensions()[i];
                if (s == d.getId().toString()) {
                    return true;
                }
            }
            if (s == this.getDataStructureComponents().getDimensionList().getTimeDimension().getId().toString()) {
                return true;
            }
            return false;
        };
        DataStructure.prototype.isTimeDimension = function (s) {
            if (s == this.getDataStructureComponents().getDimensionList().getTimeDimension().getId().toString()) {
                return true;
            }
            return false;
        };
        DataStructure.prototype.isAttribute = function (s) {
            for (var i = 0; i < this.getDataStructureComponents().getAttributeList().getAttributes().length; i++) {
                if (s == this.getDataStructureComponents().getAttributeList().getAttributes()[i].getId().toString()) {
                    return true;
                }
            }
            return false;
        };
        DataStructure.prototype.isPrimaryMeasure = function (s) {
            if ("OBS_VALUE" == s)
                return true;
            else if (this.getDataStructureComponents().getMeasureList().getPrimaryMeasure().getId().toString() == s) {
                return true;
            }
            return false;
        };
        DataStructure.prototype.getKeyPosition = function (s) {
            var i = 0;
            for (var j = 0; j < this.getDataStructureComponents().getDimensionList().getDimensions().length; i++) {
                if (this.getDataStructureComponents().getDimensionList().getDimensions()[i].getId().equalsString(s)) {
                    return i;
                }
                i++;
            }
            if (s == this.getDataStructureComponents().getDimensionList().getTimeDimension().getId().toString()) {
                return i;
            }
            throw new Error("Dimension " + s + " not found in DataStructure:" + this.getId().toString());
        };
        return DataStructure;
    })(MaintainableType);
    exports.DataStructure = DataStructure;
    var CodeLists = (function () {
        function CodeLists() {
            this.codelists = [];
        }
        /**
         * @return the codelists
         */
        CodeLists.prototype.getCodelists = function () {
            return this.codelists;
        };
        /**
         * @param codelists the codelists to set
         */
        CodeLists.prototype.setCodelists = function (cls) {
            this.codelists = cls;
        };
        CodeLists.prototype.findCodelistStrings = function (agency, id, vers) {
            var findid = new commonreferences.ID(id);
            var ag = new commonreferences.NestedNCNameID(agency);
            var ver = vers == null ? null : new commonreferences.Version(vers);
            return this.findCodelist(ag, findid, ver);
        };
        CodeLists.prototype.findCodelist = function (agency2, findid, ver) {
            for (var i = 0; i < this.codelists.length; i++) {
                var cl2 = this.codelists[i];
                if (cl2.identifiesMe(agency2, findid, ver)) {
                    return cl2;
                }
            }
            return null;
        };
        CodeLists.prototype.findCodelistURI = function (uri) {
            for (var i = 0; i < this.codelists.length; i++) {
                if (this.codelists[i].identifiesMeURI(uri)) {
                    return this.codelists[i];
                }
            }
            return null;
        };
        /*
         * This method is used in sdmx 2.0 parsing to find a codelist with the correct ID..
         * this is because the Dimension in the KeyFamily does not contain a complete reference
         * only an ID.. we lookup the Codelist by it's ID, when we find a match, we can make a
         * LocalItemSchemeReference out of it with it's AgencyID and Version.
         */
        CodeLists.prototype.findCodelistById = function (id) {
            var cl = null;
            for (var i = 0; i < this.codelists.length; i++) {
                if (this.codelists[i].identifiesMeId(id)) {
                    if (cl == null)
                        cl = this.codelists[i];
                    else {
                        var j = cl.getVersion().compareTo(this.codelists[i].getVersion());
                        switch (j) {
                            case -1:
                                break;
                            case 0:
                                break;
                            case 1:
                                // Our found conceptscheme has a greater version number.
                                cl = this.codelists[i];
                                break;
                        }
                    }
                }
            }
            return cl;
        };
        CodeLists.prototype.findCodelistReference = function (ref) {
            return this.findCodelist(ref.getAgencyId(), ref.getMaintainableParentId(), ref.getMaintainedParentVersion());
        };
        CodeLists.prototype.merge = function (codelists) {
            if (codelists == null)
                return;
            for (var i = 0; i < codelists.getCodelists().length; i++) {
                this.codelists.push(codelists[i]);
            }
        };
        return CodeLists;
    })();
    exports.CodeLists = CodeLists;
    var Concepts = (function () {
        function Concepts() {
            this.concepts = [];
        }
        /**
         * @return the codelists
         */
        Concepts.prototype.getConceptSchemes = function () {
            return this.concepts;
        };
        /**
         * @param codelists the codelists to set
         */
        Concepts.prototype.setConceptSchemes = function (cls) {
            this.concepts = cls;
        };
        Concepts.prototype.findConceptSchemeStrings = function (agency, id, vers) {
            var findid = new commonreferences.ID(id);
            var ag = new commonreferences.NestedNCNameID(agency);
            var ver = vers == null ? null : new commonreferences.Version(vers);
            return this.findConceptScheme(ag, findid, ver);
        };
        Concepts.prototype.findConceptScheme = function (agency2, findid, ver) {
            for (var i = 0; i < this.concepts.length; i++) {
                var cl2 = this.concepts[i];
                if (cl2.identifiesMe(agency2, findid, ver)) {
                    return cl2;
                }
            }
            return null;
        };
        Concepts.prototype.findConceptSchemeURI = function (uri) {
            for (var i = 0; i < this.concepts.length; i++) {
                if (this.concepts[i].identifiesMeURI(uri)) {
                    return this.concepts[i];
                }
            }
            return null;
        };
        /*
         * This method is used in sdmx 2.0 parsing to find a codelist with the correct ID..
         * this is because the Dimension in the KeyFamily does not contain a complete reference
         * only an ID.. we lookup the Codelist by it's ID, when we find a match, we can make a
         * LocalItemSchemeReference out of it with it's AgencyID and Version.
         */
        Concepts.prototype.findConceptSchemeById = function (id) {
            var cl = null;
            for (var i = 0; i < this.concepts.length; i++) {
                if (this.concepts[i].identifiesMeId(id)) {
                    if (cl == null)
                        cl = this.concepts[i];
                    else {
                        var j = cl.getVersion().compareTo(this.concepts[i].getVersion());
                        switch (j) {
                            case -1:
                                break;
                            case 0:
                                break;
                            case 1:
                                // Our found conceptscheme has a greater version number.
                                cl = this.concepts[i];
                                break;
                        }
                    }
                }
            }
            return cl;
        };
        Concepts.prototype.findConceptSchemeReference = function (ref) {
            return this.findConceptScheme(ref.getAgencyId(), ref.getMaintainableParentId(), ref.getMaintainedParentVersion());
        };
        Concepts.prototype.merge = function (conceptsType) {
            if (conceptsType == null)
                return;
            for (var i = 0; i < conceptsType.getConceptSchemes().length; i++) {
                this.concepts.push(conceptsType.getConceptSchemes()[i]);
            }
        };
        return Concepts;
    })();
    exports.Concepts = Concepts;
    var DataStructures = (function () {
        function DataStructures() {
            this.datastructures = [];
        }
        /**
         * @return the codelists
         */
        DataStructures.prototype.getDataStructures = function () {
            return this.datastructures;
        };
        /**
         * @param codelists the codelists to set
         */
        DataStructures.prototype.setDataStructures = function (cls) {
            this.datastructures = cls;
        };
        DataStructures.prototype.findDataStructureStrings = function (agency, id, vers) {
            var findid = new commonreferences.ID(id);
            var ag = new commonreferences.NestedNCNameID(agency);
            var ver = vers == null ? null : new commonreferences.Version(vers);
            return this.findDataStructure(ag, findid, ver);
        };
        DataStructures.prototype.findDataStructure = function (agency2, findid, ver) {
            for (var i = 0; i < this.datastructures.length; i++) {
                var cl2 = this.datastructures[i];
                if (cl2.identifiesMe(agency2, findid, ver)) {
                    return cl2;
                }
            }
            return null;
        };
        DataStructures.prototype.findDataStructureURI = function (uri) {
            for (var i = 0; i < this.datastructures.length; i++) {
                if (this.datastructures[i].identifiesMeURI(uri)) {
                    return this.datastructures[i];
                }
            }
            return null;
        };
        DataStructures.prototype.findDataStructureReference = function (ref) {
            return this.findDataStructure(ref.getAgencyId(), ref.getMaintainableParentId(), ref.getMaintainedParentVersion());
        };
        DataStructures.prototype.merge = function (dss) {
            if (dss == null)
                return;
            for (var i = 0; i < dss.getDataStructures().length; i++) {
                this.datastructures.push(dss.getDataStructures()[i]);
            }
        };
        return DataStructures;
    })();
    exports.DataStructures = DataStructures;
    var Structures = (function () {
        function Structures() {
            this.codelists = null;
            this.concepts = null;
            this.datastructures = null;
        }
        Structures.prototype.getConcepts = function () {
            return this.concepts;
        };
        Structures.prototype.setConcepts = function (c) {
            this.concepts = c;
        };
        Structures.prototype.getCodeLists = function () {
            return this.codelists;
        };
        Structures.prototype.setCodeLists = function (c) {
            this.codelists = c;
        };
        Structures.prototype.getDataStructures = function () {
            return this.datastructures;
        };
        Structures.prototype.setDataStructures = function (ds) {
            this.datastructures = ds;
        };
        // Registry
        Structures.prototype.listDataflows = function () {
            return null;
        };
        Structures.prototype.clear = function () {
        };
        Structures.prototype.load = function (struct) {
        };
        Structures.prototype.unload = function (struct) {
        };
        Structures.prototype.findDataStructure = function (ref) {
            return null;
        };
        Structures.prototype.findDataflow = function (ref) {
            return null;
        };
        Structures.prototype.findCode = function (ref) {
            return this.codelists.findCodelistReference(ref).findItemId(ref.getId());
        };
        Structures.prototype.findCodelist = function (ref) {
            return this.codelists.findCodelistReference(ref);
        };
        Structures.prototype.findItemType = function (item) {
            return null;
        };
        Structures.prototype.findConcept = function (ref) {
            return this.concepts.findConceptSchemeReference(ref).findItemId(ref.getId());
        };
        Structures.prototype.findConceptScheme = function (ref) {
            return this.concepts.findConceptSchemeReference(ref);
        };
        Structures.prototype.searchDataStructure = function (ref) {
            return new Array();
        };
        Structures.prototype.searchDataflow = function (ref) {
            return new Array();
        };
        Structures.prototype.searchCodelist = function (ref) {
            return new Array();
        };
        Structures.prototype.searchItemType = function (item) {
            return new Array();
        };
        Structures.prototype.searchConcept = function (ref) {
            return new Array();
        };
        Structures.prototype.searchConceptScheme = function (ref) {
            return new Array();
        };
        Structures.prototype.save = function () {
        };
        return Structures;
    })();
    exports.Structures = Structures;
});

//# sourceMappingURL=structure.js.map
