define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    function repeatItem1(item, itemIndex) {
        return React.createElement('option', {}, item);
    }
    return function () {
        return React.createElement('div', {}, React.createElement('form', {}, React.createElement.apply(this, [
            'select',
            {},
            _.map(this.state.dataflows, repeatItem1.bind(this))
        ])));
    };
});