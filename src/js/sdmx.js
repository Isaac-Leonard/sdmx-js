define(["require", "exports"], function (require, exports) {
    var SdmxIO = (function () {
        function SdmxIO() {
        }
        SdmxIO.getLocale = function () {
            return SdmxIO.LOCALE;
        };
        SdmxIO.isSanitiseNames = function () {
            return SdmxIO.SANITISE_NAMES;
        };
        SdmxIO.parseStructure = function (s) {
            return null;
        };
        SdmxIO.LOCALE = "en";
        SdmxIO.SANITISE_NAMES = false;
        return SdmxIO;
    })();
    exports.SdmxIO = SdmxIO;
});

//# sourceMappingURL=sdmx.js.map
