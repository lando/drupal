'use strict';

// Modules
const _ = require('lodash');
const path = require('path');

/*
 * Build Drupal 7
 */
module.exports = {
  name: 'drupal7',
  parent: '_drupaly',
  config: {
    confSrc: path.resolve(__dirname, '..', 'config', 'drupal7'),
    defaultFiles: {},
    php: '7.4',
  },
  builder: (parent, config) => class LandoDrupal7 extends parent {
    constructor(id, options = {}) {
      super(id, _.merge({}, config, options));
    };
  },
};
