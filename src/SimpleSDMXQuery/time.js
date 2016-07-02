define("SimpleSDMXQuery/time", ["require", "react", "sdmx/structure"], function (require, React, structure) {
    return React.createClass({
        getInitialState: function () {
            return {
                start: "2001",
                end: "2016",
            };
        },
        load: function (dataflows) {
        },
        onChangeStart: function (s) {
            this.setState({start: s.target.value});
        },
        onChangeEnd: function (s) {
            this.setState({end: s.target.value});
        },
        render: function () {
            return React.createElement("div",{},[React.createElement("label", "", "StartTime"), React.createElement('input', {onChange: this.onChangeStart, value: this.state.start}), React.createElement("label", "", "EndTime"), React.createElement('input', {onChange: this.onChangeEnd, value: this.state.end})]);
        },
        addTime: function (q) {
            var start = new Date();
            start.setYear(parseInt(this.state.start));
            var end = new Date();
            end.setYear(parseInt(this.state.end));
            q.setStartDate(start);
            q.setEndDate(end);
        }
    });
});
