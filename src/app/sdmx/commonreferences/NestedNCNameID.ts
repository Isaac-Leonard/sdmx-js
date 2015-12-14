module sdmx.commonreferences {
    export class NestedNCNameID extends NestedID {
        public static PATTERN: String = "[A-z][A-z0-9_\\-]*(\\.[A-z][A-z0-9_\\-]*)*";

        constructor(s: String) {
            super(s);
        }
        public getPatternArray(): String[] {
            return [NestedNCNameID.PATTERN];
        }
        public equalsNestedNCNameID(id: NestedNCNameID): boolean {
            return super.getString() == id.getString();
        }
    }
}