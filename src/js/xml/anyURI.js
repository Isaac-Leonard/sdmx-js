var xml;
(function (xml) {
    var anyURI = (function () {
        function anyURI(s) {
            this.s = null;
            this.s = s;
        }
        anyURI.prototype.getString = function () { return this.s; };
        anyURI.prototype.toString = function () { return this.s; };
        return anyURI;
    })();
    xml.anyURI = anyURI;
})(xml || (xml = {}));

//# sourceMappingURL=anyURI.js.map
