'use strict';

// Modules
const _ = require('lodash');
const path = require('path');

/*
 * Build Drupal 6
 */
module.exports = {
  name: 'drupal6',
  parent: '_drupaly',
  config: {
    confSrc: path.resolve(__dirname, '..', 'config', 'drupal6'),
    defaultFiles: {},
    php: '5.6',
    // @NOTE: below seems to be the last known Drupal 6 compatible
    // drush version that let you do drush si -y successfully.
    // @see https://github.com/drush-ops/drush/issues/218#issuecomment-2580619527
    drush: '8.4.5',
  },
  builder: (parent, config) => class LandoDrupal6 extends parent {
    constructor(id, options = {}) {
      super(id, _.merge({}, config, options));
    }
  },
};
