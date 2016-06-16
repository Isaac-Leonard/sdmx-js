define("components/dimension", ["require", "react", "sdmx/structure", "lodash"], function (require, React, structure, _) {
    return React.createClass({
        getInitialState: function () {
            return {
                queryable: this.props.queryable,
                structure: this.props.structure,
                dataflow: this.props.dataflow,
                conceptRef: this.props.conceptRef,
                dimension: this.props.structure.findComponentString(this.props.conceptRef),
                codelist: this.props.queryable.getLocalRegistry().findCodelist(this.props.structure.findComponentString(this.props.conceptRef).getLocalRepresentation().getEnumeration()),
                number: "one",
                oneObject: null,
                oneString: null,
                manyArrayObject: [],
                manyArrayString: []
            };
        },
        changeOne: function (e) {
            var code = this.state.codelist.findItemString(e.target.value);
            this.setState({
                oneString: e.target.value,
                oneObject: code
            })
            console.log("codeString=" + e.target.value + "_CodeObject=" + JSON.stringify(code));
        },
        changeNumber: function (e) {
            this.setState({
                number:e.target.value
            });
        },
        repeatOptionCode: function (code, codeIndex) {
            return React.createElement('option', {value:code.getId().toString()}, structure.NameableType.toString(code));
        },
        repeatPCode: function (code, codeIndex) {
            return React.createElement('p', {}, structure.NameableType.toString(code));
        },
        render: function () {
            if (this.state == null)
                return React.createElement("div", null, "No Dimension");
            var dim = this.state.dimension;
            if (this.state.number == "all") {
                return React.createElement('div', {},
                        React.createElement('select', {
                            'value': this.state.number,
                            'onChange': this.changeNumber
                        }, React.createElement('option', {'value': 'all'}, 'All'), React.createElement('option', {'value': 'one'}, 'One'), React.createElement('option', {'value': 'many'}, 'Many')
                                ),
                        React.createElement("p", null, structure.NameableType.toString(this.state.queryable.getLocalRegistry().findConcept(dim.getConceptIdentity()))
                                ), _.map(this.state.codelist.getItems(), this.repeatPCode));
            } else if (this.state.number == "one") {
                return React.createElement('div', {}, React.createElement('select', {
                    'value': this.state.number,
                    'onChange': this.changeNumber
                }, React.createElement('option', {'value': 'all'}, 'All'), React.createElement('option', {'value': 'one'}, 'One'), React.createElement('option', {'value': 'many'}, 'Many')), React.createElement(
                        "p",
                        null,
                        structure.NameableType.toString(this.state.queryable.getLocalRegistry().findConcept(dim.getConceptIdentity()))
                        ), React.createElement('select', {
                    'value': this.state.oneString,
                    'onChange': this.changeOne
                }, _.map(this.state.codelist.getItems(), this.repeatOptionCode)));
            } else if (this.state.number == "many") {
                return React.createElement('div', {}, React.createElement(
                        "p",
                        null,
                        structure.NameableType.toString(this.state.queryable.getLocalRegistry().findConcept(dim.getConceptIdentity()))
                        ), React.createElement('select', {
                    'value': this.state.number,
                    'onChange': this.changeNumber
                }, React.createElement('option', {'value': 'all'}, 'All'), React.createElement('option', {'value': 'one'}, 'One'), React.createElement('option', {'value': 'many'}, 'Many')),
                        React.createElement('select', {
                            'value': "",
                            'onChange': null
                        }, _.map(this.state.codelist.getItems(), this.repeatOptionCode)));
            } else {
                return React.createElement("p", null, "No Dimension");
            }
        }
    });
});
