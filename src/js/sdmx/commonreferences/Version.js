var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../xml/RegexXMLString.ts" />
var sdmx;
(function (sdmx) {
    var commonreferences;
    (function (commonreferences) {
        var Version = (function (_super) {
            __extends(Version, _super);
            function Version(s) {
                _super.call(this, s);
            }
            Version.prototype.getPatternArray = function () {
                return [Version.PATTERN];
            };
            Version.prototype.equalsVersion = function (id) {
                return _super.prototype.getString.call(this) == id.getString();
            };
            Version.prototype.equals = function (id) {
                return _super.prototype.getString.call(this) == id;
            };
            Version.prototype.compareTo = function (o) {
                if (!(o instanceof Version))
                    return -1;
                var a1 = parseFloat(o.toString());
                var a2 = parseFloat(toString());
                return a1 > a2 ? 1 : a1 < a2 ? -1 : 0;
            };
            Version.PATTERN = "[0-9]+(\\.[0-9]+)*";
            Version.ONE = new Version("1.0");
            return Version;
        })(xml.RegexXMLString);
        commonreferences.Version = Version;
    })(commonreferences = sdmx.commonreferences || (sdmx.commonreferences = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=Version.js.map
