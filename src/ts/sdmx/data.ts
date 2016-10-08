/*
    This file is part of sdmx-js.

    sdmx-js is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    sdmx-js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with sdmx-js.  If not, see <http://www.gnu.org/licenses/>.
    Copyright (C) 2016 James Gardner
*/
/// <amd-module name='sdmx/data'/>
///<reference path="../collections.ts"/>
import interfaces = require("sdmx/interfaces");
import common = require("sdmx/common");
import commonreferences = require("sdmx/commonreferences");
import structure = require("sdmx/structure");
import message = require("sdmx/message");
import moment = require("moment");
import sdmx = require("sdmx");
export class Query {
    private flow: structure.Dataflow = null;
    private structRef: commonreferences.Reference = null;
    private registry: interfaces.LocalRegistry = null;
    private query: Array<QueryKey> = [];
    private startDate: Date = new Date();
    private endDate: Date = new Date();
    private updatedAfter: Date = null;
    private firstNObservations: number = null;
    private lastNObservations: number = null;
    private dimensionAtObservation: string = null;
    private detail: string = null;
    private includeHistory: boolean = null;
    private providerRef: string = null;

    constructor(flow: structure.Dataflow, registry: interfaces.LocalRegistry) {
        this.flow = flow;
        this.structRef = flow.getStructure();
        this.registry = registry;
        var kns = this.getKeyNames();
        for (var i: number = 0; i < kns.length; i++) {
            this.query.push(new QueryKey(this.structRef, registry, kns[i]));
        }
        this.startDate.setFullYear(2000);
        this.endDate.setFullYear(2016);
    }
    public getQueryKey(id: string) {
        for (var i: number = 0; i < this.query.length; i++) {
            if (this.query[i].getName() == id) return this.query[i];
        }
        return null;
    }
    public getKeyNames(): Array<string> {
        var struct: structure.DataStructure = this.registry.findDataStructure(this.structRef);
        var keynames = [];
        for (var i: number = 0; i < struct.getDataStructureComponents().getDimensionList().getDimensions().length; i++) {
            var dim: structure.Dimension = struct.getDataStructureComponents().getDimensionList().getDimensions()[i];
            keynames.push(dim.getId().toString());
        }
        if (struct.getDataStructureComponents().getDimensionList().getMeasureDimension() != null) {
            var dim: structure.Dimension = struct.getDataStructureComponents().getDimensionList().getMeasureDimension();
            keynames.push(dim.getId().toString());
        }
        return keynames;
    }
    getDataflow(): structure.Dataflow {
        return this.flow;
    }
    getRegistry(): interfaces.LocalRegistry {
        return this.registry;
    }
    getStartDate(): Date {
        return this.startDate;
    }
    getEndDate(): Date {
        return this.endDate;
    }
    setStartDate(d: Date) {
        this.startDate = d;
    }
    setEndDate(d: Date) {
        this.endDate = d;
    }
    getQueryString() {
        var qString: string = "";
        var keyNames = this.getKeyNames();
        for (var i: number = 0; i < keyNames.length; i++) {
            qString += this.getQueryKey(keyNames[i]).getQueryString();
            if (i < (keyNames.length - 1)) {
                qString += ".";
            }
        }
        return qString;
    }
    getUpdatedAfter(): Date { return this.updatedAfter; }
    setUpdatedAfter(d: Date) { this.updatedAfter = d; }
    getFirstNObservations(): number {
        return this.firstNObservations;
    }
    setFirstNObservations(n: number) {
        this.firstNObservations = n;
    }
    getLastNObservations(): number {
        return this.lastNObservations;
    }
    setLastNObservations(n: number) {
        this.lastNObservations = n;
    }
    getDimensionAtObservation(): string {
        return this.dimensionAtObservation;
    }
    setDimensionAtObservation(s: string) {
        this.dimensionAtObservation = s;
    }
    setDetail(s: string) { this.detail = s; }
    getDetail(): string { return this.detail; }
    getIncludeHistory(): boolean { return this.includeHistory; }
    setIncludeHistory(b: boolean) { this.includeHistory = b; }
    setProviderRef(s: string) { this.providerRef = s; }
    getProviderRef(): string {
        return this.providerRef;
    }
}
export class QueryKey {
    private structRef: commonreferences.Reference = null;
    private registry: interfaces.LocalRegistry = null;
    private name: string = null;
    private values: Array<string> = [];
    constructor(structRef: commonreferences.Reference, registry: interfaces.LocalRegistry, s: string) {
        this.structRef = structRef;
        this.registry = registry;
        this.name = s;
    }
    public getName(): string { return this.name; }
    public getValues(): Array<string> {
        return this.values;
    }
    public setName(s: string) { this.name = s; }
    public setValue(a: Array<string>) {
        this.values = a;
    }
    public addValue(s: string) {
        for (var i: number = 0; i < this.values.length; i++) {
            // already in here
            if (this.values[i] == s) return;
        }
        this.values.push(s);
    }
    public removeValue(s: string) {
        collections.arrays.remove(this.values, s);
    }
    public getItemScheme(): structure.ItemSchemeType {
        var comp: structure.Component = this.registry.findDataStructure(this.structRef).findComponentString(this.name);
        var lr = comp.getLocalRepresentation();
        if (lr == null || lr.getEnumeration() == null) {
            var conceptScheme: structure.ConceptSchemeType = this.registry.findConceptScheme(comp.getConceptIdentity());
            return conceptScheme;
        } else {
            if (lr != null) {
                var codelist = this.registry.findCodelist(lr.getEnumeration());
                return codelist;
            }
            // lr == null
            return null;
        }
        return null;
    }
    public possibleValues(): Array<string> {
        var result = [];
        var itemScheme: structure.ItemSchemeType = this.getItemScheme();
        for (var i: number = 0; i < itemScheme.size(); i++) {
            var itm: structure.ItemType = itemScheme.getItem(i);
            result.push(itm.getId().toString());
        }
        return result;;
    }
    getQueryString() {
        var s: string = "";
        for (var i: number = 0; i < this.values.length; i++) {
            s += this.values[i];
            if (i < (this.values.length - 1)) {
                s += "+";
            }
        }
        return s;
    }
}

