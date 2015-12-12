module sdmx {
    export interface Registry {
        // Registry
        listDataflows(): Array<sdmx.structure.dataflow.Dataflow>;
        clear(): void;
        load(struct: sdmx.message.StructureType): void;
        unload(struct: sdmx.message.StructureType): void;
        findDataStructure(ref: sdmx.commonreferences.Reference): sdmx.structure.datastructure.DataStructure;
        findDataflow(ref: sdmx.commonreferences.Reference): sdmx.structure.dataflow.Dataflow;
        findCode(ref: sdmx.commonreferences.Reference): sdmx.structure.code.CodeType;
        findCodelist(ref: sdmx.commonreferences.Reference): sdmx.structure.code.CodelistType;
        findItemType(item: sdmx.commonreferences.Reference): sdmx.structure.base.ItemType;
        findConcept(ref: sdmx.commonreferences.Reference): sdmx.structure.concept.ConceptType;
        findConceptScheme(ref: sdmx.commonreferences.Reference): sdmx.structure.concept.ConceptSchemeType;
        searchDataStructure(ref: sdmx.commonreferences.Reference): Array<sdmx.structure.datastructure.DataStructure>;
        searchDataflow(ref: sdmx.commonreferences.Reference): Array<sdmx.structure.dataflow.Dataflow>;
        searchCodelist(ref: sdmx.commonreferences.Reference): Array<sdmx.structure.code.CodelistType>;
        searchItemType(item: sdmx.commonreferences.Reference): Array<sdmx.structure.base.ItemType>;
        searchConcept(ref: sdmx.commonreferences.Reference): Array<sdmx.structure.concept.ConceptType>;
        searchConceptScheme(ref: sdmx.commonreferences.Reference): Array<sdmx.structure.concept.ConceptSchemeType>;
        save(): any;

    }
}