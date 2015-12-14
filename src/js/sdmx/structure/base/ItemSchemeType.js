var sdmx;
(function (sdmx) {
    var structure;
    (function (structure) {
        var base;
        (function (base) {
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
                    return this.findSubItemsId(new sdmx.commonreferences.IDType(s));
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
            base.ItemSchemeType = ItemSchemeType;
        })(base = structure.base || (structure.base = {}));
    })(structure = sdmx.structure || (sdmx.structure = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=ItemSchemeType.js.map
