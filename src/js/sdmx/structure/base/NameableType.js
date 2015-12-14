var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../common/AnnotableType.ts" />
var sdmx;
(function (sdmx) {
    var structure;
    (function (structure) {
        var base;
        (function (base) {
            var NameableType = (function (_super) {
                __extends(NameableType, _super);
                function NameableType() {
                    _super.apply(this, arguments);
                    this.names = null;
                    this.descriptions = null;
                }
                /**
                 * @return the names
                 */
                NameableType.prototype.getNames = function () {
                    return this.names;
                };
                /**
                 * @param names the names to set
                 */
                NameableType.prototype.setNames = function (names1) {
                    this.names = names1;
                };
                /**
                 * @return the descriptions
                 */
                NameableType.prototype.getDescriptions = function () {
                    return this.descriptions;
                };
                /**
                 * @param descriptions the descriptions to set
                 */
                NameableType.prototype.setDescriptions = function (descriptions) {
                    this.descriptions = descriptions;
                };
                NameableType.prototype.findName = function (lang) {
                    if (this.names == null) {
                        return null;
                    }
                    var def = null;
                    for (var i = 0; i < this.names.length; i++) {
                        if (lang != null && lang == this.names[i].getLang()) {
                            return this.names[i];
                        }
                        if (this.names[i].getLang() == null) {
                            def = this.names[i];
                        }
                    }
                    if (def == null && "en" != lang) {
                        def = this.findName("en");
                    }
                    return def;
                };
                NameableType.prototype.findDescription = function (lang) {
                    if (this.descriptions == null) {
                        return null;
                    }
                    var def = null;
                    for (var i = 0; i < this.descriptions.length; i++) {
                        if (lang != null && lang == this.descriptions[i].getLang()) {
                            return this.descriptions[i];
                        }
                        if (this.descriptions[i].getLang() == null) {
                            def = this.descriptions[i];
                        }
                    }
                    if (def == null && "en" != lang) {
                        def = this.findDescription("en");
                    }
                    return def;
                };
                NameableType.prototype.toString = function () {
                    var loc = sdmx.SdmxIO.getLocale();
                    var name = this.findName(loc);
                    if (name != null) {
                        return name.toString();
                    }
                    var desc = this.findDescription(loc);
                    if (desc != null) {
                        return desc.getText();
                    }
                    return "NameableType";
                };
                NameableType.prototype.getName = function () {
                    if (sdmx.SdmxIO.isSanitiseNames()) {
                        return NameableType.sanitise(NameableType.toString(this));
                    }
                    else {
                        return NameableType.toString(this);
                    }
                };
                NameableType.toString = function (named) {
                    var loc = sdmx.SdmxIO.getLocale();
                    if (named == null) {
                        return "";
                    }
                    var desc = named.findDescription(loc);
                    if (desc == null) {
                        var name = named.findName(loc);
                        if (name == null) {
                            return named.getId().toString();
                        }
                        return name.getText();
                    }
                    return desc.getText();
                };
                NameableType.toStringWithLocale = function (named, loc) {
                    //if (concept.equals("FREQ")) {
                    //    ItemType code2 = getCode();
                    //    System.out.println("FREQ Code=" + code2);
                    //}
                    if (named == null) {
                        return "";
                    }
                    var name = named.findName(loc);
                    if (name == null) {
                        var desc = named.findDescription(loc);
                        if (desc == null) {
                            return named.getId().toString();
                        }
                        return desc.getText();
                    }
                    return name.getText();
                };
                NameableType.toIDString = function (named) {
                    return named.getId().toString();
                };
                NameableType.sanitise = function (s) {
                    if (s.indexOf("'") != -1) {
                        s = s.replace("'", "&apos;");
                    }
                    if (s.indexOf("\"") != -1) {
                        s = s.replace("\"", "&quot;");
                    }
                    return s;
                };
                return NameableType;
            })(base.IdentifiableType);
            base.NameableType = NameableType;
        })(base = structure.base || (structure.base = {}));
    })(structure = sdmx.structure || (sdmx.structure = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=NameableType.js.map
