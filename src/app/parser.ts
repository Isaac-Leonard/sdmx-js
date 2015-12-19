/// <amd-module name='parser'/>
import message = require("message");
export interface SdmxParserProvider {
    getVersionIdentifier(): number;
    canParse(header: string): boolean;
    isStructure(header: string): boolean;
    isData(header: string): boolean;
    isMetadata(header: string): boolean;
    parseStructure(input: string): message.StructureType;
    parseData(input: string): message.DataMessage;
}
