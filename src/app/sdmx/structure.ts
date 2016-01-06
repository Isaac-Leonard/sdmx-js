/// <amd-module name='structure'/>
/// <reference path="../collections.ts"/>
import common = require("sdmx/common");
import commonreferences = require("sdmx/commonreferences");
import xml = require("sdmx/xml");
import structure = require("sdmx/structure");
import sdmx = require("sdmx");
import message = require("sdmx/message");
import interfaces = require("sdmx/interfaces");

export class IdentifiableType extends common.AnnotableType {
    private id: commonreferences.ID;
    private urn: xml.anyURI;
    private uri: xml.anyURI;
    constructor() {
        super();
    }
    public getId(): commonreferences.ID { return this.id; }
    public getURN(): xml.anyURI { return this.urn; }
    public getURI(): xml.anyURI { return this.uri; }
    public setId(id: commonreferences.ID) {
        this.id = id;
    }
    public setURN(urn: xml.anyURI) {
        this.urn = urn;
    }
    public setURI(uri: xml.anyURI) {
        this.uri = uri;
    }
    public identifiesMeId(oid: commonreferences.ID): boolean {
        if (this.id.equalsID(oid)) return true;
        else return false;
    }
    public identifiesMeString(oid: string): boolean {
        if (this.id.equalsString(oid)) return true;
        else return false;
    }
    public identifiesMeNestedId(oid: commonreferences.NestedID): boolean {
        if (oid.equalsString(this.id.getString())) return true;
        else return false;
    }

}

export class NameableType extends IdentifiableType {
    private names: Array<common.Name> = [];
    private descriptions: Array<common.Description> = [];

    constructor() {
        super();
    }
    /**
     * @return the names
     */
    public getNames(): Array<common.Name> {
        return this.names;
    }

    /**
     * @param names the names to set
     */
    public setNames(names1: Array<common.Name>) {
        this.names = names1;
    }

    /**
     * @return the descriptions
     */
    public getDescriptions(): Array<common.Description> {
        return this.descriptions;
    }

    /**
     * @param descriptions the descriptions to set
     */
    public setDescriptions(descriptions: Array<common.Description>) {
        this.descriptions = descriptions;
    }

    public findName(lang: String): common.Name {
        if (this.names == null) {
            return null;
        }
        var def: common.Name = null;
        for (var i: number = 0; i < this.names.length; i++) {
            if (lang != null && lang == this.names[i].getLang()) {
                return this.names[i];
            }
            if (this.names[i].getLang() == null) {
                def = this.names[i];
            }
        }
        if (def == null && "en" != lang) {
            def = this.findName("en");
        }
        return def;
    }

    public findDescription(lang: string): common.Description {
        if (this.descriptions == null) {
            return null;
        }
        var def: common.Description = null;
        for (var i: number = 0; i < this.descriptions.length; i++) {
            if (lang != null && lang == this.descriptions[i].getLang()) {
                return this.descriptions[i];
            }
            if (this.descriptions[i].getLang() == null) {
                def = this.descriptions[i];
            }
        }
        if (def == null && "en" != lang) {
            def = this.findDescription("en");
        }
        return def;
    }

    public toString(): string {
        var loc: string = sdmx.SdmxIO.getLocale();
        var name: common.Name = this.findName(loc);
        if (name != null) {
            return name.toString();
        }
        var desc: common.Description = this.findDescription(loc);
        if (desc != null) {
            return desc.getText();
        }
        return "NameableType";
    }

    public getName(): string {
        if (sdmx.SdmxIO.isSanitiseNames()) {
            return NameableType.sanitise(NameableType.toString(this));
        } else {
            return NameableType.toString(this);
        }
    }

    private static toString(named: NameableType): string {
        var loc: string = sdmx.SdmxIO.getLocale();
        if (named == null) {
            return "";
        }
        var desc: common.Description = named.findDescription(loc);
        if (desc == null) {
            var name: common.Name = named.findName(loc);
            if (name == null) {
                return named.getId().toString();
            }
            return name.getText();
        }
        return desc.getText();
    }

