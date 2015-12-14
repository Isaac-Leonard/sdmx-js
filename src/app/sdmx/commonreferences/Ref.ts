module sdmx.commonreferences {
    export class Ref {
        private agencyId: sdmx.commonreferences.NestedNCNameID = null;
        private id: sdmx.commonreferences.IDType = null;
        private version: sdmx.commonreferences.Version = null;
        private maintainedParentId: sdmx.commonreferences.IDType = null;
        private maintainedParentVersion: sdmx.commonreferences.Version = null;
        private local:boolean = null;
        private object: sdmx.commonreferences.type.ObjectTypeCodelistType = null;
        private package: sdmx.commonreferences.type.PackageTypeCodelistType = null;
        

        constructor(agencyId: sdmx.commonreferences.NestedNCNameID, id: sdmx.commonreferences.NestedID, vers: sdmx.commonreferences.Version, maintParent: sdmx.commonreferences.IDType, mainVers: sdmx.commonreferences.Version,  containId:sdmx.commonreferences.NestedID,loc:boolean, ob: sdmx.commonreferences.type.ObjectTypeCodelistType, pack: sdmx.commonreferences.type.PackageTypeCodelistType) {
            this.agencyId = agencyId;
            this.id=id;
            this.version=vers;
            this.maintainedParentId = maintParent;
            this.maintainedParentVersion = mainVers;
            this.local=loc;
            this.object = ob;
            this.package = pack;
        }

        public getAgencyId(): sdmx.commonreferences.NestedNCNameID {
            return this.agencyId;
        }
        public getId(): sdmx.commonreferences.IDType {
            return this.id;
        }
        public getVersion(): sdmx.commonreferences.Version {
            return this.version;
        }
        public getMaintainableParentId(): sdmx.commonreferences.IDType {
            return this.maintainedParentId;
        }
        public getMaintainableParentVersion(): sdmx.commonreferences.Version {
            return this.maintainedParentVersion;
        }
        public getRefClass(): sdmx.commonreferences.type.ObjectTypeCodelistType {
            return this.object;
        }
        public getPack(): sdmx.commonreferences.type.PackageTypeCodelistType {
            return this.package;
            
        }
        public setAgencyId(a: sdmx.commonreferences.NestedNCNameID) {
            this.agencyId = a;
        }
        public setId(id: sdmx.commonreferences.IDType) {
            this.id = id;
        }
        public setVersion(v: sdmx.commonreferences.Version) {
            this.version = v;
        }
        public setMaintainableParentId(id: sdmx.commonreferences.IDType) {
            this.maintainedParentId = id;
        }
        public setMaintainableParentVersion(v: sdmx.commonreferences.Version) {
            this.maintainedParentVersion = v;
        }
        public setRefClass(ob: sdmx.commonreferences.type.ObjectTypeCodelistType) {
            this.object=ob;
        }
        public setPackage(p: sdmx.commonreferences.type.PackageTypeCodelistType) {
            this.package=p;
        }
    }
}