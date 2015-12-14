var sdmx;
(function (sdmx) {
    var commonreferences;
    (function (commonreferences) {
        var type;
        (function (type) {
            var PackageTypeCodelistType = (function () {
                function PackageTypeCodelistType(s) {
                    // Instance
                    this.target = null;
                    var contains = false;
                    for (var i = 0; i < PackageTypeCodelistType.STRING_ENUM.length; i++) {
                        if (PackageTypeCodelistType.STRING_ENUM[i] == s) {
                            contains = true;
                        }
                    }
                    if (!contains)
                        throw new Error(s + " is not a valid CodeTypeCodelistType");
                    this.target = s;
                }
                // Utility
                PackageTypeCodelistType.add = function (s) {
                    var b = new PackageTypeCodelistType(s);
                    PackageTypeCodelistType.ENUM.push(b);
                    return b;
                };
                PackageTypeCodelistType.addString = function (s) {
                    PackageTypeCodelistType.STRING_ENUM.push(s);
                    return s;
                };
                PackageTypeCodelistType.fromString = function (s) {
                    for (var i = 0; i < PackageTypeCodelistType.ENUM.length; i++) {
                        if (PackageTypeCodelistType.ENUM[i].target == s)
                            return PackageTypeCodelistType.ENUM[i];
                    }
                    return null;
                };
                PackageTypeCodelistType.fromStringWithException = function (s) {
                    for (var i = 0; i < PackageTypeCodelistType.ENUM.length; i++) {
                        if (PackageTypeCodelistType.ENUM[i].target == s)
                            return PackageTypeCodelistType.ENUM[i];
                    }
                    throw new Error("Value:" + s + " not found in PackageTypeCodelistType enumeration!");
                };
                PackageTypeCodelistType.prototype.toString = function () { return this.target; };
                PackageTypeCodelistType.ENUM = new Array();
                PackageTypeCodelistType.STRING_ENUM = new Array();
                PackageTypeCodelistType.TARGET_BASE = PackageTypeCodelistType.addString("base");
                PackageTypeCodelistType.TARGET_DATASTRUCTURE = PackageTypeCodelistType.addString("datastructure");
                PackageTypeCodelistType.TARGET_METADATASTRUCTURE = PackageTypeCodelistType.addString("metadatastructure");
                PackageTypeCodelistType.TARGET_PROCESS = PackageTypeCodelistType.addString("process");
                PackageTypeCodelistType.TARGET_REGISTRY = PackageTypeCodelistType.addString("registry");
                PackageTypeCodelistType.TARGET_MAPPING = PackageTypeCodelistType.addString("mapping");
                PackageTypeCodelistType.TARGET_CODELIST = PackageTypeCodelistType.addString("codelist");
                PackageTypeCodelistType.TARGET_CATEGORYSCHEME = PackageTypeCodelistType.addString("categoryscheme");
                PackageTypeCodelistType.TARGET_CONCEPTSCHEME = PackageTypeCodelistType.addString("conceptscheme");
                PackageTypeCodelistType.BASE = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_BASE);
                PackageTypeCodelistType.DATASTRUCTURE = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_DATASTRUCTURE);
                PackageTypeCodelistType.METADATASTRUCTURE = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_METADATASTRUCTURE);
                PackageTypeCodelistType.PROCESS = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_PROCESS);
                PackageTypeCodelistType.REGISTRY = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_REGISTRY);
                PackageTypeCodelistType.MAPPING = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_MAPPING);
                PackageTypeCodelistType.CODELIST = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_CODELIST);
                PackageTypeCodelistType.CATEGORYSCHEME = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_CATEGORYSCHEME);
                PackageTypeCodelistType.CONCEPTSCHEME = PackageTypeCodelistType.add(PackageTypeCodelistType.TARGET_CONCEPTSCHEME);
                return PackageTypeCodelistType;
            })();
            type.PackageTypeCodelistType = PackageTypeCodelistType;
        })(type = commonreferences.type || (commonreferences.type = {}));
    })(commonreferences = sdmx.commonreferences || (sdmx.commonreferences = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=PackageTypeCodelistType.js.map
