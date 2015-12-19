
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

