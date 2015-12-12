/// <reference path="../../xml/RegexXMLString.ts" />
module sdmx.commonreferences {
    export class Version extends xml.RegexXMLString {
        public static PATTERN: String = "[0-9]+(\\.[0-9]+)*";
        public static ONE: Version = new Version("1.0");
        constructor(s: String) {
            super(s);
        }
        public getPatternArray(): String[] {
            return [Version.PATTERN];
        }
        public equalsVersion(id: Version): boolean {
            return super.getString() == id.getString();
        }
        public equals(id: String): boolean {
            return super.getString() == id;
        }
        public compareTo(o: Object): number {
            if (!(o instanceof Version)) return -1;
            var a1: number = parseFloat(o.toString());
            var a2: number = parseFloat(toString());
            return a1 > a2 ? 1 : a1 < a2 ? -1 : 0;
        }
    }

}