    private static toStringWithLocale(named: NameableType, loc: string): string {
        //if (concept.equals("FREQ")) {
        //    ItemType code2 = getCode();
        //    System.out.println("FREQ Code=" + code2);
        //}
        if (named == null) {
            return "";
        }
        var name: common.Name = named.findName(loc);
        if (name == null) {
            var desc: common.Description = named.findDescription(loc);
            if (desc == null) {
                return named.getId().toString();
            }
            return desc.getText();
        }
        return name.getText();

    }

    private static toIDString(named: NameableType): string {
        return named.getId().toString();
    }

    public static sanitise(s: string): string {
        if (s.indexOf("'") != -1) {
            s = s.replace("'", "&apos;");
        }
        if (s.indexOf("\"") != -1) {
            s = s.replace("\"", "&quot;");
        }
        return s;
    }

}
export class ItemType extends NameableType {

    private parent: commonreferences.Reference = null;
    private items: Array<ItemType> = new Array<ItemType>();
    /**
     * @return the parent
     */
    public getParent(): commonreferences.Reference {
        return this.parent;
    }

    /**
     * @param parent the parent to set
     */
    public setParent(parent: commonreferences.Reference) {
        this.parent = parent;
    }

    /**
     * @return the items
     */
    public getItems(): Array<ItemType> {
        return this.items;
    }

    /**
     * @param items the items to set
     */
    public setItems(items: Array<ItemType>) {
        this.items = items;
    }

    public getItem(i: number): ItemType {
        return this.items[i];
    }

    public setItem(i: number, it: ItemType) {
        this.items[i] = it;
    }

    public removeItem(it: ItemType) {
        collections.arrays.remove(this.items, it);
    }

    public addItem(it: ItemType) {
        this.items.push(it);
    }

    public size(): number {
        return this.items.length;
    }

    public findItemString(s: string): structure.ItemType {
        for (var i: number = 0; i < this.items.length; i++) {
            if (this.items[i].identifiesMeString(s)) return this.items[i];
        }
        return null;
    }

    public findItem(id: commonreferences.ID): ItemType {
        for (var i: number = 0; i < this.items.length; i++) {
            if (this.items[i].identifiesMeId(id)) return this.items[i];
        }
        return null;
    }

}



export class VersionableType extends NameableType {
    private version: commonreferences.Version = commonreferences.Version.ONE;
    private validFrom: xml.DateTime = null;;
    private validTo: xml.DateTime = null;

    constructor() {
        super();
    }

    getVersion(): commonreferences.Version {
        return this.version;
    }

    /**
     * @param version the version to set
     */
    setVersion(version: commonreferences.Version) {
        this.version = version;
    }
    getValidFrom(): xml.DateTime {
        return this.validFrom;
    }

    setValidFrom(validFrom: xml.DateTime) {
        this.validFrom = validFrom;
    }

    public getValidTo(): xml.DateTime {
        return this.validTo;
    }
    setValidTo(validTo: xml.DateTime) {
        this.validTo = validTo;
    }

}
export class MaintainableType extends VersionableType {
    private agencyID: commonreferences.NestedNCNameID = null;
    private isfinal: boolean = null;
    private isexternalReference: boolean = null;
    private externalReferences: common.ExternalReferenceAttributeGroup = null;

    /**
     * @return the agencyID
     */
    public getAgencyID(): commonreferences.NestedNCNameID {
        return this.agencyID;
    }

    setAgencyID(agencyID: commonreferences.NestedNCNameID) {
        this.agencyID = agencyID;
    }

    isFinal(): boolean {
        return this.isfinal;
    }

    setFinal(isFinal: boolean) {
        this.isfinal = isFinal;
    }

    isExternalReference(): boolean {
        return this.isexternalReference;
    }

    setExternalReference(isExternalReference: boolean) {
        this.isexternalReference = isExternalReference;
    }

    public getExternalReferences(): common.ExternalReferenceAttributeGroup {
        return this.externalReferences;
    }

    setExternalReferences(externalReferences: common.ExternalReferenceAttributeGroup) {
        this.externalReferences = externalReferences;
    }

