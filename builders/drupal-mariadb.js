'use strict';

const _ = require('lodash');
const LandoMariadb = require('@lando/mariadb/builders/mariadb.js');

// Builder
module.exports = {
  name: 'drupal-mariadb',
  parent: '_service',
  builder: parent => class DrupalMariadb extends LandoMariadb.builder(parent, LandoMariadb.config) {
    constructor(id, options = {}) {
      super(id, options, {services: _.set({}, options.name)});
    }
  },
};
