define("components/data", ["require", "react", "sdmx/structure", "sdmx/data","lodash"], function (require, React, structure, data,_) {
    return React.createClass({
        getInitialState: function () {
            return {
                dataMessage: null
            };
        },
        load: function (dataMessage) {
            this.setState({dataMessage: dataMessage});
        },
        render: function render() {
            if( this.state.dataMessage==null ) {
                return React.createElement("p",{},"No Data");
            }
            var headerComponents = this.generateHeaders(),
                    rowComponents = this.generateRows();
            return React.createElement(
                    'table',
                    null,
                    React.createElement(
                            'thead',
                            null,
                            ' ',
                            headerComponents,
                            ' '
                            ),
                    React.createElement(
                            'tbody',
                            null,
                            ' ',
                            rowComponents,
                            ' '
                            )
                    );
        },
        generateHeaders: function generateHeaders() {
            var cols = this.state.dataMessage.getDataSet(0).getColumnMapper().getAllColumns(); // [{key, label}]

            // generate our header (th) cell components
            return cols.map(function (colData) {
                return React.createElement(
                        'th',
                        {key: colData},
                        ' ',
                        colData,
                        ' '
                        );
            });
        },
        generateRows: function generateRows() {
            var cols = this.state.dataMessage.getDataSet(0).getColumnMapper().getAllColumns(); // [{key, label}]
                    // [{key, label}]

            return this.state.dataMessage.getDataSet(0).getObservations().map(function (item) {
                // handle the column data within each row
                var cells = cols.map(function (colData) {

                    // colData.key might be "firstName"
                    return React.createElement(
                            'td',
                            null,
                            ' ',
                            item.getValue(this.state.dataMessage.getDataSet(0).getColumnMapper().getColumnIndex(colData)),
                            ' '
                            );
                }.bind(this));
                return React.createElement(
                        'tr',
                        {key: _.indexOf(this.state.dataMessage.getDataSet(0).getObservations(),item)},
                        ' ',
                        cells,
                        ' '
                        );
            }.bind(this));
        }
    });
});
