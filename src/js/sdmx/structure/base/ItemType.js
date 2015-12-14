var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../collections.ts" />
var sdmx;
(function (sdmx) {
    var structure;
    (function (structure) {
        var base;
        (function (base) {
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
            })(base.NameableType);
            base.ItemType = ItemType;
        })(base = structure.base || (structure.base = {}));
    })(structure = sdmx.structure || (sdmx.structure = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=ItemType.js.map
