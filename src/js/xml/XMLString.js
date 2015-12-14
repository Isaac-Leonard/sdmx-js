var xml;
(function (xml) {
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
    xml.XMLString = XMLString;
})(xml || (xml = {}));

//# sourceMappingURL=XMLString.js.map
