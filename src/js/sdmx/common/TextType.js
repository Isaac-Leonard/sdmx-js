var sdmx;
(function (sdmx) {
    var common;
    (function (common) {
        var TextType = (function () {
            function TextType(lang, text) {
                this.text = "";
                this.lang = lang;
                this.text = text;
            }
            TextType.prototype.getLang = function () {
                return this.lang;
            };
            TextType.prototype.getText = function () {
                return this.text;
            };
            TextType.prototype.setText = function (s) {
                this.text = s;
            };
            TextType.prototype.setLang = function (s) {
                this.lang = s;
            };
            return TextType;
        })();
        common.TextType = TextType;
    })(common = sdmx.common || (sdmx.common = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=TextType.js.map
