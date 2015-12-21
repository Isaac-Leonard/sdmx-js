var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("common", ["require", "exports", "commonreferences"], function (require, exports, commonreferences) {
    var TextType = (function () {
        function TextType(lang, text) {
            this.lang = "";
            this.text = "";
            this.lang = lang;
            this.text = text;
        }
        TextType.prototype.getLang = function () {
            return this.lang;
        };
        TextType.prototype.getText = function () {
            return this.text;
        };
        TextType.prototype.setText = function (s) {
            this.text = s;
        };
        TextType.prototype.setLang = function (s) {
            this.lang = s;
        };
        return TextType;
    })();
    exports.TextType = TextType;
    var Annotation = (function () {
        function Annotation() {
            this.annotationTitle = "";
            this.annotationType = "";
            this.annotationUrl = "";
        }
        return Annotation;
    })();
    exports.Annotation = Annotation;
    var Annotations = (function () {
        function Annotations() {
            this.annotations = null;
        }
        Annotations.prototype.getAnnotations = function () {
            return this.annotations;
        };
        Annotations.prototype.setAnnotations = function (a) {
            this.annotations = a;
        };
        return Annotations;
    })();
    exports.Annotations = Annotations;
    var AnnotableType = (function () {
        function AnnotableType(an) {
            this.annotations = an;
        }
        return AnnotableType;
    })();
    exports.AnnotableType = AnnotableType;
    var Description = (function (_super) {
        __extends(Description, _super);
        function Description() {
            _super.apply(this, arguments);
        }
        return Description;
    })(TextType);
    exports.Description = Description;
    var Name = (function (_super) {
        __extends(Name, _super);
        function Name() {
            _super.apply(this, arguments);
        }
        return Name;
    })(TextType);
    exports.Name = Name;
    var ObservationDimensionType = (function (_super) {
        __extends(ObservationDimensionType, _super);
        function ObservationDimensionType(s) {
            _super.call(this, s);
            this.code = null;
            //  if (commonreferences.ObsDimensionsCodeType.ALL_DIMENSIONS_TEXT.equals(s)) {
            //      this.code = commonreferences.ObsDimensionsCodeType.fromString(s);
            //  } else if (commonreferences.ObsDimensionsCodeType.TIME_PERIOD_TEXT.equals(s)) {
            //      this.code = commonreferences.ObsDimensionsCodeType.fromString(s);
            //  }
        }
        ObservationDimensionType.prototype.toString = function () { return this.code != null ? this.code.toString() : _super.prototype.toString.call(this); };
        return ObservationDimensionType;
    })(commonreferences.NCNameID);
    exports.ObservationDimensionType = ObservationDimensionType;
    var ActionType = (function () {
        function ActionType(s) {
            // Instance
            this.target = null;
            var contains = false;
            for (var i = 0; i < ActionType.STRING_ENUM.length; i++) {
                if (ActionType.STRING_ENUM[i] == s) {
                    contains = true;
                }
            }
            if (!contains)
                throw new Error(s + " is not a valid ActionType");
            this.target = s;
        }
        // Utility
        ActionType.add = function (s) {
            var b = new ActionType(s);
            ActionType.ENUM.push(b);
            return b;
        };
        ActionType.addString = function (s) {
            ActionType.STRING_ENUM.push(s);
            return s;
        };
        ActionType.fromString = function (s) {
            for (var i = 0; i < ActionType.ENUM.length; i++) {
                if (ActionType.ENUM[i].target == s)
                    return ActionType.ENUM[i];
            }
            return null;
        };
        ActionType.fromStringWithException = function (s) {
            for (var i = 0; i < ActionType.ENUM.length; i++) {
                if (ActionType.ENUM[i].target == s)
                    return ActionType.ENUM[i];
            }
            throw new Error("Value:" + s + " not found in ActionType enumeration!");
        };
        ActionType.prototype.toString = function () { return this.target; };
        /*
         * DO ME! Add Proper codes for this class
         *
         *
         */
        ActionType.ENUM = new Array();
        ActionType.STRING_ENUM = new Array();
        ActionType.APPEND_TEXT = "Append";
        ActionType.REPLACE_TEXT = "Replace";
        ActionType.DELETE_TEXT = "Delete";
        ActionType.INFORMATION_TEXT = "Information";
        ActionType.APPEND = new ActionType(ActionType.APPEND_TEXT);
        ActionType.REPLACE = new ActionType(ActionType.REPLACE_TEXT);
        ActionType.DELETE = new ActionType(ActionType.DELETE_TEXT);
        ActionType.INFORMATION = new ActionType(ActionType.INFORMATION_TEXT);
        return ActionType;
    })();
    exports.ActionType = ActionType;
    var PayloadStructureType = (function () {
        function PayloadStructureType() {
            this.structureID = null;
            this.schemaURL = null;
            this.namespace = null;
            this.dimensionAtObservation = null;
            this.explicitMeasures = false;
            this.serviceURL = null;
            this.structureURL = null;
        }
        return PayloadStructureType;
    })();
    exports.PayloadStructureType = PayloadStructureType;
    var ObservationalTimePeriodType = (function () {
        function ObservationalTimePeriodType(s) {
            this.state = ObservationalTimePeriodType.YEAR;
            this.value = null;
            this.value = s;
            if (s.match(ObservationalTimePeriodType.PATTERN_YEAR).length > 0) {
                this.state = ObservationalTimePeriodType.YEAR;
            }
            if (s.match(ObservationalTimePeriodType.PATTERN_SEMESTER).length > 0) {
                this.state = ObservationalTimePeriodType.SEMESTER;
            }
            if (s.match(ObservationalTimePeriodType.PATTERN_TRIMESTER).length > 0) {
                this.state = ObservationalTimePeriodType.TRIMESTER;
            }
            if (s.match(ObservationalTimePeriodType.PATTERN_QUARTER).length > 0) {
                this.state = ObservationalTimePeriodType.QUARTER;
            }
            if (s.match(ObservationalTimePeriodType.PATTERN_MONTH).length > 0) {
                this.state = ObservationalTimePeriodType.MONTH;
            }
            if (s.match(ObservationalTimePeriodType.PATTERN_WEEK).length > 0) {
                this.state = ObservationalTimePeriodType.WEEK;
            }
            if (s.match(ObservationalTimePeriodType.PATTERN_DAY).length > 0) {
                this.state = ObservationalTimePeriodType.DAY;
            }
        }
        ObservationalTimePeriodType.prototype.toString = function () {
            return this.value;
        };
        ObservationalTimePeriodType.prototype.getState = function () {
            return this.state;
        };
        // Year
        ObservationalTimePeriodType.PATTERN_YEAR = ".{5}A1.*";
        // Semester
        ObservationalTimePeriodType.PATTERN_SEMESTER = ".{5}S[1-2].*";
        // Trimester
        ObservationalTimePeriodType.PATTERN_TRIMESTER = ".{5}T[1-3].*";
        // Quarter
        ObservationalTimePeriodType.PATTERN_QUARTER = ".{5}Q[1-4].*";
        // Month
        ObservationalTimePeriodType.PATTERN_MONTH = ".{5}M(0[1-9]|1[0-2]).*";
        // Week
        ObservationalTimePeriodType.PATTERN_WEEK = ".{5}W(0[1-9]|[1-4][0-9]|5[0-3]).*";
        // Day
        ObservationalTimePeriodType.PATTERN_DAY = ".{5}D(0[0-9][1-9]|[1-2][0-9][0-9]|3[0-5][0-9]|36[0-6]).*";
        ObservationalTimePeriodType.YEAR = 1;
        ObservationalTimePeriodType.SEMESTER = 2;
        ObservationalTimePeriodType.TRIMESTER = 3;
        ObservationalTimePeriodType.QUARTER = 4;
        ObservationalTimePeriodType.MONTH = 5;
        ObservationalTimePeriodType.WEEK = 6;
        ObservationalTimePeriodType.DAY = 7;
        return ObservationalTimePeriodType;
    })();
    exports.ObservationalTimePeriodType = ObservationalTimePeriodType;
});

//# sourceMappingURL=common.js.map
