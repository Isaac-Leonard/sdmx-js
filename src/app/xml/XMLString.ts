module xml {
    export class XMLString {
        private value: String = null;
        constructor(s: String) {
            this.value = s;
        }
        public getString(): String { return this.value; }
        public toString(): String {
            return this.value;
        }
        public equalsString(s: String): boolean {
            return this.value == s;
        }
    }
}