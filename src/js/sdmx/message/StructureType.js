var sdmx;
(function (sdmx) {
    var message;
    (function (message) {
        var StructureType = (function () {
            function StructureType(struct) {
                this.struct = struct;
            }
            // Registry
            StructureType.prototype.listDataflows = function () {
                return null;
            };
            StructureType.prototype.clear = function () {
            };
            StructureType.prototype.load = function (struct) {
            };
            StructureType.prototype.unload = function (struct) {
            };
            StructureType.prototype.findDataStructure = function (ref) {
                return null;
            };
            StructureType.prototype.findDataflow = function (ref) {
                return null;
            };
            StructureType.prototype.findCode = function (ref) {
                return null;
            };
            StructureType.prototype.findCodelist = function (ref) {
                return null;
            };
            StructureType.prototype.findItemType = function (item) {
                return null;
            };
            StructureType.prototype.findConcept = function (ref) {
                return null;
            };
            StructureType.prototype.findConceptScheme = function (ref) {
                return null;
            };
            StructureType.prototype.searchDataStructure = function (ref) {
                return new Array();
            };
            StructureType.prototype.searchDataflow = function (ref) {
                return new Array();
            };
            StructureType.prototype.searchCodelist = function (ref) {
                return new Array();
            };
            StructureType.prototype.searchItemType = function (item) {
                return new Array();
            };
            StructureType.prototype.searchConcept = function (ref) {
                return new Array();
            };
            StructureType.prototype.searchConceptScheme = function (ref) {
                return new Array();
            };
            StructureType.prototype.save = function () {
            };
            return StructureType;
        })();
        message.StructureType = StructureType;
    })(message = sdmx.message || (sdmx.message = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=StructureType.js.map