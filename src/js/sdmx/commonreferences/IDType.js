var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="NestedID.ts" />
var sdmx;
(function (sdmx) {
    var commonreferences;
    (function (commonreferences) {
        var IDType = (function (_super) {
            __extends(IDType, _super);
            function IDType(s) {
                _super.call(this, s);
                if (s == null) {
                    throw new Error("null IDType string");
                }
            }
            IDType.prototype.equalsID = function (id) {
                return false;
            };
            IDType.prototype.equalsString = function (id) {
                return false;
            };
            IDType.prototype.getPatternArray = function () {
                return [IDType.PATTERN];
            };
            IDType.PATTERN = "[A-z0-9_@$\\-]+";
            return IDType;
        })(commonreferences.NestedID);
        commonreferences.IDType = IDType;
    })(commonreferences = sdmx.commonreferences || (sdmx.commonreferences = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=IDType.js.map
