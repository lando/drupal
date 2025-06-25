'use strict';

const _ = require('lodash');
const LandoMssql = require('@lando/mssql/builders/mssql.js');

// Builder
module.exports = {
  name: 'drupal-mssql',
  parent: '_service',
  builder: parent => class DrupalMssql extends LandoMssql.builder(parent, LandoMssql.config) {
    constructor(id, options = {}) {
      super(id, options, {services: _.set({}, options.name)});
    }
  },
};
