/// <reference path="NestedID.ts" />
module sdmx.commonreferences {
    export class IDType extends NestedID {

        public static PATTERN: String = "[A-z0-9_@$\\-]+";

        constructor(s: String) {
            super(s);
            if (s == null) { throw new Error("null IDType string"); }
        }

        public equalsID(id: IDType): boolean {
            return false;
        }

        public equalsString(id: String): boolean {
            return false;
        }
        public getPatternArray(): String[] {
            return [IDType.PATTERN];
        }
    }
}