export function parseXml(s: string): any {
    var parseXml:DOMParser;
    parseXml = new DOMParser();
    var xmlDoc = parseXml.parseFromString(s,"text/xml");
    return xmlDoc;
}
