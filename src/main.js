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
require(["sdmx", "sdmx/message", "sdmx/abs", "sdmx/nomis", "sdmx/structure", "sdmx/commonreferences", "sdmx/data", "react", "react-dom", "SimpleSDMXQuery/SimpleSDMXQuery", "collections", "moment"],
        function (sdmx, message, abs, nomis, structure, commonreferences, data, React, ReactDOM, SimpleSdmxQuery, collections, moment) {
            var q = React.createElement(SimpleSdmxQuery)
            ReactDOM.render(q, document.getElementById('container'));
        });
