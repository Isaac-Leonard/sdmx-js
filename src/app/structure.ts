import common = require("common");
import commonreferences = require("commonreferences");
import xml = require("xml");
import structure = require("structure");
import sdmx = require("sdmx");

export class IdentifiableType extends common.AnnotableType {
    private id: commonreferences.IDType;
    private urn: xml.anyURI;
    private uri: xml.anyURI;
    constructor(an: common.Annotations, id: commonreferences.IDType, urn: xml.anyURI, uri: xml.anyURI) {
        super(an);
        this.id = id;
        this.urn = urn;
        this.uri = uri;
    }
    public getId(): commonreferences.IDType { return this.id; }
    public getURN(): xml.anyURI { return this.urn; }
    public getURI(): xml.anyURI { return this.uri; }
    public setId(id: commonreferences.IDType) {
        this.id = id;
    }
    public setURN(urn: xml.anyURI) {
        this.urn = urn;
    }
    public setURI(uri: xml.anyURI) {
        this.uri = uri;
    }
    public identifiesMeId(oid: commonreferences.IDType): boolean {
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
    private names: Array<common.Name> = null;
    private descriptions: Array<common.Description> = null;

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
    private items: collections.LinkedList<ItemType> = new collections.LinkedList<ItemType>();
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
    public getItems(): collections.LinkedList<ItemType> {
        return this.items;
    }

    /**
     * @param items the items to set
     */
    public setItems(items: collections.LinkedList<ItemType>) {
        this.items = items;
    }

    public getItem(i: number): ItemType {
        return this.items[i];
    }

    public setItem(i: number, it: ItemType) {
        this.items[i] = it;
    }

    public removeItem(it: ItemType) {
        this.items.remove(it);
    }

    public addItem(it: ItemType) {
        this.items.add(it);
    }

    public size(): number {
        return this.items.size();
    }

    public findItemString(s: string): structure.ItemType {
        for (var i: number = 0; i < this.items.size(); i++) {
            if (this.items.elementAtIndex(i).identifiesMeString(s)) return this.items.elementAtIndex(i);
        }
        return null;
    }

    public findItem(id: commonreferences.IDType): ItemType {
        for (var i: number = 0; i < this.items.size(); i++) {
            if (this.items.elementAtIndex(i).identifiesMeId(id)) return this.items.elementAtIndex(i);
        }
        return null;
    }

}

export class ItemSchemeType {
    private items: Array<ItemType> = new Array<ItemType>();
    private partial: boolean = false;

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

    public findItemId(s: commonreferences.IDType): ItemType {
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
        return this.findSubItemsId(new commonreferences.IDType(s));
    }

    public findSubItemsId(id: commonreferences.IDType): Array<ItemType> {
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


export class VersionableType extends NameableType {
    private version: commonreferences.Version = commonreferences.Version.ONE;
    private validFrom: xml.DateTime = null;;
    private validTo: xml.DateTime = null;
}
export class CodeType extends ItemType {

}
export class CodelistType extends ItemSchemeType {


}
export class ConceptSchemeType extends ItemSchemeType {

}
export class ConceptType extends ItemType {

}
export class Dataflow {



}
export class DataStructure {

}