export class FlatObs {
    private values: Array<string> = [];
    constructor(vals: Array<string>) {
        this.values = vals;
        if (vals == null) {
            this.values = [];
        }
    }
    setValue(i: number, o: string) {
        if (this.values.length <= i) {
            for (var j: number = this.values.length; (j - 1) < i; j++) {
                this.values.push(null);
            }
        }
        this.values[i] = o;
    }
    getValue(i: number): string {
        if (i >= this.values.length) { return null; }
        return this.values[i];
    }
    dump() {
        var s: string = "";
        for (var i: number = 0; i < this.values.length; i++) {
            s += this.values[i];
            if (i < this.values.length) s += " ";
        }
        console.log(s);
    }
    size(): number {
        return this.values.length;
    }

}


export class AttachmentLevel {
    private static LIST: Array<AttachmentLevel> = [];

    public static ATTACHMENT_DATASET: number = 0;
    public static ATTACHMENT_SERIES: number = 1;
    public static ATTACHMENT_OBSERVATION: number = 2;
    public static ATTACHMENT_GROUP: number = 3;
    public static ATTACHMENT_DATASET_STRING: string = "DataSet";
    public static ATTACHMENT_SERIES_STRING: string = "Series";
    public static ATTACHMENT_OBSERVATION_STRING: string = "Observation";
    public static ATTACHMENT_GROUP_STRING: string = "Group";
    public static DATASET: AttachmentLevel = new AttachmentLevel(AttachmentLevel.ATTACHMENT_DATASET_STRING, AttachmentLevel.ATTACHMENT_DATASET);
    public static SERIES: AttachmentLevel = new AttachmentLevel(AttachmentLevel.ATTACHMENT_SERIES_STRING, AttachmentLevel.ATTACHMENT_SERIES);
    public static OBSERVATION: AttachmentLevel = new AttachmentLevel(AttachmentLevel.ATTACHMENT_OBSERVATION_STRING, AttachmentLevel.ATTACHMENT_OBSERVATION);
    public static GROUP: AttachmentLevel = new AttachmentLevel(AttachmentLevel.ATTACHMENT_GROUP_STRING, AttachmentLevel.ATTACHMENT_GROUP);

