/// <amd-module name='sdmx/xml'/>
/// <reference path="../moment.d.ts"/>
import moment = require("moment");
export class XMLString {
    private value: string = null;
    constructor(s: string) {
        this.value = s;
    }
    public getString(): string { return this.value; }
    public toString(): string {
        return this.value;
    }
    public equalsString(s: string): boolean {
        return this.value == s;
    }
}
export class RegexXMLString extends XMLString {

    constructor(s: string) {
        super(s);

    }
    // Override Me

    public getPatternArray(): string[] {
        return [];
    }
}
export class anyURI {
    public s: string = null;
    constructor(s: string) {
        this.s = s;
    }
    public getString(): string { return this.s; }
    public toString(): string { return this.s; }
}
export class DateTime {
    public static DF: string = "yyyy-MM-dd'T'HH:mm:ssXXX";
    public static DF2: string = "yyyy-MM-dd'T'HH:mm:ss";
    private baseString: string = null;
    private date: Date = null;

    constructor(d: Date) {
        this.date = d;
    }

    public getDate(): Date {
        return this.date;
    }

    public static fromString(s: string): DateTime {
        if (s == null || s == "") {
            return null;
        }
        var m = moment(s, [DateTime.DF, DateTime.DF2]);
        var dt: DateTime = new DateTime(m.toDate());
        dt.setBaseString(s);
        return dt;
    }
    public toString(): string {
        if (this.baseString != null) return this.baseString;
        return moment(this.date).format(DateTime.DF);
    }
    public static now(): DateTime {
        return new DateTime(moment().toDate());
    }
    public setBaseString(s: string) {
        this.baseString = s;
    }
    public getBaseString(): string {
        return this.baseString;
    }
}