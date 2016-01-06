/// <amd-module name='sdmx/interfaces'/>
import message = require("sdmx/message");
import commonreferences = require("sdmx/commonreferences");
import structure = require("sdmx/structure");
interface Queryable {
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
    parseData(input: string): message.DataMessage;
}
