/*
    This file is part of sdmx-js.

    sdmx-js is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    sdmx-js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with sdmx-js.  If not, see <http://www.gnu.org/licenses/>.
    Copyright (C) 2016 James Gardner
*/
/// <amd-module name='sdmx'/>
import message = require("sdmx/message");
import interfaces = require("sdmx/interfaces");
import sdmx20 = require("sdmx/sdmx20");
import sdmx21 = require("sdmx/sdmx21");
import abs = require("sdmx/abs");
import oecd = require("sdmx/oecd");
import nomis = require("sdmx/nomis");
export class SdmxIO {
    public static LOCALE: string = "en";
    public static SANITISE_NAMES: boolean = false;
    public static PARSER: Array<interfaces.SdmxParserProvider> = [];
    public static TRUNCATE_NAMES:number = 100;
    public static getLocale(): string {
        return SdmxIO.LOCALE;
    }
    public static isSanitiseNames(): boolean {
        return SdmxIO.SANITISE_NAMES;

    }
    public static parseStructure(s: string): message.StructureType {
        for (var i = 0; i < SdmxIO.PARSER.length; i++) {
            if (SdmxIO.PARSER[i].canParse(s)) { return SdmxIO.PARSER[i].parseStructure(s); }
            else {
                alert("not my type");
            }
        }
        return null;
    }
    public static parseData(s: string): message.DataMessage {
        for (var i = 0; i < SdmxIO.PARSER.length; i++) {
            if (SdmxIO.PARSER[i].canParse(s)) { return SdmxIO.PARSER[i].parseData(s); }
            else {
                alert("not my type");
            }
        }
        return null;
    }
    public static registerParserProvider(p: interfaces.SdmxParserProvider) {
        SdmxIO.PARSER.push(p);

    }
    public static listServices():Array<string> {
        return ["NOMIS",//"ABS",
        "OECD"];
        //return ["OECD"];
    }
    public static connect(s: string): interfaces.Queryable {
        if (s == "ABS") return new abs.ABS("ABS","http://stat.abs.gov.au/restsdmx/sdmx.ashx/","");
        if (s == "NOMIS") return new nomis.NOMISRESTServiceRegistry("NOMIS", "http://www.nomisweb.co.uk/api", "uid=0xad235cca367972d98bd642ef04ea259da5de264f");
        if (s == "OECD") return new oecd.OECD("OECD","http://stats.oecd.org/restsdmx/sdmx.ashx/","");
    }
    public static setTruncateNames(n:number) {
        SdmxIO.TRUNCATE_NAMES=n;
    }
    public static truncateName(s:string) {
        if (SdmxIO.TRUNCATE_NAMES){
            return s.substring(0, SdmxIO.TRUNCATE_NAMES);
        }
        return s;
    }
}
SdmxIO.registerParserProvider(new sdmx20.Sdmx20StructureParser());
SdmxIO.registerParserProvider(new sdmx21.Sdmx21StructureParser());
