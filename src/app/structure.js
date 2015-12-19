var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("structure", ["require", "exports", "common", "commonreferences", "sdmx"], function (require, exports, common, commonreferences, sdmx) {
    var IdentifiableType = (function (_super) {
        __extends(IdentifiableType, _super);
        function IdentifiableType(an, id, urn, uri) {
            _super.call(this, an);
            this.id = id;
            this.urn = urn;
            this.uri = uri;
        }
        IdentifiableType.prototype.getId = function () { return this.id; };
        IdentifiableType.prototype.getURN = function () { return this.urn; };
        IdentifiableType.prototype.getURI = function () { return this.uri; };
        IdentifiableType.prototype.setId = function (id) {
            this.id = id;
        };
        IdentifiableType.prototype.setURN = function (urn) {
            this.urn = urn;
        };
        IdentifiableType.prototype.setURI = function (uri) {
            this.uri = uri;
        };
        IdentifiableType.prototype.identifiesMeId = function (oid) {
            if (this.id.equalsID(oid))
                return true;
            else
                return false;
        };
        IdentifiableType.prototype.identifiesMeString = function (oid) {
            if (this.id.equalsString(oid))
                return true;
            else
                return false;
        };
        IdentifiableType.prototype.identifiesMeNestedId = function (oid) {
            if (oid.equalsString(this.id.getString()))
                return true;
            else
                return false;
        };
        return IdentifiableType;
    })(common.AnnotableType);
    exports.IdentifiableType = IdentifiableType;
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
    })(IdentifiableType);
    exports.NameableType = NameableType;
    var ItemType = (function (_super) {
        __extends(ItemType, _super);
        function ItemType() {
            _super.apply(this, arguments);
            this.parent = null;
            this.items = new collections.LinkedList();
        }
        /**
         * @return the parent
         */
        ItemType.prototype.getParent = function () {
            return this.parent;
        };
        /**
         * @param parent the parent to set
         */
        ItemType.prototype.setParent = function (parent) {
            this.parent = parent;
        };
        /**
         * @return the items
         */
        ItemType.prototype.getItems = function () {
            return this.items;
        };
        /**
         * @param items the items to set
         */
        ItemType.prototype.setItems = function (items) {
            this.items = items;
        };
        ItemType.prototype.getItem = function (i) {
            return this.items[i];
        };
        ItemType.prototype.setItem = function (i, it) {
            this.items[i] = it;
        };
        ItemType.prototype.removeItem = function (it) {
            this.items.remove(it);
        };
        ItemType.prototype.addItem = function (it) {
            this.items.add(it);
        };
        ItemType.prototype.size = function () {
            return this.items.size();
        };
        ItemType.prototype.findItemString = function (s) {
            for (var i = 0; i < this.items.size(); i++) {
                if (this.items.elementAtIndex(i).identifiesMeString(s))
                    return this.items.elementAtIndex(i);
            }
            return null;
        };
        ItemType.prototype.findItem = function (id) {
            for (var i = 0; i < this.items.size(); i++) {
                if (this.items.elementAtIndex(i).identifiesMeId(id))
                    return this.items.elementAtIndex(i);
            }
            return null;
        };
        return ItemType;
    })(NameableType);
    exports.ItemType = ItemType;
    var ItemSchemeType = (function () {
        function ItemSchemeType() {
            this.items = new Array();
            this.partial = false;
        }
        /**
         * @return the items
         */
        ItemSchemeType.prototype.getItems = function () {
            return this.items;
        };
        /**
         * @param items the items to set
         */
        ItemSchemeType.prototype.setItems = function (itms) {
            this.items = itms;
        };
        /**
         * @return the partial
         */
        ItemSchemeType.prototype.isPartial = function () {
            return this.partial;
        };
        /**
         * @param partial the partial to set
         */
        ItemSchemeType.prototype.setPartial = function (partial) {
            this.partial = partial;
        };
        ItemSchemeType.prototype.getItem = function (i) {
            return this.items[i];
        };
        ItemSchemeType.prototype.setItem = function (i, it) {
            this.items[i] = it;
        };
        ItemSchemeType.prototype.removeItem = function (it) {
            this.items.splice(this.items.indexOf(it), 1);
        };
        ItemSchemeType.prototype.addItem = function (it) {
            this.items.push(it);
        };
        ItemSchemeType.prototype.size = function () {
            return this.items.length;
        };
        ItemSchemeType.prototype.findItemString = function (s) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].identifiesMeString(s))
                    return this.items[i];
            }
            return null;
        };
        ItemSchemeType.prototype.findItemId = function (s) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].identifiesMeId(s))
                    return this.items[i];
            }
            return null;
        };
        ItemSchemeType.prototype.findItemNestedId = function (s) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].identifiesMeNestedId(s))
                    return this.items[i];
            }
            return null;
        };
        ItemSchemeType.prototype.findSubItemsString = function (s) {
            return this.findSubItemsId(new commonreferences.IDType(s));
        };
        ItemSchemeType.prototype.findSubItemsId = function (id) {
            var result = new Array();
            if (id == null) {
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    if (item.getParent() == null) {
                        result.push(item);
                    }
                }
                return result;
            }
            else {
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    if (item.getParent().getId().equalsID(id)) {
                        result.push(item);
                    }
                }
                return result;
            }
        };
        return ItemSchemeType;
    })();
    exports.ItemSchemeType = ItemSchemeType;
    var VersionableType = (function (_super) {
        __extends(VersionableType, _super);
        function VersionableType() {
            _super.apply(this, arguments);
            this.version = commonreferences.Version.ONE;
            this.validFrom = null;
            this.validTo = null;
        }
        ;
        return VersionableType;
    })(NameableType);
    exports.VersionableType = VersionableType;
    var CodeType = (function (_super) {
        __extends(CodeType, _super);
        function CodeType() {
            _super.apply(this, arguments);
        }
        return CodeType;
    })(ItemType);
    exports.CodeType = CodeType;
    var CodelistType = (function (_super) {
        __extends(CodelistType, _super);
        function CodelistType() {
            _super.apply(this, arguments);
        }
        return CodelistType;
    })(ItemSchemeType);
    exports.CodelistType = CodelistType;
    var ConceptSchemeType = (function (_super) {
        __extends(ConceptSchemeType, _super);
        function ConceptSchemeType() {
            _super.apply(this, arguments);
        }
        return ConceptSchemeType;
    })(ItemSchemeType);
    exports.ConceptSchemeType = ConceptSchemeType;
    var ConceptType = (function (_super) {
        __extends(ConceptType, _super);
        function ConceptType() {
            _super.apply(this, arguments);
        }
        return ConceptType;
    })(ItemType);
    exports.ConceptType = ConceptType;
    var Dataflow = (function () {
        function Dataflow() {
        }
        return Dataflow;
    })();
    exports.Dataflow = Dataflow;
    var DataStructure = (function () {
        function DataStructure() {
        }
        return DataStructure;
    })();
    exports.DataStructure = DataStructure;
});

//# sourceMappingURL=structure.js.map
