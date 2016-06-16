define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    return function () {
        return React.createElement('div', {}, React.createElement('select', {
            'value': 'one',
            'onChange': changeNumber
        }, React.createElement('option', { 'value': 'all' }, 'All'), React.createElement('option', { 'value': 'one' }, 'One'), React.createElement('option', { 'value': 'many' }, 'Many')));
    };
});