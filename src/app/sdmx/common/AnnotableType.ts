module sdmx.common {
    export class AnnotableType {
        public annotations: Annotations;
        constructor(an:Annotations) {
            this.annotations=an;
        }
    }
}