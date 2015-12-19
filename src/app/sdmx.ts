/// <amd-module name='sdmx'/>
import message = require("message");
import commonreferences = require("commonreferences");
import structure = require("structure");
import parser = require("parser");
import sdmx20 = require("sdmx20");
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
    findCodelist(ref: commonreferences.Reference): structure.CodelistType;
    findItemType(item: commonreferences.Reference): structure.ItemType;
    findConcept(ref: commonreferences.Reference): structure.ConceptType;
    findConceptScheme(ref: commonreferences.Reference): structure.ConceptSchemeType;
    searchDataStructure(ref: commonreferences.Reference): Array<structure.DataStructure>;
    searchDataflow(ref: commonreferences.Reference): Array<structure.Dataflow>;
    searchCodelist(ref: commonreferences.Reference): Array<structure.CodelistType>;
    searchItemType(item: commonreferences.Reference): Array<structure.ItemType>;
    searchConcept(ref: commonreferences.Reference): Array<structure.ConceptType>;
    searchConceptScheme(ref: commonreferences.Reference): Array<structure.ConceptSchemeType>;
    save(): any;

}
export interface Repository {
    query(query: message.DataQuery): message.DataMessage;
    query(flow: structure.Dataflow, query: string): message.DataMessage;
}
export class SdmxIO {
    public static LOCALE: string = "en";
    public static SANITISE_NAMES: boolean = false;
    public static PARSER:Array<parser.SdmxParserProvider> = [];
    public static getLocale():string {
        return SdmxIO.LOCALE;
    }
    public static isSanitiseNames():boolean {
        return SdmxIO.SANITISE_NAMES;

    }
    public static parseStructure(s: string): message.StructureType {
        alert(SdmxIO.PARSER.length);
        for(var i=0;i<SdmxIO.PARSER.length;i++) {
            if (SdmxIO.PARSER[i].canParse(s)){ return SdmxIO.PARSER[i].parseStructure(s);}
            else {
                alert("not my type");
                
            }
        }
        return null;
    }
    public static registerParserProvider(p: parser.SdmxParserProvider){
        alert('register');
        SdmxIO.PARSER.push(p);
        
    }
}
