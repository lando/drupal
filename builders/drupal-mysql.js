'use strict';

const _ = require('lodash');
const LandoMysql = require('./../node_modules/@lando/mysql/builders/mysql.js');

// Builder
module.exports = {
  name: 'drupal-mysql',
  parent: '_service',
  builder: (parent, config) => class DrupalMysql extends LandoMysql.builder(parent, LandoMysql.config) {
    constructor(id, options = {}) {
      super(id, options, {services: _.set({}, options.name)});
    };
  },
};
