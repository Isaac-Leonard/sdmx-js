define([
    'react/addons',
    'lodash',
    './services.rt',
    './dataflows.rt'
], function (React, _, Services, Dataflows) {
    'use strict';
    return function () {
        return React.createElement('div', {}, React.createElement(Services, {
            'onConnect': this.onConnect,
            'ref': 'services'
        }), React.createElement(Dataflows, {
            'onSelectDataflow': this.onSelectDataflow,
            'ref': 'dataflows'
        }), React.createElement(Structure, { 'ref': 'structure' }));
    };
});