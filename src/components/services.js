define("components/services", ["require", "react", "sdmx", "lodash"], function (require, React, sdmx, _) {
    return React.createClass({
        queryable: null,
        getInitialState: function () {
            var array = [];
            array.push("");
            for (var i = 0; i < sdmx.SdmxIO.listServices().length; i++) {
                array.push(sdmx.SdmxIO.listServices()[i]);
            }
            var o = {
                services: array,
                selected: ""
            };
            return o;
        },
        connect: function () {
            this.queryable = sdmx.SdmxIO.connect(this.state.selected);
            this.props.onConnect(this.queryable);
            this.props.onQuery(null);
        },
        onChange: function (e) {
            this.setState({
                selected: e.target.value
            }, function () {
                this.connect();
            });

        },
        render: function () {
            return React.createElement('div', {}, React.createElement.apply(this, [
                'select',
                {
                    'value': this.state.selected,
                    'onChange': this.onChange1
                },
                _.map(this.state.services, this.repeatItem2)
            ]));
        },
        onChange1: function (e) {
            this.onChange(e);
        },
        repeatItem2: function (item, itemIndex) {
            return React.createElement('option', {}, item);
        }
    });
});
