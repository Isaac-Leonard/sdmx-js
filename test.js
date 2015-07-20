var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var StructureType = (function () {
    function StructureType(struct) {
        this.struct = struct;
    }
    // Registry
    StructureType.prototype.listDataflows = function () {
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
    StructureType.prototype.findConcepScheme = function (ref) {
        return null;
    };
    StructureType.prototype.save = function () {
    };
    return StructureType;
})();
var ItemType = (function () {
    function ItemType() {
    }
    return ItemType;
})();
var CodeType = (function (_super) {
    __extends(CodeType, _super);
    function CodeType() {
        _super.apply(this, arguments);
    }
    return CodeType;
})(ItemType);
var ConceptType = (function (_super) {
    __extends(ConceptType, _super);
    function ConceptType() {
        _super.apply(this, arguments);
    }
    return ConceptType;
})(ItemType);
var ItemSchemeType = (function () {
    function ItemSchemeType() {
    }
    return ItemSchemeType;
})();
var CodelistType = (function (_super) {
    __extends(CodelistType, _super);
    function CodelistType() {
        _super.apply(this, arguments);
    }
    return CodelistType;
})(ItemSchemeType);
var ConceptSchemeType = (function (_super) {
    __extends(ConceptSchemeType, _super);
    function ConceptSchemeType() {
        _super.apply(this, arguments);
    }
    return ConceptSchemeType;
})(ItemSchemeType);
var DataflowType = (function () {
    function DataflowType() {
    }
    return DataflowType;
})();
var DataStructureType = (function () {
    function DataStructureType() {
    }
    return DataStructureType;
})();
var Reference = (function () {
    function Reference() {
    }
    return Reference;
})();
var Ref = (function () {
    function Ref() {
    }
    return Ref;
})();
var DataStructureReference = (function (_super) {
    __extends(DataStructureReference, _super);
    function DataStructureReference() {
        _super.apply(this, arguments);
    }
    return DataStructureReference;
})(Reference);
var DataflowReference = (function (_super) {
    __extends(DataflowReference, _super);
    function DataflowReference() {
        _super.apply(this, arguments);
    }
    return DataflowReference;
})(Reference);
var CodeReference = (function (_super) {
    __extends(CodeReference, _super);
    function CodeReference() {
        _super.apply(this, arguments);
    }
    return CodeReference;
})(Reference);
var CodelistReference = (function (_super) {
    __extends(CodelistReference, _super);
    function CodelistReference() {
        _super.apply(this, arguments);
    }
    return CodelistReference;
})(Reference);
var ItemReference = (function (_super) {
    __extends(ItemReference, _super);
    function ItemReference() {
        _super.apply(this, arguments);
    }
    return ItemReference;
})(Reference);
var ConceptReference = (function (_super) {
    __extends(ConceptReference, _super);
    function ConceptReference() {
        _super.apply(this, arguments);
    }
    return ConceptReference;
})(Reference);
var ConceptSchemeReference = (function (_super) {
    __extends(ConceptSchemeReference, _super);
    function ConceptSchemeReference() {
        _super.apply(this, arguments);
    }
    return ConceptSchemeReference;
})(Reference);
var DataQuery = (function () {
    function DataQuery() {
    }
    return DataQuery;
})();
var DataMessageType = (function () {
    function DataMessageType() {
    }
    return DataMessageType;
})();
//# sourceMappingURL=test.js.map