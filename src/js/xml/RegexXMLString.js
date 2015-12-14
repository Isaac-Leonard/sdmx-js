var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var xml;
(function (xml) {
    var RegexXMLString = (function (_super) {
        __extends(RegexXMLString, _super);
        function RegexXMLString(s) {
            _super.call(this, s);
        }
        // Override Me
        RegexXMLString.prototype.getPatternArray = function () {
            return [];
        };
        return RegexXMLString;
    })(xml.XMLString);
    xml.RegexXMLString = RegexXMLString;
})(xml || (xml = {}));

//# sourceMappingURL=RegexXMLString.js.map