    identifiesMeStrings(agency2: string, id2: string, vers2: string): boolean {
        return this.identifiesMe(new commonreferences.NestedNCNameID(agency2), new commonreferences.ID(id2), new commonreferences.Version(vers2));
    }

    identifiesMe(agency2: commonreferences.NestedNCNameID, id2: commonreferences.NestedID, vers2: commonreferences.Version): boolean {
        //System.out.println("Left=" + this.agencyID + "." + this.getId() + "." + this.getVersion());
        //System.out.println("Right=" + agency2 + "." + id2 + "." + vers2);
        if (vers2 == null || this.getVersion() == null) {
            if (this.agencyID.equalsNestedNCNameID(agency2) && this.getId().equalsID(id2)) {
                return true;
            } else {
                //System.out.println("Doesn't Match!!");
                return false;
            }
        } else {
            if (this.agencyID.equalsNestedNCNameID(agency2) && this.getId().equalsID(id2) && this.getVersion().equalsVersion(vers2)) {
                return true;
            } else {
                //System.out.println("Doesn't Match!!");
                return false;
            }
        }
    }
    identifiesMeURI(uri: xml.anyURI): boolean {
        var ref: commonreferences.Reference = new commonreferences.Reference(null, uri);
        return this.identifiesMe(ref.getAgencyId(), ref.getMaintainableParentId(), ref.getVersion());
    }

    asReference(): commonreferences.Reference {
        var ref: commonreferences.Ref = new commonreferences.Ref();
        ref.setAgencyId(this.agencyID);
        ref.setMaintainableParentId(this.getId());
        ref.setMaintainableParentVersion(this.getVersion());
        var reference: commonreferences.Reference = new commonreferences.Reference(ref, this.getURI());
        return reference;
    }
}
export class ItemSchemeType extends MaintainableType {
    private items: Array<ItemType> = new Array<ItemType>();
    private partial: boolean = false;

    constructor() {
        super();

    }

    /**
     * @return the items
     */
    public getItems(): Array<ItemType> {
        return this.items;
    }

    /**
     * @param items the items to set
     */
    public setItems(itms: Array<ItemType>) {
        this.items = itms;
    }

    /**
     * @return the partial
     */
    public isPartial(): boolean {
        return this.partial;
    }

    /**
     * @param partial the partial to set
     */
    public setPartial(partial: boolean) {
        this.partial = partial;
    }

    public getItem(i: number): ItemType {
        return this.items[i];
    }

    public setItem(i: number, it: ItemType) {
        this.items[i] = it;
    }

    public removeItem(it: ItemType) {
        this.items.splice(this.items.indexOf(it), 1);
    }

    public addItem(it: ItemType) {
        this.items.push(it);
    }

    public size(): number {
        return this.items.length;
    }

    public findItemString(s: string): ItemType {
        for (var i: number = 0; i < this.items.length; i++) {
            if (this.items[i].identifiesMeString(s)) return this.items[i];
        }
        return null;
    }

    public findItemId(s: commonreferences.ID): ItemType {
        for (var i: number = 0; i < this.items.length; i++) {
            if (this.items[i].identifiesMeId(s)) return this.items[i];
        }
        return null;
    }

    public findItemNestedId(s: commonreferences.NestedID): ItemType {
        for (var i: number = 0; i < this.items.length; i++) {
            if (this.items[i].identifiesMeNestedId(s)) return this.items[i];
        }
        return null;
    }
    public findSubItemsString(s: string): Array<ItemType> {
        return this.findSubItemsId(new commonreferences.ID(s));
    }

    public findSubItemsId(id: commonreferences.ID): Array<ItemType> {
        var result: Array<ItemType> = new Array<ItemType>();
        if (id == null) {
            for (var i: number = 0; i < this.items.length; i++) {
                var item: ItemType = this.items[i];
                if (item.getParent() == null) {
                    result.push(item);
                }
            }
            return result;
        } else {
            for (var i: number = 0; i < this.items.length; i++) {
                var item: ItemType = this.items[i];
                if (item.getParent().getId().equalsID(id)) {
                    result.push(item);
                }
            }
            return result;
        }
    }
}

