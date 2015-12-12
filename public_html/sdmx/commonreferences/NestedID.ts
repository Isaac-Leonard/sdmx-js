/// <reference path="../../xml/RegexXMLString.ts" />
/// <reference path="../commonreferences/IDType.ts" />
module sdmx.commonreferences {
    export class NestedID extends xml.RegexXMLString {

        public static PATTERN: String = "[A-z0-9_@$\\-]+(\\.[A-z0-9_@$\\-]+)*";

        constructor(s: String) {
            super(s);
        }

        public getPatternArray(): String[] {
            return [NestedID.PATTERN];
        }

        public equalsNestedID(id: NestedID): boolean {
            if (super.getString() == null) return false;
            return super.getString() == id.getString();
        }

        public equalsString(id: String): boolean {
            return super.equalsString(id);
        }

        public equalsID(id: IDType): boolean {
            return super.getString() == id.getString();
        }

        public asID(): IDType {
            return new IDType(super.getString());
        }
    }
}