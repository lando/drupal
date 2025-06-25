'use strict';

/*
 * Init Lamp
 */
module.exports = {
  name: 'drupal11',
  defaults: {
    'php': '8.3',
    'via': 'apache:2.4',
    'database': 'mysql:8.0',
    'composer_version': '2-latest',
    'drush': '^13',
  },
};
