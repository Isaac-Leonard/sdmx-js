/// <reference path="../../xml/anyURI.ts" />
var sdmx;
(function (sdmx) {
    var commonreferences;
    (function (commonreferences) {
        var Reference = (function () {
            function Reference(ref, urn) {
                this.pack = null;
                this.clazz = null;
                this.agency = null;
                this.maintainedParentId = null;
                this.maintainedParentVersion = null;
                this.version = null;
                this.containedIds = null;
                this.objectId = null;
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
                }
                else {
                    this.parse();
                }
                if (this.urn == null) {
                    try {
                        //if (this.getAgencyId() != null) {
                        this.produce();
                    }
                    catch (Error) {
                    }
                }
            }
            /**
             * @return the ref
             */
            Reference.prototype.getRef = function () {
                return this.ref;
            };
            /**
             * @param ref the ref to set
             */
            Reference.prototype.setRef = function (ref) {
                this.ref = ref;
            };
            /**
             * @return the urn
             */
            Reference.prototype.getUrn = function () {
                return this.urn;
            };
            /**
             * @param urn the urn to set
             */
            Reference.prototype.setUrn = function (urn) {
                this.urn = urn;
            };
            /**
             * @return the pack
             */
            Reference.prototype.getPack = function () {
                return this.pack;
            };
            /**
             * @return the clazz
             */
            Reference.prototype.getRefClass = function () {
                return this.clazz;
            };
            /**
             * @return the clazz
             */
            Reference.prototype.getClazz = function () {
                return this.clazz;
            };
            /**
             * @return the agency
             */
            Reference.prototype.getAgencyId = function () {
                return this.agency;
            };
            /**
             * @return the maintainedObjectId
             */
            Reference.prototype.getMaintainableParentId = function () {
                return this.maintainedParentId;
            };
            /**
             * @return the maintainedObjectVersion
             */
            Reference.prototype.getVersion = function () {
                return this.version;
            };
            /**
             * @return the objectId
             */
            Reference.prototype.getId = function () {
                return this.objectId;
            };
            Reference.prototype.getContainedObjectIds = function () {
                return this.containedIds;
            };
            /**
             * @return the maintainedParentVersion
             */
            Reference.prototype.getMaintainedParentVersion = function () {
                return this.maintainedParentVersion;
            };
            //public IDType getMainID() {
            //    if( this.maintainedParentId==null ) return objectId!=null?objectId.asID():null;
            //    else return maintainedParentId;
            //}
            Reference.prototype.dump = function () {
            };
            Reference.prototype.toString = function () {
                var s = "";
                return s;
            };
            Reference.prototype.parse = function () {
            };
            Reference.prototype.produce = function () {
            };
            return Reference;
        })();
        commonreferences.Reference = Reference;
    })(commonreferences = sdmx.commonreferences || (sdmx.commonreferences = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=Reference.js.map
