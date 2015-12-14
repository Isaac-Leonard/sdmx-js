/// <reference path="../../xml/anyURI.ts" />
module sdmx.commonreferences {
    export class Reference {
        public urn: xml.anyURI;
        public ref: Ref;

        private pack: sdmx.commonreferences.type.PackageTypeCodelistType = null;
        private clazz: sdmx.commonreferences.type.ObjectTypeCodelistType = null;
        private agency: NestedNCNameID = null;
        private maintainedParentId: IDType = null;
        private maintainedParentVersion: Version = null;
        private version: Version = null;
        private containedIds: Array<IDType> = null;
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
                this.parse();
            }
            if (this.urn == null) {
                try {
                    //if (this.getAgencyId() != null) {
                    this.produce();
                    //}
                } catch (Error) {
                }
            }
        }

        /**
         * @return the ref
         */
        public getRef(): Ref {
            return this.ref;
        }

        /**
         * @param ref the ref to set
         */
        public setRef(ref: Ref) {
            this.ref = ref;
        }

        /**
         * @return the urn
         */
        public getUrn(): xml.anyURI {
            return this.urn;
        }

        /**
         * @param urn the urn to set
         */
        public setUrn(urn: xml.anyURI) {
            this.urn = urn;
        }

        /**
         * @return the pack
         */
        public getPack(): sdmx.commonreferences.type.PackageTypeCodelistType {
            return this.pack;
        }

        /**
         * @return the clazz
         */
        public getRefClass(): sdmx.commonreferences.type.ObjectTypeCodelistType {
            return this.clazz;
        }

        /**
         * @return the clazz
         */
        public getClazz(): sdmx.commonreferences.type.ObjectTypeCodelistType {
            return this.clazz;
        }

        /**
         * @return the agency
         */
        public getAgencyId(): sdmx.commonreferences.NestedNCNameID {
            return this.agency;
        }

        /**
         * @return the maintainedObjectId
         */
        public getMaintainableParentId(): sdmx.commonreferences.IDType {
            return this.maintainedParentId;
        }

        /**
         * @return the maintainedObjectVersion
         */
        public getVersion(): sdmx.commonreferences.Version {
            return this.version;
        }

        /**
         * @return the objectId
         */
        public getId(): sdmx.commonreferences.NestedID {
            return this.objectId;
        }

        public getContainedObjectIds(): Array<IDType> {
            return this.containedIds;
        }

        /**
         * @return the maintainedParentVersion
         */
        public getMaintainedParentVersion(): sdmx.commonreferences.Version {
            return this.maintainedParentVersion;
        }
        //public IDType getMainID() {
        //    if( this.maintainedParentId==null ) return objectId!=null?objectId.asID():null;
        //    else return maintainedParentId;
        //}

        public dump() {
        }

        public toString(): String {
            var s: String = "";
            return s;
        }
        public parse() {
            
        }
        public produce() {
            
        }
    }
}