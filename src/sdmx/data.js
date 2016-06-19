var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("sdmx/data", ["require", "exports", "sdmx/common", "sdmx/commonreferences", "sdmx/structure", "sdmx"], function (require, exports, common, commonreferences, structure, sdmx) {
    var Query = (function () {
        function Query(flow, registry) {
            this.flow = null;
            this.structRef = null;
            this.registry = null;
            this.query = [];
            this.startDate = new Date();
            this.endDate = new Date();
            this.flow = flow;
            this.structRef = flow.getStructure();
            this.registry = registry;
            var kns = this.getKeyNames();
            for (var i = 0; i < kns.length; i++) {
                this.query.push(new QueryKey(this.structRef, registry, kns[i]));
            }
            this.startDate.setFullYear(2000);
            this.endDate.setFullYear(2016);
        }
        Query.prototype.getQueryKey = function (id) {
            for (var i = 0; i < this.query.length; i++) {
                if (this.query[i].getName() == id)
                    return this.query[i];
            }
            return null;
        };
        Query.prototype.getKeyNames = function () {
            var struct = this.registry.findDataStructure(this.structRef);
            var keynames = [];
            for (var i = 0; i < struct.getDataStructureComponents().getDimensionList().getDimensions().length; i++) {
                var dim = struct.getDataStructureComponents().getDimensionList().getDimensions()[i];
                keynames.push(dim.getId().toString());
            }
            if (struct.getDataStructureComponents().getDimensionList().getMeasureDimension() != null) {
                var dim = struct.getDataStructureComponents().getDimensionList().getMeasureDimension();
                keynames.push(dim.getId().toString());
            }
            return keynames;
        };
        Query.prototype.getDataflow = function () {
            return this.flow;
        };
        Query.prototype.getRegistry = function () {
            return this.registry;
        };
        Query.prototype.getStartDate = function () {
            return this.startDate;
        };
        Query.prototype.getEndDate = function () {
            return this.endDate;
        };
        Query.prototype.setStartDate = function (d) {
            this.startDate = d;
        };
        Query.prototype.setEndDate = function (d) {
            this.endDate = d;
        };
        Query.prototype.getQueryString = function () {
            var qString = "";
            var keyNames = this.getKeyNames();
            for (var i = 0; i < keyNames.length; i++) {
                qString += this.getQueryKey(keyNames[i]).getQueryString();
                if (i < (keyNames.length - 1)) {
                    qString += ".";
                }
            }
            return qString;
        };
        return Query;
    })();
    exports.Query = Query;
    var QueryKey = (function () {
        function QueryKey(structRef, registry, s) {
            this.structRef = null;
            this.registry = null;
            this.name = null;
            this.values = [];
            this.structRef = structRef;
            this.registry = registry;
            this.name = s;
        }
        QueryKey.prototype.getName = function () { return this.name; };
        QueryKey.prototype.getValues = function () {
            return this.values;
        };
        QueryKey.prototype.setName = function (s) { this.name = s; };
        QueryKey.prototype.setValue = function (a) {
            this.values = a;
        };
        QueryKey.prototype.addValue = function (s) {
            for (var i = 0; i < this.values.length; i++) {
                // already in here
                if (this.values[i] == s)
                    return;
            }
            this.values.push(s);
        };
        QueryKey.prototype.removeValue = function (s) {
            collections.arrays.remove(this.values, s);
        };
        QueryKey.prototype.getItemScheme = function () {
            var comp = this.registry.findDataStructure(this.structRef).findComponentString(this.name);
            var lr = comp.getLocalRepresentation();
            if (lr == null || lr.getEnumeration() == null) {
                var conceptScheme = this.registry.findConceptScheme(comp.getConceptIdentity());
                return conceptScheme;
            }
            else {
                if (lr != null) {
                    var codelist = this.registry.findCodelist(lr.getEnumeration());
                    return codelist;
                }
                // lr == null
                return null;
            }
            return null;
        };
        QueryKey.prototype.possibleValues = function () {
            var result = [];
            var itemScheme = this.getItemScheme();
            for (var i = 0; i < itemScheme.size(); i++) {
                var itm = itemScheme.getItem(i);
                result.push(itm.getId().toString());
            }
            return result;
            ;
        };
        QueryKey.prototype.getQueryString = function () {
            var s = "";
            for (var i = 0; i < this.values.length; i++) {
                s += this.values[i];
                if (i < (this.values.length - 1)) {
                    s += "+";
                }
            }
            return s;
        };
        return QueryKey;
    })();
    exports.QueryKey = QueryKey;
    var FlatObs = (function () {
        function FlatObs(vals) {
            this.values = [];
            this.values = vals;
            if (vals == null) {
                this.values = [];
            }
        }
        FlatObs.prototype.setValue = function (i, o) {
            if (this.values.length <= i) {
                for (var j = this.values.length; (j - 1) < i; j++) {
                    this.values.push(null);
                }
            }
            this.values[i] = o;
        };
        FlatObs.prototype.getValue = function (i) {
            if (i >= this.values.length) {
                return null;
            }
            return this.values[i];
        };
        FlatObs.prototype.dump = function () {
            var s = "";
            for (var i = 0; i < this.values.length; i++) {
                s += this.values[i];
                if (i < this.values.length)
                    s += " ";
            }
            console.log(s);
        };
        FlatObs.prototype.size = function () {
            return this.values.length;
        };
        return FlatObs;
    })();
    exports.FlatObs = FlatObs;
    var AttachmentLevel = (function () {
        function AttachmentLevel(s, id) {
            this.name = null;
            this.id = 0;
            this.name = s;
            this.id = id;
            AttachmentLevel.LIST.push(this);
        }
        AttachmentLevel.prototype.getName = function () { return this.name; };
        AttachmentLevel.prototype.getId = function () { return this.id; };
        AttachmentLevel.fromString = function (s) {
            for (var i = 0; i < AttachmentLevel.LIST.length; i++) {
                if (AttachmentLevel.LIST[i].getName() == s)
                    return AttachmentLevel.LIST[i];
            }
            return null;
        };
        AttachmentLevel.fromId = function (id) {
            for (var i = 0; i < AttachmentLevel.LIST.length; i++) {
                if (AttachmentLevel.LIST[i].getId() == id)
                    return AttachmentLevel.LIST[i];
            }
            return null;
        };
        AttachmentLevel.LIST = [];
        AttachmentLevel.ATTACHMENT_DATASET = 0;
        AttachmentLevel.ATTACHMENT_SERIES = 1;
        AttachmentLevel.ATTACHMENT_OBSERVATION = 2;
        AttachmentLevel.ATTACHMENT_GROUP = 3;
        AttachmentLevel.ATTACHMENT_DATASET_STRING = "DataSet";
        AttachmentLevel.ATTACHMENT_SERIES_STRING = "Series";
        AttachmentLevel.ATTACHMENT_OBSERVATION_STRING = "Observation";
        AttachmentLevel.ATTACHMENT_GROUP_STRING = "Group";
        AttachmentLevel.DATASET = new AttachmentLevel(AttachmentLevel.ATTACHMENT_DATASET_STRING, AttachmentLevel.ATTACHMENT_DATASET);
        AttachmentLevel.SERIES = new AttachmentLevel(AttachmentLevel.ATTACHMENT_SERIES_STRING, AttachmentLevel.ATTACHMENT_SERIES);
        AttachmentLevel.OBSERVATION = new AttachmentLevel(AttachmentLevel.ATTACHMENT_OBSERVATION_STRING, AttachmentLevel.ATTACHMENT_OBSERVATION);
        AttachmentLevel.GROUP = new AttachmentLevel(AttachmentLevel.ATTACHMENT_GROUP_STRING, AttachmentLevel.ATTACHMENT_GROUP);
        return AttachmentLevel;
    })();
    exports.AttachmentLevel = AttachmentLevel;
    var AbstractKey = (function () {
        function AbstractKey() {
        }
        AbstractKey.prototype.getComponent = function (s) {
            return "";
        };
        return AbstractKey;
    })();
    exports.AbstractKey = AbstractKey;
    var PartialKey = (function (_super) {
        __extends(PartialKey, _super);
        function PartialKey() {
            _super.apply(this, arguments);
        }
        return PartialKey;
    })(AbstractKey);
    exports.PartialKey = PartialKey;
    var FullKey = (function (_super) {
        __extends(FullKey, _super);
        function FullKey() {
            _super.apply(this, arguments);
        }
        return FullKey;
    })(AbstractKey);
    exports.FullKey = FullKey;
    var Cube = (function () {
        function Cube() {
        }
        Cube.prototype.putObservation = function (order, mapper, o) {
        };
        return Cube;
    })();
    exports.Cube = Cube;
    var Group = (function () {
        function Group() {
            this.groupName = null;
            this.groupKey = new collections.Dictionary();
            this.groupAttributes = new collections.Dictionary();
            this.map = new collections.Dictionary();
        }
        Group.Group = function (groupValues) {
            var g = new Group();
            g.map = groupValues;
            return g;
        };
        Group.prototype.putGroupValue = function (concept, value) {
            this.map.setValue(concept, value);
        };
        Group.prototype.getGroupValue = function (concept) {
            return this.groupAttributes.getValue(concept);
        };
        Group.prototype.processGroupValues = function (ds) {
            this.groupAttributes = new collections.Dictionary();
            var keys = this.map.keys();
            for (var i = 0; i < keys.length; i++) {
                var s = keys[i];
                if (ds.getColumnMapper().getColumnIndex(s) == -1 || ds.getColumnMapper().isAttachedToGroupString(s)) {
                    this.groupAttributes.setValue(s, this.map.getValue(s));
                    if (!ds.getColumnMapper().isAttachedToGroupString(s)) {
                        ds.getColumnMapper().registerColumn(s, AttachmentLevel.GROUP);
                    }
                }
                else {
                    this.groupKey.setValue(s, this.map.getValue(s));
                    collections.arrays.remove(keys, s);
                }
            }
            this.map = null;
        };
        Group.prototype.getGroupKey = function () {
            return this.groupKey;
        };
        Group.prototype.matches = function (key) {
            var keys = this.getGroupKey().keys();
            for (var i = 0; i < keys.length; i++) {
                var s = keys[i];
                var gv = this.getGroupKey().getValue(s);
                if (gv != null) {
                    if (!(key.getComponent(s) == gv)) {
                        return false;
                    }
                }
            }
            return true;
        };
        Group.prototype.getGroupAttributes = function () {
            return this.groupAttributes;
        };
        Group.prototype.getGroupName = function () {
            return this.groupName;
        };
        Group.prototype.setGroupName = function (groupName) {
            this.groupName = groupName;
        };
        Group.prototype.setGroupValue = function (columnName, val) {
            this.groupAttributes.setValue(columnName, val);
        };
        return Group;
    })();
    exports.Group = Group;
    var FlatColumnMapper = (function () {
        function FlatColumnMapper() {
            this.columns = [];
            this.groupColumns = [];
        }
        FlatColumnMapper.prototype.registerColumn = function (s, attach) {
            if (collections.arrays.contains(this.columns, s) || collections.arrays.contains(this.groupColumns, s)) {
                throw new Error("Attempt to Register already registered Column!!");
            }
            if (attach == AttachmentLevel.GROUP) {
                this.groupColumns.push(s);
                this.columns.push(s);
                return this.columns.indexOf(s);
            }
            else {
                this.columns.push(s);
                return this.columns.indexOf(s);
            }
        };
        FlatColumnMapper.prototype.getColumnIndex = function (s) {
            return this.columns.indexOf(s);
        };
        FlatColumnMapper.prototype.getColumnName = function (i) {
            return this.columns[i];
        };
        FlatColumnMapper.prototype.size = function () {
            return this.columns.length;
        };
        FlatColumnMapper.prototype.containsColumn = function (name) {
            for (var i = 0; i < this.columns.length; i++) {
                if (this.columns[i] == name) {
                    return true;
                }
            }
            return false;
        };
        FlatColumnMapper.prototype.getAllColumns = function () {
            var result = [];
            for (var i = 0; i < this.columns.length; i++) {
                result.push(this.columns[i]);
            }
            return result;
        };
        FlatColumnMapper.prototype.getObservationColumns = function () {
            var result = [];
            for (var i = 0; i < this.columns.length; i++) {
                result.push(this.columns[i]);
            }
            return result;
        };
        FlatColumnMapper.prototype.getSeriesColumns = function () {
            return [];
        };
        FlatColumnMapper.prototype.getDataSetColumns = function () {
            return [];
        };
        FlatColumnMapper.prototype.getGroupColumns = function () {
            return [];
        };
        FlatColumnMapper.prototype.isAttachedToDataSetString = function (s) {
            return false;
        };
        FlatColumnMapper.prototype.isAttachedToDataSetInt = function (i) {
            return false;
        };
        FlatColumnMapper.prototype.isAttachedToSeriesString = function (s) {
            return false;
        };
        FlatColumnMapper.prototype.isAttachedToSeriesInt = function (i) {
            return false;
        };
        FlatColumnMapper.prototype.isAttachedToObservationString = function (s) {
            return collections.arrays.contains(this.columns, s);
        };
        FlatColumnMapper.prototype.isAttachedToObservationInt = function (i) {
            return true;
        };
        FlatColumnMapper.prototype.isAttachedToGroupString = function (s) {
            return collections.arrays.contains(this.groupColumns, s);
        };
        FlatColumnMapper.prototype.isAttachedToGroupInt = function (i) {
            return this.isAttachedToGroupString(this.getColumnName(i));
        };
        FlatColumnMapper.prototype.dump = function () {
            console.log("Column Mapper");
            for (var i = 0; i < this.size(); i++) {
                console.log(i + " = " + this.getColumnName(i));
            }
        };
        return FlatColumnMapper;
    })();
    exports.FlatColumnMapper = FlatColumnMapper;
    var FlatDataSet = (function () {
        function FlatDataSet() {
            this.groups = [];
            this.mapper = new FlatColumnMapper();
            this.observations = [];
            this.dimensionAtObservation = "AllDimensions";
        }
        FlatDataSet.prototype.FlatDataSet = function () {
        };
        FlatDataSet.prototype.getColumnIndex = function (name) {
            return this.mapper.getColumnIndex(name);
        };
        FlatDataSet.prototype.getValue = function (row, col) {
            if (this.observations[row] == null) {
                console.log("null obs!");
            }
            return this.observations[row].getValue(col);
        };
        FlatDataSet.prototype.setValueStringCol = function (row, col, val) {
            this.setValue(row, this.mapper.getColumnIndex(col), val);
        };
        FlatDataSet.prototype.setValue = function (row, col, val) {
            this.observations[row].setValue(col, val);
        };
        FlatDataSet.prototype.addObservation = function (o) {
            this.observations.push(o);
        };
        FlatDataSet.prototype.removeObservation = function (o) {
            collections.arrays.remove(this.observations, o);
        };
        FlatDataSet.prototype.getObservations = function () {
            return this.observations;
        };
        FlatDataSet.prototype.size = function () {
            return this.observations.length;
        };
        FlatDataSet.prototype.getColumnMapper = function () {
            return this.mapper;
        };
        FlatDataSet.prototype.dump = function () {
            var s = "";
            for (var i = 0; i < this.mapper.size(); i++) {
                s += this.getColumnMapper().getColumnName(i);
                s += "\t";
            }
            console.log(s);
            for (var i = 0; i < this.observations.length; i++) {
                var o = this.getFlatObs(i);
                var s = "";
                for (var j = 0; j < this.mapper.size(); j++) {
                    s = s + o.getValue(j);
                    if (j < this.mapper.size())
                        s = s + "\t";
                }
                console.log(s);
            }
        };
        FlatDataSet.prototype.getFlatObs = function (i) {
            return this.observations[i];
        };
        FlatDataSet.prototype.registerColumn = function (s) {
            var col = this.mapper.registerColumn(s, AttachmentLevel.OBSERVATION);
            for (var i = 0; i < this.observations.length; i++) {
                this.observations[i].setValue(col, null);
            }
            return col;
        };
        FlatDataSet.prototype.getColumnName = function (i) {
            return this.mapper.getColumnName(i);
        };
        FlatDataSet.prototype.getColumnSize = function () {
            return this.mapper.size();
        };
        FlatDataSet.prototype.getGroups = function () {
            return [];
        };
        FlatDataSet.prototype.groupSize = function () {
            return 0;
        };
        FlatDataSet.prototype.applyGroupKey = function (key, column, value) {
        };
        FlatDataSet.prototype.setGroups = function (groups) {
        };
        FlatDataSet.prototype.query = function (cube, order) {
            var time = new Date().getTime();
            for (var i = 0; i < this.size(); i++) {
                cube.putObservation(order, this.mapper, this.getFlatObs(i));
            }
            return cube;
        };
        FlatDataSet.prototype.find = function (key) {
            var found = true;
            for (var i = 0; i < this.size(); i++) {
                var obs = this.getFlatObs(i);
                found = true;
                for (var j = 0; j < this.mapper.size() && !found; j++) {
                    if (!(key.getComponent(this.mapper.getColumnName(j)) == obs.getValue(j))) {
                        found = false;
                    }
                }
                if (found) {
                    return obs;
                }
            }
            return null;
        };
        FlatDataSet.prototype.getDimensionAtObservation = function (reg, dsref) {
            return "AllDimensions";
        };
        FlatDataSet.prototype.setDimensionAtObservationString = function (s) {
            this.dimensionAtObservation = s;
        };
        FlatDataSet.prototype.getDimensionAtObservationString = function () {
            return this.dimensionAtObservation;
        };
        return FlatDataSet;
    })();
    exports.FlatDataSet = FlatDataSet;
    var FlatDataSetWriter = (function () {
        function FlatDataSetWriter() {
            this.mapper = new FlatColumnMapper();
            this.dataSet = null;
            this.dataSetValues = null;
            this.seriesValues = null;
            this.obsValues = null;
            this.groups = null;
        }
        FlatDataSetWriter.prototype.newDataSet = function () {
            this.dataSet = new FlatDataSet();
            this.dataSetValues = [];
            this.mapper = this.dataSet.getColumnMapper();
        };
        FlatDataSetWriter.prototype.newSeries = function () {
            this.seriesValues = [];
            for (var i = 0; i < this.dataSetValues.length; i++) {
                this.seriesValues.push(this.dataSetValues[i]);
            }
        };
        FlatDataSetWriter.prototype.newObservation = function () {
            this.obsValues = [];
            if (this.seriesValues != null) {
                for (var i = 0; i < this.seriesValues.length; i++) {
                    this.obsValues.push(this.seriesValues[i]);
                }
            }
        };
        FlatDataSetWriter.prototype.writeDataSetComponent = function (name, val) {
            if (!this.dataSet.getColumnMapper().containsColumn(name)) {
                this.dataSet.registerColumn(name);
            }
            this.dataSetValues.push(val);
        };
        FlatDataSetWriter.prototype.writeSeriesComponent = function (name, val) {
            if (!this.dataSet.getColumnMapper().containsColumn(name)) {
                this.dataSet.registerColumn(name);
            }
            this.seriesValues.push(val);
        };
        FlatDataSetWriter.prototype.writeObservationComponent = function (name, val) {
            if (!this.dataSet.getColumnMapper().containsColumn(name)) {
                this.dataSet.registerColumn(name);
            }
            if (this.obsValues.length <= this.dataSet.getColumnMapper().getColumnIndex(name)) {
                for (var j = this.obsValues.length; (j - 1) < this.dataSet.getColumnIndex(name); j++) {
                    this.obsValues.push(null);
                }
            }
            this.obsValues[this.dataSet.getColumnIndex(name)] = val;
        };
        FlatDataSetWriter.prototype.finishSeries = function () {
        };
        FlatDataSetWriter.prototype.finishObservation = function () {
            this.dataSet.addObservation(new FlatObs(this.obsValues));
        };
        FlatDataSetWriter.prototype.finishDataSet = function () {
            var ds = this.dataSet;
            ds.setGroups(this.groups);
            this.dataSet = null;
            return ds;
        };
        FlatDataSetWriter.prototype.getColumnMapper = function () {
            return this.mapper;
        };
        FlatDataSetWriter.prototype.writeGroupValues = function (name, groupValues) {
            var group = Group.Group(groupValues);
            group.setGroupName(name);
            if (this.groups == null) {
                this.groups = [];
            }
            this.groups.push(group);
        };
        return FlatDataSetWriter;
    })();
    exports.FlatDataSetWriter = FlatDataSetWriter;
    var StructuredDataMessage = (function () {
        function StructuredDataMessage(dm, reg) {
            this.dataMessage = null;
            this.registry = null;
            this.dataflow = null;
            this.list = [];
            this.dataMessage = dm;
            this.registry = reg;
            for (var i = 0; i < this.dataMessage.size(); i++) {
                this.list.push(this.buildStructuredDataSet(i));
            }
        }
        StructuredDataMessage.prototype.size = function () {
            return this.getDataMessage().size();
        };
        StructuredDataMessage.prototype.getStructuredDataSet = function (i) {
            return this.list[i];
        };
        StructuredDataMessage.prototype.buildStructuredDataSet = function (i) {
            //dataMessage.getHeader().getStructures().get(0).getStructure().dump();
            //NestedNCNameID agency = dataMessage.getHeader().getStructures().get(0).getStructure().getAgencyId();
            //IDType id = dataMessage.getHeader().getStructures().get(0).getStructure().getMaintainableParentId();
            //Version vers = dataMessage.getHeader().getStructures().get(0).getStructure().getMaintainedParentVersion();
            //System.out.println("Ref="+agency+":"+id+":"+vers);
            var structure = this.getRegistry().findDataStructure(this.getDataMessage().getHeader().getStructures()[0].getStructure());
            //System.out.println("Structure="+structure);
            if (this.dataflow == null) {
                this.setDataflow(structure.asDataflow());
            }
            return new StructuredDataSet(this.getDataMessage().getDataSet(i), this.getRegistry(), structure);
        };
        /**
         * @return the dataMessage
         */
        StructuredDataMessage.prototype.getDataMessage = function () {
            return this.dataMessage;
        };
        /**
         * @return the registry
         */
        StructuredDataMessage.prototype.getRegistry = function () {
            return this.registry;
        };
        /**
         * @return the dataflow
         */
        StructuredDataMessage.prototype.getDataflow = function () {
            return this.dataflow;
        };
        /**
         * @param dataflow the dataflow to set
         */
        StructuredDataMessage.prototype.setDataflow = function (dataflow) {
            this.dataflow = dataflow;
        };
        return StructuredDataMessage;
    })();
    exports.StructuredDataMessage = StructuredDataMessage;
    var StructuredDataSet = (function () {
        function StructuredDataSet(ds, reg, struct) {
            this.dataSet = null;
            this.registry = null;
            this.structure = null;
            this.dataSet = ds;
            this.registry = reg;
            this.structure = struct;
        }
        StructuredDataSet.prototype.getStructuredValue = function (row, column) {
            return new StructuredValue(this.getDataSet().getColumnName(column), this.getDataSet().getValue(row, column), this.registry, this.getStructure());
        };
        StructuredDataSet.prototype.getColumnName = function (i) {
            var conceptString = this.getDataSet().getColumnName(i);
            //System.out.println("Concept="+conceptString);
            //System.out.println("ds="+getStructure());
            var c = this.getStructure().findComponentString(conceptString);
            if (c == null && conceptString == "type") {
                // "type" represents sdmx 2.0 cross sectional document 
                c = this.getStructure().getDataStructureComponents().getDimensionList().getMeasureDimension();
            }
            if (c == null) {
                console.log("Component is null conceptRef:" + conceptString);
                return conceptString;
            }
            var conceptRef = c.getConceptIdentity();
            var concept = null;
            if (conceptRef != null) {
                concept = this.registry.findConcept(conceptRef);
                return structure.NameableType.toString(concept);
            }
            else {
                throw new Error("Can't find Concept:" + conceptString);
            }
        };
        StructuredDataSet.prototype.size = function () {
            return this.getDataSet().size();
        };
        StructuredDataSet.prototype.getColumnCount = function () {
            return this.getDataSet().getColumnSize();
        };
        /**
         * @return the dataSet
         */
        StructuredDataSet.prototype.getDataSet = function () {
            return this.dataSet;
        };
        /**
         * @return the structure
         */
        StructuredDataSet.prototype.getStructure = function () {
            return this.structure;
        };
        StructuredDataSet.prototype.getColumnIndexes = function () {
            var result = [];
            for (var i = 0; i < this.getColumnCount(); i++) {
                result.push(i);
            }
            return result;
        };
        return StructuredDataSet;
    })();
    exports.StructuredDataSet = StructuredDataSet;
    var StructuredValue = (function () {
        function StructuredValue(concept, value, registry, struct) {
            this.concept = null;
            this.value = null;
            this.registry = null;
            this.structure = null;
            this.concept = concept;
            this.value = value;
            this.registry = registry;
            this.structure = struct;
        }
        StructuredValue.prototype.getRepresentation = function (reg, c) {
            var rep = c.getLocalRepresentation();
            if (rep == null) {
                var concept = reg.findConcept(c.getConceptIdentity());
            }
            return c.getLocalRepresentation();
        };
        StructuredValue.prototype.getLocalRepresentation = function (c) {
            if (c == null)
                return null;
            return c.getLocalRepresentation();
        };
        StructuredValue.prototype.isCoded = function () {
            var comp = this.structure.findComponentString(this.concept);
            if ("type" == this.concept) {
                comp = this.structure.getDataStructureComponents().getDimensionList().getMeasureDimension();
            }
            if (comp == null) {
                console.log("Comp is NUll!" + this.concept);
                return false;
            }
            var localRep = this.getRepresentation(this.registry, comp);
            if (localRep.getEnumeration() != null) {
                return true;
            }
            else
                return false;
        };
        StructuredValue.prototype.getCode = function () {
            //System.out.println("Concept:"+ concept+" Value:" + value);
            //Locale loc = Locale.getDefault();
            //ItemType item = ValueTypeResolver.resolveCode(registry, structure, concept, value);
            //System.out.println("Item=" + item.toString());
            //System.out.println("Item=" + item.findName(loc.getLanguage()));
            return ValueTypeResolver.resolveCode(this.registry, this.structure, this.concept, this.getValue());
        };
        StructuredValue.prototype.getCodelist = function () {
            return ValueTypeResolver.getPossibleCodes(this.registry, this.structure, this.concept);
        };
        StructuredValue.prototype.toString = function () {
            if (this.isCoded()) {
                var code = this.getCode();
                if (code == null) {
                    return this.getValue();
                }
                return structure.NameableType.toString(code);
            }
            return this.getValue();
        };
        /**
         * @return the concept
         */
        StructuredValue.prototype.getConcept = function () {
            return this.registry.findConcept(this.structure.findComponentString(this.concept).getConceptIdentity());
        };
        /**
         * @return the value
         */
        StructuredValue.prototype.getValue = function () {
            return this.value;
        };
        return StructuredValue;
    })();
    exports.StructuredValue = StructuredValue;
    var ValueTypeResolver = (function () {
        function ValueTypeResolver() {
        }
        ValueTypeResolver.resolveCode = function (registry, struct, column, value) {
            if (value == null) {
                return null;
            }
            var dim = struct.findComponentString(column);
            if (dim == null || "type" == column) {
                dim = struct.getDataStructureComponents().getDimensionList().getMeasureDimension();
            }
            var conceptRef = dim.getConceptIdentity();
            var rep = null;
            var concept = null;
            if (conceptRef != null) {
                concept = registry.findConcept(conceptRef);
                if (concept == null) {
                    console.log("Cant find concept:" + dim.getConceptIdentity().getId());
                    console.log(conceptRef.getAgencyId() + ":" + conceptRef.getMaintainableParentId() + ":" + conceptRef.getId() + ":" + conceptRef.getVersion());
                    var ct = new structure.CodeType();
                    ct.setId(new commonreferences.ID(value));
                    var name = new common.Name("en", value);
                    ct.setNames([name]);
                    return ct;
                }
                rep = dim.getLocalRepresentation();
            }
            if (rep != null) {
                if (rep.getEnumeration() != null) {
                    if (rep.getEnumeration().getRefClass().toInt() == commonreferences.ObjectTypeCodelistType.CODELIST.toInt()) {
                        var codelist = registry.findCodelist(rep.getEnumeration());
                        var id = null;
                        try {
                            id = new commonreferences.ID(value);
                        }
                        catch (err) {
                        }
                        if (codelist == null) {
                            throw new Error("Codelist is null Representation=" + rep.getEnumeration().toString());
                        }
                        var ct = null;
                        if (id != null) {
                            ct = codelist.findItemId(id);
                        }
                        if (ct == null) {
                            var ct2 = new structure.CodeType();
                            ct2.setId(id);
                            var name = new common.Name("en", "Missing Code:" + value);
                            var names = [];
                            names.push(name);
                            ct2.setNames(names);
                            return ct2;
                        }
                        else {
                            return ct;
                        }
                    }
                    else {
                        var cs = registry.findConceptScheme(rep.getEnumeration());
                        var conceptMeasure = null;
                        for (var i = 0; i < cs.size() && conceptMeasure == null; i++) {
                            var tempConcept = cs.getItem(i);
                            if (tempConcept.getId() != null && tempConcept.getId().toString() == value) {
                                conceptMeasure = cs.getItem(i);
                            }
                            else if (tempConcept.getId().toString() == value) {
                                conceptMeasure = tempConcept;
                            }
                        }
                        if (conceptMeasure != null) {
                            //System.out.println("ConceptMeasure:"+conceptMeasure);
                            return conceptMeasure;
                        }
                        return null;
                    }
                }
                else {
                    var itm = new structure.CodeType();
                    var name = new common.Name(sdmx.SdmxIO.getLocale(), value);
                    var names = [name];
                    itm.setNames(names);
                    return itm;
                }
            }
            var itm = new structure.CodeType();
            var name = new common.Name(sdmx.SdmxIO.getLocale(), value);
            var names = [name];
            itm.setNames(names);
            return itm;
        };
        ValueTypeResolver.getPossibleCodes = function (registry, struct, column) {
            var dim = struct.findComponentString(column);
            if (dim == null || "type" == column) {
                dim = struct.getDataStructureComponents().getDimensionList().getMeasureDimension();
            }
            var conceptRef = dim.getConceptIdentity();
            var rep = null;
            var concept = null;
            if (conceptRef != null) {
                concept = registry.findConcept(conceptRef);
                rep = dim.getLocalRepresentation();
            }
            if (rep != null) {
                if (rep.getEnumeration() != null) {
                    if (rep.getEnumeration().getRefClass().toInt() == commonreferences.ObjectTypeCodelistType.CODELIST.toInt()) {
                        var codelist = registry.findCodelist(rep.getEnumeration());
                        return codelist;
                    }
                    else {
                        var cs = registry.findConceptScheme(rep.getEnumeration());
                        return cs;
                    }
                }
            }
            return null;
        };
        return ValueTypeResolver;
    })();
    exports.ValueTypeResolver = ValueTypeResolver;
});

//# sourceMappingURL=data.js.map
