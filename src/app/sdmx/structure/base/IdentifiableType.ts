/// <reference path="../../common/AnnotableType.ts" />
module sdmx.structure.base {
    export class IdentifiableType extends sdmx.common.AnnotableType {
        private id: sdmx.commonreferences.IDType;
        private urn: xml.anyURI;
        private uri: xml.anyURI;
        constructor(an: sdmx.common.Annotations, id: sdmx.commonreferences.IDType, urn: xml.anyURI, uri: xml.anyURI) {
            super(an);
            this.id = id;
            this.urn = urn;
            this.uri = uri;
        }
        public getId(): sdmx.commonreferences.IDType { return this.id; }
        public getURN(): xml.anyURI { return this.urn; }
        public getURI(): xml.anyURI { return this.uri; }
        public setId(id: sdmx.commonreferences.IDType) {
            this.id = id;
        }
        public setURN(urn: xml.anyURI) {
            this.urn = urn;
        }
        public setURI(uri: xml.anyURI) {
            this.uri = uri;
        }
        public identifiesMeId(oid: sdmx.commonreferences.IDType): boolean {
            if (this.id.equalsID(oid)) return true;
            else return false;
        }
        public identifiesMeString(oid: String): boolean {
            if (this.id.equalsString(oid)) return true;
            else return false;
        }
        public identifiesMeNestedId(oid: sdmx.commonreferences.NestedID): boolean {
            if (oid.equalsString(this.id.getString())) return true;
            else return false;
        }
    }
}