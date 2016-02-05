var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("sdmx/xml", ["require", "exports", "moment"], function (require, exports, moment) {
    var XMLString = (function () {
        function XMLString(s) {
            this.value = null;
            this.value = s;
        }
        XMLString.prototype.getString = function () { return this.value; };
        XMLString.prototype.toString = function () {
            return this.value;
        };
        XMLString.prototype.equalsString = function (s) {
            return this.value == s;
        };
        return XMLString;
    })();
    exports.XMLString = XMLString;
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
    })(XMLString);
    exports.RegexXMLString = RegexXMLString;
    var anyURI = (function () {
        function anyURI(s) {
            this.s = null;
            this.s = s;
        }
        anyURI.prototype.getString = function () { return this.s; };
        anyURI.prototype.toString = function () { return this.s; };
        return anyURI;
    })();
    exports.anyURI = anyURI;
    var DateTime = (function () {
        function DateTime(d) {
            this.baseString = null;
            this.date = null;
            this.date = d;
        }
        DateTime.prototype.getDate = function () {
            return this.date;
        };
        DateTime.fromString = function (s) {
            if (s == null || s == "") {
                return null;
            }
            var m = moment(s, [DateTime.DF, DateTime.DF2]);
            var dt = new DateTime(m.toDate());
            dt.setBaseString(s);
            return dt;
        };
        DateTime.prototype.toString = function () {
            if (this.baseString != null)
                return this.baseString;
            return moment(this.date).format(DateTime.DF);
        };
        DateTime.now = function () {
            return new DateTime(moment().toDate());
        };
        DateTime.prototype.setBaseString = function (s) {
            this.baseString = s;
        };
        DateTime.prototype.getBaseString = function () {
            return this.baseString;
        };
        DateTime.DF = "yyyy-MM-dd'T'HH:mm:ssXXX";
        DateTime.DF2 = "yyyy-MM-dd'T'HH:mm:ss";
        return DateTime;
    })();
    exports.DateTime = DateTime;
    var duration = (function () {
        function duration() {
        }
        return duration;
    })();
    exports.duration = duration;
});

//# sourceMappingURL=xml.js.map
