/// <reference path="../../xml/anyURI.ts" />
module sdmx.commonreferences {
    export class Reference {
        public urn: xml.anyURI;
        public ref: Ref;

        private pack: sdmx.commonreferences.type.PackageTypeCodelistType = null;
        private clazz: ObjectTypeCodelistType = null;
        private agency: NestedNCNameID = null;
        private maintainedParentId: IDType = null;
        private maintainedParentVersion: Version = null;
        private version: Version = null;
        private containedIds: IDType[] = null;
        private objectId: NestedID = null;

        constructor(ref: Ref, urn: xml.anyURI) {
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

        public ReferenceType(urn:xml.anyURI) {
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
    public void setUrn(urn:xml.anyURI) {
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
