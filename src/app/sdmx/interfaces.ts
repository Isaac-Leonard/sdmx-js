/// <amd-module name='sdmx/interfaces'/>
import message = require("sdmx/message");
import commonreferences = require("sdmx/commonreferences");
import structure = require("sdmx/structure");
import data = require("sdmx/data");
export interface Queryable {
    getRegistry(): Registry;
    getRepository(): Repository;
}
export interface Registry {
    // Registry
    listDataflows(): Array<structure.Dataflow>;
    clear(): void;
    load(struct: message.StructureType): void;
    unload(struct: message.StructureType): void;
    findDataStructure(ref: commonreferences.Reference): structure.DataStructure;
    findDataflow(ref: commonreferences.Reference): structure.Dataflow;
    findCode(ref: commonreferences.Reference): structure.CodeType;
    findCodelist(ref: commonreferences.Reference): structure.Codelist;
    findItemType(item: commonreferences.Reference): structure.ItemType;
    findConcept(ref: commonreferences.Reference): structure.ConceptType;
    findConceptScheme(ref: commonreferences.Reference): structure.ConceptSchemeType;
    searchDataStructure(ref: commonreferences.Reference): Array<structure.DataStructure>;
    searchDataflow(ref: commonreferences.Reference): Array<structure.Dataflow>;
    searchCodelist(ref: commonreferences.Reference): Array<structure.Codelist>;
    searchItemType(item: commonreferences.Reference): Array<structure.ItemType>;
    searchConcept(ref: commonreferences.Reference): Array<structure.ConceptType>;
    searchConceptScheme(ref: commonreferences.Reference): Array<structure.ConceptSchemeType>;
    save(): any;

}
export interface Repository {
    query(query: message.DataQuery): message.DataMessage;
    query(flow: structure.Dataflow, query: string): message.DataMessage;
}
export interface SdmxParserProvider {
    getVersionIdentifier(): number;
    canParse(header: string): boolean;
    isStructure(header: string): boolean;
    isData(header: string): boolean;
    isMetadata(header: string): boolean;
    parseStructure(input: string): message.StructureType;
    parseStructureWithRegistry(input: string,reg:Registry): message.StructureType;
    parseData(input: string): message.DataMessage;
}
export interface Attachable {
    getValue(s: string): string;
    setValue(s: string, val: string);
    getAttachmentLevel(): data.AttachmentLevel;
    getValue(i: number): string;
    setValue(i: number, val: string);
}
export interface ColumnMapper {
    registerColumn(s: string, attach: data.AttachmentLevel): number;
    getColumnIndex(s: string): number;
    getColumnName(i: number): string;
    size(): number;
    containsColumn(name: string): boolean;
    getObservationColumns(): Array<string>;
    getSeriesColumns(): Array<string>;
    getDataSetColumns(): Array<string>;
    getGroupColumns(): Array<string>;
    isAttachedToDataSetString(s: string): boolean;
    isAttachedToDataSetInt(i: number): boolean;
    isAttachedToSeriesString(s: string): boolean;
    isAttachedToSeriesInt(i: number): boolean;
    isAttachedToObservationString(s: string): boolean;
    isAttachedToObservationInt(i: number): boolean;
    isAttachedToGroupString(s: string): boolean;
    isAttachedToGroupInt(i: number): boolean;
    dump();
}
export interface DataSetWriter {
    //public ColumnMapper getColumnMapper();
    newDataSet();
    newSeries();
    newObservation();
    writeDataSetComponent(name: string, val: string);
    writeSeriesComponent(name: string, val: string);
    writeObservationComponent(name: string, val: string);
    writeGroupValues(name: string, group: collections.Dictionary<string, Object>);
    finishObservation();
    finishSeries();
    finishDataSet(): DataSet;
}

export interface DataSet {
    dump();
    getColumnName(i: number): string;
    getColumnIndex(s: string): number;
    getColumnSize(): number;
    size(): number;
    getValue(row: number, col: number);
    setValue(row: number, col: number, val: string);
    getFlatObs(row: number): data.FlatObs;
    query(cube: data.Cube, order: Array<string>): data.Cube;
    getColumnMapper(): ColumnMapper;
    setGroups(groups: Array<data.Group>);
    getGroups(): Array<data.Group>;
    groupSize(): number;
    find(key: data.FullKey): data.FlatObs;
}