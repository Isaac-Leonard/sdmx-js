module xml {
    export class RegexXMLString extends XMLString {

        constructor(s: String) {
            super(s);

        }
        // Override Me

        public getPatternArray(): String[] {
            return [];
        }
    }
}