    private name: string = null;
    private id: number = 0;



    constructor(s: string, id: number) {
        this.name = s;
        this.id = id;
        AttachmentLevel.LIST.push(this);
    }
    public getName(): string { return this.name; }
    public getId(): number { return this.id; }
    public static fromString(s: string): AttachmentLevel {
        for (var i: number = 0; i < AttachmentLevel.LIST.length; i++) {
            if (AttachmentLevel.LIST[i].getName() == s) return AttachmentLevel.LIST[i];
        }
        return null;
    }
    public static fromId(id: number): AttachmentLevel {
        for (var i: number = 0; i < AttachmentLevel.LIST.length; i++) {
            if (AttachmentLevel.LIST[i].getId() == id) return AttachmentLevel.LIST[i];
        }
        return null;
    }


}
export class AbstractKey {
    getComponent(s: string): string {
        return "";
    }
}
export class PartialKey extends AbstractKey {
}
export class FullKey extends AbstractKey {
}
export class Cube {
    putObservation(order: Array<string>, mapper: interfaces.ColumnMapper, o: FlatObs) {

    }
}

export class Group {
    private groupName: string = null;
    private groupKey: collections.Dictionary<string, any> = new collections.Dictionary<string, any>();
    private groupAttributes: collections.Dictionary<string, any> = new collections.Dictionary<string, any>();

    private map: collections.Dictionary<string, any> = new collections.Dictionary<string, any>();

    constructor() {

    }

    public static Group(groupValues: collections.Dictionary<string, any>): Group {
        var g: Group = new Group();
        g.map = groupValues;
        return g;
    }

    putGroupValue(concept: string, value: any) {
        this.map.setValue(concept, value);
    }

    getGroupValue(concept: string): any {
        return this.groupAttributes.getValue(concept);
    }

    processGroupValues(ds: interfaces.DataSet) {
        this.groupAttributes = new collections.Dictionary<string, any>();
        var keys: Array<string> = this.map.keys();
        for (var i = 0; i < keys.length; i++) {
            var s: string = keys[i];
            if (ds.getColumnMapper().getColumnIndex(s) == -1 || ds.getColumnMapper().isAttachedToGroupString(s)) {
                this.groupAttributes.setValue(s, this.map.getValue(s));
                if (!ds.getColumnMapper().isAttachedToGroupString(s)) {
                    ds.getColumnMapper().registerColumn(s, AttachmentLevel.GROUP);
                }
            } else {
                this.groupKey.setValue(s, this.map.getValue(s));
                collections.arrays.remove(keys, s);
            }
        }
        this.map = null;
    }

    getGroupKey(): collections.Dictionary<string, any> {
        return this.groupKey;
    }
    public matches(key: FullKey): boolean {
        var keys: Array<string> = this.getGroupKey().keys();
        for (var i = 0; i < keys.length; i++) {
            var s: string = keys[i];
            var gv: any = this.getGroupKey().getValue(s);
            if (gv != null) {
                if (!(key.getComponent(s) == gv)) {
                    return false;
                }
            }
        }
        return true;
    }
    getGroupAttributes(): collections.Dictionary<string, any> {
        return this.groupAttributes;
    }
    getGroupName(): string {
        return this.groupName;
    }

    setGroupName(groupName: string) {
        this.groupName = groupName;
    }

    setGroupValue(columnName: string, val: string) {
        this.groupAttributes.setValue(columnName, val);
    }
}
export class FlatColumnMapper implements interfaces.ColumnMapper {

    private columns: Array<string> = [];
    private groupColumns: Array<string> = [];

