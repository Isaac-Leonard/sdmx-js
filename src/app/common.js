var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("common", ["require", "exports"], function (require, exports) {
    /// <amd-module name='common'/>
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
});

//# sourceMappingURL=common.js.map
