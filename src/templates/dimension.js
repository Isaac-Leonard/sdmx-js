define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    return function () {
        return React.createElement('div', {}, '\r\n      Dataflow: ', structure.NameableType.toString(this.state.dataflow), '\r\n      Structure: ', structure.NameableType.toString(this.state.structure), '\r\n');
    };
});