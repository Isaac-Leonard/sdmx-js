define("test/testData", ["require", "exports", "sdmx", "sdmx/data"], function (require, exports, sdmx, data) {
    //export class test {
    var main = new function () {
        var q = sdmx.SdmxIO.connect("ABS");
        var rreg = q.getRemoteRegistry();
        var rep = q.getRepository();
        var ref = sdmx.SdmxIO.reference("ABS", "ALC", null);
        rreg.findDataStructure(ref).then(function (ds) {
            var reg = rreg.getLocalRegistry();
            var query = new data.Query(ds.asDataflow(), reg);
            for (var i = 0; i < query.getKeyNames().length; i++) {
                var qk = query.getQueryKey(query.getKeyNames()[i]);
                for (var j = 0; j < qk.getValues().length; j++) {
                    if ((Math.random() * 100) > 50) {
                        qk.addValue(qk.getValues()[j]);
                    }
                }
            }
            var dm = rep.query(query).then(function (dm) {
                var sdm = new data.StructuredDataMessage(dm, reg);
                var cube = new data.Cube(ds, reg);
                for (var i = 0; i < dm.getDataSet(0).size(); i++) {
                    cube.putObservation(null, dm.getDataSet(0).getColumnMapper(), dm.getDataSet(0).getFlatObs(i));
                }
                cube.dump();
                console.log(JSON.stringify(cube));
            });
        });
    };
});
//}

//# sourceMappingURL=testData.js.map
