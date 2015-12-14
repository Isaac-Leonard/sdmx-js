module sdmx.common {
    export class Annotation {
        public annotationTitle: string = "";
        public annotationType: string = "";
        public annotationUrl: string = "";
        public annotationText: TextType[];
        public id: string;
    }
}