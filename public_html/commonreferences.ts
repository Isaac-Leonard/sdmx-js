public class anyURI {
    public s: String = null;
    constructor(s: String) {
        this.s = s;
    }
    public getString(): String { return this.s; }
    public toString(): String { return this.s; }
}
public class XMLString {
    private value: String = null;
    constructor(s: String) {
        this.value = s;
    }
    public getString(): String { return this.value; }
    public toString(): String {
        return this.value;
    }
    public equalsString(s: String): boolean {
        return this.value == s;
    }
}

public class RegexXMLString extends XMLString {

    constructor(s: String) {
        super(s);

    }
    // Override Me

    public getPatternArray(): String[] {
        return [];
    }
}

class NestedID extends RegexXMLString {

    public static PATTERN: String = "[A-z0-9_@$\\-]+(\\.[A-z0-9_@$\\-]+)*";

    constructor(s: String) {
        super(s);
    }

    public getPatternArray(): String[] {
        return [NestedID.PATTERN];
    }

    public equalsNestedID(id: NestedID): boolean {
        if (super.getString() == null) return false;
        return super.getString() == id.getString();
    }

    public equalsString(id: String): boolean {
        return super.equalsString(id);
    }

    public equalsID(id: IDType): boolean {
        return super.getString() == id.getString();
    }

    public asID(): IDType {
        return new IDType(super.getString());
    }
}

class IDType extends NestedID {

    public static PATTERN: String = "[A-z0-9_@$\\-]+";

    constructor(s: String) {
        super(s);
        if (s == null) { throw new Error("null IDType string"); }
    }

    public equalsID(id: IDType): boolean {
        return false;
    }

    public equalsString(id: String): boolean {
        return false;
    }
}
public class Version extends RegexXMLString {
    public static PATTERN: String = "[0-9]+(\\.[0-9]+)*";
    public static ONE: Version = new Version("1.0");
    constructor(s: String) {
        super(s);
    }
    public getPatternArray(): String[] {
        return [Version.PATTERN];
    }
    public equalsVersion(id: Version): boolean {
        return super.getString() == id.getString();
    }
    public equals(id: String): boolean {
        return super.getString() == id;
    }
    public compareTo(o: Object): number {
        if (!(o instanceof Version)) return -1;
        var a1: number = parseFloat(o.toString());
        var a2: number = parseFloat(toString());
        return a1 > a2 ? 1 : a1 < a2 ? -1 : 0;
    }
}
public class NestedNCNameID extends NestedID {
    public static PATTERN: String = "[A-z][A-z0-9_\\-]*(\\.[A-z][A-z0-9_\\-]*)*";

    constructor(s: String) {
        super(s);
    }
    public getPatternArray(): String[] {
        return [NestedNCNameID.PATTERN];
    }
    public equalsNestedNCNameID(id: NestedNCNameID): boolean {
        return super.getString() == id.getString();
    }
}

class Reference {
    public urn: anyURI;
    public ref: Ref;

    private pack: PackageTypeCodelistType = null;
    private clazz: ObjectTypeCodelistType = null;
    private agency: NestedNCNameID = null;
    private maintainedParentId: IDType = null;
    private maintainedParentVersion: Version = null;
    private version: Version = null;
    private containedIds: IDType[] = null;
    private objectId: NestedID = null;

