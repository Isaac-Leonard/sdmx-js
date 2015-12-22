/// <amd-module name='sdmx'/>
import message = require("message");
import interfaces = require("interfaces");
import sdmx20 = require("sdmx20");

export class SdmxIO {
    public static LOCALE: string = "en";
    public static SANITISE_NAMES: boolean = false;
    public static PARSER:Array<interfaces.SdmxParserProvider> = [];
    public static getLocale():string {
        return SdmxIO.LOCALE;
    }
    public static isSanitiseNames():boolean {
        return SdmxIO.SANITISE_NAMES;

    }
    public static parseStructure(s: string): message.StructureType {
        for(var i=0;i<SdmxIO.PARSER.length;i++) {
            if (SdmxIO.PARSER[i].canParse(s)){ return SdmxIO.PARSER[i].parseStructure(s);}
            else {
                alert("not my type");
                
            }
        }
        return null;
    }
    public static registerParserProvider(p: interfaces.SdmxParserProvider){
        SdmxIO.PARSER.push(p);
        
    }
}
SdmxIO.registerParserProvider(new sdmx20.Sdmx20StructureParser());