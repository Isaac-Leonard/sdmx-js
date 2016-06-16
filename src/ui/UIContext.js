define("ui/UIContext", ["require", "exports", "../sdmx", "../sdmx/structure"], function (require, exports, sdmx, structure) {
    var UIContext = (function () {
        function UIContext() {
            this.services = sdmx.SdmxIO.listServices();
            this.service = this.services[0];
            this.queryable = null;
            this.dataflows = null;
            this.dataflowsString = [];
            this.dataflow = null;
            this.structureRef = null;
            this.servicesComponent = null;
            this.dataflowsComponent = null;
        }
        UIContext.prototype.getServices = function () { return this.services; };
        UIContext.prototype.getService = function () {
            return this.service;
        };
        UIContext.prototype.connect = function (s) {
            this.queryable = sdmx.SdmxIO.connect(s);
            var dfc = this.dataflowsComponent;
            this.queryable.getRemoteRegistry().listDataflows().then(function (dfs) {
                this.dataflows = dfs;
                this.dataflowsString = [];
                for (var i = 0; i < this.dataflows.length; i++) {
                    this.dataflowsString.push(structure.NameableType.toString(this.dataflows[i]));
                }
                alert(JSON.stringify(dfc));
                dfc.setState({ dataflows: this.getDataflowsString() });
                this.setDataflow(this.dataflows[0]);
            }.bind(this));
        };
        UIContext.prototype.setDataflow = function (df) {
            if (df == null)
                return;
            this.dataflow = df;
            this.setStructure(this.dataflow.getStructure());
        };
        UIContext.prototype.loadDataflow = function (s) {
            for (var i = 0; i < this.dataflows.length; i++) {
                if (s == structure.NameableType.toString(this.dataflows[i])) {
                    this.setDataflow(this.dataflows[i]);
                }
            }
        };
        UIContext.prototype.getDataflowsString = function () {
            return this.dataflowsString;
        };
        UIContext.prototype.getDataflowString = function () {
            if (this.dataflow == null)
                return "";
            return structure.NameableType.toString(this.dataflow);
        };
        UIContext.prototype.setStructure = function (ref) {
            this.structureRef = ref;
        };
        UIContext.prototype.getServicesComponent = function () {
            return this.servicesComponent;
        };
        UIContext.prototype.getDataflowsComponent = function () {
            return this.dataflowsComponent;
        };
        UIContext.prototype.setServicesComponent = function (a) {
            this.servicesComponent = a;
        };
        UIContext.prototype.setDataflowsComponent = function (a) {
            this.dataflowsComponent = a;
        };
        return UIContext;
    })();
    exports.UIContext = UIContext;
    var Singleton = (function () {
        function Singleton() {
        }
        Singleton.getUIContext = function () {
            return Singleton.UIContext;
        };
        // Singleton
        Singleton.UIContext = new UIContext();
        return Singleton;
    })();
    exports.Singleton = Singleton;
    function getUIContext() {
        return Singleton.getUIContext();
    }
    exports.getUIContext = getUIContext;
});

//# sourceMappingURL=UIContext.js.map
