var sdmx;
(function (sdmx) {
    var common;
    (function (common) {
        var Annotations = (function () {
            function Annotations() {
                this.annotations = null;
            }
            Annotations.prototype.getAnnotations = function () {
                return this.annotations;
            };
            Annotations.prototype.setAnnotations = function (a) {
                this.annotations = a;
            };
            return Annotations;
        })();
        common.Annotations = Annotations;
    })(common = sdmx.common || (sdmx.common = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=Annotations.js.map
