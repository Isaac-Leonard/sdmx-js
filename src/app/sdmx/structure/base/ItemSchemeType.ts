module sdmx.structure.base {
    export class ItemSchemeType {
        private items: Array<ItemType> = new Array<ItemType>();
        private partial: boolean = false;

        /**
         * @return the items
         */
        public getItems(): Array<ItemType> {
            return this.items;
        }

        /**
         * @param items the items to set
         */
        public setItems(itms: Array<ItemType>) {
            this.items = itms;
        }

        /**
         * @return the partial
         */
        public isPartial(): boolean {
            return this.partial;
        }

        /**
         * @param partial the partial to set
         */
        public setPartial(partial: boolean) {
            this.partial = partial;
        }

        public getItem(i: number): ItemType {
            return this.items[i];
        }

        public setItem(i: number, it: ItemType) {
            this.items[i] = it;
        }

        public removeItem(it: ItemType) {
            this.items.splice(this.items.indexOf(it), 1);
        }

        public addItem(it: ItemType) {
            this.items.push(it);
        }

        public size(): number {
            return this.items.length;
        }

        public findItemString(s: String): ItemType {
            for (var i: number = 0; i < this.items.length; i++) {
                if (this.items[i].identifiesMeString(s)) return this.items[i];
            }
            return null;
        }

        public findItemId(s: sdmx.commonreferences.IDType): ItemType {
            for (var i: number = 0; i < this.items.length; i++) {
                if (this.items[i].identifiesMeId(s)) return this.items[i];
            }
            return null;
        }

        public findItemNestedId(s: sdmx.commonreferences.NestedID): ItemType {
            for (var i: number = 0; i < this.items.length; i++) {
                if (this.items[i].identifiesMeNestedId(s)) return this.items[i];
            }
            return null;
        }
        public findSubItemsString(s: String): Array<ItemType> {
            return this.findSubItemsId(new sdmx.commonreferences.IDType(s));
        }

        public findSubItemsId(id: sdmx.commonreferences.IDType): Array<ItemType> {
            var result: Array<ItemType> = new Array<ItemType>();
            if (id == null) {
                for (var i: number = 0; i < this.items.length; i++) {
                    var item: ItemType = this.items[i];
                    if (item.getParent() == null) {
                        result.push(item);
                    }
                }
                return result;
            } else {
                for (var i: number = 0; i < this.items.length; i++) {
                    var item: ItemType = this.items[i];
                    if (item.getParent().getId().equalsID(id)) {
                        result.push(item);
                    }
                }
                return result;
            }
        }
    }
}