module sdmx.message {
    export class StructureType implements sdmx.Registry {
        public struct: any;
        constructor(struct: any) {
            this.struct = struct;
        }
        // Registry
        listDataflows(): Array<sdmx.structure.dataflow.Dataflow> {
            return null;
        }
        clear(): void {

        }
        load(struct: StructureType): void {

        }
        unload(struct: StructureType): void {

        }
        findDataStructure(ref: sdmx.commonreferences.Reference): sdmx.structure.datastructure.DataStructure {
            return null;
        }
        findDataflow(ref: sdmx.commonreferences.Reference): sdmx.structure.dataflow.Dataflow {
            return null;
        }
        findCode(ref: sdmx.commonreferences.Reference): sdmx.structure.code.CodeType {
            return null;
        }
        findCodelist(ref: sdmx.commonreferences.Reference): sdmx.structure.code.CodelistType {
            return null;
        }
        findItemType(item: sdmx.commonreferences.Reference): sdmx.structure.base.ItemType {
            return null;
        }
        findConcept(ref: sdmx.commonreferences.Reference): sdmx.structure.concept.ConceptType {
            return null;
        }
        findConceptScheme(ref: sdmx.commonreferences.Reference): sdmx.structure.concept.ConceptSchemeType {
            return null;
        }
        searchDataStructure(ref: sdmx.commonreferences.Reference): Array<sdmx.structure.datastructure.DataStructure> {
            return new Array<sdmx.structure.base.ItemType>();
        }
        searchDataflow(ref: sdmx.commonreferences.Reference): Array<sdmx.structure.dataflow.Dataflow> {
            return new Array<sdmx.structure.dataflow.Dataflow>();
        }
        searchCodelist(ref: sdmx.commonreferences.Reference): Array<sdmx.structure.code.CodelistType> {
            return new Array<sdmx.structure.code.CodelistType>();
        }
        searchItemType(item: sdmx.commonreferences.Reference): Array<sdmx.structure.base.ItemType> {
            return new Array<sdmx.structure.base.ItemType>();
        }
        searchConcept(ref: sdmx.commonreferences.Reference): Array<sdmx.structure.concept.ConceptType> {
            return new Array<sdmx.structure.concept.ConceptType>();
        }
        searchConceptScheme(ref: sdmx.commonreferences.Reference): Array<sdmx.structure.concept.ConceptSchemeType> {
            return new Array<sdmx.structure.concept.ConceptSchemeType>();
        }
        save(): any {

        }

    }
}