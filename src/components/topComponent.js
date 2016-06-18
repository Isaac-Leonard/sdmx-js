define("components/topComponent", ["require", "react", "sdmx", "components/services", "components/dataflows", "components/structure", "components/data"], function (require, React, sdmx, Services, Dataflows, Structure, Data) {
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
        onQuery: function (data) {
            this.refs.data.load(data);
        },
        render: function () {
            return React.createElement('div', {}, React.createElement(Services, {
                'onConnect': this.onConnect,
                'ref': 'services'
            }), React.createElement(Dataflows, {
                'onSelectDataflow': this.onSelectDataflow,
                'ref': 'dataflows'
            }), React.createElement(Structure, {'ref': 'structure', 'onQuery':this.onQuery}),
                    React.createElement(Data, {'ref': 'data'}));
        }
    });
});