    registerColumn(s: string, attach: AttachmentLevel): number {
        if (collections.arrays.contains(this.columns, s) || collections.arrays.contains(this.groupColumns, s)) {
            throw new Error("Attempt to Register already registered Column!!");
        }
        if (attach == AttachmentLevel.GROUP) {
            this.groupColumns.push(s);
            this.columns.push(s);
            return this.columns.indexOf(s);
        } else {
            this.columns.push(s);
            return this.columns.indexOf(s);
        }
    }

    getColumnIndex(s: string): number {
        return this.columns.indexOf(s);
    }

    getColumnName(i: number): string {
        return this.columns[i];
    }

    size(): number {
        return this.columns.length;
    }

    containsColumn(name: string): boolean {
        for (var i: number = 0; i < this.columns.length; i++) {
            if (this.columns[i] == name) {
                return true;
            }
        }
        return false;
    }

    getAllColumns(): Array<string> {
        var result: Array<string> = [];
        for (var i: number = 0; i < this.columns.length; i++) {
            result.push(this.columns[i]);
        }
        return result;
    }

    getObservationColumns(): Array<string> {
        var result: Array<string> = [];
        for (var i: number = 0; i < this.columns.length; i++) {
            result.push(this.columns[i]);
        }
        return result;

    }

    getSeriesColumns(): Array<string> {
        return [];
    }

    getDataSetColumns(): Array<string> {
        return [];
    }

    getGroupColumns(): Array<string> {
        return [];
    }

    isAttachedToDataSetString(s: string): boolean {
        return false;
    }

    isAttachedToDataSetInt(i: number): boolean {
        return false;
    }

    isAttachedToSeriesString(s: string): boolean {
        return false;
    }

    isAttachedToSeriesInt(i: number): boolean {
        return false;
    }

    isAttachedToObservationString(s: string): boolean {
        return collections.arrays.contains(this.columns, s);
    }

    isAttachedToObservationInt(i: number): boolean {
        return true;
    }

    isAttachedToGroupString(s: string): boolean {
        return collections.arrays.contains(this.groupColumns, s);
    }

    isAttachedToGroupInt(i: number): boolean {
        return this.isAttachedToGroupString(this.getColumnName(i));
    }

    dump() {
        console.log("Column Mapper");
        for (var i: number = 0; i < this.size(); i++) {
            console.log(i + " = " + this.getColumnName(i));
        }

    }
}

export class FlatDataSet implements interfaces.DataSet {

    private groups: Array<Group> = [];
    private mapper: FlatColumnMapper = new FlatColumnMapper();
    private observations: Array<FlatObs> = [];

    private dimensionAtObservation: string = "AllDimensions";

    public FlatDataSet() {
    }

    getColumnIndex(name: string): number {
        return this.mapper.getColumnIndex(name);
    }

    getValue(row: number, col: number): string {
        if (this.observations[row] == null) {
            console.log("null obs!");
        }
        return this.observations[row].getValue(col);
    }

    setValueStringCol(row: number, col: string, val: string) {
        this.setValue(row, this.mapper.getColumnIndex(col), val);
    }

    setValue(row: number, col: number, val: string) {
        this.observations[row].setValue(col, val);
    }

    addObservation(o: FlatObs) {
        this.observations.push(o);
    }

    removeObservation(o: FlatObs) {
        collections.arrays.remove(this.observations, o);
    }

    getObservations() {
        return this.observations;
    }
    size(): number {
        return this.observations.length;
    }

    getColumnMapper(): FlatColumnMapper {
        return this.mapper;
    }

    dump() {
        var s: string = "";
        for (var i: number = 0; i < this.mapper.size(); i++) {
            s += this.getColumnMapper().getColumnName(i);
            s += "\t";
        }
        console.log(s);
        for (var i: number = 0; i < this.observations.length; i++) {
            var o: FlatObs = this.getFlatObs(i);
            var s: string = "";
            for (var j: number = 0; j < this.mapper.size(); j++) {
                s = s + o.getValue(j);
                if (j < this.mapper.size()) s = s + "\t";
            }
            console.log(s);
        }
    }
    getFlatObs(i: number): FlatObs {
        return this.observations[i];
    }
    registerColumn(s: string) {
        var col: number = this.mapper.registerColumn(s, AttachmentLevel.OBSERVATION);
        for (var i: number = 0; i < this.observations.length; i++) {
            this.observations[i].setValue(col, null);
        }
        return col;
    }