export class CodeType extends ItemType {

}
export class Codelist extends ItemSchemeType {
    constructor() {
        super();
    }


}
export class ConceptSchemeType extends ItemSchemeType {

}
export class ConceptType extends ItemType {

}
export class StructureUsageType extends MaintainableType {
    private structure: commonreferences.Reference = null;

    constructor() {
        super();
    }

    public getStructure(): commonreferences.Reference {
        return this.structure;
    }
    public setStructure(struct: commonreferences.Reference) {
        this.structure = struct;

    }
}
export class RepresentationType {
    
}
export class Dataflow extends StructureUsageType {
    constructor() {
        super();
    }
}
export class Component extends IdentifiableType {
    private conceptIdentity: commonreferences.Reference = null;
    private localRepresentation:RepresentationType = null;
    
    public getId():commonreferences.ID {
        if( super.getId()==null ) {
            if( this.conceptIdentity==null ) {
                //Thread.dumpStack();
                return new commonreferences.ID("MISS");
            }
            return this.conceptIdentity.getId().asID();
        }
        return super.getId();
    }
    constructor(){
        super();
    }
    public getConceptIdentity() {
        return this.conceptIdentity; }
    public setConceptIdentity(ci: commonreferences.Reference){
        this.conceptIdentity=ci;
    }
    public getLocalRepresentation() {
        return this.localRepresentation;
    }
    public setLocalRepresentation(lr:RepresentationType) {
        this.localRepresentation=lr;
    }
}
export class Dimension extends Component {

}
export class TimeDimension extends Component {

}
export class Attribute extends Component {

}
export class PrimaryMeasure extends Component {

}
export class DimensionList {
    private dimensions: Array<Dimension> = [];
    private timeDimension: TimeDimension = null;
    public getDimensions(): Array<Dimension> { return this.dimensions; }
    public getTimeDimension(): TimeDimension {
        return this.timeDimension;
    }
}
export class AttributeList {
    private attributes: Array<Attribute> = [];
    public getAttributes(): Array<Attribute> { return this.attributes; }
}
export class MeasureList {
    private primaryMeasure:PrimaryMeasure = null;
    public getPrimaryMeasure(): PrimaryMeasure { return this.primaryMeasure;}

}
export class DataStructureComponents {
    private dimensionList: DimensionList = null;
    private measureList: MeasureList = null;
    private attributeList: AttributeList = null;
    public getDimensionList(): DimensionList {
        return this.dimensionList;
    }
    public getMeasureList(): MeasureList {
        return this.measureList;
    }
    public getAttributeList(): AttributeList {
        return this.attributeList;
    }
}
export class DataStructure extends MaintainableType {

    private components: DataStructureComponents = null;

    public getDataStructureComponents(): DataStructureComponents {
        return this.components;
    }

    public setDataStructureComponents(components: DataStructureComponents) {
        this.components = components;
    }

    public dump() {
    }

    public findComponentString(col: string): Component {
        return this.findComponent(new commonreferences.ID(col));
    }

    public findComponent(col: commonreferences.ID): Component {
        /*
        for (DimensionType dim : components.getDimensionList().getDimensions()) {
            if (dim.identifiesMe(col)) {
                return dim;
            }
        }
        for (AttributeType dim : components.getAttributeList().getAttributes()) {
            if (dim.identifiesMe(col)) {
                return dim;
            }
        }
        //System.out.println("Measure3="+components.getMeasureList().getMeasures().size());
        if (components.getDimensionList().getMeasureDimension() != null && components.getDimensionList().getMeasureDimension().identifiesMe(col)) {
            return components.getDimensionList().getMeasureDimension();
        }
        TimeDimensionType dim = components.getDimensionList().getTimeDimension();
        if (dim.identifiesMe(col)) {
            return dim;
        }
        PrimaryMeasure dim2 = components.getMeasureList().getPrimaryMeasure();
        if (dim2.identifiesMe(col)) {
            return dim2;
        }
        */
        return null;
    }

