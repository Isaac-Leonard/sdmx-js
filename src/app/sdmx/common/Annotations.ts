module sdmx.common {
    export class Annotations {
        private annotations: Annotation[]=null;
        public getAnnotations():Annotation[] {
            return this.annotations;
        }
        public setAnnotations(a:Annotation[]) {
            this.annotations=a;
        }
    }
}