    getColumnName(i: number): string {
        return this.mapper.getColumnName(i);
    }

    getColumnSize(): number {
        return this.mapper.size();
    }

    getGroups() {
        return [];
    }

    groupSize(): number {
        return 0;
    }

    applyGroupKey(key: PartialKey, column: string, value: string) {
    }

    setGroups(groups: Array<Group>) {
    }

    query(cube: Cube, order: Array<string>): Cube {
        var time: number = new Date().getTime();
        for (var i: number = 0; i < this.size(); i++) {
            cube.putObservation(order, this.mapper, this.getFlatObs(i));
        }
        return cube;
    }

    find(key: FullKey): FlatObs {
        var found: boolean = true;
        for (var i: number = 0; i < this.size(); i++) {
            var obs: FlatObs = this.getFlatObs(i);
            found = true;
            for (var j: number = 0; j < this.mapper.size() && !found; j++) {
                if (!(key.getComponent(this.mapper.getColumnName(j)) == obs.getValue(j))) {
                    found = false;
                }
            }
            if (found) {
                return obs;
            }
        }
        return null;
    }
    getDimensionAtObservation(reg: interfaces.LocalRegistry, dsref: commonreferences.Reference) {
        return "AllDimensions";
    }

    setDimensionAtObservationString(s: string) {
        this.dimensionAtObservation = s;
    }

    getDimensionAtObservationString(): string {
        return this.dimensionAtObservation;
    }
}
export class FlatDataSetWriter implements interfaces.DataSetWriter {

    private mapper: FlatColumnMapper = new FlatColumnMapper();
    private dataSet: FlatDataSet = null;
    private dataSetValues: Array<string> = null;
    private seriesValues: Array<string> = null;
    private obsValues: Array<string> = null;
    private groups: Array<Group> = null;

    constructor() {
    }

    newDataSet() {
        this.dataSet = new FlatDataSet();
        this.dataSetValues = [];
        this.mapper = this.dataSet.getColumnMapper();
    }

    newSeries() {
        this.seriesValues = [];
        for (var i: number = 0; i < this.dataSetValues.length; i++) {
            this.seriesValues.push(this.dataSetValues[i]);
        }
    }

    newObservation() {
        this.obsValues = [];
        if (this.seriesValues != null) {
            for (var i: number = 0; i < this.seriesValues.length; i++) {
                this.obsValues.push(this.seriesValues[i]);
            }
        }
    }

    writeDataSetComponent(name: string, val: string) {
        if (!this.dataSet.getColumnMapper().containsColumn(name)) {
            this.dataSet.registerColumn(name);
        }
        this.dataSetValues.push(val);
    }

    writeSeriesComponent(name: string, val: string) {
        if (!this.dataSet.getColumnMapper().containsColumn(name)) {
            this.dataSet.registerColumn(name);
        }
        this.seriesValues.push(val);
    }

    writeObservationComponent(name: string, val: string) {
        if (!this.dataSet.getColumnMapper().containsColumn(name)) {
            this.dataSet.registerColumn(name);
        }
        if (this.obsValues.length <= this.dataSet.getColumnMapper().getColumnIndex(name)) {
            for (var j: number = this.obsValues.length; (j - 1) < this.dataSet.getColumnIndex(name); j++) {
                this.obsValues.push(null);
            }
        }
        this.obsValues[this.dataSet.getColumnIndex(name)] = val;
    }

    finishSeries() {

    }

    finishObservation() {
        this.dataSet.addObservation(new FlatObs(this.obsValues));
    }

