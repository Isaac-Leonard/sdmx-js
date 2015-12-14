var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../base/ItemType.ts" />
var sdmx;
(function (sdmx) {
    var structure;
    (function (structure) {
        var code;
        (function (code) {
            var CodeType = (function (_super) {
                __extends(CodeType, _super);
                function CodeType() {
                    _super.apply(this, arguments);
                }
                return CodeType;
            })(sdmx.structure.base.ItemType);
            code.CodeType = CodeType;
        })(code = structure.code || (structure.code = {}));
    })(structure = sdmx.structure || (sdmx.structure = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=CodeType.js.map
