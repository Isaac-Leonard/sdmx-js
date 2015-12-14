module sdmx.commonreferences.type {
    export class PackageTypeCodelistType {

        public static ENUM: Array<PackageTypeCodelistType> = new Array<PackageTypeCodelistType>();
        public static STRING_ENUM: Array<String> = new Array<String>();

        public static TARGET_BASE: String = PackageTypeCodelistType.addString("base");
        public static TARGET_DATASTRUCTURE: String = PackageTypeCodelistType.addString("datastructure");
        public static TARGET_METADATASTRUCTURE: String = PackageTypeCodelistType.addString("metadatastructure");
        public static TARGET_PROCESS: String = PackageTypeCodelistType.addString("process");
        public static TARGET_REGISTRY: String = PackageTypeCodelistType.addString("registry");
        public static TARGET_MAPPING: String = PackageTypeCodelistType.addString("mapping");
        public static TARGET_CODELIST: String = PackageTypeCodelistType.addString("codelist");
        public static TARGET_CATEGORYSCHEME: String = PackageTypeCodelistType.addString("categoryscheme");
        public static TARGET_CONCEPTSCHEME: String = PackageTypeCodelistType.addString("conceptscheme");

        public static BASE: PackageTypeCodelistType = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_BASE);
        public static DATASTRUCTURE: PackageTypeCodelistType = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_DATASTRUCTURE);
        public static METADATASTRUCTURE: PackageTypeCodelistType = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_METADATASTRUCTURE);
        public static PROCESS: PackageTypeCodelistType = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_PROCESS);
        public static REGISTRY: PackageTypeCodelistType = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_REGISTRY);
        public static MAPPING: PackageTypeCodelistType = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_MAPPING);
        public static CODELIST: PackageTypeCodelistType = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_CODELIST);
        public static CATEGORYSCHEME: PackageTypeCodelistType = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_CATEGORYSCHEME);
        public static CONCEPTSCHEME: PackageTypeCodelistType = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_CONCEPTSCHEME);
        // Utility
        private static add(s: String): PackageTypeCodelistType {
            var b: PackageTypeCodelistType = new PackageTypeCodelistType(s);
            PackageTypeCodelistType.ENUM.push(b);
            return b;
        }
        private static addString(s: String): String {
            PackageTypeCodelistType.STRING_ENUM.push(s);
            return s;
        }

        public static fromString(s: String): PackageTypeCodelistType {
            for (var i = 0; i < PackageTypeCodelistType.ENUM.length; i++) {
                if (PackageTypeCodelistType.ENUM[i].target==s) return PackageTypeCodelistType.ENUM[i];
            }
            return null;
        }
        public static fromStringWithException(s: String): PackageTypeCodelistType {
        for (var i = 0; i < PackageTypeCodelistType.ENUM.length; i++) {
            if (PackageTypeCodelistType.ENUM[i].target==s) return PackageTypeCodelistType.ENUM[i];
        }
        throw new Error("Value:" + s + " not found in PackageTypeCodelistType enumeration!");
    }
// Instance
    private target: String = null;
    constructor(s:String) {
        var contains:boolean = false;
        for (var i = 0; i < PackageTypeCodelistType.STRING_ENUM.length;i++) {
            if( PackageTypeCodelistType.STRING_ENUM[i]==s) {
                contains=true;
            }
        }
        if (!contains) throw new Error(s + " is not a valid CodeTypeCodelistType");
        this.target = s;
    }
    public toString():String { return this.target; }
}
}