    finishDataSet(): FlatDataSet {
        var ds: FlatDataSet = this.dataSet;
        ds.setGroups(this.groups);
        this.dataSet = null;
        return ds;
    }

    getColumnMapper(): FlatColumnMapper {
        return this.mapper;
    }

    writeGroupValues(name: string, groupValues: collections.Dictionary<string, any>) {
        var group: Group = Group.Group(groupValues);
        group.setGroupName(name);
        if (this.groups == null) {
            this.groups = [];
        }
        this.groups.push(group);
    }
}
export class StructuredDataMessage {

    private dataMessage: message.DataMessage = null;
    private registry: interfaces.LocalRegistry = null;
    private dataflow: structure.Dataflow = null;

    private list: Array<StructuredDataSet> = [];

    constructor(dm: message.DataMessage, reg: interfaces.LocalRegistry) {
        this.dataMessage = dm;
        this.registry = reg;
        for (var i: number = 0; i < this.dataMessage.size(); i++) {
            this.list.push(this.buildStructuredDataSet(i));
        }
    }

    public size(): number {
        return this.getDataMessage().size();
    }

    public getStructuredDataSet(i: number): StructuredDataSet {
        return this.list[i];
    }

    public buildStructuredDataSet(i: number): StructuredDataSet {
        //dataMessage.getHeader().getStructures().get(0).getStructure().dump();
        //NestedNCNameID agency = dataMessage.getHeader().getStructures().get(0).getStructure().getAgencyId();
        //IDType id = dataMessage.getHeader().getStructures().get(0).getStructure().getMaintainableParentId();
        //Version vers = dataMessage.getHeader().getStructures().get(0).getStructure().getMaintainedParentVersion();
        //System.out.println("Ref="+agency+":"+id+":"+vers);
        var structure: structure.DataStructure = this.getRegistry().findDataStructure(this.getDataMessage().getHeader().getStructures()[0].getStructure());
        //System.out.println("Structure="+structure);
        if (this.dataflow == null) {
            this.setDataflow(structure.asDataflow());
        }
        return new StructuredDataSet(this.getDataMessage().getDataSet(i), this.getRegistry(), structure);
    }

    /**
     * @return the dataMessage
     */
    public getDataMessage(): message.DataMessage {
        return this.dataMessage;
    }

    /**
     * @return the registry
     */
    public getRegistry(): interfaces.LocalRegistry {
        return this.registry;
    }

    /**
     * @return the dataflow
     */
    public getDataflow(): structure.Dataflow {
        return this.dataflow;
    }

    /**
     * @param dataflow the dataflow to set
     */
    public setDataflow(dataflow: structure.Dataflow) {
        this.dataflow = dataflow;
    }
}
export class StructuredDataSet {
    private dataSet: interfaces.DataSet = null;
    private registry: interfaces.LocalRegistry = null;
    private structure: structure.DataStructure = null;

    constructor(ds: interfaces.DataSet, reg: interfaces.LocalRegistry, struct: structure.DataStructure) {
        this.dataSet = ds;
        this.registry = reg;
        this.structure = struct;
    }

    public getStructuredValue(row: number, column: number): StructuredValue {
        return new StructuredValue(this.getDataSet().getColumnName(column), this.getDataSet().getValue(row, column), this.registry, this.getStructure());
    }

    public getColumnName(i: number): string {
        var conceptString: string = this.getDataSet().getColumnName(i);
        //System.out.println("Concept="+conceptString);
        //System.out.println("ds="+getStructure());
        var c: structure.Component = this.getStructure().findComponentString(conceptString);
        if (c == null && conceptString == "type") {
            // "type" represents sdmx 2.0 cross sectional document 
            c = this.getStructure().getDataStructureComponents().getDimensionList().getMeasureDimension();
        }
        if (c == null) {
            console.log("Component is null conceptRef:" + conceptString);
            return conceptString;
        }
        var conceptRef = c.getConceptIdentity();
        var concept: structure.ConceptType = null;
        if (conceptRef != null) {
            concept = this.registry.findConcept(conceptRef);
            return structure.NameableType.toString(concept);
        } else {
            throw new Error("Can't find Concept:" + conceptString);
        }
    }

