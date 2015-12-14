var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../xml/RegexXMLString.ts" />
/// <reference path="../commonreferences/IDType.ts" />
var sdmx;
(function (sdmx) {
    var commonreferences;
    (function (commonreferences) {
        var NestedID = (function (_super) {
            __extends(NestedID, _super);
            function NestedID(s) {
                _super.call(this, s);
            }
            NestedID.prototype.getPatternArray = function () {
                return [NestedID.PATTERN];
            };
            NestedID.prototype.equalsNestedID = function (id) {
                if (_super.prototype.getString.call(this) == null)
                    return false;
                return _super.prototype.getString.call(this) == id.getString();
            };
            NestedID.prototype.equalsString = function (id) {
                return _super.prototype.equalsString.call(this, id);
            };
            NestedID.prototype.equalsID = function (id) {
                return _super.prototype.getString.call(this) == id.getString();
            };
            NestedID.prototype.asID = function () {
                return new commonreferences.IDType(_super.prototype.getString.call(this));
            };
            NestedID.PATTERN = "[A-z0-9_@$\\-]+(\\.[A-z0-9_@$\\-]+)*";
            return NestedID;
        })(xml.RegexXMLString);
        commonreferences.NestedID = NestedID;
    })(commonreferences = sdmx.commonreferences || (sdmx.commonreferences = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=NestedID.js.map
