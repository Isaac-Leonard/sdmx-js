/// <amd-module name='common'/>
import commonreferences = require("commonreferences");
import xml = require("xml");
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
    constructor(an: Annotations) {
        this.annotations = an;
    }
}

export class Description extends TextType {


}

export class Name extends TextType {


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

export class PayloadStructureType {
    private structureID: commonreferences.IDType = null;
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