    public size(): number {
        return this.getDataSet().size();
    }

    public getColumnCount(): number {
        return this.getDataSet().getColumnSize();
    }

    /**
     * @return the dataSet
     */
    public getDataSet(): interfaces.DataSet {
        return this.dataSet;
    }

    /**
     * @return the structure
     */
    public getStructure(): structure.DataStructure {
        return this.structure;
    }
    public getColumnIndexes(): Array<number> {
        var result = [];
        for (var i: number = 0; i < this.getColumnCount(); i++) {
            result.push(i);
        }
        return result;
    }
}
export class StructuredValue {
    public getRepresentation(reg: interfaces.LocalRegistry, c: structure.Component): structure.RepresentationType {
        var rep: structure.RepresentationType = c.getLocalRepresentation();
        if (rep == null) {
            var concept: structure.ConceptType = reg.findConcept(c.getConceptIdentity());
            //return concept.getCoreRepresentation();
        }
        return c.getLocalRepresentation();
    }
    public getLocalRepresentation(c: structure.Component): structure.RepresentationType {
        if (c == null) return null;
        return c.getLocalRepresentation();
    }
    private concept: string = null;
    private value: string = null;
    private registry: interfaces.LocalRegistry = null;
    private structure: structure.DataStructure = null;

    public constructor(concept: string, value: string, registry: interfaces.LocalRegistry, struct: structure.DataStructure) {
        this.concept = concept;
        this.value = value;
        this.registry = registry;
        this.structure = struct;
    }

    public isCoded(): boolean {
        var comp: structure.Component = this.structure.findComponentString(this.concept);
        if ("type" == this.concept) {
            comp = this.structure.getDataStructureComponents().getDimensionList().getMeasureDimension();
        }
        if (comp == null) {
            console.log("Comp is NUll!" + this.concept);
            return false;
        }
        var localRep: structure.RepresentationType = this.getRepresentation(this.registry, comp);
        if (localRep.getEnumeration() != null) {
            return true;
        }
        else return false;
    }

    public getCode(): structure.ItemType {
        //System.out.println("Concept:"+ concept+" Value:" + value);
        //Locale loc = Locale.getDefault();
        //ItemType item = ValueTypeResolver.resolveCode(registry, structure, concept, value);
        //System.out.println("Item=" + item.toString());
        //System.out.println("Item=" + item.findName(loc.getLanguage()));
        return ValueTypeResolver.resolveCode(this.registry, this.structure, this.concept, this.getValue());
    }

    public getCodelist(): structure.ItemSchemeType {
        return ValueTypeResolver.getPossibleCodes(this.registry, this.structure, this.concept);
    }

    public toString(): string {
        if (this.isCoded()) {
            var code: structure.ItemType = this.getCode();
            if (code == null) {
                return this.getValue();
            }
            return structure.NameableType.toString(code);
        }
        return this.getValue();
    }

    /**
     * @return the concept
     */
    public getConcept(): structure.ConceptType {
        return this.registry.findConcept(this.structure.findComponentString(this.concept).getConceptIdentity());
    }

    /**
     * @return the value
     */
    public getValue(): string {
        return this.value;
    }
}
export class ValueTypeResolver {