    public asReference(): commonreferences.Reference {
        var ref: commonreferences.Ref = new commonreferences.Ref()
        ref.setAgencyId(this.getAgencyID());
        ref.setId(this.getId());
        ref.setVersion(this.getVersion());
        var reference: commonreferences.Reference = new commonreferences.Reference(ref, null);
        return reference;
    }

    public asDataflow(): Dataflow {
        var dataFlow: Dataflow = new Dataflow();
        dataFlow.setNames(this.getNames());
        dataFlow.setDescriptions(this.getDescriptions());
        dataFlow.setStructure(this.asReference());
        dataFlow.setAnnotations(this.getAnnotations());
        dataFlow.setAgencyID(this.getAgencyID());
        dataFlow.setId(this.getId());
        dataFlow.setVersion(this.getVersion());
        return dataFlow;
    }
    public isDimension(s: string): boolean {
        for (var i: number = 0; i < this.getDataStructureComponents().getDimensionList().getDimensions().length; i++) {
            var d: Dimension = this.getDataStructureComponents().getDimensionList().getDimensions()[i];
            if (s == d.getId().toString()) {
                return true;
            }
        }
        if (s == this.getDataStructureComponents().getDimensionList().getTimeDimension().getId().toString()) {
            return true;
        }
        return false;
    }
    public isTimeDimension(s: string): boolean {
        if (s == this.getDataStructureComponents().getDimensionList().getTimeDimension().getId().toString()) {
            return true;
        }
        return false;
    }
    public isAttribute(s: String): boolean {
        for (var i: number = 0; i < this.getDataStructureComponents().getAttributeList().getAttributes().length; i++) {
            if (s == this.getDataStructureComponents().getAttributeList().getAttributes()[i].getId().toString()) {
                return true;
            }
        }
        return false;
    }
    public isPrimaryMeasure(s: string): boolean {
        if ("OBS_VALUE" == s) return true;
        else if (this.getDataStructureComponents().getMeasureList().getPrimaryMeasure().getId().toString() == s) { return true; }
        return false;
    }
    public getKeyPosition(s: string): number {
        var i: number = 0;
        for (var j: number = 0; j < this.getDataStructureComponents().getDimensionList().getDimensions().length; i++) {
            if (this.getDataStructureComponents().getDimensionList().getDimensions()[i].getId().equalsString(s)) {
                return i;
            }
            i++;
        }
        if (s == this.getDataStructureComponents().getDimensionList().getTimeDimension().getId().toString()) {
            return i;
        }
        throw new Error("Dimension " + s + " not found in DataStructure:" + this.getId().toString());
    }
}

export class CodeLists {
    private codelists: Array<Codelist> = [];


    constructor() {

    }

    /**
     * @return the codelists
     */
    getCodelists(): Array<Codelist> {
        return this.codelists;
    }

    /**
     * @param codelists the codelists to set
     */
    setCodelists(cls: Array<Codelist>) {
        this.codelists = cls;
    }
    findCodelistStrings(agency: string, id: string, vers: string): Codelist {
        var findid: commonreferences.ID = new commonreferences.ID(id);
        var ag: commonreferences.NestedNCNameID = new commonreferences.NestedNCNameID(agency);
        var ver: commonreferences.Version = vers == null ? null : new commonreferences.Version(vers);
        return this.findCodelist(ag, findid, ver);
    }
    findCodelist(agency2: commonreferences.NestedNCNameID, findid: commonreferences.NestedID, ver: commonreferences.Version): Codelist {
        for (var i: number = 0; i < this.codelists.length; i++) {
            var cl2: Codelist = this.codelists[i];
            if (cl2.identifiesMe(agency2, findid, ver)) {
                return cl2;
            }
        }
        return null;
    }
    findCodelistURI(uri: xml.anyURI): Codelist {
        for (var i: number = 0; i < this.codelists.length; i++) {
            if (this.codelists[i].identifiesMeURI(uri)) {
                return this.codelists[i];
            }
        }
        return null;
    }
    /*
     * This method is used in sdmx 2.0 parsing to find a codelist with the correct ID..
     * this is because the Dimension in the KeyFamily does not contain a complete reference
     * only an ID.. we lookup the Codelist by it's ID, when we find a match, we can make a 
     * LocalItemSchemeReference out of it with it's AgencyID and Version.
     */
    findCodelistById(id: commonreferences.NestedID): Codelist {
        var cl: Codelist = null;
        for (var i: number = 0; i < this.codelists.length; i++) {
            if (this.codelists[i].identifiesMeId(id)) {
                if (cl == null) cl = this.codelists[i];
                else {
                    var j: number = cl.getVersion().compareTo(this.codelists[i].getVersion());
                    switch (j) {
                        case -1: // Less
                            break;
                        case 0:  // Equal
                            break;
                        case 1:
                            // Our found conceptscheme has a greater version number.
                            cl = this.codelists[i];
                            break;
                    }
                }
            }
        }
        return cl;
    }
    findCodelistReference(ref: commonreferences.Reference): Codelist {
        return this.findCodelist(ref.getAgencyId(), ref.getMaintainableParentId(), ref.getMaintainedParentVersion());
    }

