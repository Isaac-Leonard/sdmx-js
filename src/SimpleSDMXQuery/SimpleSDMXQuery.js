define("SimpleSDMXQuery/SimpleSDMXQuery", ["require", "react", "sdmx", "SimpleSDMXQuery/services", "SimpleSDMXQuery/dataflows", "SimpleSDMXQuery/structure", "SimpleSDMXQuery/data", "sdmx/data"], function (require, React, sdmx, Services, Dataflows, Structure, Data, data) {
    return React.createClass({
        queryable: null,
        getInitialState: function () {
            return {};
        },
        onConnect: function (queryable) {
            this.queryable = queryable;
            queryable.listDataflows().then(this.refs.dataflows.load);
        },
        onSelectDataflow: function (dataflow) {
            this.refs.structure.load(this.queryable, dataflow);
        },
        onQuery: function (dataMessage) {
            if (dataMessage == null) {
                this.refs.data.load(null);
            } else {
                var sdm = new data.StructuredDataMessage(dataMessage, this.queryable.getRemoteRegistry().getLocalRegistry());
                this.refs.data.load(sdm);
            }
        },
        render: function () {
            return React.createElement('div', {}, React.createElement(Services, {
                'onConnect': this.onConnect,
                'onQuery': this.onQuery,
                'ref': 'services'
            }), React.createElement(Dataflows, {
                'onSelectDataflow': this.onSelectDataflow,
                'onQuery': this.onQuery,
                'ref': 'dataflows'
            }), React.createElement(Structure, {'ref': 'structure', 'onQuery': this.onQuery}),
                    React.createElement(Data, {'ref': 'data'}));
        }
    });
});
