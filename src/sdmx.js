define("sdmx", ["require", "exports", "sdmx/sdmx20", "sdmx/sdmx21", "sdmx/abs", "sdmx/oecd", "sdmx/knoema", "sdmx/nomis"], function (require, exports, sdmx20, sdmx21, abs, oecd, knoema, nomis) {
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
            for (var i = 0; i < SdmxIO.PARSER.length; i++) {
                if (SdmxIO.PARSER[i].canParse(s)) {
                    return SdmxIO.PARSER[i].parseStructure(s);
                }
                else {
                    alert("not my type");
                }
            }
            return null;
        };
        SdmxIO.parseData = function (s) {
            for (var i = 0; i < SdmxIO.PARSER.length; i++) {
                if (SdmxIO.PARSER[i].canParse(s)) {
                    return SdmxIO.PARSER[i].parseData(s);
                }
                else {
                    alert("not my type");
                }
            }
            return null;
        };
        SdmxIO.registerParserProvider = function (p) {
            SdmxIO.PARSER.push(p);
        };
        SdmxIO.listServices = function () {
            return ["NOMIS", "ABS",
                "OECD", "KNOEMA", "AfDB"];
            //return ["OECD"];
        };
        SdmxIO.connect = function (s) {
            if (s == "ABS")
                return new abs.ABS("ABS", "http://stat.abs.gov.au/restsdmx/sdmx.ashx/", "");
            if (s == "KNOEMA")
                return new knoema.Knoema("KNOEMA", "http://knoema.com/api/1.0/sdmx", "");
            if (s == "NOMIS")
                return new nomis.NOMISRESTServiceRegistry("NOMIS", "http://www.nomisweb.co.uk/api", "uid=0xad235cca367972d98bd642ef04ea259da5de264f");
            if (s == "OECD")
                return new oecd.OECD("OECD", "http://stats.oecd.org/restsdmx/sdmx.ashx/", "");
            if (s == "AfDB")
                return new knoema.Knoema("AfDB", "http://opendataforafrica.org/api/1.0/sdmx", "");
        };
        SdmxIO.setTruncateNames = function (n) {
            SdmxIO.TRUNCATE_NAMES = n;
        };
        SdmxIO.truncateName = function (s) {
            if (SdmxIO.TRUNCATE_NAMES) {
                return s.substring(0, SdmxIO.TRUNCATE_NAMES);
            }
            return s;
        };
        SdmxIO.LOCALE = "en";
        SdmxIO.SANITISE_NAMES = false;
        SdmxIO.PARSER = [];
        SdmxIO.TRUNCATE_NAMES = 100;
        return SdmxIO;
    })();
    exports.SdmxIO = SdmxIO;
    SdmxIO.registerParserProvider(new sdmx20.Sdmx20StructureParser());
    SdmxIO.registerParserProvider(new sdmx21.Sdmx21StructureParser());
});

//# sourceMappingURL=sdmx.js.map
