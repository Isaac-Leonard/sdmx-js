/// <reference path="../../../collections.ts" />
module sdmx.structure.base {
    export class ItemType extends NameableType {

        private parent: sdmx.commonreferences.Reference = null;
        private items: collections.LinkedList<ItemType> = new collections.LinkedList<ItemType>();
        /**
         * @return the parent
         */
        public getParent(): sdmx.commonreferences.Reference {
            return this.parent;
        }

        /**
         * @param parent the parent to set
         */
        public setParent(parent: sdmx.commonreferences.Reference) {
            this.parent = parent;
        }

        /**
         * @return the items
         */
        public getItems(): collections.LinkedList<ItemType> {
            return this.items;
        }

        /**
         * @param items the items to set
         */
        public setItems(items: collections.LinkedList<ItemType>) {
            this.items = items;
        }

        public getItem(i: number): ItemType {
            return this.items[i];
        }

        public setItem(i: number, it: ItemType) {
            this.items[i] = it;
        }

        public removeItem(it: ItemType) {
            this.items.remove(it);
        }

        public addItem(it: ItemType) {
            this.items.add(it);
        }

        public size(): number {
            return this.items.size();
        }

        public findItemString(s: String): sdmx.structure.base.ItemType {
            for (var i: number = 0; i < this.items.size(); i++) {
                if (this.items.elementAtIndex(i).identifiesMeString(s)) return this.items.elementAtIndex(i);
            }
            return null;
        }

        public findItem(id: sdmx.commonreferences.IDType): ItemType {
            for (var i: number = 0; i < this.items.size(); i++) {
                if (this.items.elementAtIndex(i).identifiesMeId(id)) return this.items.elementAtIndex(i);
            }
            return null;
        }

    }
}