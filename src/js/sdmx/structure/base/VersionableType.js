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
            var VersionableType = (function (_super) {
                __extends(VersionableType, _super);
                function VersionableType() {
                    _super.apply(this, arguments);
                    this.version = sdmx.commonreferences.Version.ONE;
                    this.validFrom = null;
                    this.validTo = null;
                }
                ;
                return VersionableType;
            })(base.NameableType);
            base.VersionableType = VersionableType;
        })(base = structure.base || (structure.base = {}));
    })(structure = sdmx.structure || (sdmx.structure = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=VersionableType.js.map
