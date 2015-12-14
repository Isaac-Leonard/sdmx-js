var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sdmx;
(function (sdmx) {
    var commonreferences;
    (function (commonreferences) {
        var NestedNCNameID = (function (_super) {
            __extends(NestedNCNameID, _super);
            function NestedNCNameID(s) {
                _super.call(this, s);
            }
            NestedNCNameID.prototype.getPatternArray = function () {
                return [NestedNCNameID.PATTERN];
            };
            NestedNCNameID.prototype.equalsNestedNCNameID = function (id) {
                return _super.prototype.getString.call(this) == id.getString();
            };
            NestedNCNameID.PATTERN = "[A-z][A-z0-9_\\-]*(\\.[A-z][A-z0-9_\\-]*)*";
            return NestedNCNameID;
        })(commonreferences.NestedID);
        commonreferences.NestedNCNameID = NestedNCNameID;
    })(commonreferences = sdmx.commonreferences || (sdmx.commonreferences = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=NestedNCNameID.js.map
