//main.js contents
//Pass a config object to require
require.config({
    baseUrl: '../src/',
    paths: {
    },
    map: {
        "*": {
            "react/addons": "react"
        }
    }
});
require(["sdmx", "sdmx/message", "sdmx/abs", "sdmx/nomis", "sdmx/structure", "sdmx/commonreferences", "sdmx/data", "react", "react-dom", "components/SimpleSdmxQuery","collections","moment",],
        function (sdmx, message, abs, nomis, structure, commonreferences, data, React, ReactDOM, SimpleSdmxQuery,collections,moment) {
            var q = React.createElement(SimpleSdmxQuery)
            ReactDOM.render(q, document.getElementById('container'));
            
            //var svcs = React.createElement(Services)
            //ReactDOM.render(svcs, document.getElementById('container2'));
            //var servicesElement = React.createElement(services)
            //var dataflowsElement = React.createElement(dataflows);
            //ReactDOM.render(servicesElement, document.getElementById('services'));
            //ReactDOM.render(dataflowsElement, document.getElementById('dataflows'));
            /*
             UIContext.getUIContext().setDataflowsComponent(dataflowsElement);
             var q = sdmx.SdmxIO.connect("OECD");
             q.listDataflows().then(function (dfs) {
             alert(JSON.stringify(dfs[dfs.length - 1]));
             });
             */
            /*
             var q = sdmx.SdmxIO.connect("NOMIS");
             var ref = new commonreferences.Ref();
             ref.setAgencyId(new commonreferences.NestedNCNameID("NOMIS"));
             ref.setMaintainableParentId(new commonreferences.ID("NM_1_1_TYPE2"));
             ref.setVersion(new commonreferences.Version("1.0"));
             var reference = new commonreferences.Reference(ref, null);
             var flow = new structure.Dataflow();
             flow.setId(ref.getMaintainableParentId().asID());
             flow.setVersion(ref.getVersion());
             flow.setAgencyId(ref.getAgencyId());
             flow.setStructure(reference);
             var dst = q.getRemoteRegistry().findDataStructure(reference);
             dst.then(function (struc) {
             var query = new data.Query(flow, q.getLocalRegistry());
             var names = query.getKeyNames();
             for (var i = 0; i < names.length; i++) {
             var n = names[i];
             if (n == "FREQ") {
             // Monthly
             query.getQueryKey(n).addValue("M");
             continue;
             }
             var comp = struc.findComponentString(n);
             var codelist = q.getLocalRegistry().findCodelist(comp.getLocalRepresentation().getEnumeration());
             var size = codelist.size();
             var codes = Math.random() * 4; // 4 codes from each codelist
             for (var c = 0; c < codes; c++) {
             var code = codelist.getItems()[parseInt(codelist.getItems().length * Math.random())];
             query.getQueryKey(n).addValue(code.getId().toString());
             }
             }
             var s = new Date();
             s.setYear(2001);
             s.setMonth(1);
             s.setDate(1);
             var e = new Date();
             e.setYear(2004);
             e.setMonth(1);
             e.setDate(1);
             query.setStartDate(s);
             query.setEndDate(e);
             return q.query(query).then(function (dm) {
             // dm is a message.DataMessage
             var table = document.createElement("table");
             var tr = document.createElement("tr");
             for (var j = 0; j < dm.getDataSet(0).getColumnSize(); j++) {
             var th = document.createElement("th");
             th.innerHTML = dm.getDataSet(0).getColumnName(j);
             tr.appendChild(th)
             }
             table.appendChild(tr);
             for (var i = 0; i < dm.getDataSet(0).size(); i++) {
             var tr = document.createElement("tr");
             var obs = dm.getDataSet(0).getFlatObs(i);
             for (var j = 0; j < dm.getDataSet(0).getColumnSize(); j++) {
             var td = document.createElement("td");
             td.innerHTML = obs.getValue(j);
             tr.appendChild(td);
             }
             table.appendChild(tr);
             }
             document.getElementById("container").appendChild(table);
             });
             });
             */
        });
