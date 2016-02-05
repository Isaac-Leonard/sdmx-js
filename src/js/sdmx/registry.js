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
    var DoubleRegistry = (function () {
        function DoubleRegistry(left, right) {
            this.left = null;
            this.right = null;
            this.left = left;
            this.right = right;
        }
        // Registry
        DoubleRegistry.prototype.listDataflows = function () {
            var dataflowList = [];
            collections.arrays.forEach(this.left.listDataflows(), function (a) {
                dataflowList.push(a);
            });
            collections.arrays.forEach(this.right.listDataflows(), function (a) {
                dataflowList.push(a);
            });
            return dataflowList;
        };
        DoubleRegistry.prototype.clear = function () {
        };
        DoubleRegistry.prototype.load = function (struct) {
        };
        DoubleRegistry.prototype.unload = function (struct) {
        };
        DoubleRegistry.prototype.findDataStructure = function (ref) {
            if (this.left.findDataStructure(ref) != null) {
                return this.left.findDataStructure(ref);
            }
            else {
                return this.right.findDataStructure(ref);
            }
        };
        DoubleRegistry.prototype.findDataflow = function (ref) {
            if (this.left.findDataflow(ref) != null) {
                return this.left.findDataflow(ref);
            }
            else {
                return this.right.findDataflow(ref);
            }
        };
        DoubleRegistry.prototype.findCode = function (ref) {
            if (this.left.findCode(ref) != null) {
                return this.left.findCode(ref);
            }
            else {
                return this.right.findCode(ref);
            }
        };
        DoubleRegistry.prototype.findCodelist = function (ref) {
            if (this.left.findCodelist(ref) != null) {
                return this.left.findCodelist(ref);
            }
            else {
                return this.right.findCodelist(ref);
            }
        };
        DoubleRegistry.prototype.findItemType = function (item) {
            if (this.left.findItemType(item) != null) {
                return this.left.findItemType(item);
            }
            else {
                return this.right.findItemType(item);
            }
        };
        DoubleRegistry.prototype.findConcept = function (ref) {
            if (this.left.findConcept(ref) != null) {
                return this.left.findConcept(ref);
            }
            else {
                return this.right.findConcept(ref);
            }
        };
        DoubleRegistry.prototype.findConceptScheme = function (ref) {
            if (this.left.findConceptScheme(ref) != null) {
                return this.left.findConceptScheme(ref);
            }
            else {
                return this.right.findConceptScheme(ref);
            }
        };
        DoubleRegistry.prototype.searchDataStructure = function (ref) {
            var list = [];
            collections.arrays.forEach(this.left.searchDataStructure(ref), function (a) {
                list.push(a);
            });
            collections.arrays.forEach(this.right.searchDataStructure(ref), function (a) {
                list.push(a);
            });
            return list;
        };
        DoubleRegistry.prototype.searchDataflow = function (ref) {
            var list = [];
            collections.arrays.forEach(this.left.searchDataflow(ref), function (a) {
                list.push(a);
            });
            collections.arrays.forEach(this.right.searchDataflow(ref), function (a) {
                list.push(a);
            });
            return list;
        };
        DoubleRegistry.prototype.searchCodelist = function (ref) {
            var list = [];
            collections.arrays.forEach(this.left.searchCodelist(ref), function (a) {
                list.push(a);
            });
            collections.arrays.forEach(this.right.searchCodelist(ref), function (a) {
                list.push(a);
            });
            return list;
        };
        DoubleRegistry.prototype.searchItemType = function (item) {
            var list = [];
            collections.arrays.forEach(this.left.searchItemType(item), function (a) {
                list.push(a);
            });
            collections.arrays.forEach(this.right.searchItemType(item), function (a) {
                list.push(a);
            });
            return list;
        };
        DoubleRegistry.prototype.searchConcept = function (ref) {
            var list = [];
            collections.arrays.forEach(this.left.searchConcept(ref), function (a) {
                list.push(a);
            });
            collections.arrays.forEach(this.right.searchConcept(ref), function (a) {
                list.push(a);
            });
            return list;
        };
        DoubleRegistry.prototype.searchConceptScheme = function (ref) {
            var list = [];
            collections.arrays.forEach(this.left.searchConceptScheme(ref), function (a) {
                list.push(a);
            });
            collections.arrays.forEach(this.right.searchConceptScheme(ref), function (a) {
                list.push(a);
            });
            return list;
        };
        DoubleRegistry.prototype.save = function () { };
        return DoubleRegistry;
    })();
    exports.DoubleRegistry = DoubleRegistry;
});

//# sourceMappingURL=registry.js.map
