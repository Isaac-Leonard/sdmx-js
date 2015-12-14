/// <reference path="../../common/AnnotableType.ts" />
module sdmx.structure.base {
    import Name = sdmx.common.Name;
    import Description = sdmx.common.Description;
    export class NameableType extends IdentifiableType {
        private names: Array<sdmx.common.Name> = null;
        private descriptions: Array<sdmx.common.Description> = null;

        /**
         * @return the names
         */
        public getNames(): Array<sdmx.common.Name> {
            return this.names;
        }

        /**
         * @param names the names to set
         */
        public setNames(names1: Array<sdmx.common.Name>) {
            this.names = names1;
        }

        /**
         * @return the descriptions
         */
        public getDescriptions(): Array<sdmx.common.Description> {
            return this.descriptions;
        }

        /**
         * @param descriptions the descriptions to set
         */
        public setDescriptions(descriptions: Array<sdmx.common.Description>) {
            this.descriptions = descriptions;
        }

        public findName(lang: String): sdmx.common.Name {
            if (this.names == null) {
                return null;
            }
            var def: sdmx.common.Name = null;
            for (var i: number = 0; i < this.names.length; i++) {
                if (lang != null && lang == this.names[i].getLang()) {
                    return this.names[i];
                }
                if (this.names[i].getLang() == null) {
                    def = this.names[i];
                }
            }
            if (def == null && "en" != lang) {
                def = this.findName("en");
            }
            return def;
        }

        public findDescription(lang: String): sdmx.common.Description {
            if (this.descriptions == null) {
                return null;
            }
            var def: sdmx.common.Description = null;
            for (var i: number = 0; i < this.descriptions.length; i++) {
                if (lang != null && lang == this.descriptions[i].getLang()) {
                    return this.descriptions[i];
                }
                if (this.descriptions[i].getLang() == null) {
                    def = this.descriptions[i];
                }
            }
            if (def == null && "en" != lang) {
                def = this.findDescription("en");
            }
            return def;
        }

        public toString(): String {
            var loc: String = SdmxIO.getLocale();
            var name: Name = this.findName(loc);
            if (name != null) {
                return name.toString();
            }
            var desc: Description = this.findDescription(loc);
            if (desc != null) {
                return desc.getText();
            }
            return "NameableType";
        }

        public getName(): String {
            if (SdmxIO.isSanitiseNames()) {
                return NameableType.sanitise(NameableType.toString(this));
            } else {
                return NameableType.toString(this);
            }
        }

        private static toString(named: NameableType): String {
            var loc: String = SdmxIO.getLocale();
            if (named == null) {
                return "";
            }
            var desc: Description = named.findDescription(loc);
            if (desc == null) {
                var name: Name = named.findName(loc);
                if (name == null) {
                    return named.getId().toString();
                }
                return name.getText();
            }
            return desc.getText();
        }

        private static toStringWithLocale(named: NameableType, loc: String): String {
            //if (concept.equals("FREQ")) {
            //    ItemType code2 = getCode();
            //    System.out.println("FREQ Code=" + code2);
            //}
            if (named == null) {
                return "";
            }
            var name: Name = named.findName(loc);
            if (name == null) {
                var desc: Description = named.findDescription(loc);
                if (desc == null) {
                    return named.getId().toString();
                }
                return desc.getText();
            }
            return name.getText();

        }

        private static toIDString(named: NameableType): String {
            return named.getId().toString();
        }

        public static sanitise(s: String): String {
            if (s.indexOf("'")!=-1) {
                s = s.replace("'", "&apos;");
            }
            if (s.indexOf("\"")!=-1) {
                s = s.replace("\"", "&quot;");
            }
            return s;
        }
    }
}