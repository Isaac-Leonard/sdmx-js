define("components/structure", ["require", "react", "sdmx/structure", "lodash", "components/dimension"], function (require, React, structure, _, Dimension) {
    return React.createClass({
        getInitialState: function () {
            return {
                queryable: null,
                dataflow: null,
                structure: null,
                dimensions: null
            };
        },
        load: function (queryable, dataflow) {
            if( dataflow == null ) {
                this.setState({
                    queryable:null,
                    dataflow:null,
                    structure:null
                });
                return;
            }
            this.setState({
                queryable: queryable,
                dataflow: dataflow,
                structure: null
            });
            queryable.getRemoteRegistry().findDataStructure(dataflow.getStructure()).then(function (struct) {
                var dims = struct.getDataStructureComponents().getDimensionList().getDimensions();
                this.setState({
                    structure: struct,
                    dimensions: dims
                });
                //for (var i = 0; i < dims.length; i++) {
                //    console.log(JSON.stringify(this.state.queryable.getLocalRegistry().findConcept(dims[i].getConceptIdentity())));
                //}
                this.forceUpdate();
            }.bind(this));
        },
        render: function () {
            if (this.state.structure==null) {
                return React.createElement("div", null, "Load a Structure");
            }
            
            var dims = this.state.dimensions;
            if (dims == null) {
                dims = [];
            }
            return React.createElement(
                    "div",
                    null,
                    dims.map(function (result) {
                        return React.createElement(
                                Dimension,
                                {key:result.getId().toString(), queryable:this.state.queryable,conceptRef:result.getId().toString(),dataflow:this.state.dataflow, structure:this.state.structure}
                                );
                    }.bind(this)
                    ));
        }
    });
});