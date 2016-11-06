define("SimpleSDMXQuery/SimpleSDMXQuery", ["require", "react", "sdmx", "SimpleSDMXQuery/services", "SimpleSDMXQuery/dataflows", "SimpleSDMXQuery/structure", "SimpleSDMXQuery/data", "sdmx/data", "lodash"], function (require, React, sdmx, Services, Dataflows, Structure, Data, data, _) {
    return React.createClass({
        queryable: null,
        getInitialState: function () {
            return {languages: sdmx.SdmxIO.listLanguages(),
                language: sdmx.SdmxIO.getLanguage()};
        },
        onConnect: function (queryable) {
            this.queryable = queryable;
            queryable.listDataflows().then(this.refs.dataflows.load).then(function () {
                this.setState({languages: sdmx.SdmxIO.listLanguages(),
                    language: sdmx.SdmxIO.getLanguage()});
            }.bind(this));
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
        repeatItem2: function (item, itemIndex) {
            return React.createElement('option', {}, item);
        },
        changeLanguage: function (s) {
            sdmx.SdmxIO.setLanguage(s.target.value.trim());
            this.setState({languages: sdmx.SdmxIO.listLanguages(),
                language: s.target.value.trim()});
            this.forceUpdate();
        },
        render: function () {
            return React.createElement('div', {}, React.createElement.apply(this, [
                'select',
                {
                    'value': this.state.language,
                    'onChange': this.changeLanguage
                },
                _.map(this.state.languages, this.repeatItem2)
            ]), React.createElement(Services, {
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
