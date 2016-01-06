define("sdmx/registry", ["require", "exports"], function (require, exports) {
    var LocalRegistry = (function () {
        function LocalRegistry() {
            this.structures = [];
        }
        // Registry
        LocalRegistry.prototype.listDataflows = function () {
            var dataflowList = [];
            for (var i = 0; i < this.structures.length; i++) {
                if (this.structures[i].listDataflows().length > 0) {
                    collections.arrays.forEach(this.structures[i].listDataflows(), function (e) {
                        dataflowList.push(e);
                    });
                }
            }
            return dataflowList;
        };
        LocalRegistry.prototype.clear = function () {
            this.structures = [];
        };
        LocalRegistry.prototype.load = function (struct) {
            this.structures.push(struct);
        };
        LocalRegistry.prototype.unload = function (struct) {
            collections.arrays.remove(this.structures, struct);
        };
        LocalRegistry.prototype.findDataStructure = function (ref) {
            return null;
        };
        LocalRegistry.prototype.findDataflow = function (ref) {
            return null;
        };
        LocalRegistry.prototype.findCode = function (ref) {
            return null;
        };
        LocalRegistry.prototype.findCodelist = function (ref) {
            return null;
        };
        LocalRegistry.prototype.findItemType = function (item) {
            return null;
        };
        LocalRegistry.prototype.findConcept = function (ref) {
            return null;
        };
        LocalRegistry.prototype.findConceptScheme = function (ref) {
            return null;
        };
        LocalRegistry.prototype.searchDataStructure = function (ref) {
            return null;
        };
        LocalRegistry.prototype.searchDataflow = function (ref) {
            return null;
        };
        LocalRegistry.prototype.searchCodelist = function (ref) {
            return null;
        };
        LocalRegistry.prototype.searchItemType = function (item) {
            return null;
        };
        LocalRegistry.prototype.searchConcept = function (ref) {
            return null;
        };
        LocalRegistry.prototype.searchConceptScheme = function (ref) {
            return null;
        };
        LocalRegistry.prototype.save = function () { };
        return LocalRegistry;
    })();
    exports.LocalRegistry = LocalRegistry;
});

//# sourceMappingURL=registry.js.map
