var sdmx;
(function (sdmx) {
    var commonreferences;
    (function (commonreferences) {
        var Ref = (function () {
            function Ref(agencyId, id, vers, maintParent, mainVers, containId, loc, ob, pack) {
                this.agencyId = null;
                this.id = null;
                this.version = null;
                this.maintainedParentId = null;
                this.maintainedParentVersion = null;
                this.local = null;
                this.object = null;
                this.package = null;
                this.agencyId = agencyId;
                this.id = id;
                this.version = vers;
                this.maintainedParentId = maintParent;
                this.maintainedParentVersion = mainVers;
                this.local = loc;
                this.object = ob;
                this.package = pack;
            }
            Ref.prototype.getAgencyId = function () {
                return this.agencyId;
            };
            Ref.prototype.getId = function () {
                return this.id;
            };
            Ref.prototype.getVersion = function () {
                return this.version;
            };
            Ref.prototype.getMaintainableParentId = function () {
                return this.maintainedParentId;
            };
            Ref.prototype.getMaintainableParentVersion = function () {
                return this.maintainedParentVersion;
            };
            Ref.prototype.getRefClass = function () {
                return this.object;
            };
            Ref.prototype.getPack = function () {
                return this.package;
            };
            Ref.prototype.setAgencyId = function (a) {
                this.agencyId = a;
            };
            Ref.prototype.setId = function (id) {
                this.id = id;
            };
            Ref.prototype.setVersion = function (v) {
                this.version = v;
            };
            Ref.prototype.setMaintainableParentId = function (id) {
                this.maintainedParentId = id;
            };
            Ref.prototype.setMaintainableParentVersion = function (v) {
                this.maintainedParentVersion = v;
            };
            Ref.prototype.setRefClass = function (ob) {
                this.object = ob;
            };
            Ref.prototype.setPackage = function (p) {
                this.package = p;
            };
            return Ref;
        })();
        commonreferences.Ref = Ref;
    })(commonreferences = sdmx.commonreferences || (sdmx.commonreferences = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=Ref.js.map
