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
/// <amd-module name='test/testData'/>
import interfaces = require("sdmx/interfaces");
import common = require("sdmx/common");
import commonreferences = require("sdmx/commonreferences");
import structure = require("sdmx/structure");
import message = require("sdmx/message");
import moment = require("moment");
import sdmx = require("sdmx");
import data = require("sdmx/data");
import timepack = require("sdmx/time");

//export class test {
var main = new function() {
    var q: interfaces.Queryable = sdmx.SdmxIO.connect("ABS");
    var rreg = q.getRemoteRegistry();
    var rep = q.getRepository();
    var ref: commonreferences.Reference = sdmx.SdmxIO.reference("ABS", "ALC", null);
    rreg.findDataStructure(ref).then(function(ds) {
        var reg = rreg.getLocalRegistry();
        var query: data.Query = new data.Query(ds.asDataflow(), reg);
        for (var i: number = 0; i < query.getKeyNames().length; i++) {
            var qk: data.QueryKey = query.getQueryKey(query.getKeyNames()[i]);
            for (var j: number = 0; j < qk.getValues().length; j++) {
                if ((Math.random() * 100) > 50) {
                    qk.addValue(qk.getValues()[j]);
                }
            }
        }
        var dm = rep.query(query).then(function(dm) {
            var sdm: data.StructuredDataMessage = new data.StructuredDataMessage(dm, reg);
            var cube: data.Cube = new data.Cube(ds, reg);
            for (var i: number = 0; i < dm.getDataSet(0).size(); i++) {
                cube.putObservation(null, dm.getDataSet(0).getColumnMapper(), dm.getDataSet(0).getFlatObs(i));
            }
            cube.dump();
            console.log(JSON.stringify(cube));
        });
    });

}
//}