    constructor(ref: Ref, urn: anyURI) {
        this.ref = ref;
        this.urn = urn;
        if (this.ref != null) {
            //try {
            this.pack = ref.getPack();
            this.clazz = ref.getRefClass();
            this.agency = ref.getAgencyId();
            this.objectId = ref.getId();
            this.maintainedParentId = ref.getMaintainableParentId();
            this.maintainedParentVersion = ref.getMaintainableParentVersion();
            this.version = ref.getVersion();
            //} catch (URISyntaxException ex) {
            //    Logger.getLogger(ReferenceType.class.getName()).log(Level.SEVERE, null, ex);
            //}
        } else {
            parse();
        }
        if (this.urn == null) {
            try {
                //if (this.getAgencyId() != null) {
                produce();
                //}
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }

    public ReferenceType(anyURI urn) {
        this.ref = null;
        this.urn = urn;
        parse();
    }

    /**
     * @return the ref
     */
    public RefBase getRef() {
    return ref;
}

    /**
     * @param ref the ref to set
     */
    public void setRef(ref:Ref) {
    this.ref = ref;
}

    /**
     * @return the urn
     */
    public anyURI getUrn() {
    return urn;
}

    /**
     * @param urn the urn to set
     */
    public void setUrn(anyURI urn) {
    this.urn = urn;
}

    /**
     * @return the pack
     */
    public PackageTypeCodelistType getPack() {
    return pack;
}

    /**
     * @return the clazz
     */
    public ObjectTypeCodelistType getRefClass() {
    return clazz;
}

    /**
     * @return the clazz
     */
    public ObjectTypeCodelistType getClazz() {
    return clazz;
}

    /**
     * @return the agency
     */
    public NestedNCNameID getAgencyId() {
    return agency;
}

    /**
     * @return the maintainedObjectId
     */
    public IDType getMaintainableParentId() {
    return maintainedParentId;
}

    /**
     * @return the maintainedObjectVersion
     */
    public Version getVersion() {
    return version;
}

    /**
     * @return the objectId
     */
    public NestedID getId() {
    return objectId;
}

    public IDType[] getContainedObjectIds() {
    return containedIds;
}

    /**
     * @return the maintainedParentVersion
     */
    public Version getMaintainedParentVersion() {
    return maintainedParentVersion;
}
    //public IDType getMainID() {
    //    if( this.maintainedParentId==null ) return objectId!=null?objectId.asID():null;
    //    else return maintainedParentId;
    //}

    public void dump() {
    System.out.println("Reference");
    System.out.println("Agency:" + this.getAgencyId());
    System.out.println("MID:" + this.getMaintainableParentId());
    System.out.println("MVers:" + this.getMaintainedParentVersion());
    System.out.println("ID:" + this.getId());
    System.out.println("Vers:" + this.getVersion());
    System.out.println("Class:" + this.getClazz());
    System.out.println("Pack:" + this.getPack());
}

    public String toString() {
    StringBuffer sb = new StringBuffer();
    sb.append(this.getClass().getName());
    sb.append(":" + this.getAgencyId());
    sb.append(":" + this.getMaintainableParentId());
    sb.append(":" + this.getMaintainedParentVersion());
    sb.append(":" + this.getId());
    sb.append(":" + this.getVersion());
    sb.append(":" + this.getClazz());
    sb.append(":" + this.getPack());
    return sb.toString();
}
    private void writeObject(ObjectOutputStream oos) throws IOException {
    oos.writeUTF(pack.toString());
    oos.writeUTF(clazz.toString());
    oos.writeUTF(agency != null ? agency.toString() : "");
    oos.writeUTF(maintainedParentId != null ? maintainedParentId.toString() : "");
    oos.writeUTF(maintainedParentVersion != null ? maintainedParentVersion.toString() : "");
    oos.writeUTF(objectId != null ? objectId.toString() : "");
    oos.writeUTF(version != null ? version.toString() : "");
    oos.writeUTF(this.urn != null ? urn.toString() : "");
    oos.writeObject(this.containedIds);
}

    private void readObject(ObjectInputStream ois) throws IOException, ClassNotFoundException {
    this.pack = PackageTypeCodelistType.fromString(ois.readUTF());
    this.clazz = ObjectTypeCodelistType.fromString(ois.readUTF());
    String ag = ois.readUTF();
    if (!"".equals(ag)) {
        this.agency = new NestedNCNameID(ag);
    }
    String mid = ois.readUTF();
    if (!"".equals(mid)) {
        this.maintainedParentId = new IDType(mid);
    }
    String mv = ois.readUTF();
    if (!"".equals(mv)) {
        this.maintainedParentVersion = new Version(mv);
    }
    String oid = ois.readUTF();
    if (!"".equals(oid)) {
        this.objectId = new IDType(oid);
    }
    String v = ois.readUTF();
    if (!"".equals(v)) {
        this.version = new Version(v);
    }
}
}
class Ref {
    public agencyId = "";
    public id = "";
    public version = "1.0";
    public maintainedParentId = "";
    public maintainedParentVersion = "1.0";
}

class StructureType implements Registry {
    public struct: any;
    constructor(struct: any) {
        this.struct = struct;
    }
    // Registry
    listDataflows(): Array<DataflowType> {
        return null;
    }
    clear(): void {

    }
    load(struct: StructureType): void {

    }
    unload(struct: StructureType): void {

    }
    findDataStructure(ref: Reference): DataStructureType {
        return null;
    }
    findDataflow(ref: Reference): DataflowType {
        return null;
    }
    findCode(ref: Reference): CodeType {
        return null;
    }
    findCodelist(ref: Reference): CodelistType {
        return null;
    }
    findItemType(item: Reference): ItemType {
        return null;
    }
    findConcept(ref: Reference): ConceptType {
        return null;
    }
    findConceptScheme(ref: Reference): ConceptSchemeType {
        return null;
    }
    searchDataStructure(ref: Reference): Array<DataStructureType> {
        return new Array<ItemType>();
    }
    searchDataflow(ref: Reference): Array<DataflowType> {
        return new Array<DataflowType>();
    }
    searchCodelist(ref: Reference): Array<CodelistType> {
        return new Array<CodelistType>();
    }
    searchItemType(item: Reference): Array<ItemType> {
        return new Array<ItemType>();
    }
    searchConcept(ref: Reference): Array<ConceptType> {
        return new Array<ConceptType>();
    }
    searchConceptScheme(ref: Reference): Array<ConceptSchemeType
        > {
        return new Array<ConceptSchemeType>();
    }
    save(): any {

    }

}
class TextType {
    public lang: string;
    public text: string = "";
}
class Annotation {
    public annotationTitle: string = "";
    public annotationType: string = "";
    public annotationUrl: string = "";
    public annotationText: TextType[];
    public id: string;
}
class Annotations {
    public annotations: Annotation[];
}
class AnnotableType {
    public annotations: Annotations;
}
class IdentifiableType extends AnnotableType {

}
class NameableType extends IdentifiableType {

}
class ItemType extends NameableType {

}
class CodeType extends ItemType {

}
class ConceptType extends ItemType {

}
class ItemSchemeType {

}
class CodelistType extends ItemSchemeType {


}

class ConceptSchemeType extends ItemSchemeType {

}

class DataflowType {



}
class DataStructureType {

}


class DataQuery {

}
class DataMessageType {

}

interface Queryable {
    getRegistry(): Registry;
    getRepository(): Repository;
}

interface Registry {
    listDataflows(): Array<DataflowType>;
    clear(): void;
    load(struct: StructureType): void;
    unload(struct: StructureType): void;
    findDataStructure(ref: Reference): DataStructureType;
    findDataflow(ref: Reference): DataflowType;
    findCodelist(ref: Reference): CodelistType;
    findItemType(ref: Reference): ItemType;
    findConcept(ref: Reference): ConceptType;
    findConceptScheme(ref: Reference): ConceptSchemeType;
    searchDataStructure(ref: Reference): Array<DataStructureType>;
    searchDataflow(ref: Reference): Array<DataflowType>;
    searchCodelist(ref: Reference): Array<CodelistType>;
    searchItemType(item: Reference): Array<ItemType>;
    searchConcept(ref: Reference): Array<ConceptType>;
    searchConceptScheme(ref: Reference): Array<ConceptSchemeType>;
    save(): any;
}
interface Repository {
    query(query: DataQuery): DataMessageType;
    query(flow: DataflowType, query: string): DataMessageType;
}
