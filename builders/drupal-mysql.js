'use strict';

const _ = require('lodash');
const semver = require('semver');
const LandoMysql = require('@lando/mysql/builders/mysql.js');

// Builder
module.exports = {
  name: 'drupal-mysql',
  parent: '_service',
  builder: parent => class DrupalMysql extends LandoMysql.builder(parent, LandoMysql.config) {
    constructor(id, options = {}) {
      // Versions of MySQL prior to 8.4 use mysql_native_password authentication
      if (!options.authentication && semver.lt(semver.coerce(options.version), '8.4.0')) {
        options.authentication = 'mysql_native_password';
      }

      super(id, options, {services: _.set({}, options.name)});
    }
  },
};
