module xml {
    export class anyURI {
        public s: String = null;
        constructor(s: String) {
            this.s = s;
        }
        public getString(): String { return this.s; }
        public toString(): String { return this.s; }
    }
}