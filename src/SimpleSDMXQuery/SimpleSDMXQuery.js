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
                var structuredDataMessage = new data.StructuredDataMessage(dataMessage, this.queryable.getRemoteRegistry().getLocalRegistry());
                var derivers = $.pivotUtilities.derivers;

                var renderers = $.extend(
                        $.pivotUtilities.renderers,
                        $.pivotUtilities.c3_renderers,
                        $.pivotUtilities.d3_renderers,
                        $.pivotUtilities.export_renderers
                        );
                var pivotData = structuredDataMessage.getStructuredDataSet(0).getPivotUIData();
                var all_cols = pivotData[0];
                var rows = [];
                var cols = [];
                for (var i = 0; i < all_cols.length; i++) {
                    if (i < (all_cols.length / 2)&&"Observation Value"!=all_cols[i] ) {
                        rows.push(all_cols[i]);
                    } else if( "Observation Value"!=all_cols[i] ){
                        cols.push(all_cols[i]);
                    }
                }
                var first = $.pivotUtilities.aggregatorTemplates.intsum;
                var numberFormat = $.pivotUtilities.numberFormat;
                var intFormat = numberFormat({digitsAfterDecimal: 0});
                $("#output").pivotUI(pivotData, {
                    rows: rows, cols: cols, "aggregatorName": "Integer Sum", vals: ["Observation Value"]
                });
                //var sdm = new data.StructuredDataMessage(dataMessage, this.queryable.getRemoteRegistry().getLocalRegistry());
                //this.refs.data.load(sdm);
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
