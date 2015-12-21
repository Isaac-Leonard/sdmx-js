var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("message", ["require", "exports", "structure"], function (require, exports, structure) {
    var DataMessage = (function () {
        function DataMessage() {
        }
        return DataMessage;
    })();
    exports.DataMessage = DataMessage;
    var DataQuery = (function () {
        function DataQuery() {
        }
        return DataQuery;
    })();
    exports.DataQuery = DataQuery;
    var StructureType = (function () {
        function StructureType() {
        }
        // Registry
        StructureType.prototype.listDataflows = function () {
            return null;
        };
        StructureType.prototype.clear = function () {
        };
        StructureType.prototype.load = function (struct) {
        };
        StructureType.prototype.unload = function (struct) {
        };
        StructureType.prototype.findDataStructure = function (ref) {
            return null;
        };
        StructureType.prototype.findDataflow = function (ref) {
            return null;
        };
        StructureType.prototype.findCode = function (ref) {
            return null;
        };
        StructureType.prototype.findCodelist = function (ref) {
            return null;
        };
        StructureType.prototype.findItemType = function (item) {
            return null;
        };
        StructureType.prototype.findConcept = function (ref) {
            return null;
        };
        StructureType.prototype.findConceptScheme = function (ref) {
            return null;
        };
        StructureType.prototype.searchDataStructure = function (ref) {
            return new Array();
        };
        StructureType.prototype.searchDataflow = function (ref) {
            return new Array();
        };
        StructureType.prototype.searchCodelist = function (ref) {
            return new Array();
        };
        StructureType.prototype.searchItemType = function (item) {
            return new Array();
        };
        StructureType.prototype.searchConcept = function (ref) {
            return new Array();
        };
        StructureType.prototype.searchConceptScheme = function (ref) {
            return new Array();
        };
        StructureType.prototype.save = function () {
        };
        return StructureType;
    })();
    exports.StructureType = StructureType;
    var HeaderTimeType = (function () {
        function HeaderTimeType() {
            this.date = null;
        }
        HeaderTimeType.prototype.getDate = function () { return this.date; };
        HeaderTimeType.prototype.setDate = function (d) {
            this.date = d;
        };
        return HeaderTimeType;
    })();
    exports.HeaderTimeType = HeaderTimeType;
    var Contact = (function () {
        function Contact() {
            this.name = [];
            this.departments = [];
            this.roles = [];
            this.telephones = [];
            this.faxes = [];
            this.z400s = [];
            this.uris = [];
            this.emails = [];
        }
        return Contact;
    })();
    exports.Contact = Contact;
    var PartyType = (function (_super) {
        __extends(PartyType, _super);
        function PartyType() {
            _super.apply(this, arguments);
            this.contacts = [];
        }
        return PartyType;
    })(structure.NameableType);
    exports.PartyType = PartyType;
    var Sender = (function (_super) {
        __extends(Sender, _super);
        function Sender() {
            _super.apply(this, arguments);
        }
        return Sender;
    })(PartyType);
    exports.Sender = Sender;
    var Header = (function () {
        function Header() {
            this.id = null;
            this.test = null;
            this.prepared = null;
            this.receivers = [];
            this.names = [];
            this.structures = [];
            this.dataproviderReference = null;
            this.dataSetAction = null;
            this.dataSetId = [];
            this.extracted = null;
            this.reportingBegin = null;
            this.reportingEnd = null;
            this.embargoDate = null;
            this.source = [];
        }
        Header.prototype.getId = function () { return this.id; };
        Header.prototype.setId = function (s) { this.id = s; };
        Header.prototype.getTest = function () { return this.test; };
        Header.prototype.setTest = function (b) {
            this.test = b;
        };
        Header.prototype.getPrepared = function () { return this.prepared; };
        Header.prototype.setPrepared = function (h) {
            this.prepared = h;
        };
        Header.prototype.getReceivers = function () {
            return this.receivers;
        };
        Header.prototype.setReceivers = function (recs) {
            this.receivers = recs;
        };
        Header.prototype.getNames = function () {
            return this.names;
        };
        Header.prototype.setNames = function (n) {
            this.names = n;
        };
        Header.prototype.setStructures = function (pl) {
            this.structures = pl;
        };
        Header.prototype.getStructures = function () {
            return this.structures;
        };
        Header.prototype.getDataproviderReference = function () {
            return this.dataproviderReference;
        };
        Header.prototype.setDataproviderReference = function (ref) {
            this.dataproviderReference = ref;
        };
        Header.prototype.setAction = function (ac) {
            this.dataSetAction = ac;
        };
        Header.prototype.getAction = function () {
            return this.dataSetAction;
        };
        Header.prototype.getDataSetId = function () {
            return this.dataSetId;
        };
        Header.prototype.setDataSetId = function (ids) {
            this.dataSetId = ids;
        };
        Header.prototype.getExtracted = function () {
            return this.extracted;
        };
        Header.prototype.setExtracted = function (d) {
            this.extracted = d;
        };
        Header.prototype.getReportingBegin = function () {
            return this.reportingBegin;
        };
        Header.prototype.setReportingBegin = function (o) {
            this.reportingBegin = o;
        };
        Header.prototype.getReportingEnd = function () {
            return this.reportingEnd;
        };
        Header.prototype.setReportingEnd = function (o) {
            this.reportingEnd = o;
        };
        Header.prototype.getEmbargoDate = function () {
            return this.embargoDate;
        };
        Header.prototype.setEmbargoDate = function (dt) {
            this.embargoDate = dt;
        };
        Header.prototype.getSource = function () {
            return this.source;
        };
        Header.prototype.setSource = function (s) {
            this.source = s;
        };
        return Header;
    })();
    exports.Header = Header;
});

//# sourceMappingURL=message.js.map
