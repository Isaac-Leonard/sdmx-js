var sdmx;
(function (sdmx) {
    var SdmxIO = (function () {
        function SdmxIO() {
        }
        SdmxIO.getLocale = function () {
            return SdmxIO.LOCALE;
        };
        SdmxIO.isSanitiseNames = function () {
            return SdmxIO.SANITISE_NAMES;
        };
        SdmxIO.LOCALE = "en";
        SdmxIO.SANITISE_NAMES = false;
        return SdmxIO;
    })();
    sdmx.SdmxIO = SdmxIO;
})(sdmx || (sdmx = {}));

//# sourceMappingURL=SdmxIO.js.map