    merge(codelists: CodeLists) {
        if (codelists == null) return;
        for (var i: number = 0; i < codelists.getCodelists().length; i++) {
            this.codelists.push(codelists[i]);
        }
    }
}
export class Concepts {
    private concepts: Array<ConceptSchemeType> = [];


    constructor() {

    }

    /**
     * @return the codelists
     */
    getConceptSchemes(): Array<ConceptSchemeType> {
        return this.concepts;
    }

    /**
     * @param codelists the codelists to set
     */
    setConceptSchemes(cls: Array<ConceptSchemeType>) {
        this.concepts = cls;
    }
    findConceptSchemeStrings(agency: string, id: string, vers: string): ConceptSchemeType {
        var findid: commonreferences.ID = new commonreferences.ID(id);
        var ag: commonreferences.NestedNCNameID = new commonreferences.NestedNCNameID(agency);
        var ver: commonreferences.Version = vers == null ? null : new commonreferences.Version(vers);
        return this.findConceptScheme(ag, findid, ver);
    }
    findConceptScheme(agency2: commonreferences.NestedNCNameID, findid: commonreferences.NestedID, ver: commonreferences.Version): ConceptSchemeType {
        for (var i: number = 0; i < this.concepts.length; i++) {
            var cl2: ConceptSchemeType = this.concepts[i];
            if (cl2.identifiesMe(agency2, findid, ver)) {
                return cl2;
            }
        }
        return null;
    }
    findConceptSchemeURI(uri: xml.anyURI): ConceptSchemeType {
        for (var i: number = 0; i < this.concepts.length; i++) {
            if (this.concepts[i].identifiesMeURI(uri)) {
                return this.concepts[i];
            }
        }
        return null;
    }
    /*
     * This method is used in sdmx 2.0 parsing to find a codelist with the correct ID..
     * this is because the Dimension in the KeyFamily does not contain a complete reference
     * only an ID.. we lookup the Codelist by it's ID, when we find a match, we can make a 
     * LocalItemSchemeReference out of it with it's AgencyID and Version.
     */
    findConceptSchemeById(id: commonreferences.NestedID): ConceptSchemeType {
        var cl: ConceptSchemeType = null;
        for (var i: number = 0; i < this.concepts.length; i++) {
            if (this.concepts[i].identifiesMeId(id)) {
                if (cl == null) cl = this.concepts[i];
                else {
                    var j: number = cl.getVersion().compareTo(this.concepts[i].getVersion());
                    switch (j) {
                        case -1: // Less
                            break;
                        case 0:  // Equal
                            break;
                        case 1:
                            // Our found conceptscheme has a greater version number.
                            cl = this.concepts[i];
                            break;
                    }
                }
            }
        }
        return cl;
    }
    findConceptSchemeReference(ref: commonreferences.Reference): ConceptSchemeType {
        return this.findConceptScheme(ref.getAgencyId(), ref.getMaintainableParentId(), ref.getMaintainedParentVersion());
    }

