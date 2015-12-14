var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../common/AnnotableType.ts" />
var sdmx;
(function (sdmx) {
    var structure;
    (function (structure) {
        var base;
        (function (base) {
            var IdentifiableType = (function (_super) {
                __extends(IdentifiableType, _super);
                function IdentifiableType(an, id, urn, uri) {
                    _super.call(this, an);
                    this.id = id;
                    this.urn = urn;
                    this.uri = uri;
                }
                IdentifiableType.prototype.getId = function () { return this.id; };
                IdentifiableType.prototype.getURN = function () { return this.urn; };
                IdentifiableType.prototype.getURI = function () { return this.uri; };
                IdentifiableType.prototype.setId = function (id) {
                    this.id = id;
                };
                IdentifiableType.prototype.setURN = function (urn) {
                    this.urn = urn;
                };
                IdentifiableType.prototype.setURI = function (uri) {
                    this.uri = uri;
                };
                IdentifiableType.prototype.identifiesMeId = function (oid) {
                    if (this.id.equalsID(oid))
                        return true;
                    else
                        return false;
                };
                IdentifiableType.prototype.identifiesMeString = function (oid) {
                    if (this.id.equalsString(oid))
                        return true;
                    else
                        return false;
                };
                IdentifiableType.prototype.identifiesMeNestedId = function (oid) {
                    if (oid.equalsString(this.id.getString()))
                        return true;
                    else
                        return false;
                };
                return IdentifiableType;
            })(sdmx.common.AnnotableType);
            base.IdentifiableType = IdentifiableType;
        })(base = structure.base || (structure.base = {}));
    })(structure = sdmx.structure || (sdmx.structure = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=IdentifiableType.js.map