    public static resolveCode(registry: interfaces.LocalRegistry, struct: structure.DataStructure, column: string, value: string): structure.ItemType {
        if (value == null) {
            return null;
        }
        var dim: structure.Component = struct.findComponentString(column);
        // Cross Sectional Measures somtimes come in a a 'type' column..
        // see SDMX 2.0 example cross sectional file
        if ("type" == column) {
            dim = struct.getDataStructureComponents().getDimensionList().getMeasureDimension();
        }
        if (dim == null) {
            var itm: structure.CodeType = new structure.CodeType();
            var name: common.Name = new common.Name(sdmx.SdmxIO.getLocale(), value);
            var names: Array<common.Name> = [name];
            itm.setNames(names);
            return itm;
        }
        var conceptRef = dim.getConceptIdentity();
        var rep: structure.RepresentationType = null;
        var concept: structure.ConceptType = null;
        if (conceptRef != null) {
            concept = registry.findConcept(conceptRef);
            if (concept == null) {
                console.log("Cant find concept:" + dim.getConceptIdentity().getId());
                console.log(conceptRef.getAgencyId() + ":" + conceptRef.getMaintainableParentId() + ":" + conceptRef.getId() + ":" + conceptRef.getVersion());
                var ct: structure.CodeType = new structure.CodeType();
                ct.setId(new commonreferences.ID(value));
                var name: common.Name = new common.Name("en", value);
                ct.setNames([name]);
                return ct;
            }
            rep = dim.getLocalRepresentation();
        }
        if (rep != null) {
            if (rep.getEnumeration() != null) {
                if (rep.getEnumeration().getRefClass().toInt() == commonreferences.ObjectTypeCodelistType.CODELIST.toInt()) {
                    var codelist: structure.Codelist = registry.findCodelist(rep.getEnumeration());
                    var id: commonreferences.ID = null;
                    try {
                        id = new commonreferences.ID(value);
                    } catch (err) {
                        // Ignore
                    }
                    if (codelist == null) {
                        throw new Error("Codelist is null Representation=" + rep.getEnumeration().toString());
                    }
                    var ct: structure.CodeType = null;
                    if (id != null) {
                        ct = codelist.findItemId(id);
                    }
                    if (ct == null) {
                        var ct2: structure.CodeType = new structure.CodeType();
                        ct2.setId(id);
                        var name: common.Name = new common.Name("en", "Missing Code:" + value);
                        var names: Array<common.Name> = [];
                        names.push(name);
                        ct2.setNames(names);
                        return ct2;
                    } else {
                        return ct;
                    }
                } else {
                    var cs: structure.ConceptSchemeType = registry.findConceptScheme(rep.getEnumeration());
                    var conceptMeasure: structure.ConceptType = null;
                    for (var i: number = 0; i < cs.size() && conceptMeasure == null; i++) {
                        var tempConcept: structure.ConceptType = cs.getItem(i);
                        if (tempConcept.getId() != null && tempConcept.getId().toString() == value) {
                            conceptMeasure = cs.getItem(i);
                        } else if (tempConcept.getId().toString() == value) {
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
                var itm: structure.CodeType = new structure.CodeType();
                var name: common.Name = new common.Name(sdmx.SdmxIO.getLocale(), value);
                var names: Array<common.Name> = [name];
                itm.setNames(names);
                return itm;
            }
        }
        var itm: structure.CodeType = new structure.CodeType();
        var name: common.Name = new common.Name(sdmx.SdmxIO.getLocale(), value);
        var names: Array<common.Name> = [name];
        itm.setNames(names);
        return itm;
    }

    public static getPossibleCodes(registry: interfaces.LocalRegistry, struct: structure.DataStructure, column: string): structure.ItemSchemeType {
        var dim: structure.Component = struct.findComponentString(column);
        if (dim == null || "type" == column) {
            dim = struct.getDataStructureComponents().getDimensionList().getMeasureDimension();
        }
        var conceptRef = dim.getConceptIdentity();
        var rep: structure.RepresentationType = null;
        var concept: structure.ConceptType = null;
        if (conceptRef != null) {
            concept = registry.findConcept(conceptRef);
            rep = dim.getLocalRepresentation();
        }
        if (rep != null) {
            if (rep.getEnumeration() != null) {
                if (rep.getEnumeration().getRefClass().toInt() == commonreferences.ObjectTypeCodelistType.CODELIST.toInt()) {
                    var codelist: structure.Codelist = registry.findCodelist(rep.getEnumeration());
                    return codelist;
                } else {
                    var cs: structure.ConceptSchemeType = registry.findConceptScheme(rep.getEnumeration());
                    return cs;
                }
            }
        }
        return null;
    }

}