    merge(conceptsType: Concepts) {
        if (conceptsType == null) return;
        for (var i: number = 0; i < conceptsType.getConceptSchemes().length; i++) {
            this.concepts.push(conceptsType.getConceptSchemes()[i]);
        }
    }
}
export class DataStructures {
    private datastructures: Array<DataStructure> = [];


    constructor() {

    }

    /**
     * @return the codelists
     */
    getDataStructures(): Array<DataStructure> {
        return this.datastructures;
    }

    /**
     * @param codelists the codelists to set
     */
    setDataStructures(cls: Array<DataStructure>) {
        this.datastructures = cls;
    }
    findDataStructureStrings(agency: string, id: string, vers: string): DataStructure {
        var findid: commonreferences.ID = new commonreferences.ID(id);
        var ag: commonreferences.NestedNCNameID = new commonreferences.NestedNCNameID(agency);
        var ver: commonreferences.Version = vers == null ? null : new commonreferences.Version(vers);
        return this.findDataStructure(ag, findid, ver);
    }
    findDataStructure(agency2: commonreferences.NestedNCNameID, findid: commonreferences.NestedID, ver: commonreferences.Version): DataStructure {
        for (var i: number = 0; i < this.datastructures.length; i++) {
            var cl2: DataStructure = this.datastructures[i];
            if (cl2.identifiesMe(agency2, findid, ver)) {
                return cl2;
            }
        }
        return null;
    }
    findDataStructureURI(uri: xml.anyURI): DataStructure {
        for (var i: number = 0; i < this.datastructures.length; i++) {
            if (this.datastructures[i].identifiesMeURI(uri)) {
                return this.datastructures[i];
            }
        }
        return null;
    }
    findDataStructureReference(ref: commonreferences.Reference): DataStructure {
        return this.findDataStructure(ref.getAgencyId(), ref.getMaintainableParentId(), ref.getMaintainedParentVersion());
    }

    merge(dss: DataStructures) {
        if (dss == null) return;
        for (var i: number = 0; i < dss.getDataStructures().length; i++) {
            this.datastructures.push(dss.getDataStructures()[i]);
        }
    }
}

export class Structures implements interfaces.Registry {
    private codelists: CodeLists = null;
    private concepts: Concepts = null;
    private datastructures: DataStructures = null;
    getConcepts() {
        return this.concepts;
    }
    setConcepts(c: Concepts) {
        this.concepts = c;
    }
    getCodeLists() {
        return this.codelists;
    }
    setCodeLists(c: CodeLists) {
        this.codelists = c;
    }
    getDataStructures() {
        return this.datastructures;
    }
    setDataStructures(ds: DataStructures) {
        this.datastructures = ds;
    }
    // Registry
    listDataflows(): Array<structure.Dataflow> {
        return null;
    }
    clear(): void {

    }
    load(struct: message.StructureType): void {

    }
    unload(struct: message.StructureType): void {

    }
    findDataStructure(ref: commonreferences.Reference): structure.DataStructure {
        return null;
    }
    findDataflow(ref: commonreferences.Reference): structure.Dataflow {
        return null;
    }
    findCode(ref: commonreferences.Reference): structure.CodeType {
        return this.codelists.findCodelistReference(ref).findItemId(ref.getId());
    }
    findCodelist(ref: commonreferences.Reference): structure.Codelist {
        return this.codelists.findCodelistReference(ref);
    }
    findItemType(item: commonreferences.Reference): structure.ItemType {
        return null;
    }
    findConcept(ref: commonreferences.Reference): structure.ConceptType {
        return this.concepts.findConceptSchemeReference(ref).findItemId(ref.getId());
    }
    findConceptScheme(ref: commonreferences.Reference): structure.ConceptSchemeType {
        return this.concepts.findConceptSchemeReference(ref);
    }
    searchDataStructure(ref: commonreferences.Reference): Array<structure.DataStructure> {
        return new Array<structure.DataStructure>();
    }
    searchDataflow(ref: commonreferences.Reference): Array<structure.Dataflow> {
        return new Array<structure.Dataflow>();
    }
    searchCodelist(ref: commonreferences.Reference): Array<structure.Codelist> {
        return new Array<structure.Codelist>();
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