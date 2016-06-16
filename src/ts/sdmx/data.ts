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
import commonreferences = require("sdmx/commonreferences");
import structure = require("sdmx/structure");

export class Query {
    private flow: structure.Dataflow = null;
    private structRef: commonreferences.Reference = null;
    private registry: interfaces.LocalRegistry = null;
    private query: Array<QueryKey> = [];
    private startDate:Date = new Date();
    private endDate:Date = new Date();

    constructor(flow: structure.Dataflow, registry: interfaces.LocalRegistry) {
        this.flow = flow;
        this.structRef = flow.getStructure();
        this.registry = registry;
        var kns = this.getKeyNames();
        for (var i: number = 0; i < kns.length; i++) {
            this.query.push(new QueryKey(this.structRef, registry, kns[i]));
        }
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
    getRegistry():interfaces.LocalRegistry{
        return this.registry;
    }
    getStartDate():Date {
        return this.startDate;}
    getEndDate():Date {
        return this.endDate;
        }
    setStartDate(d:Date) {
        this.startDate=d;
    }
    setEndDate(d:Date) {
        this.endDate=d;
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
