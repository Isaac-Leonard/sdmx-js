module sdmx {
    export class SdmxIO {
        public static LOCALE: String = "en";
        public static SANITISE_NAMES:boolean = false;
        public static getLocale() {
            return SdmxIO.LOCALE;
        }
        public static isSanitiseNames() {
            return SdmxIO.SANITISE_NAMES;
            
        }
    }


}