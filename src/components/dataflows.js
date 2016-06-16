define("components/dataflows", ["require", "react", "sdmx/structure", "templates/services.rt"], function (require, React, structure, servicesRT) {
    var a = React.createClass({
        getInitialState: function () {
            return {
                dataflows: [],
                selectedString: null,
                selectedObject: null
            };
        },
        load: function (dataflows) {
            var object = null;
            this.setState({
                dataflows:dataflows,
                selectedString:structure.NameableType.toString(object),
                selectedObject:object
            });
            this.forceUpdate();
            this.props.onSelectDataflow(object);
        },
        change: function (s) {
            var object = null;
            for(var i=0;i<this.state.dataflows.length;i++) {
                if( structure.NameableType.toString(this.state.dataflows[i]).trim()==s.target.value.trim()){
                     object=this.state.dataflows[i];
                }
            }
            this.setState({
                selectedString:s.target.value,
                selectedObject:object
            });
            this.forceUpdate();
            this.props.onSelectDataflow(object);
        },
        repeatItem2: function (item, itemIndex) {
            return React.createElement('option', {}, structure.NameableType.toString(item));
        },
        render: function () {
            return React.createElement('div', {}, React.createElement.apply(this, [
                'select',
                {
                    'value': this.state.selectedString,
                    'onChange': this.change
                },
                _.map(this.state.dataflows, this.repeatItem2)
            ]));
        }
    });
    return a;
});
