/// <reference path="../moment.d.ts" />
var xml;
(function (xml) {
    var moment = require('moment');
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
            var m = new moment(s, [DateTime.DF, DateTime.DF2]);
            var dt = new DateTime(m.toDate());
            dt.setBaseString(s);
            return dt;
        };
        DateTime.prototype.toString = function () {
            if (this.baseString != null)
                return this.baseString;
            return new moment(this.date).format(DateTime.DF);
        };
        DateTime.now = function () {
            return new DateTime(new moment().toDate());
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
    xml.DateTime = DateTime;
})(xml || (xml = {}));

//# sourceMappingURL=DateTime.js.map
