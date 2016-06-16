var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("sdmx/common", ["require", "exports", "sdmx/commonreferences"], function (require, exports, commonreferences) {
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
        function AnnotableType() {
        }
        AnnotableType.prototype.getAnnotations = function () {
            return this.annotations;
        };
        AnnotableType.prototype.setAnnotations = function (annots) {
            this.annotations = annots;
        };
        return AnnotableType;
    })();
    exports.AnnotableType = AnnotableType;
    var Description = (function (_super) {
        __extends(Description, _super);
        function Description(lang, text) {
            _super.call(this, lang, text);
        }
        return Description;
    })(TextType);
    exports.Description = Description;
    var Name = (function (_super) {
        __extends(Name, _super);
        function Name(lang, text) {
            _super.call(this, lang, text);
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
        ActionType.APPEND_TEXT = ActionType.addString("Append");
        ActionType.REPLACE_TEXT = ActionType.addString("Replace");
        ActionType.DELETE_TEXT = ActionType.addString("Delete");
        ActionType.INFORMATION_TEXT = ActionType.addString("Information");
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
    var ExternalReferenceAttributeGroup = (function () {
        function ExternalReferenceAttributeGroup() {
            this.serviceURL = null;
            this.structureURL = null;
        }
        /**
         * @return the serviceURL
         */
        ExternalReferenceAttributeGroup.prototype.getServiceURL = function () {
            return this.serviceURL;
        };
        ExternalReferenceAttributeGroup.prototype.setServiceURL = function (serviceURL) {
            this.serviceURL = serviceURL;
        };
        ExternalReferenceAttributeGroup.prototype.getStructureURL = function () {
            return this.structureURL;
        };
        /**
         * @param structureURL the structureURL to set
         */
        ExternalReferenceAttributeGroup.prototype.setStructureURL = function (structureURL) {
            this.structureURL = structureURL;
        };
        return ExternalReferenceAttributeGroup;
    })();
    exports.ExternalReferenceAttributeGroup = ExternalReferenceAttributeGroup;
    var DataType = (function () {
        function DataType(s) {
            // Instance
            this.target = null;
            this.index = -1;
            var contains = false;
            for (var i = 0; i < DataType.STRING_ENUM.length; i++) {
                if (DataType.STRING_ENUM[i] == s) {
                    contains = true;
                }
            }
            if (!contains)
                throw new Error(s + " is not a valid DataType");
            this.target = s;
            this.index = DataType.STRING_ENUM.indexOf(s);
        }
        // Utility
        DataType.add = function (s) {
            var b = new DataType(s);
            DataType.ENUM.push(b);
            return b;
        };
        DataType.addString = function (s) {
            DataType.STRING_ENUM.push(s);
            return s;
        };
        DataType.fromString = function (s) {
            for (var i = 0; i < DataType.ENUM.length; i++) {
                if (DataType.ENUM[i].target == s)
                    return DataType.ENUM[i];
            }
            return null;
        };
        DataType.fromStringWithException = function (s) {
            for (var i = 0; i < DataType.ENUM.length; i++) {
                if (DataType.ENUM[i].target == s)
                    return DataType.ENUM[i];
            }
            throw new Error("Value:" + s + " not found in enumeration! - DataType");
        };
        DataType.prototype.toString = function () { return this.target; };
        DataType.prototype.toInt = function () {
            return this.index;
        };
        DataType.ENUM = new Array();
        DataType.STRING_ENUM = new Array();
        DataType.STRING_TEXT = DataType.addString("String");
        DataType.ALPHA_TEXT = DataType.addString("Alpha");
        DataType.ALPHANUMERIC_TEXT = DataType.addString("AlphaNumeric");
        DataType.NUMERIC_TEXT = DataType.addString("Numeric");
        DataType.BIGINTEGER_TEXT = DataType.addString("BigInteger");
        DataType.INTEGER_TEXT = DataType.addString("Integer");
        DataType.LONG_TEXT = DataType.addString("Long");
        DataType.SHORT_TEXT = DataType.addString("Short");
        DataType.DECIMAL_TEXT = DataType.addString("Decimal");
        DataType.FLOAT_TEXT = DataType.addString("Float");
        DataType.DOUBLE_TEXT = DataType.addString("Double");
        DataType.BOOLEAN_TEXT = DataType.addString("Boolean");
        DataType.URI_TEXT = DataType.addString("URI");
        DataType.COUNT_TEXT = DataType.addString("Count");
        DataType.INCLUSIVEVALUERANGE_TEXT = DataType.addString("InclusiveValueRange");
        DataType.EXCLUSIVEVALUERANGE_TEXT = DataType.addString("ExclusiveValueRange");
        DataType.INCREMENTAL_TEXT = DataType.addString("Incremental");
        DataType.OBSERVATIONAL_TIMEPERIOD_TEXT = DataType.addString("ObservationalTimePeriod");
        DataType.STANDARD_TIMEPERIOD_TEXT = DataType.addString("StandardTimePeriod");
        DataType.BASIC_TIMEPERIOD_TEXT = DataType.addString("BasicTimePeriod");
        DataType.GREGORIAN_TIMEPERIOD_TEXT = DataType.addString("GregorianTimePeriod");
        DataType.GREGORIAN_YEAR_TEXT = DataType.addString("GregorianYear");
        DataType.GREGORIAN_YEARMONTH_TEXT = DataType.addString("GregorianYearMonth");
        DataType.GREGORIAN_DAY_TEXT = DataType.addString("GregorianDay");
        DataType.REPORTING_TIMEPERIOD_TEXT = DataType.addString("ReportingTimePeriod");
        DataType.REPORTING_YEAR_TEXT = DataType.addString("ReportingYear");
        DataType.REPORTING_SEMESTER_TEXT = DataType.addString("ReportingSemester");
        DataType.REPORTING_TRIMESTER_TEXT = DataType.addString("ReportingTrimester");
        DataType.REPORTING_QUARTER_TEXT = DataType.addString("ReportingQuarter");
        DataType.REPORTING_MONTH_TEXT = DataType.addString("ReportingMonth");
        DataType.REPORTING_WEEK_TEXT = DataType.addString("ReportingWeek");
        DataType.REPORTING_DAY_TEXT = DataType.addString("ReportingDay");
        DataType.DATETIME_TEXT = DataType.addString("DateTime");
        DataType.TIMERANGE_TEXT = DataType.addString("TimeRange");
        DataType.MONTH_TEXT = DataType.addString("Month");
        DataType.MONTH_DAY_TEXT = DataType.addString("MonthDay");
        DataType.DAY_TEXT = DataType.addString("Day");
        DataType.TIME_TEXT = DataType.addString("Time");
        DataType.DURATION_TEXT = DataType.addString("Duration");
        DataType.XHTML_TEXT = DataType.addString("XHTML");
        DataType.KEYVALUES_TEXT = DataType.addString("KeyValues");
        DataType.IDENTIFIABLE_REFERENCE_TEXT = DataType.addString("IdentifiableReference");
        DataType.DATASET_REFERENCE_TEXT = DataType.addString("DataSetReference");
        DataType.ATTACHMENT_CONSTRAINT_REFERENCE_TEXT = DataType.addString("AttachmentConstraintReference");
        DataType.STRING = DataType.add("String");
        DataType.ALPHA = DataType.add("Alpha");
        DataType.ALPHANUMERIC = DataType.add("AlphaNumeric");
        DataType.NUMERIC = DataType.add("Numeric");
        DataType.BIGINTEGER = DataType.add("BigInteger");
        DataType.INTEGER = DataType.add("Integer");
        DataType.LONG = DataType.add("Long");
        DataType.SHORT = DataType.add("Short");
        DataType.DECIMAL = DataType.add("Decimal");
        DataType.FLOAT = DataType.add("Float");
        DataType.DOUBLE = DataType.add("Double");
        DataType.BOOLEAN = DataType.add("Boolean");
        DataType.URI = DataType.add("URI");
        DataType.COUNT = DataType.add("Count");
        DataType.INCLUSIVEVALUERANGE = DataType.add("InclusiveValueRange");
        DataType.EXCLUSIVEVALUERANGE = DataType.add("ExclusiveValueRange");
        DataType.INCREMENTAL = DataType.add("Incremental");
        DataType.OBSERVATIONAL_TIMEPERIOD = DataType.add("ObservationalTimePeriod");
        DataType.STANDARD_TIMEPERIOD = DataType.add("StandardTimePeriod");
        DataType.BASIC_TIMEPERIOD = DataType.add("BasicTimePeriod");
        DataType.GREGORIAN_TIMEPERIOD = DataType.add("GregorianTimePeriod");
        DataType.GREGORIAN_YEAR = DataType.add("GregorianYear");
        DataType.GREGORIAN_YEARMONTH = DataType.add("GregorianYearMonth");
        DataType.GREGORIAN_DAY = DataType.add("GregorianDay");
        DataType.REPORTING_TIMEPERIOD = DataType.add("ReportingTimePeriod");
        DataType.REPORTING_YEAR = DataType.add("ReportingYear");
        DataType.REPORTING_SEMESTER = DataType.add("ReportingSemester");
        DataType.REPORTING_TRIMESTER = DataType.add("ReportingTrimester");
        DataType.REPORTING_QUARTER = DataType.add("ReportingQuarter");
        DataType.REPORTING_MONTH = DataType.add("ReportingMonth");
        DataType.REPORTING_WEEK = DataType.add("ReportingWeek");
        DataType.REPORTING_DAY = DataType.add("ReportingDay");
        DataType.DATETIME = DataType.add("DateTime");
        DataType.TIMERANGE = DataType.add("TimeRange");
        DataType.MONTH = DataType.add("Month");
        DataType.MONTH_DAY = DataType.add("MonthDay");
        DataType.DAY = DataType.add("Day");
        DataType.TIME = DataType.add("Time");
        DataType.DURATION = DataType.add("Duration");
        DataType.XHTML = DataType.add("XHTML");
        DataType.KEYVALUES = DataType.add("KeyValues");
        DataType.IDENTIFIABLE_REFERENCE = DataType.add("IdentifiableReference");
        DataType.DATASET_REFERENCE = DataType.add("DataSetReference");
        DataType.ATTACHMENT_CONSTRAINT_REFERENCE = DataType.add("AttachmentConstraintReference");
        return DataType;
    })();
    exports.DataType = DataType;
    var StandardTimePeriodType = (function () {
        function StandardTimePeriodType() {
        }
        return StandardTimePeriodType;
    })();
    exports.StandardTimePeriodType = StandardTimePeriodType;
});

//# sourceMappingURL=common.js.map
