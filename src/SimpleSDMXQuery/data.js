define("SimpleSDMXQuery/data", ["require", "react", "sdmx/structure", "sdmx/data", "lodash"], function (require, React, structure, data, _) {
    return React.createClass({
        getInitialState: function () {

            return {
                structuredDataMessage: null
            };
        },
        load: function (structuredDataMessage) {
            this.setState({structuredDataMessage: structuredDataMessage});
        },
        render: function render() {
            if (this.state.structuredDataMessage == null) {
                return React.createElement("p", {}, "No Data");
            }
            else {return React.createElement("p", {}, "Pivot Table");}
            /*
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
                    */
        },
        generateHeaders: function generateHeaders() {
            var result = [];
            var ds = this.state.structuredDataMessage.getStructuredDataSet(0);
            for (var i = 0; i < ds.getColumnCount(); i++) {
                result.push(React.createElement(
                        'th',
                        {key: i},
                        ' ',
                        ds.getColumnName(i),
                        ' '
                        )
                        )
            }
            return result;
        },
        generateRows: function generateRows() {
            // [{key, label}]
            var rows = [];
            var ds = this.state.structuredDataMessage.getStructuredDataSet(0);
            for (var i = 0; i < ds.size(); i++) {
                var cells = [];
                for (var j = 0; j < ds.getColumnCount(); j++) {
                    var item = ds.getStructuredValue(i, j);
                    cells.push(React.createElement(
                            'td',
                            null,
                            ' ',
                            structure.NameableType.toString(item.getCode()),
                            ' '
                            ));
                }
                rows.push(React.createElement(
                        'tr',
                        {key: i},
                        ' ',
                        cells,
                        ' '
                        ));
            }
            return rows;
        }

    });
});
