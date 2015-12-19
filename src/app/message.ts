import sdmx = require("sdmx");
import structure = require("structure");
import commonreferences = require("commonreferences");
export class DataMessageType {

}

export class DataQuery {

}
export class StructureType implements sdmx.Registry {
    public struct: any;
    constructor(struct: any) {
        this.struct = struct;
    }
    // Registry
    listDataflows(): Array<structure.Dataflow> {
        return null;
    }
    clear(): void {

    }
    load(struct: StructureType): void {

    }
    unload(struct: StructureType): void {

    }
    findDataStructure(ref: commonreferences.Reference): structure.DataStructure {
        return null;
    }
    findDataflow(ref: commonreferences.Reference): structure.Dataflow {
        return null;
    }
    findCode(ref: commonreferences.Reference): structure.CodeType {
        return null;
    }
    findCodelist(ref: commonreferences.Reference): structure.CodelistType {
        return null;
    }
    findItemType(item: commonreferences.Reference): structure.ItemType {
        return null;
    }
    findConcept(ref: commonreferences.Reference): structure.ConceptType {
        return null;
    }
    findConceptScheme(ref: commonreferences.Reference): structure.ConceptSchemeType {
        return null;
    }
    searchDataStructure(ref: commonreferences.Reference): Array<structure.DataStructure> {
        return new Array<structure.ItemType>();
    }
    searchDataflow(ref: commonreferences.Reference): Array<structure.Dataflow> {
        return new Array<structure.Dataflow>();
    }
    searchCodelist(ref: commonreferences.Reference): Array<structure.CodelistType> {
        return new Array<structure.CodelistType>();
    }
    searchItemType(item: commonreferences.Reference): Array<structure.ItemType> {
        return new Array<structure.ItemType>();
    }
    searchConcept(ref: commonreferences.Reference): Array<structure.ConceptType> {
        return new Array<structure.ConceptType>();
    }
    searchConceptScheme(ref: commonreferences.Reference): Array<structure.ConceptSchemeType> {
        return new Array<structure.ConceptSchemeType>();
    }
    save(): any {

    }

}