var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("sdmx/commonreferences", ["require", "exports", "sdmx/xml"], function (require, exports, xml) {
    var Version = (function (_super) {
        __extends(Version, _super);
        function Version(s) {
            _super.call(this, s);
        }
        Version.prototype.getPatternArray = function () {
            return [Version.PATTERN];
        };
        Version.prototype.equalsVersion = function (id) {
            return _super.prototype.getString.call(this) == id.getString();
        };
        Version.prototype.equals = function (id) {
            return _super.prototype.getString.call(this) == id;
        };
        Version.prototype.compareTo = function (o) {
            if (!(o instanceof Version))
                return -1;
            var a1 = parseFloat(o.toString());
            var a2 = parseFloat(toString());
            return a1 > a2 ? 1 : a1 < a2 ? -1 : 0;
        };
        Version.PATTERN = "[0-9]+(\\.[0-9]+)*";
        Version.ONE = new Version("1.0");
        return Version;
    })(xml.RegexXMLString);
    exports.Version = Version;
    var NestedID = (function (_super) {
        __extends(NestedID, _super);
        function NestedID(s) {
            _super.call(this, s);
        }
        NestedID.prototype.getPatternArray = function () {
            return [NestedID.PATTERN];
        };
        NestedID.prototype.equalsNestedID = function (id) {
            if (_super.prototype.getString.call(this) == null)
                return false;
            return _super.prototype.getString.call(this) == id.getString();
        };
        NestedID.prototype.equalsString = function (id) {
            return _super.prototype.equalsString.call(this, id);
        };
        NestedID.prototype.equalsID = function (id) {
            return _super.prototype.getString.call(this) == id.getString();
        };
        NestedID.prototype.asID = function () {
            return new ID(_super.prototype.getString.call(this));
        };
        NestedID.PATTERN = "[A-z0-9_@$\\-]+(\\.[A-z0-9_@$\\-]+)*";
        return NestedID;
    })(xml.RegexXMLString);
    exports.NestedID = NestedID;
    var ID = (function (_super) {
        __extends(ID, _super);
        function ID(s) {
            _super.call(this, s);
            if (s == null) {
                throw new Error("null IDType string");
            }
        }
        ID.prototype.equalsID = function (id) {
            if (id == null) {
                console.log("passed null id into ID.equalsID(...)");
                return false;
            }
            if (this.getString() == "") {
                console.log("this ID has a null string as ID");
                return false;
            }
            if (id.getString() == "") {
                console.log("hat ID has a null string in equalsID(...)");
                return false;
            }
            return this.getString() == id.getString();
        };
        ID.prototype.equalsString = function (id) {
            return this.getString() == id;
        };
        ID.prototype.getPatternArray = function () {
            return [ID.PATTERN];
        };
        ID.PATTERN = "[A-z0-9_@$\\-]+";
        return ID;
    })(NestedID);
    exports.ID = ID;
    var NCNameID = (function (_super) {
        __extends(NCNameID, _super);
        function NCNameID(s) {
            _super.call(this, s);
        }
        NCNameID.prototype.getPatternArray = function () {
            return [NCNameID.PATTERN];
        };
        NCNameID.prototype.equalsNCNameId = function (id) {
            return _super.prototype.getString.call(this) == id.getString();
        };
        NCNameID.PATTERN = "[A-z][A-z0-9_\\-]*";
        return NCNameID;
    })(ID);
    exports.NCNameID = NCNameID;
    var NestedNCNameID = (function (_super) {
        __extends(NestedNCNameID, _super);
        function NestedNCNameID(s) {
            _super.call(this, s);
        }
        NestedNCNameID.prototype.getPatternArray = function () {
            return [NestedNCNameID.PATTERN];
        };
        NestedNCNameID.prototype.equalsNestedNCNameID = function (id) {
            return _super.prototype.getString.call(this) == id.getString();
        };
        NestedNCNameID.PATTERN = "[A-z][A-z0-9_\\-]*(\\.[A-z][A-z0-9_\\-]*)*";
        return NestedNCNameID;
    })(NestedID);
    exports.NestedNCNameID = NestedNCNameID;
    var Ref = (function () {
        /*
            constructor(agencyId: NestedNCNameID, id: NestedID, vers: Version, maintParent: ID, mainVers: Version, containId: NestedID, loc: boolean, ob: ObjectTypeCodelistType, pack: PackageTypeCodelistType) {
                this.agencyId = agencyId;
                this.id = id;
                this.version = vers;
                this.maintainedParentId = maintParent;
                this.maintainedParentVersion = mainVers;
                this.local = loc;
                this.object = ob;
                this.package = pack;
            }
        */
        function Ref() {
            this.agencyId = null;
            this.id = null;
            this.version = null;
            this.maintainedParentId = null;
            this.maintainedParentVersion = null;
            this.local = null;
            this.object = null;
            this.package = null;
        }
        Ref.prototype.getAgencyId = function () {
            return this.agencyId;
        };
        Ref.prototype.getId = function () {
            return this.id;
        };
        Ref.prototype.getVersion = function () {
            return this.version;
        };
        Ref.prototype.getMaintainableParentId = function () {
            return this.maintainedParentId;
        };
        Ref.prototype.getMaintainableParentVersion = function () {
            return this.maintainedParentVersion;
        };
        Ref.prototype.getRefClass = function () {
            return this.object;
        };
        Ref.prototype.getPack = function () {
            return this.package;
        };
        Ref.prototype.setAgencyId = function (a) {
            this.agencyId = a;
        };
        Ref.prototype.setId = function (id) {
            this.id = id;
        };
        Ref.prototype.setVersion = function (v) {
            this.version = v;
        };
        Ref.prototype.setMaintainableParentId = function (id) {
            this.maintainedParentId = id;
        };
        Ref.prototype.setMaintainableParentVersion = function (v) {
            this.maintainedParentVersion = v;
        };
        Ref.prototype.setRefClass = function (ob) {
            this.object = ob;
        };
        Ref.prototype.setPackage = function (p) {
            this.package = p;
        };
        Ref.prototype.asReference = function () {
            var reference = new Reference(this, null);
            return reference;
        };
        return Ref;
    })();
    exports.Ref = Ref;
    var Reference = (function () {
        function Reference(ref, urn) {
            this.pack = null;
            this.clazz = null;
            this.agency = null;
            this.maintainedParentId = null;
            this.maintainedParentVersion = null;
            this.version = null;
            this.containedIds = null;
            this.objectId = null;
            this.ref = ref;
            this.urn = urn;
            if (this.ref != null) {
                //try {
                this.pack = ref.getPack();
                this.clazz = ref.getRefClass();
                this.agency = ref.getAgencyId();
                this.objectId = ref.getId();
                this.maintainedParentId = ref.getMaintainableParentId();
                this.maintainedParentVersion = ref.getMaintainableParentVersion();
                this.version = ref.getVersion();
            }
            else {
                this.parse();
            }
            if (this.urn == null) {
                try {
                    //if (this.getAgencyId() != null) {
                    this.produce();
                }
                catch (Error) {
                }
            }
        }
        /**
         * @return the ref
         */
        Reference.prototype.getRef = function () {
            return this.ref;
        };
        /**
         * @param ref the ref to set
         */
        Reference.prototype.setRef = function (ref) {
            this.ref = ref;
        };
        /**
         * @return the urn
         */
        Reference.prototype.getUrn = function () {
            return this.urn;
        };
        /**
         * @param urn the urn to set
         */
        Reference.prototype.setUrn = function (urn) {
            this.urn = urn;
        };
        /**
         * @return the pack
         */
        Reference.prototype.getPack = function () {
            return this.pack;
        };
        Reference.prototype.setPack = function (pack) {
            this.pack = pack;
        };
        /**
         * @return the clazz
         */
        Reference.prototype.getRefClass = function () {
            return this.clazz;
        };
        Reference.prototype.setRefClass = function (clazz) {
            this.clazz = clazz;
        };
        /**
         * @return the clazz
         */
        Reference.prototype.getClazz = function () {
            return this.clazz;
        };
        /**
         * @return the agency
         */
        Reference.prototype.getAgencyId = function () {
            return this.agency;
        };
        /**
         * @return the maintainedObjectId
         */
        Reference.prototype.getMaintainableParentId = function () {
            return this.maintainedParentId;
        };
        /**
         * @return the maintainedObjectVersion
         */
        Reference.prototype.getVersion = function () {
            return this.version;
        };
        /**
         * @return the objectId
         */
        Reference.prototype.getId = function () {
            return this.objectId;
        };
        Reference.prototype.getContainedObjectIds = function () {
            return this.containedIds;
        };
        /**
         * @return the maintainedParentVersion
         */
        Reference.prototype.getMaintainedParentVersion = function () {
            return this.maintainedParentVersion;
        };
        //public IDType getMainID() {
        //    if( this.maintainedParentId==null ) return objectId!=null?objectId.asID():null;
        //    else return maintainedParentId;
        //}
        Reference.prototype.dump = function () {
        };
        Reference.prototype.toString = function () {
            var s = "";
            return s;
        };
        Reference.prototype.parse = function () {
        };
        Reference.prototype.produce = function () {
        };
        Reference.prototype.cloneRef = function () {
            var ref2 = new Ref();
            ref2.setAgencyId(this.agency);
            ref2.setId(this.getId().asID());
            ref2.setMaintainableParentId(this.maintainedParentId);
            ref2.setMaintainableParentVersion(this.maintainedParentVersion);
            ref2.setRefClass(this.clazz);
            ref2.setPackage(this.pack);
            ref2.setVersion(this.version);
            return ref2;
        };
        return Reference;
    })();
    exports.Reference = Reference;
    var ObjectTypeCodelistType = (function () {
        function ObjectTypeCodelistType(s) {
            // Instance
            this.target = null;
            this.index = -1;
            var contains = false;
            for (var i = 0; i < ObjectTypeCodelistType.STRING_ENUM.length; i++) {
                if (ObjectTypeCodelistType.STRING_ENUM[i] == s) {
                    contains = true;
                }
            }
            if (!contains)
                throw new Error(s + " is not a valid CodeTypeCodelistType");
            this.target = s;
            this.index = ObjectTypeCodelistType.STRING_ENUM.indexOf(s);
        }
        // Utility
        ObjectTypeCodelistType.add = function (s) {
            var b = new ObjectTypeCodelistType(s);
            ObjectTypeCodelistType.ENUM.push(b);
            return b;
        };
        ObjectTypeCodelistType.addString = function (s) {
            ObjectTypeCodelistType.STRING_ENUM.push(s);
            return s;
        };
        ObjectTypeCodelistType.fromString = function (s) {
            for (var i = 0; i < ObjectTypeCodelistType.ENUM.length; i++) {
                if (ObjectTypeCodelistType.ENUM[i].target == s)
                    return ObjectTypeCodelistType.ENUM[i];
            }
            return null;
        };
        ObjectTypeCodelistType.fromStringWithException = function (s) {
            for (var i = 0; i < ObjectTypeCodelistType.ENUM.length; i++) {
                if (ObjectTypeCodelistType.ENUM[i].target == s)
                    return ObjectTypeCodelistType.ENUM[i];
            }
            throw new Error("Value:" + s + " not found in enumeration! - ObjectypeCodelistType");
        };
        ObjectTypeCodelistType.prototype.toString = function () { return this.target; };
        ObjectTypeCodelistType.prototype.toInt = function () {
            return this.index;
        };
        ObjectTypeCodelistType.ENUM = new Array();
        ObjectTypeCodelistType.STRING_ENUM = new Array();
        ObjectTypeCodelistType.TARGET_ANY = ObjectTypeCodelistType.addString("Any");
        ObjectTypeCodelistType.TARGET_AGENCY = ObjectTypeCodelistType.addString("Agency");
        ObjectTypeCodelistType.TARGET_AGENCYSCHEME = ObjectTypeCodelistType.addString("AgencyScheme");
        ObjectTypeCodelistType.TARGET_ATTACHMENTCONSTRAINT = ObjectTypeCodelistType.addString("AttachmentConstraint");
        ObjectTypeCodelistType.TARGET_ATTRIBUTE = ObjectTypeCodelistType.addString("Attribute");
        ObjectTypeCodelistType.TARGET_ATTRIBUTEDESCRIPTOR = ObjectTypeCodelistType.addString("AttributeDescriptor");
        ObjectTypeCodelistType.TARGET_CATEGORISATION = ObjectTypeCodelistType.addString("Categorisation");
        ObjectTypeCodelistType.TARGET_CATEGORY = ObjectTypeCodelistType.addString("Category");
        ObjectTypeCodelistType.TARGET_CATEGORYSCHEMEMAP = ObjectTypeCodelistType.addString("CategorySchemeMap");
        ObjectTypeCodelistType.TARGET_CATEGORYSCHEME = ObjectTypeCodelistType.addString("CategoryScheme");
        ObjectTypeCodelistType.TARGET_CODE = ObjectTypeCodelistType.addString("Code");
        ObjectTypeCodelistType.TARGET_CODEMAP = ObjectTypeCodelistType.addString("CodeMap");
        ObjectTypeCodelistType.TARGET_CODELIST = ObjectTypeCodelistType.addString("Codelist");
        ObjectTypeCodelistType.TARGET_CODELISTMAP = ObjectTypeCodelistType.addString("CodelistMap");
        ObjectTypeCodelistType.TARGET_COMPONENTMAP = ObjectTypeCodelistType.addString("ComponentMap");
        ObjectTypeCodelistType.TARGET_CONCEPT = ObjectTypeCodelistType.addString("Concept");
        ObjectTypeCodelistType.TARGET_CONCEPTMAP = ObjectTypeCodelistType.addString("ConceptMap");
        ObjectTypeCodelistType.TARGET_CONCEPTSCHEME = ObjectTypeCodelistType.addString("ConceptScheme");
        ObjectTypeCodelistType.TARGET_CONCEPTSCHEMEMAP = ObjectTypeCodelistType.addString("ConceptSchemeMap");
        ObjectTypeCodelistType.TARGET_CONSTRAINT = ObjectTypeCodelistType.addString("Constraint");
        ObjectTypeCodelistType.TARGET_CONSTRAINTARGET = ObjectTypeCodelistType.addString("ConstraintTarget");
        ObjectTypeCodelistType.TARGET_CONTENTCONSTRAINT = ObjectTypeCodelistType.addString("ContentConstraint");
        ObjectTypeCodelistType.TARGET_DATAFLOW = ObjectTypeCodelistType.addString("Dataflow");
        ObjectTypeCodelistType.TARGET_DATACONSUMER = ObjectTypeCodelistType.addString("DataConsumer");
        ObjectTypeCodelistType.TARGET_DATACONSUMERSCHEME = ObjectTypeCodelistType.addString("DataConsumerScheme");
        ObjectTypeCodelistType.TARGET_DATAPROVIDER = ObjectTypeCodelistType.addString("DataProvider");
        ObjectTypeCodelistType.TARGET_DATAPROVIDERSCHEME = ObjectTypeCodelistType.addString("DataProviderScheme");
        ObjectTypeCodelistType.TARGET_DATASETTARGET = ObjectTypeCodelistType.addString("DataSetTarget");
        ObjectTypeCodelistType.TARGET_DATASTRUCTURE = ObjectTypeCodelistType.addString("DataStructure");
        ObjectTypeCodelistType.TARGET_DIMENSION = ObjectTypeCodelistType.addString("Dimension");
        ObjectTypeCodelistType.TARGET_DIMENSIONDESCRIPTOR = ObjectTypeCodelistType.addString("DimensionDescriptor");
        ObjectTypeCodelistType.TARGET_DIMENSIONDESCRIPTORVALUESTARGET = ObjectTypeCodelistType.addString("DimensionDescriptorValuesTarget");
        ObjectTypeCodelistType.TARGET_GROUPDIMENSIONDESCRIPTOR = ObjectTypeCodelistType.addString("GroupDimensionDescriptor");
        ObjectTypeCodelistType.TARGET_HIERARCHICALCODE = ObjectTypeCodelistType.addString("HierarchicalCode");
        ObjectTypeCodelistType.TARGET_HIERARCHICALCODELIST = ObjectTypeCodelistType.addString("HierarchicalCodelist");
        ObjectTypeCodelistType.TARGET_HIERARCHY = ObjectTypeCodelistType.addString("Hierarchy");
        ObjectTypeCodelistType.TARGET_HYBRIDCODELISTMAP = ObjectTypeCodelistType.addString("HybridCodelistMap");
        ObjectTypeCodelistType.TARGET_HYBRIDCODEMAP = ObjectTypeCodelistType.addString("HybridCodeMap");
        ObjectTypeCodelistType.TARGET_IDENTIFIABLEOBJECTTARGET = ObjectTypeCodelistType.addString("IdentifiableObjectTarget");
        ObjectTypeCodelistType.TARGET_LEVEL = ObjectTypeCodelistType.addString("Level");
        ObjectTypeCodelistType.TARGET_MEASUREDESCRIPTOR = ObjectTypeCodelistType.addString("MeasureDescriptor");
        ObjectTypeCodelistType.TARGET_MEASUREDIMENSION = ObjectTypeCodelistType.addString("MeasureDimension");
        ObjectTypeCodelistType.TARGET_METADATAFLOW = ObjectTypeCodelistType.addString("Metadataflow");
        ObjectTypeCodelistType.TARGET_METADATAATTRIBUTE = ObjectTypeCodelistType.addString("MetadataAttribute");
        ObjectTypeCodelistType.TARGET_METADATASET = ObjectTypeCodelistType.addString("MetadataSet");
        ObjectTypeCodelistType.TARGET_METADATASTRUCTURE = ObjectTypeCodelistType.addString("MetadataStructure");
        ObjectTypeCodelistType.TARGET_METADATATARGET = ObjectTypeCodelistType.addString("MetadataTarget");
        ObjectTypeCodelistType.TARGET_ORGANISATION = ObjectTypeCodelistType.addString("Organisation");
        ObjectTypeCodelistType.TARGET_ORGANISATIONMAP = ObjectTypeCodelistType.addString("OrganisationMap");
        ObjectTypeCodelistType.TARGET_ORGANISATIONSCHEME = ObjectTypeCodelistType.addString("OrganisationScheme");
        ObjectTypeCodelistType.TARGET_ORGANISATIONSCHEMEMAP = ObjectTypeCodelistType.addString("OrganisationSchemeMap");
        ObjectTypeCodelistType.TARGET_ORGANISATIONUNIT = ObjectTypeCodelistType.addString("OrganisationUnit");
        ObjectTypeCodelistType.TARGET_ORGANISATIONUNITSCHEME = ObjectTypeCodelistType.addString("OrganisationUnitScheme");
        ObjectTypeCodelistType.TARGET_PRIMARYMEASURE = ObjectTypeCodelistType.addString("PrimaryMeasure");
        ObjectTypeCodelistType.TARGET_PROCESS = ObjectTypeCodelistType.addString("Process");
        ObjectTypeCodelistType.TARGET_PROCESSSTEP = ObjectTypeCodelistType.addString("ProcessStep");
        ObjectTypeCodelistType.TARGET_PROVISIONAGREEMENT = ObjectTypeCodelistType.addString("ProvisionAgreement");
        ObjectTypeCodelistType.TARGET_REPORTINGCATEGORY = ObjectTypeCodelistType.addString("ReportingCategory");
        ObjectTypeCodelistType.TARGET_REPORTINGCATEGORYMAP = ObjectTypeCodelistType.addString("ReportingCategoryMap");
        ObjectTypeCodelistType.TARGET_REPORTINGTAXONOMY = ObjectTypeCodelistType.addString("ReportingTaxonomy");
        ObjectTypeCodelistType.TARGET_REPORTINGTAXONOMYMAP = ObjectTypeCodelistType.addString("ReportingTaxonomyMap");
        ObjectTypeCodelistType.TARGET_REPORTINGYEARSTARTDAY = ObjectTypeCodelistType.addString("ReportingYearStartDay");
        ObjectTypeCodelistType.TARGET_REPORTPERIODTARGET = ObjectTypeCodelistType.addString("ReportPeriodTarget");
        ObjectTypeCodelistType.TARGET_REPORTSTRUCTURE = ObjectTypeCodelistType.addString("ReportStructure");
        ObjectTypeCodelistType.TARGET_STRUCTUREMAP = ObjectTypeCodelistType.addString("StructureMap");
        ObjectTypeCodelistType.TARGET_STRUCTURESET = ObjectTypeCodelistType.addString("StructureSet");
        ObjectTypeCodelistType.TARGET_TIMEDIMENSION = ObjectTypeCodelistType.addString("TimeDimension");
        ObjectTypeCodelistType.TARGET_TRANSITION = ObjectTypeCodelistType.addString("Transition");
        ObjectTypeCodelistType.ANY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ANY);
        ObjectTypeCodelistType.AGENCY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_AGENCY);
        ObjectTypeCodelistType.AGENCYSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_AGENCYSCHEME);
        ObjectTypeCodelistType.ATTACHMENTCONSTRAINT = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ATTACHMENTCONSTRAINT);
        ObjectTypeCodelistType.ATTRIBUTE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ATTRIBUTE);
        ObjectTypeCodelistType.ATTRIBUTEDESCRIPTOR = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ATTRIBUTEDESCRIPTOR);
        ObjectTypeCodelistType.CATEGORISATION = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CATEGORISATION);
        ObjectTypeCodelistType.CATEGORY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CATEGORY);
        ObjectTypeCodelistType.CATEGORYSCHEMEMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CATEGORYSCHEMEMAP);
        ObjectTypeCodelistType.CATEGORYSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CATEGORYSCHEME);
        ObjectTypeCodelistType.CODE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CODE);
        ObjectTypeCodelistType.CODEMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CODE);
        ObjectTypeCodelistType.CODELIST = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CODELIST);
        ObjectTypeCodelistType.CODELISTMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CODELISTMAP);
        ObjectTypeCodelistType.COMPONENTMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_COMPONENTMAP);
        ObjectTypeCodelistType.CONCEPT = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONCEPT);
        ObjectTypeCodelistType.CONCEPTMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONCEPTMAP);
        ObjectTypeCodelistType.CONCEPTSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONCEPTSCHEME);
        ObjectTypeCodelistType.CONCEPTSCHEMEMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONCEPTSCHEMEMAP);
        ObjectTypeCodelistType.CONSTRAINT = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONSTRAINT);
        ObjectTypeCodelistType.CONSTRAINTARGET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONSTRAINTARGET);
        ObjectTypeCodelistType.CONTENTCONSTRAINT = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONTENTCONSTRAINT);
        ObjectTypeCodelistType.DATAFLOW = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATAFLOW);
        ObjectTypeCodelistType.DATACONSUMER = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATACONSUMER);
        ObjectTypeCodelistType.DATACONSUMERSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATACONSUMERSCHEME);
        ObjectTypeCodelistType.DATAPROVIDER = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATAPROVIDER);
        ObjectTypeCodelistType.DATAPROVIDERSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATAPROVIDERSCHEME);
        ObjectTypeCodelistType.DATASETTARGET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATASETTARGET);
        ObjectTypeCodelistType.DATASTRUCTURE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATASTRUCTURE);
        ObjectTypeCodelistType.DIMENSION = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DIMENSION);
        ObjectTypeCodelistType.DIMENSIONDESCRIPTOR = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DIMENSIONDESCRIPTOR);
        ObjectTypeCodelistType.DIMENSIONDESCRIPTORVALUESTARGET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DIMENSIONDESCRIPTORVALUESTARGET);
        ObjectTypeCodelistType.GROUPDIMENSIONDESCRIPTOR = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_GROUPDIMENSIONDESCRIPTOR);
        ObjectTypeCodelistType.HIERARCHICALCODE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HIERARCHICALCODE);
        ObjectTypeCodelistType.HIERARCHICALCODELIST = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HIERARCHICALCODELIST);
        ObjectTypeCodelistType.HIERARCHY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HIERARCHY);
        ObjectTypeCodelistType.HYBRIDCODELISTMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HYBRIDCODELISTMAP);
        ObjectTypeCodelistType.HYBRIDCODEMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HYBRIDCODEMAP);
        ObjectTypeCodelistType.IDENTIFIABLEOBJECTTARGET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_IDENTIFIABLEOBJECTTARGET);
        ObjectTypeCodelistType.LEVEL = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_LEVEL);
        ObjectTypeCodelistType.MEASUREDESCRIPTOR = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_MEASUREDESCRIPTOR);
        ObjectTypeCodelistType.MEASUREDIMENSION = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_MEASUREDIMENSION);
        ObjectTypeCodelistType.METADATAFLOW = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATAFLOW);
        ObjectTypeCodelistType.METADATAATTRIBUTE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATAATTRIBUTE);
        ObjectTypeCodelistType.METADATASET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATASET);
        ObjectTypeCodelistType.METADATASTRUCTURE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATASTRUCTURE);
        ObjectTypeCodelistType.METADATATARGET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATATARGET);
        ObjectTypeCodelistType.ORGANISATION = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATION);
        ObjectTypeCodelistType.ORGANISATIONMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONMAP);
        ObjectTypeCodelistType.ORGANISATIONSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONSCHEME);
        ObjectTypeCodelistType.ORGANISATIONSCHEMEMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONSCHEMEMAP);
        ObjectTypeCodelistType.ORGANISATIONUNIT = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONUNIT);
        ObjectTypeCodelistType.ORGANISATIONUNITSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONUNITSCHEME);
        ObjectTypeCodelistType.PRIMARYMEASURE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_PRIMARYMEASURE);
        ObjectTypeCodelistType.PROCESS = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_PROCESS);
        ObjectTypeCodelistType.PROCESSSTEP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_PROCESSSTEP);
        ObjectTypeCodelistType.PROVISIONAGREEMENT = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_PROVISIONAGREEMENT);
        ObjectTypeCodelistType.REPORTINGCATEGORY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGCATEGORY);
        ObjectTypeCodelistType.REPORTINGCATEGORYMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGCATEGORYMAP);
        ObjectTypeCodelistType.REPORTINGTAXONOMY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGTAXONOMY);
        ObjectTypeCodelistType.REPORTINGTAXONOMYMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGTAXONOMYMAP);
        ObjectTypeCodelistType.REPORTINGYEARSTARTDAY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGYEARSTARTDAY);
        ObjectTypeCodelistType.REPORTPERIODTARGET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTPERIODTARGET);
        ObjectTypeCodelistType.REPORTSTRUCTURE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTSTRUCTURE);
        ObjectTypeCodelistType.STRUCTUREMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_STRUCTUREMAP);
        ObjectTypeCodelistType.STRUCTURESET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_STRUCTURESET);
        ObjectTypeCodelistType.TIMEDIMENSION = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_TIMEDIMENSION);
        ObjectTypeCodelistType.TRANSITION = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_TRANSITION);
        ObjectTypeCodelistType.INT_ANY = 0;
        ObjectTypeCodelistType.INT_AGENCY = 1;
        ObjectTypeCodelistType.INT_AGENCYSCHEME = 2;
        ObjectTypeCodelistType.INT_ATTACHMENTCONSTRAINT = 3;
        ObjectTypeCodelistType.INT_ATTRIBUTE = 4;
        ObjectTypeCodelistType.INT_ATTRIBUTEDESCRIPTOR = 5;
        ObjectTypeCodelistType.INT_CATEGORISATION = 6;
        ObjectTypeCodelistType.INT_CATEGORY = 7;
        ObjectTypeCodelistType.INT_CATEGORYSCHEMEMAP = 8;
        ObjectTypeCodelistType.INT_CATEGORYSCHEME = 9;
        ObjectTypeCodelistType.INT_CODE = 10;
        ObjectTypeCodelistType.INT_CODEMAP = 11;
        ObjectTypeCodelistType.INT_CODELIST = 12;
        ObjectTypeCodelistType.INT_CODELISTMAP = 13;
        ObjectTypeCodelistType.INT_COMPONENTMAP = 14;
        ObjectTypeCodelistType.INT_CONCEPT = 15;
        ObjectTypeCodelistType.INT_CONCEPTMAP = 16;
        ObjectTypeCodelistType.INT_CONCEPTSCHEME = 17;
        ObjectTypeCodelistType.INT_CONCEPTSCHEMEMAP = 18;
        ObjectTypeCodelistType.INT_CONSTRAINT = 19;
        ObjectTypeCodelistType.INT_CONSTRAINTARGET = 20;
        ObjectTypeCodelistType.INT_CONTENTCONSTRAINT = 21;
        ObjectTypeCodelistType.INT_DATAFLOW = 22;
        ObjectTypeCodelistType.INT_DATACONSUMER = 23;
        ObjectTypeCodelistType.INT_DATACONSUMERSCHEME = 24;
        ObjectTypeCodelistType.INT_DATAPROVIDER = 25;
        ObjectTypeCodelistType.INT_DATAPROVIDERSCHEME = 26;
        ObjectTypeCodelistType.INT_DATASETTARGET = 27;
        ObjectTypeCodelistType.INT_DATASTRUCTURE = 28;
        ObjectTypeCodelistType.INT_DIMENSION = 29;
        ObjectTypeCodelistType.INT_DIMENSIONDESCRIPTOR = 30;
        ObjectTypeCodelistType.INT_DIMENSIONDESCRIPTORVALUESTARGET = 31;
        ObjectTypeCodelistType.INT_GROUPDIMENSIONDESCRIPTOR = 32;
        ObjectTypeCodelistType.INT_HIERARCHICALCODE = 33;
        ObjectTypeCodelistType.INT_HIERARCHICALCODELIST = 34;
        ObjectTypeCodelistType.INT_HIERARCHY = 35;
        ObjectTypeCodelistType.INT_HYBRIDCODELISTMAP = 36;
        ObjectTypeCodelistType.INT_HYBRIDCODEMAP = 37;
        ObjectTypeCodelistType.INT_IDENTIFIABLEOBJECTTARGET = 38;
        ObjectTypeCodelistType.INT_LEVEL = 39;
        ObjectTypeCodelistType.INT_MEASUREDESCRIPTOR = 40;
        ObjectTypeCodelistType.INT_MEASUREDIMENSION = 41;
        ObjectTypeCodelistType.INT_METADATAFLOW = 42;
        ObjectTypeCodelistType.INT_METADATAATTRIBUTE = 43;
        ObjectTypeCodelistType.INT_METADATASET = 44;
        ObjectTypeCodelistType.INT_METADATASTRUCTURE = 45;
        ObjectTypeCodelistType.INT_METADATATARGET = 46;
        ObjectTypeCodelistType.INT_ORGANISATION = 47;
        ObjectTypeCodelistType.INT_ORGANISATIONMAP = 48;
        ObjectTypeCodelistType.INT_ORGANISATIONSCHEME = 49;
        ObjectTypeCodelistType.INT_ORGANISATIONSCHEMEMAP = 50;
        ObjectTypeCodelistType.INT_ORGANISATIONUNIT = 51;
        ObjectTypeCodelistType.INT_ORGANISATIONUNITSCHEME = 52;
        ObjectTypeCodelistType.INT_PRIMARYMEASURE = 53;
        ObjectTypeCodelistType.INT_PROCESS = 54;
        ObjectTypeCodelistType.INT_PROCESSSTEP = 55;
        ObjectTypeCodelistType.INT_PROVISIONAGREEMENT = 56;
        ObjectTypeCodelistType.INT_REPORTINGCATEGORY = 57;
        ObjectTypeCodelistType.INT_REPORTINGCATEGORYMAP = 58;
        ObjectTypeCodelistType.INT_REPORTINGTAXONOMY = 59;
        ObjectTypeCodelistType.INT_REPORTINGTAXONOMYMAP = 60;
        ObjectTypeCodelistType.INT_REPORTINGYEARSTARTDAY = 61;
        ObjectTypeCodelistType.INT_REPORTPERIODTARGET = 62;
        ObjectTypeCodelistType.INT_REPORTSTRUCTURE = 63;
        ObjectTypeCodelistType.INT_STRUCTUREMAP = 64;
        ObjectTypeCodelistType.INT_STRUCTURESET = 65;
        ObjectTypeCodelistType.INT_TIMEDIMENSION = 66;
        ObjectTypeCodelistType.INT_TRANSITION = 67;
        return ObjectTypeCodelistType;
    })();
    exports.ObjectTypeCodelistType = ObjectTypeCodelistType;
    var PackageTypeCodelistType = (function () {
        function PackageTypeCodelistType(s) {
            // Instance
            this.target = null;
            var contains = false;
            for (var i = 0; i < PackageTypeCodelistType.STRING_ENUM.length; i++) {
                if (PackageTypeCodelistType.STRING_ENUM[i] == s) {
                    contains = true;
                }
            }
            if (!contains)
                throw new Error(s + " is not a valid CodeTypeCodelistType");
            this.target = s;
        }
        // Utility
        PackageTypeCodelistType.add = function (s) {
            var b = new PackageTypeCodelistType(s);
            PackageTypeCodelistType.ENUM.push(b);
            return b;
        };
        PackageTypeCodelistType.addString = function (s) {
            PackageTypeCodelistType.STRING_ENUM.push(s);
            return s;
        };
        PackageTypeCodelistType.fromString = function (s) {
            for (var i = 0; i < PackageTypeCodelistType.ENUM.length; i++) {
                if (PackageTypeCodelistType.ENUM[i].target == s)
                    return PackageTypeCodelistType.ENUM[i];
            }
            return null;
        };
        PackageTypeCodelistType.fromStringWithException = function (s) {
            for (var i = 0; i < PackageTypeCodelistType.ENUM.length; i++) {
                if (PackageTypeCodelistType.ENUM[i].target == s)
                    return PackageTypeCodelistType.ENUM[i];
            }
            throw new Error("Value:" + s + " not found in PackageTypeCodelistType enumeration!");
        };
        PackageTypeCodelistType.prototype.toString = function () { return this.target; };
        PackageTypeCodelistType.ENUM = new Array();
        PackageTypeCodelistType.STRING_ENUM = new Array();
        PackageTypeCodelistType.TARGET_BASE = PackageTypeCodelistType.addString("base");
        PackageTypeCodelistType.TARGET_DATASTRUCTURE = PackageTypeCodelistType.addString("datastructure");
        PackageTypeCodelistType.TARGET_METADATASTRUCTURE = PackageTypeCodelistType.addString("metadatastructure");
        PackageTypeCodelistType.TARGET_PROCESS = PackageTypeCodelistType.addString("process");
        PackageTypeCodelistType.TARGET_REGISTRY = PackageTypeCodelistType.addString("registry");
        PackageTypeCodelistType.TARGET_MAPPING = PackageTypeCodelistType.addString("mapping");
        PackageTypeCodelistType.TARGET_CODELIST = PackageTypeCodelistType.addString("codelist");
        PackageTypeCodelistType.TARGET_CATEGORYSCHEME = PackageTypeCodelistType.addString("categoryscheme");
        PackageTypeCodelistType.TARGET_CONCEPTSCHEME = PackageTypeCodelistType.addString("conceptscheme");
        PackageTypeCodelistType.BASE = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_BASE);
        PackageTypeCodelistType.DATASTRUCTURE = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_DATASTRUCTURE);
        PackageTypeCodelistType.METADATASTRUCTURE = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_METADATASTRUCTURE);
        PackageTypeCodelistType.PROCESS = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_PROCESS);
        PackageTypeCodelistType.REGISTRY = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_REGISTRY);
        PackageTypeCodelistType.MAPPING = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_MAPPING);
        PackageTypeCodelistType.CODELIST = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_CODELIST);
        PackageTypeCodelistType.CATEGORYSCHEME = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_CATEGORYSCHEME);
        PackageTypeCodelistType.CONCEPTSCHEME = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_CONCEPTSCHEME);
        return PackageTypeCodelistType;
    })();
    exports.PackageTypeCodelistType = PackageTypeCodelistType;
    var ObsDimensionsCodeType = (function () {
        function ObsDimensionsCodeType(s) {
            // Instance
            this.target = null;
            var contains = false;
            for (var i = 0; i < ObsDimensionsCodeType.STRING_ENUM.length; i++) {
                if (ObsDimensionsCodeType.STRING_ENUM[i] == s) {
                    contains = true;
                }
            }
            if (!contains)
                throw new Error(s + " is not a valid ObsDimensionsCodeType");
            this.target = s;
        }
        // Utility
        ObsDimensionsCodeType.add = function (s) {
            var b = new ObsDimensionsCodeType(s);
            ObsDimensionsCodeType.ENUM.push(b);
            return b;
        };
        ObsDimensionsCodeType.addString = function (s) {
            ObsDimensionsCodeType.STRING_ENUM.push(s);
            return s;
        };
        ObsDimensionsCodeType.fromString = function (s) {
            for (var i = 0; i < ObsDimensionsCodeType.ENUM.length; i++) {
                if (ObsDimensionsCodeType.ENUM[i].target == s)
                    return ObsDimensionsCodeType.ENUM[i];
            }
            return null;
        };
        ObsDimensionsCodeType.fromStringWithException = function (s) {
            for (var i = 0; i < ObsDimensionsCodeType.ENUM.length; i++) {
                if (ObsDimensionsCodeType.ENUM[i].target == s)
                    return ObsDimensionsCodeType.ENUM[i];
            }
            throw new Error("Value:" + s + " not found in ObsDimensionCodeType enumeration!");
        };
        ObsDimensionsCodeType.prototype.toString = function () { return this.target; };
        /*
         * DO ME! Add Proper codes for this class
         *
         *
         */
        ObsDimensionsCodeType.ENUM = new Array();
        ObsDimensionsCodeType.STRING_ENUM = new Array();
        ObsDimensionsCodeType.ALL_DIMENSIONS_TEXT = ObsDimensionsCodeType.addString("AllDimensions");
        ObsDimensionsCodeType.TIME_PERIOD_TEXT = ObsDimensionsCodeType.addString("TIME_PERIOD");
        ObsDimensionsCodeType.ALL_DIMENSIONS = new ObsDimensionsCodeType(ObsDimensionsCodeType.ALL_DIMENSIONS_TEXT);
        ObsDimensionsCodeType.TIME_PERIOD = new ObsDimensionsCodeType(ObsDimensionsCodeType.TIME_PERIOD_TEXT);
        return ObsDimensionsCodeType;
    })();
    exports.ObsDimensionsCodeType = ObsDimensionsCodeType;
    var ProvisionAgreementReference = (function () {
        function ProvisionAgreementReference() {
        }
        return ProvisionAgreementReference;
    })();
    exports.ProvisionAgreementReference = ProvisionAgreementReference;
    var StructureReferenceBase = (function () {
        function StructureReferenceBase() {
        }
        return StructureReferenceBase;
    })();
    exports.StructureReferenceBase = StructureReferenceBase;
    var StructureUsageReferenceBase = (function () {
        function StructureUsageReferenceBase() {
        }
        return StructureUsageReferenceBase;
    })();
    exports.StructureUsageReferenceBase = StructureUsageReferenceBase;
});

//# sourceMappingURL=commonreferences.js.map
