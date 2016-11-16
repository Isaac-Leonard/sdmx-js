var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("sdmx/message", ["require", "exports", "sdmx/structure"], function (require, exports, structure) {
    "use strict";
    var DataMessage = (function () {
        function DataMessage() {
            this.header = null;
            this.dataSets = [];
        }
        DataMessage.prototype.getHeader = function () { return this.header; };
        DataMessage.prototype.setHeader = function (h) { this.header = h; };
        DataMessage.prototype.getDataSet = function (i) { return this.dataSets[i]; };
        DataMessage.prototype.setDataSet = function (i, ds) { this.dataSets[i] = ds; };
        DataMessage.prototype.addDataSet = function (ds) {
            this.dataSets.push(ds);
            return collections.arrays.indexOf(this.dataSets, ds);
        };
        DataMessage.prototype.removeDataSet = function (ds) {
            collections.arrays.remove(this.dataSets, ds);
        };
        DataMessage.prototype.size = function () {
            return this.dataSets.length;
        };
        return DataMessage;
    }());
    exports.DataMessage = DataMessage;
    var DataQuery = (function () {
        function DataQuery() {
        }
        return DataQuery;
    }());
    exports.DataQuery = DataQuery;
    var StructureType = (function () {
        function StructureType() {
            this.header = null;
            this.structures = null;
        }
        StructureType.prototype.getHeader = function () { return this.header; };
        StructureType.prototype.setHeader = function (h) { this.header = h; };
        StructureType.prototype.getStructures = function () {
            return this.structures;
        };
        StructureType.prototype.setStructures = function (s) {
            this.structures = s;
        };
        // Registry
        StructureType.prototype.listDataflows = function () {
            return this.structures.listDataflows();
        };
        StructureType.prototype.clear = function () {
        };
        StructureType.prototype.load = function (struct) {
        };
        StructureType.prototype.unload = function (struct) {
        };
        StructureType.prototype.findDataStructure = function (ref) {
            return this.structures.findDataStructure(ref);
        };
        StructureType.prototype.findDataflow = function (ref) {
            return this.structures.findDataflow(ref);
        };
        StructureType.prototype.findCode = function (ref) {
            return this.structures.findCode(ref);
        };
        StructureType.prototype.findCodelist = function (ref) {
            return this.structures.findCodelist(ref);
        };
        StructureType.prototype.findItemType = function (item) {
            return this.structures.findItemType(item);
        };
        StructureType.prototype.findConcept = function (ref) {
            return this.structures.findConcept(ref);
        };
        StructureType.prototype.findConceptScheme = function (ref) {
            return this.structures.findConceptScheme(ref);
        };
        StructureType.prototype.searchDataStructure = function (ref) {
            return this.structures.searchDataStructure(ref);
        };
        StructureType.prototype.searchDataflow = function (ref) {
            return this.structures.searchDataflow(ref);
        };
        StructureType.prototype.searchCodelist = function (ref) {
            return this.structures.searchCodelist(ref);
        };
        StructureType.prototype.searchItemType = function (item) {
            return this.structures.searchItemType(item);
        };
        StructureType.prototype.searchConcept = function (ref) {
            return this.structures.searchConcept(ref);
        };
        StructureType.prototype.searchConceptScheme = function (ref) {
            return this.structures.searchConceptScheme(ref);
        };
        StructureType.prototype.save = function () {
        };
        return StructureType;
    }());
    exports.StructureType = StructureType;
    var HeaderTimeType = (function () {
        function HeaderTimeType(d) {
            this.date = null;
            this.date = d;
        }
        HeaderTimeType.prototype.getDate = function () { return this.date; };
        HeaderTimeType.prototype.setDate = function (d) {
            this.date = d;
        };
        return HeaderTimeType;
    }());
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
    }());
    exports.Contact = Contact;
    var PartyType = (function (_super) {
        __extends(PartyType, _super);
        function PartyType() {
            _super.call(this);
            this.contacts = [];
        }
        return PartyType;
    }(structure.NameableType));
    exports.PartyType = PartyType;
    var Sender = (function (_super) {
        __extends(Sender, _super);
        function Sender() {
            _super.call(this);
        }
        return Sender;
    }(PartyType));
    exports.Sender = Sender;
    var Header = (function () {
        function Header() {
            this.id = null;
            this.test = null;
            this.prepared = null;
            this.sender = null;
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
        Header.prototype.getSender = function () { return this.sender; };
        Header.prototype.setSender = function (p) {
            this.sender = p;
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
    }());
    exports.Header = Header;
});

//# sourceMappingURL=message.js.map
