module sdmx.common {
    export class TextType {
        private lang: String;
        private text: String = "";
        constructor(lang:String,text:String) {
            this.lang=lang;
            this.text=text;
        }
        public getLang():String {
            return this.lang;
        }
        public getText():String {
            return this.text;
        }
        public setText(s:String) {
            this.text=s;
        }
        public setLang(s:String) {
            this.lang=s;
        }
    }
}