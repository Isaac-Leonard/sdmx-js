/// <reference path="../../common/AnnotableType.ts" />
module sdmx.structure.base {
    export class VersionableType extends NameableType {
        private version: sdmx.commonreferences.Version = sdmx.commonreferences.Version.ONE;
        private validFrom: xml.DateTime = null;;
        private validTo: xml.DateTime = null;
    }
}