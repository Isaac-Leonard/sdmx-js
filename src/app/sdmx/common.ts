/// <amd-module name='sdmx/common'/>
import commonreferences = require("sdmx/commonreferences");
import xml = require("sdmx/xml");
export class TextType {
    private lang: string = "";
    private text: string = "";
    constructor(lang: string, text: string) {
        this.lang = lang;
        this.text = text;
    }
    public getLang(): string {
        return this.lang;
    }
    public getText(): string {
        return this.text;
    }
    public setText(s: string) {
        this.text = s;
    }
    public setLang(s: string) {
        this.lang = s;
    }
}
export class Annotation {
    public annotationTitle: string = "";
    public annotationType: string = "";
    public annotationUrl: string = "";
    public annotationText: TextType[];
    public id: string;
}
export class Annotations {
    private annotations: Annotation[] = null;
    public getAnnotations(): Annotation[] {
        return this.annotations;
    }
    public setAnnotations(a: Annotation[]) {
        this.annotations = a;
    }
}
export class AnnotableType {
    public annotations: Annotations;
    constructor() {
    }
    getAnnotations(): Annotations {
        return this.annotations;
    }
    setAnnotations(annots: Annotations) {
        this.annotations = annots;
    }
}

export class Description extends TextType {
    constructor(lang: string, text: string) {
        super(lang, text);
    }
}

export class Name extends TextType {
    constructor(lang: string, text: string) {
        super(lang, text);
    }
}
export class ObservationDimensionType extends commonreferences.NCNameID {
    private code: commonreferences.ObsDimensionsCodeType = null;
    constructor(s: string) {
        super(s);
        //  if (commonreferences.ObsDimensionsCodeType.ALL_DIMENSIONS_TEXT.equals(s)) {
        //      this.code = commonreferences.ObsDimensionsCodeType.fromString(s);
        //  } else if (commonreferences.ObsDimensionsCodeType.TIME_PERIOD_TEXT.equals(s)) {
        //      this.code = commonreferences.ObsDimensionsCodeType.fromString(s);
        //  }
    }
    public toString(): string { return this.code != null ? this.code.toString() : super.toString(); }
}
export class ActionType {
    /*
     * DO ME! Add Proper codes for this class
     * 
     * 
     */
    public static ENUM: Array<ActionType> = new Array<ActionType>();
    public static STRING_ENUM: Array<string> = new Array<string>();

    public static APPEND_TEXT: string = ActionType.addString("Append");
    public static REPLACE_TEXT: string = ActionType.addString("Replace");
    public static DELETE_TEXT: string = ActionType.addString("Delete");
    public static INFORMATION_TEXT: string = ActionType.addString("Information");
    public static APPEND: ActionType = new ActionType(ActionType.APPEND_TEXT);
    public static REPLACE: ActionType = new ActionType(ActionType.REPLACE_TEXT);
    public static DELETE: ActionType = new ActionType(ActionType.DELETE_TEXT);
    public static INFORMATION: ActionType = new ActionType(ActionType.INFORMATION_TEXT);
    // Utility
    private static add(s: string): ActionType {
        var b: ActionType = new ActionType(s);
        ActionType.ENUM.push(b);
        return b;
    }
    private static addString(s: string): string {
        ActionType.STRING_ENUM.push(s);
        return s;
    }

    public static fromString(s: string): ActionType {
        for (var i = 0; i < ActionType.ENUM.length; i++) {
            if (ActionType.ENUM[i].target == s) return ActionType.ENUM[i];
        }
        return null;
    }
    public static fromStringWithException(s: string): ActionType {
        for (var i = 0; i < ActionType.ENUM.length; i++) {
            if (ActionType.ENUM[i].target == s) return ActionType.ENUM[i];
        }
        throw new Error("Value:" + s + " not found in ActionType enumeration!");
    }
    // Instance
    private target: string = null;
    constructor(s: string) {
        var contains: boolean = false;
        for (var i = 0; i < ActionType.STRING_ENUM.length; i++) {
            if (ActionType.STRING_ENUM[i] == s) {
                contains = true;
            }
        }
        if (!contains) throw new Error(s + " is not a valid ActionType");
        this.target = s;
    }
    public toString(): string { return this.target; }
}
export class PayloadStructureType {
    private structureID: commonreferences.ID = null;
    private schemaURL: xml.anyURI = null;
    private namespace: xml.anyURI = null;
    private dimensionAtObservation: ObservationDimensionType = null;
    private explicitMeasures: boolean = false;
    private serviceURL: xml.anyURI = null;
    private structureURL: xml.anyURI = null;

    // Choice of 1
    private provisionAgreement: commonreferences.ProvisionAgreementReference;
    private structureUsage: commonreferences.StructureUsageReferenceBase;
    private structure: commonreferences.StructureReferenceBase;
}

export class ObservationalTimePeriodType {
    // Year
    public static PATTERN_YEAR: string = ".{5}A1.*";
    // Semester
    public static PATTERN_SEMESTER: string = ".{5}S[1-2].*";
    // Trimester
    public static PATTERN_TRIMESTER: string = ".{5}T[1-3].*";
    // Quarter
    public static PATTERN_QUARTER: string = ".{5}Q[1-4].*";
    // Month
    public static PATTERN_MONTH: string = ".{5}M(0[1-9]|1[0-2]).*";
    // Week
    public static PATTERN_WEEK: string = ".{5}W(0[1-9]|[1-4][0-9]|5[0-3]).*";
    // Day
    public static PATTERN_DAY: string = ".{5}D(0[0-9][1-9]|[1-2][0-9][0-9]|3[0-5][0-9]|36[0-6]).*";

    public static YEAR: number = 1;
    public static SEMESTER: number = 2;
    public static TRIMESTER: number = 3;
    public static QUARTER: number = 4;
    public static MONTH: number = 5;
    public static WEEK: number = 6;
    public static DAY: number = 7;

    private state: number = ObservationalTimePeriodType.YEAR;
    private value: string = null;

    constructor(s: string) {
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
    public toString(): string {
        return this.value;
    }
    public getState(): number {
        return this.state;
    }
}
export class ExternalReferenceAttributeGroup {
    private serviceURL: string = null;
    private structureURL: string = null;


    constructor() { }

    /**
     * @return the serviceURL
     */
    getServiceURL(): string {
        return this.serviceURL;
    }

    setServiceURL(serviceURL: string) {
        this.serviceURL = serviceURL;
    }

    getStructureURL(): string {
        return this.structureURL;
    }

    /**
     * @param structureURL the structureURL to set
     */
    setStructureURL(structureURL: string) {
        this.structureURL = structureURL;
    }
}