/// <amd-module name='sdmx/registry'/>
///<reference path="../collections.ts"/>
import structure = require("sdmx/structure");
import interfaces = require("sdmx/interfaces");
import commonreferences = require("sdmx/commonreferences");
import message = require("sdmx/message");
export class LocalRegistry implements interfaces.Registry {
    private structures: Array<message.StructureType> = [];
    // Registry
    listDataflows(): Array<structure.Dataflow> {
        var dataflowList: Array<structure.Dataflow> = [];
        for (var i = 0; i < this.structures.length; i++) {
            if (this.structures[i].listDataflows().length > 0) {
                collections.arrays.forEach(this.structures[i].listDataflows(), function(e: structure.Dataflow): void {
                    dataflowList.push(e);
                });
            }
        }
        return dataflowList;
    }
    clear(): void {
        this.structures = [];
    }
    load(struct: message.StructureType): void {
        this.structures.push(struct);
    }
    unload(struct: message.StructureType): void {
        collections.arrays.remove(this.structures, struct);
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
    findCodelist(ref: commonreferences.Reference): structure.Codelist {
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
        return null;
    }
    searchDataflow(ref: commonreferences.Reference): Array<structure.Dataflow> {
        return null;
    }
    searchCodelist(ref: commonreferences.Reference): Array<structure.Codelist> {
        return null;
    }
    searchItemType(item: commonreferences.Reference): Array<structure.ItemType> {
        return null;
    }
    searchConcept(ref: commonreferences.Reference): Array<structure.ConceptType> {
        return null;
    }
    searchConceptScheme(ref: commonreferences.Reference): Array<structure.ConceptSchemeType> {
        return null;
    }
    save(): any { }
}
