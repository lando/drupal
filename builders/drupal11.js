'use strict';

// Modules
const _ = require('lodash');
const path = require('path');

/*
 * Build Drupal 11
 */
module.exports = {
  name: 'drupal11',
  parent: '_drupaly',
  config: {
    confSrc: path.resolve(__dirname, '..', 'config', 'drupal11'),
    defaultFiles: {},
    php: '8.3',
    drush: '^13',
    composer_version: '2-latest',
  },
  builder: (parent, config) => class LandoDrupal11 extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      // Set drush to false
      options.drush = false;

      // Let's make sure we set appropriate default versions for things
      // See: https://www.drupal.org/docs/system-requirements/database-server-requirements
      switch (_.get(options, 'database', 'mysql')) {
        case 'mysql':
          options.database = 'mysql:8.0';
          break;
        case 'mariadb':
          options.database = 'mariadb:10.6';
          break;
        case 'postgres':
          options.database = 'postgres:16';
          break;
      }
      // Send it downstream
      super(id, options);
    }
  },
};
