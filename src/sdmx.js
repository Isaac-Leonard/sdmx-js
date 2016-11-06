define("sdmx", ["require", "exports", "sdmx/sdmx20", "sdmx/sdmx21", "sdmx/abs", "sdmx/oecd", "sdmx/knoema", "sdmx/nomis", "sdmx/ilo", "sdmx/estat"], function (require, exports, sdmx20, sdmx21, abs, oecd, knoema, nomis, ilo, estat) {
    var SdmxIO = (function () {
        function SdmxIO() {
        }
        SdmxIO.getLocale = function () {
            return SdmxIO.getLanguage();
        };
        SdmxIO.isSanitiseNames = function () {
            return SdmxIO.SANITISE_NAMES;
        };
        SdmxIO.parseStructure = function (s) {
            for (var i = 0; i < SdmxIO.PARSER.length; i++) {
                if (SdmxIO.PARSER[i].canParse(s)) {
                    return SdmxIO.PARSER[i].parseStructure(s);
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
                "OECD", "KNOEMA", "AfDB", "ILO", "ESTAT"];
            //return ["OECD"];
        };
        SdmxIO.connect = function (s) {
            if (s == "ABS")
                return new abs.ABS("ABS", "http://cors-anywhere.herokuapp.com/http://stat.abs.gov.au/restsdmx/sdmx.ashx/", "");
            if (s == "KNOEMA")
                return new knoema.Knoema("KNOEMA", "http://knoema.com/api/1.0/sdmx", "");
            if (s == "NOMIS")
                return new nomis.NOMISRESTServiceRegistry("NOMIS", "http://www.nomisweb.co.uk/api", "uid=0xad235cca367972d98bd642ef04ea259da5de264f");
            if (s == "OECD")
                return new oecd.OECD("OECD", "http://stats.oecd.org/restsdmx/sdmx.ashx/", "");
            if (s == "AfDB")
                return new knoema.Knoema("AfDB", "http://opendataforafrica.org/api/1.0/sdmx", "");
            if (s == "ILO")
                return new ilo.ILO("ILO", "http://cors-anywhere.herokuapp.com/http://www.ilo.org/ilostat/sdmx/ws/rest", "");
            if (s == "ESTAT")
                return new estat.ESTAT("ESTAT", "http://cors-anywhere.herokuapp.com/http://www.ec.europa.eu/eurostat/SDMX/diss-web/rest", "");
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
        SdmxIO.registerLanguage = function (s) {
            for (var i = 0; i < this.languages.length; i++) {
                if (this.languages[i] == s)
                    return;
            }
            this.languages.push(s);
        };
        SdmxIO.listLanguages = function () {
            return this.languages;
        };
        SdmxIO.setLanguage = function (s) {
            this.language = s;
        };
        SdmxIO.getLanguage = function () {
            return this.language;
        };
        SdmxIO.SANITISE_NAMES = false;
        SdmxIO.PARSER = [];
        SdmxIO.TRUNCATE_NAMES = 100;
        SdmxIO.languages = [];
        SdmxIO.language = window.navigator.userLanguage || window.navigator.language;
        return SdmxIO;
    })();
    exports.SdmxIO = SdmxIO;
    SdmxIO.registerParserProvider(new sdmx20.Sdmx20StructureParser());
    SdmxIO.registerParserProvider(new sdmx21.Sdmx21StructureParser());
});

//# sourceMappingURL=sdmx.js.map
