define("PromiseSeries", ["require", "exports"], function (require, exports) {
    /// <amd-module name='PromiseSeries'/>
    ///<reference path="bluebird.d.ts"/>
    exports.series = function (promiseArr) {
        alert(JSON.stringify(Promise.reduce));
        return Promise.reduce(promiseArr, function (values, promise) {
            return promise().then(function (result) {
                values.push(result);
                return values;
            });
        }, []);
    };
});

//# sourceMappingURL=PromiseSeries.js.map
