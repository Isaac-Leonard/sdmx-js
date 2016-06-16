define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    function onChange1() {
        this.load();
    }
    function repeatItem2(item, itemIndex) {
        return React.createElement('option', {}, item);
    }
    return function () {
        return React.createElement('div', {}, React.createElement.apply(this, [
            'select',
            {
                'value': this.state.selected,
                'onChange': onChange1.bind(this)
            },
            _.map(this.state.dataflows, repeatItem2.bind(this))
        ]));
    };
});