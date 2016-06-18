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
                oneObject: this.props.queryable.getLocalRegistry().findCodelist(this.props.structure.findComponentString(this.props.conceptRef).getLocalRepresentation().getEnumeration()).getItems()[0],
                oneString: structure.NameableType.toString(this.props.queryable.getLocalRegistry().findCodelist(this.props.structure.findComponentString(this.props.conceptRef).getLocalRepresentation().getEnumeration()).getItems()[0]),
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
        },
        changeNumber: function (e) {
            var manyArrayString = [];
            if (e.target.value == "all") {
                for (var i = 0; i < this.state.codelist.getItems().length; i++) {
                    var c = this.state.codelist.getItems()[i];
                    manyArrayString.push(structure.NameableType.toString(c));
                }
            }
            this.setState({
                number: e.target.value,
                manyArrayString: manyArrayString
            });

        },
        repeatOptionCode: function (code, codeIndex) {
            return React.createElement('option', {value: code.getId().toString()}, structure.NameableType.toString(code));
        },
        repeatButton: function (code) {
            var s = "";
            if (this.contains(structure.NameableType.toString(code))) {
                s += "\u2611\u00A0";//tick
            } else {
                s += "\u2610\u00A0";//unticked
            }
            var str = structure.NameableType.toString(code);
            return React.createElement('button', {key: str, onClick: this.click, value: str, disabled: this.state.number == "all"}, s + structure.NameableType.toString(code));
        },
        getCode: function(s) {
            for(var i=0;i<this.state.codelist.getItems().length;i++) {
                var c = this.state.codelist.getItems()[i];
                if( structure.NameableType.toString(c)==s ) return c;
            }
            return null;
        },
        click: function (s) {
            //alert(JSON.stringify(s));
            if (this.contains(s.target.value)) {
                var ary = this.state.manyArrayString;
                var aryObj = this.state.manyArrayObject;
                collections.arrays.remove(ary, s.target.value);
                collections.arrays.remove(aryObj,this.getCode(s.target.value));
                this.setState({manyArrayString: ary, manyArrayObject:aryObj});
            } else {
                var ary = this.state.manyArrayString;
                var aryObj = this.state.manyArrayObject;
                ary.push(s.target.value);
                aryObj.push(this.getCode(s.target.value));
                this.setState({manyArrayString: ary, manyArrayObject:aryObj});
            }
        },
        contains: function (s) {
            for (var i = 0; i < this.state.manyArrayString.length; i++) {
                if (this.state.manyArrayString[i] == s)
                    return true;
            }
            return false;
        },
        render: function () {
            if (this.state == null)
                return React.createElement("div", null, "No Dimension");
            var dim = this.state.dimension;
            if (this.state.number == "all") {
                return React.createElement('div', {}, React.createElement(
                        "p",
                        null,
                        structure.NameableType.toString(this.state.queryable.getLocalRegistry().findConcept(dim.getConceptIdentity()))
                        ),
                        React.createElement('select', {
                            'value': this.state.number,
                            'onChange': this.changeNumber
                        }, React.createElement('option', {'value': 'all'}, 'All'), React.createElement('option', {'value': 'one'}, 'One'), React.createElement('option', {'value': 'many'}, 'Many')
                                ), _.map(this.state.codelist.getItems(), this.repeatButton));
            } else if (this.state.number == "one") {
                return React.createElement('div', {}, React.createElement(
                        "p",
                        null,
                        structure.NameableType.toString(this.state.queryable.getLocalRegistry().findConcept(dim.getConceptIdentity()))
                        ), React.createElement('select', {
                    'value': this.state.number,
                    'onChange': this.changeNumber
                }, React.createElement('option', {'value': 'all'}, 'All'), React.createElement('option', {'value': 'one'}, 'One'), React.createElement('option', {'value': 'many'}, 'Many')),
                        React.createElement('select', {
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
                        _.map(this.state.codelist.getItems(), this.repeatButton));
            } else {
                return React.createElement("p", null, "No Dimension");
            }
        },
        putQueryParameters:function(q) {
            if( this.state.number == "one" ) {
                q.getQueryKey(this.state.conceptRef).addValue(this.state.oneObject.getId().toString());
            }
            if( this.state.number = "many"||this.state.number=="all") {
                for(var i=0;i<this.state.manyArrayObject.length;i++) {
                    q.getQueryKey(this.state.conceptRef).addValue(this.state.manyArrayObject[i].getId().toString());
                }
            }
        }
    });
});
