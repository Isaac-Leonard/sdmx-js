//main.js contents
//Pass a config object to require
require.config({
    "packages": ["common", "commonreferences"]
});

require(["common", "commonreferences"],
function (common,  commonreferences) {
    //use the modules as usual.
});