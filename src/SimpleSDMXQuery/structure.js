define("SimpleSDMXQuery/structure", ["require", "react", "sdmx/structure", "sdmx/data", "lodash", "SimpleSDMXQuery/dimension", "SimpleSDMXQuery/time"], function (require, React, structure, data, _, Dimension, Time) {
    return React.createClass({
        getInitialState: function () {
            return {
                queryable: null,
                dataflow: null,
                structure: null,
                components: null
            };
        },
        load: function (queryable, dataflow) {
            if (dataflow == null) {
                this.setState({
                    queryable: null,
                    dataflow: null,
                    structure: null
                });
                return;
            }
            this.setState({
                queryable: queryable,
                dataflow: dataflow,
                structure: null
            });
            queryable.getRemoteRegistry().findDataStructure(dataflow.getStructure()).then(function (struct) {
                var components = [];
                var dims = struct.getDataStructureComponents().getDimensionList().getDimensions();
                for (var i = 0; i < dims.length; i++) {
                    components.push(dims[i]);
                }
                if (struct.getDataStructureComponents().getDimensionList().getMeasureDimension() != null) {
                    components.push(struct.getDataStructureComponents().getDimensionList().getMeasureDimension());
                }

                this.setState({
                    structure: struct,
                    components: components
                });
                //for (var i = 0; i < dims.length; i++) {
                //    console.log(JSON.stringify(this.state.queryable.getLocalRegistry().findConcept(dims[i].getConceptIdentity())));
                //}
                this.forceUpdate();
            }.bind(this));
        },
        render: function () {
            if (this.state.structure == null) {
                return React.createElement("div", null, "Load a Structure");
            }

            var dims = this.state.components;
            if (dims == null) {
                dims = [];
            }
            var elements = dims.map(function (result) {
                return React.createElement(
                        Dimension,
                        {ref: result.getId().toString(), key: result.getId().toString(), queryable: this.state.queryable, conceptRef: result.getId().toString(), dataflow: this.state.dataflow, structure: this.state.structure},"");
            }.bind(this));
            elements.push(React.createElement(Time, {ref: "time", addTime: this.addTime}, ""));
            elements.push(React.createElement("button", {onClick: this.query}, "Query"));
            return React.createElement(
                    "div",
                    {},
                    elements);
        },
        query: function () {
            this.props.onQuery(null); // clear data table
            var query = new data.Query(this.state.dataflow, this.state.queryable.getRemoteRegistry().getLocalRegistry());
            this.refs.time.addTime(query);
            var keys = Object.keys(this.refs);
            collections.arrays.remove(keys,"time");
            for (var i = 0; i < keys.length; i++) {
                var dim = this.refs[keys[i]];
                dim.putQueryParameters(query);
            }
            this.state.queryable.query(query).then(function (dm) {
                this.props.onQuery(dm);
            }.bind(this));
        },
    });
});