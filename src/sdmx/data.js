var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("sdmx/data", ["require", "exports", "sdmx/common", "sdmx/commonreferences", "sdmx/structure", "sdmx", "sdmx/time"], function (require, exports, common, commonreferences, structure, sdmx, timepack) {
    var Query = (function () {
        function Query(flow, registry) {
            this.flow = null;
            this.structRef = null;
            this.registry = null;
            this.query = [];
            this.startDate = new Date();
            this.endDate = new Date();
            this.updatedAfter = null;
            this.firstNObservations = null;
            this.lastNObservations = null;
            this.dimensionAtObservation = null;
            this.detail = null;
            this.includeHistory = null;
            this.providerRef = null;
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
                var dim1 = struct.getDataStructureComponents().getDimensionList().getDimensions()[i];
                keynames.push(dim1.getId().toString());
            }
            if (struct.getDataStructureComponents().getDimensionList().getMeasureDimension() != null) {
                var dim2 = struct.getDataStructureComponents().getDimensionList().getMeasureDimension();
                keynames.push(dim2.getId().toString());
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
        Query.prototype.getUpdatedAfter = function () { return this.updatedAfter; };
        Query.prototype.setUpdatedAfter = function (d) { this.updatedAfter = d; };
        Query.prototype.getFirstNObservations = function () {
            return this.firstNObservations;
        };
        Query.prototype.setFirstNObservations = function (n) {
            this.firstNObservations = n;
        };
        Query.prototype.getLastNObservations = function () {
            return this.lastNObservations;
        };
        Query.prototype.setLastNObservations = function (n) {
            this.lastNObservations = n;
        };
        Query.prototype.getDimensionAtObservation = function () {
            return this.dimensionAtObservation;
        };
        Query.prototype.setDimensionAtObservation = function (s) {
            this.dimensionAtObservation = s;
        };
        Query.prototype.setDetail = function (s) { this.detail = s; };
        Query.prototype.getDetail = function () { return this.detail; };
        Query.prototype.getIncludeHistory = function () { return this.includeHistory; };
        Query.prototype.setIncludeHistory = function (b) { this.includeHistory = b; };
        Query.prototype.setProviderRef = function (s) { this.providerRef = s; };
        Query.prototype.getProviderRef = function () {
            return this.providerRef;
        };
        Query.prototype.size = function () {
            return this.query.length;
        };
        return Query;
    })();
    exports.Query = Query;
    var QueryKey = (function () {
        function QueryKey(structRef, registry, s) {
            this.all = false;
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
        };
        QueryKey.prototype.isAll = function () {
            return this.all;
        };
        QueryKey.prototype.setAll = function (b) {
            this.all = b;
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
            if (this.isAll()) {
                return "";
            }
            else {
                var s = "";
                for (var i = 0; i < this.values.length; i++) {
                    s += this.values[i];
                    if (i < (this.values.length - 1)) {
                        s += "+";
                    }
                }
                return s;
            }
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
                return conceptString;
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
            // Cross Sectional Measures somtimes come in a a 'type' column..
            // see SDMX 2.0 example cross sectional file
            if ("type" == column) {
                dim = struct.getDataStructureComponents().getDimensionList().getMeasureDimension();
            }
            if (dim == null) {
                var itm = new structure.CodeType();
                var name = new common.Name(sdmx.SdmxIO.getLocale(), value);
                var names = [name];
                itm.setNames(names);
                return itm;
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
    var Cube = (function () {
        function Cube(struct, reg) {
            this.size = 0;
            this.order = [];
            this.struct = null;
            this.reg = null;
            this.mapper = new FlatColumnMapper();
            this.cubeObsMapper = new FlatColumnMapper();
            this.flatObsMapper = new FlatColumnMapper();
            this.validCodes = new collections.Dictionary();
            this.root = new RootCubeDimension();
            this.struct = struct;
            this.reg = reg;
        }
        Cube.prototype.getStructure = function () {
            return this.struct;
        };
        Cube.prototype.getStructureReference = function () {
            return this.struct.asReference();
        };
        Cube.prototype.getRootCubeDimension = function () {
            return this.root;
        };
        Cube.prototype.putObservation = function (order, mapper, obs) {
            var dim = this.getRootCubeDimension();
            this.order = order;
            var time = null;
            var cubeobs = null;
            for (var i = 0; i < this.struct.getDataStructureComponents().getDimensionList().getDimensions().length; i++) {
                //if( struct.getDataStructureComponents().getDimensionList().getDimension(i).)
                // This line goes through the components in their datastructure order
                //IDType dimId = struct.getDataStructureComponents().getDimensionList().getDimension(i).getId();
                // This line goes through the components in their specified order
                var dimId = null;
                if (order != null) {
                    dimId = new commonreferences.ID(order[i]);
                }
                else {
                    dimId = this.struct.getDataStructureComponents().getDimensionList().getDimensions()[i].getId();
                }
                if (this.validCodes[dimId.toString()] == null) {
                    this.validCodes[dimId.toString()] = [];
                    if (this.mapper.getColumnIndex(dimId.toString()) == -1) {
                        this.mapper.registerColumn(dimId.toString(), AttachmentLevel.OBSERVATION);
                        this.cubeObsMapper.registerColumn(dimId.toString(), AttachmentLevel.OBSERVATION);
                        this.flatObsMapper.registerColumn(dimId.toString(), AttachmentLevel.OBSERVATION);
                    }
                }
                /*
                    If the data you are trying to make a cube from does not have a complete key
                    with values for all dimensions, mapper.getColumnIndex(dimId.toString()) returns -1
                    here (because there is no dimension of that name in the FlatObservation)
                    this filters down into FlatObservation.getValue(-1) which causes an array index
                    out of bounds exception!
                 */
                if (mapper.getColumnIndex(dimId.toString()) == -1) {
                    this.mapper.registerColumn(dimId.toString(), AttachmentLevel.OBSERVATION);
                    this.cubeObsMapper.registerColumn(dimId.toString(), AttachmentLevel.OBSERVATION);
                    this.flatObsMapper.registerColumn(dimId.toString(), AttachmentLevel.OBSERVATION);
                }
                var myDim = dim.getSubCubeDimension(obs.getValue(mapper.getColumnIndex(dimId.toString())));
                if (myDim == null) {
                    myDim = new ListCubeDimension(dimId.toString(), obs.getValue(mapper.getColumnIndex(dimId.toString())));
                    dim.putSubCubeDimension(myDim);
                    if (!collections.arrays.contains(this.validCodes[dimId.toString()], myDim.getValue())) {
                        this.validCodes[dimId.toString()].push(myDim.getValue());
                    }
                }
                dim = myDim;
            }
            var myDim = null;
            var dimId = this.struct.getDataStructureComponents().getDimensionList().getTimeDimension().getId();
            if (this.validCodes[dimId.toString()] == null) {
                this.validCodes[dimId.toString()] = [];
            }
            var i = this.mapper.getColumnIndex(dimId.toString());
            var s = obs.getValue(i);
            myDim = dim.getSubCubeDimension(obs.getValue(mapper.getColumnIndex(dimId.toString())));
            if (myDim == null) {
                myDim = new TimeCubeDimension(dimId.toString(), obs.getValue(mapper.getColumnIndex(dimId.toString())));
                dim.putSubCubeDimension(myDim);
                if (!collections.arrays.contains(this.validCodes[dimId.toString()], myDim.getValue())) {
                    this.validCodes[dimId.toString()].push(myDim.getValue());
                }
            }
            time = myDim;
            var cross = null;
            var dimId2 = null;
            if (this.struct.getDataStructureComponents().getDimensionList().getMeasureDimension() != null) {
                dimId2 = this.struct.getDataStructureComponents().getDimensionList().getMeasureDimension().getId();
                if (this.validCodes[dimId2.toString()] == null) {
                    this.validCodes[dimId2.toString()] = [];
                    if (this.mapper.getColumnIndex(dimId2.toString()) == -1) {
                        this.mapper.registerColumn(dimId2.toString(), AttachmentLevel.OBSERVATION);
                        this.cubeObsMapper.registerColumn(dimId2.toString(), AttachmentLevel.OBSERVATION);
                        this.flatObsMapper.registerColumn(dimId2.toString(), AttachmentLevel.OBSERVATION);
                    }
                }
                cross = obs.getValue(mapper.getColumnIndex(dimId2.toString()));
                if (!collections.arrays.contains(this.validCodes[dimId2.toString()], cross)) {
                    this.validCodes[dimId2.toString()].push(cross);
                }
            }
            var dimId3 = this.struct.getDataStructureComponents().getMeasureList().getPrimaryMeasure().getId();
            if (dimId2 != null) {
                cubeobs = new CubeObservation(dimId2.toString(), cross, dimId3.toString(), obs.getValue(mapper.getColumnIndex(dimId3.toString())));
                if (this.mapper.getColumnIndex(dimId2.toString()) == -1) {
                    this.mapper.registerColumn(dimId2.toString(), AttachmentLevel.OBSERVATION);
                    this.cubeObsMapper.registerColumn(dimId2.toString(), AttachmentLevel.OBSERVATION);
                }
            }
            else {
                cubeobs = new CubeObservation(null, null, dimId3.toString(), obs.getValue(mapper.getColumnIndex(dimId3.toString())));
                if (this.mapper.getColumnIndex(dimId3.toString()) == -1) {
                    this.mapper.registerColumn(dimId3.toString(), AttachmentLevel.OBSERVATION);
                    this.flatObsMapper.registerColumn(dimId3.toString(), AttachmentLevel.OBSERVATION);
                }
            }
            time.putObservation(cubeobs);
            for (var k = 0; k < this.struct.getDataStructureComponents().getAttributeList().getAttributes().length; k++) {
                var name = this.struct.getDataStructureComponents().getAttributeList().getAttributes()[k].getId().toString();
                var value = null;
                if (mapper.getColumnIndex(name) != -1) {
                    value = obs.getValue(mapper.getColumnIndex(name));
                    cubeobs.putAttribute(new CubeAttribute(name, value));
                }
            }
            // Increment Size counter
            this.size++;
        };
        Cube.prototype.getColumnMapper = function () {
            return this.mapper;
        };
        Cube.prototype.getFlatColumnMapper = function () {
            return this.flatObsMapper;
        };
        Cube.prototype.getCubeObsColumnMapper = function () {
            return this.cubeObsMapper;
        };
        Cube.prototype.find = function (key) {
            return this.findLatest(key, false);
        };
        Cube.prototype.findFlatObs = function (key) {
            return this.findLatest(key, false);
        };
        Cube.prototype.findLatest = function (key, latest) {
            var dim = this.getRootCubeDimension();
            var oldDim = dim;
            for (var i = 0; i < this.struct.getDataStructureComponents().getDimensionList().getDimensions().length; i++) {
                dim = dim.getSubCubeDimension(key.getComponent(dim.getSubDimension()));
                if (dim == null) {
                    //System.out.println("Can't find dim:"+key.getComponent(order.get(i))+":"+oldDim.getSubDimension());
                    return null;
                }
                oldDim = dim;
            }
            var time = this.struct.getDataStructureComponents().getDimensionList().getTimeDimension();
            if (time == null) {
                throw new Error("Time Dimension Is Null");
            }
            else if (latest) {
                var timesList = dim.listDimensionValues();
                for (var i = 0; i < timesList.length; i++) {
                    for (var j = 0; j < timesList.length - i; j++) {
                        var t1 = timepack.TimeUtil.parseTime(timesList[i], null);
                        var t2 = timepack.TimeUtil.parseTime(timesList[j], null);
                        if (t1.getStart() > t2.getStart()) {
                            collections.arrays.swap(timesList, i, j);
                        }
                    }
                }
                var timeValue = timesList[timesList.length - 1];
                var tcd = dim.getSubCubeDimension(timeValue);
                if (tcd == null) {
                    //System.out.println("TCD null:"+key.getComponent(time.getId().toString()+":"+timeValue));
                    //dim.dump();
                    return null;
                }
                if (this.struct.getDataStructureComponents().getDimensionList().getMeasureDimension() != null) {
                    var measure = key.getComponent(this.struct.getDataStructureComponents().getDimensionList().getMeasureDimension().getId().toString());
                    //tcd.dump();
                    //System.out.println("Measure="+measure);
                    return tcd.getObservation(measure).toCubeObs(key, this.mapper);
                }
                else {
                    var co = tcd.getObservation(null);
                    return co.toCubeObs(key, this.mapper);
                    ;
                }
            }
            else {
                var timeValue = key.getComponent(time.getId().toString());
                var tcd = dim.getSubCubeDimension(timeValue);
                if (tcd == null) {
                    //System.out.println("TCD null:"+key.getComponent(time.getId().toString()+":"+timeValue));
                    //dim.dump();
                    return null;
                }
                if (this.struct.getDataStructureComponents().getDimensionList().getMeasureDimension() != null) {
                    var measure = key.getComponent(this.struct.getDataStructureComponents().getDimensionList().getMeasureDimension().getId().toString());
                    //tcd.dump();
                    //System.out.println("Measure="+measure);
                    return tcd.getObservation(measure).toCubeObs(key, this.cubeObsMapper);
                }
                else {
                    var co = tcd.getObservation(null);
                    return co.toCubeObs(key, this.cubeObsMapper);
                }
            }
        };
        Cube.prototype.findLatestFlatObs = function (key, latest) {
            var dim = this.getRootCubeDimension();
            var oldDim = dim;
            for (var i = 0; i < this.struct.getDataStructureComponents().getDimensionList().getDimensions().length; i++) {
                dim = dim.getSubCubeDimension(key.getComponent(dim.getSubDimension()));
                if (dim == null) {
                    //System.out.println("Can't find dim:"+key.getComponent(order.get(i))+":"+oldDim.getSubDimension());
                    return null;
                }
                oldDim = dim;
            }
            var time = this.struct.getDataStructureComponents().getDimensionList().getTimeDimension();
            if (time == null) {
                throw new Error("Time Dimension Is Null");
            }
            else if (latest) {
                var timesList = dim.listDimensionValues();
                for (var i = 0; i < timesList.length; i++) {
                    for (var j = 0; j < timesList.length - i; j++) {
                        var t1 = timepack.TimeUtil.parseTime(timesList[i], null);
                        var t2 = timepack.TimeUtil.parseTime(timesList[j], null);
                        if (t1.getStart() > t2.getStart()) {
                            collections.arrays.swap(timesList, i, j);
                        }
                    }
                }
                var timeValue = timesList[timesList.length - 1];
                var tcd = dim.getSubCubeDimension(timeValue);
                if (tcd == null) {
                    //System.out.println("TCD null:"+key.getComponent(time.getId().toString()+":"+timeValue));
                    //dim.dump();
                    return null;
                }
                if (this.struct.getDataStructureComponents().getDimensionList().getMeasureDimension() != null) {
                    var measure = key.getComponent(this.struct.getDataStructureComponents().getDimensionList().getMeasureDimension().getId().toString());
                    //tcd.dump();
                    //System.out.println("Measure="+measure);
                    return tcd.getObservation(measure).toFlatObs(key, this.flatObsMapper);
                }
                else {
                    var co = tcd.getObservation(null);
                    return co.toFlatObs(key, this.flatObsMapper);
                    ;
                }
            }
            else {
                var timeValue = key.getComponent(time.getId().toString());
                var tcd = dim.getSubCubeDimension(timeValue);
                if (tcd == null) {
                    //System.out.println("TCD null:"+key.getComponent(time.getId().toString()+":"+timeValue));
                    //dim.dump();
                    return null;
                }
                if (this.struct.getDataStructureComponents().getDimensionList().getMeasureDimension() != null) {
                    var measure = key.getComponent(this.struct.getDataStructureComponents().getDimensionList().getMeasureDimension().getId().toString());
                    //tcd.dump();
                    //System.out.println("Measure="+measure);
                    return tcd.getObservation(measure).toFlatObs(key, this.flatObsMapper);
                }
                else {
                    var co = tcd.getObservation(null);
                    return co.toFlatObs(key, this.flatObsMapper);
                }
            }
        };
        Cube.prototype.getValues = function (col) {
            var list = this.validCodes[col];
            if (list == null) {
                return [];
            }
            return list;
        };
        /**
         * @return the size
         */
        Cube.prototype.getSize = function () {
            return this.size;
        };
        Cube.prototype.getObservationCount = function () {
            return this.size;
        };
        Cube.prototype.getAllItems = function (col) {
            var com = this.getStructure().findComponentString(col);
            return this.reg.findItemType(com.getLocalRepresentation().getEnumeration()).getItems();
        };
        Cube.prototype.getAllValues = function (col) {
            var items = this.getAllItems(col);
            var result = [];
            for (var i = 0; i < items.length; i++) {
                result.push(items[i].getId().toString());
            }
            return result;
        };
        Cube.prototype.getSparsity = function () {
            return (this.getObservationCount() / this.getCellCount()) * 100;
        };
        Cube.prototype.getItems = function (col) {
            var com = this.getStructure().findComponentString(col);
            var result = [];
            var items = this.reg.findItemType(com.getLocalRepresentation().getEnumeration()).getItems();
            var codes = this.getValues(col);
            for (var i = 0; i < items.length; i++) {
                for (var j = 0; j < codes.length; j++) {
                    if (codes[j] == items[i].getId().getString()) {
                        result.push(items[i]);
                    }
                }
            }
            return result;
        };
        Cube.prototype.getCellCount = function () {
            var c = this.getValues(this.mapper.getColumnName(0)).length;
            for (var i = 1; i < this.mapper.size(); i++) {
                c *= this.getValues(this.mapper.getColumnName(i)).length;
            }
            return c;
        };
        Cube.prototype.dump = function () {
            this.recurse(this.root, 0);
        };
        Cube.prototype.recurse = function (dim, n) {
            for (var i = 0; i < dim.listSubDimensions().length; i++) {
                this.recurse(dim.listSubDimensions()[i], n + 1);
            }
            console.log(n + ":" + dim.getConcept() + ":" + dim.getValue());
        };
        return Cube;
    })();
    exports.Cube = Cube;
    var CubeDimension = (function () {
        function CubeDimension(concept, value) {
            this.concept = null;
            this.value = null;
            this.subDimension = null;
            this.subDimensions = [];
            this.concept = concept;
            this.value = value;
        }
        /**
         * @return the concept
         */
        CubeDimension.prototype.getConcept = function () {
            return this.concept;
        };
        /**
         * @param concept the concept to set
         */
        CubeDimension.prototype.setConcept = function (concept) {
            this.concept = concept;
        };
        CubeDimension.prototype.getSubCubeDimension = function (id) {
            for (var i = 0; i < this.subDimensions.length; i++) {
                if (this.subDimensions[i].getValue() == id) {
                    return this.subDimensions[i];
                }
            }
            return null;
        };
        CubeDimension.prototype.putSubCubeDimension = function (sub) {
            var sub2 = this.getSubCubeDimension(sub.getValue());
            if (sub2 != null) {
                // Remove Old Dimension
                this.subDimensions = this.subDimensions.splice(this.subDimensions.indexOf(sub2), 1);
            }
            this.subDimensions.push(sub);
        };
        CubeDimension.prototype.listSubDimensions = function () { return this.subDimensions; };
        CubeDimension.prototype.listDimensionValues = function () {
            var result = [];
            for (var i = 0; i < this.subDimensions.length; i++) {
                result.push(this.subDimensions[i].getValue());
            }
            return result;
        };
        /**
         * @return the value
         */
        CubeDimension.prototype.getValue = function () {
            return this.value;
        };
        /**
         * @param value the value to set
         */
        CubeDimension.prototype.setValue = function (value) {
            this.value = value;
        };
        CubeDimension.prototype.dump = function () {
        };
        /**
         * @return the subDimension
         */
        CubeDimension.prototype.getSubDimension = function () {
            return this.subDimension;
        };
        /**
         * @param subDimension the subDimension to set
         */
        CubeDimension.prototype.setSubDimension = function (subDimension) {
            this.subDimension = subDimension;
        };
        return CubeDimension;
    })();
    exports.CubeDimension = CubeDimension;
    var ListCubeDimension = (function (_super) {
        __extends(ListCubeDimension, _super);
        function ListCubeDimension(concept, value) {
            _super.call(this, concept, value);
            this.list = [];
            if (concept == null) {
                console.log("concept is null:ListCubeDimension");
            }
        }
        ListCubeDimension.prototype.getSubCubeDimension = function (id) {
            for (var i = 0; i < this.list.length; i++) {
                var cd = this.list[i];
                if (cd.getValue() == id) {
                    return cd;
                }
            }
            return null;
        };
        ListCubeDimension.prototype.putSubCubeDimension = function (sub) {
            //console.log("ListCubeDimension.putSubCubeDimension()");
            var old = this.getSubCubeDimension(sub.getValue());
            if (old != null) {
                this.list.splice(this.list.indexOf(old), 1);
            }
            this.list.push(sub);
            this.setSubDimension(sub.getConcept());
        };
        ListCubeDimension.prototype.listSubDimensions = function () {
            return this.list;
        };
        ListCubeDimension.prototype.listDimensionValues = function () {
            var set = [];
            for (var i = 0; i < this.list.length; i++) {
                set.push(this.list[i].getValue());
            }
            return set;
        };
        return ListCubeDimension;
    })(CubeDimension);
    exports.ListCubeDimension = ListCubeDimension;
    var RootCubeDimension = (function (_super) {
        __extends(RootCubeDimension, _super);
        function RootCubeDimension() {
            _super.call(this, null, null);
        }
        return RootCubeDimension;
    })(ListCubeDimension);
    exports.RootCubeDimension = RootCubeDimension;
    var TimeCubeDimension = (function (_super) {
        __extends(TimeCubeDimension, _super);
        function TimeCubeDimension(concept, value) {
            _super.call(this, concept, value);
            this.obs = [];
        }
        TimeCubeDimension.prototype.listObservations = function () {
            return this.obs;
        };
        TimeCubeDimension.prototype.putObservation = function (sub) {
            this.obs.push(sub);
        };
        TimeCubeDimension.prototype.getObservation = function (id) {
            for (var i = 0; i < this.obs.length; i++) {
                var c = this.obs[i];
                if (c.getCrossSection() == null) {
                    return c;
                }
                if (c.getCrossSection() == id) {
                    return c;
                }
            }
            return null;
        };
        TimeCubeDimension.prototype.listObservationValues = function () {
            // TO DO
            return [];
        };
        TimeCubeDimension.prototype.listSubDimensions = function () {
            return [];
        };
        TimeCubeDimension.prototype.listDimensionValues = function () {
            return [];
        };
        return TimeCubeDimension;
    })(CubeDimension);
    exports.TimeCubeDimension = TimeCubeDimension;
    var CubeObservation = (function () {
        function CubeObservation(crossSectionalMeasureConcept, crossSection, primaryMeasureConcept, value) {
            this.map = new collections.Dictionary();
            this.concept = null;
            this.cross = null;
            this.observationConcept = null;
            this.value = null;
            this.concept = crossSectionalMeasureConcept;
            this.cross = crossSection;
            this.observationConcept = primaryMeasureConcept;
            this.value = value;
        }
        CubeObservation.prototype.getAttribute = function (id) {
            return this.map.getValue(id);
        };
        CubeObservation.prototype.putAttribute = function (sub) {
            this.map.setValue(sub.getConcept(), sub);
        };
        CubeObservation.prototype.listAttributes = function () {
            return this.map.values();
        };
        CubeObservation.prototype.listAttributeNames = function () {
            return this.map.keys();
        };
        /**
         * @return the concept
         */
        CubeObservation.prototype.getCrossSection = function () {
            return this.cross;
        };
        /**
         * @param concept the concept to set
         */
        CubeObservation.prototype.setCrossSection = function (concept) {
            this.cross = concept;
        };
        /**
         * @return the value
         */
        CubeObservation.prototype.getValue = function () {
            return this.value;
        };
        /**
         * @param value the value to set
         */
        CubeObservation.prototype.setValue = function (value) {
            this.value = value;
        };
        /**
         * @return the concept
         */
        CubeObservation.prototype.getConcept = function () {
            return this.concept;
        };
        /**
         * @param concept the concept to set
         */
        CubeObservation.prototype.setConcept = function (concept) {
            this.concept = concept;
        };
        /**
         * @return the observationConcept
         */
        CubeObservation.prototype.getObservationConcept = function () {
            return this.observationConcept;
        };
        /**
         * @param observationConcept the observationConcept to set
         */
        CubeObservation.prototype.setObservationConcept = function (observationConcept) {
            this.observationConcept = observationConcept;
        };
        CubeObservation.prototype.toCubeObs = function (key, mapper) {
            var f = new CubeObs();
            for (var i = 0; i < mapper.size(); i++) {
                var s = mapper.getColumnName(i);
                var v = key.getComponent(s);
                f.addValue(s, v);
            }
            // Cross Sectional Data
            if (this.concept != null) {
                f.addValue(this.concept, this.cross);
            }
            f.addValue(this.observationConcept, this.value);
            for (var i = 0; i < this.map.keys().length; i++) {
                var s = this.map.keys()[i];
                var v2 = this.map.getValue(s);
                f.addValue(s, v2.getValue());
            }
            return f;
        };
        CubeObservation.prototype.toFlatObs = function (key, mapper) {
            var f = new FlatObs([]);
            mapper.getObservationColumns().forEach(function (s) {
                var v = key.getComponent(s);
                f.setValue(mapper.getColumnIndex(s), v);
            });
            // Cross Sectional Data
            if (this.concept != null) {
                f.setValue(mapper.getColumnIndex(this.concept), this.cross);
            }
            // OBS_VALUE
            f.setValue(mapper.getColumnIndex(this.observationConcept), this.value);
            this.map.forEach(function (at) {
                var ca = this.getAttribute(at);
                // Attributes
                f.setValue(mapper.getColumnIndex(ca.getConcept()), ca.getValue());
            });
            return f;
        };
        return CubeObservation;
    })();
    exports.CubeObservation = CubeObservation;
    var CubeAttribute = (function () {
        function CubeAttribute(concept, value) {
            this.concept = null;
            this.value = null;
            this.concept = concept;
            this.value = value;
        }
        CubeAttribute.prototype.getConcept = function () {
            return this.concept;
        };
        CubeAttribute.prototype.getValue = function () {
            return this.value;
        };
        return CubeAttribute;
    })();
    exports.CubeAttribute = CubeAttribute;
    var CubeObs = (function () {
        function CubeObs() {
        }
        CubeObs.prototype.addValue = function (c, v) {
        };
        return CubeObs;
    })();
    exports.CubeObs = CubeObs;
});

//# sourceMappingURL=data.js.map
