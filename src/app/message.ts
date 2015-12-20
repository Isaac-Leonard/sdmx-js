/// <amd-module name='message'/>
import sdmx = require("sdmx");
import structure = require("structure");
import commonreferences = require("commonreferences");
import xml = require("xml");
import common = require("common");
export class DataMessage {

}

export class DataQuery {

}
export class StructureType implements sdmx.Registry {
    constructor() {

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
export class HeaderTimeType {
    private date: xml.DateTime = null;
    getDate(): xml.DateTime { return this.date; }
    setDate(d: xml.DateTime): void {
        this.date = d;
    }
}
export class Contact {
    public name: Array<common.Name> = [];
    public departments: Array<common.TextType> = [];
    public roles: Array<common.TextType> = [];
    public telephones: Array<string> = [];
    public faxes: Array<string> = [];
    public z400s: Array<string> = [];
    public uris: Array<xml.anyURI> = [];
    public emails: Array<string> = [];
}
export class PartyType extends structure.NameableType {
    public contacts: Array<Contact> = [];
}
export class Sender extends PartyType {


}
export class Header {
    private id: string = null;
    private test: boolean = null;
    private prepared: HeaderTimeType = null;
    private receivers:Array<PartyType>=[];
    private names:Array<common.Name> = [];
    private structures:Array<common.PayloadStructureType> = [];

}

