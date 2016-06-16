define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    function repeatItem1(item, itemIndex) {
        return React.createElement('option', {}, item);
    }
    return function () {
        return React.createElement('div', {}, React.createElement.apply(this, [
            'select',
            { 'value': this.state.selected },
            _.map(this.state.services, repeatItem1.bind(this))
        ]));
    };
});