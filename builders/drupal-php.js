'use strict';

const LandoPhp = require('@lando/php/builders/php.js');

/**
 * Drupal PHP builder class that extends Lando PHP builder.
 * Uses the bundled version of @lando/php plugin instead of user's version.
 *
 * @module drupal-php
 */
module.exports = {
  name: 'drupal-php',
  parent: '_appserver',
  /**
   * Builder function that returns the DrupalPhp class
   * @param {Object} parent - Parent builder class
   * @return {Class} DrupalPhp class extending LandoPhp builder
   */
  builder: parent => class DrupalPhp extends LandoPhp.builder(parent, LandoPhp.config) {
    /**
     * Create a new DrupalPhp instance
     * @param {string} id - Service id
     * @param {Object} options - Service options
     * @param {Object} factory - App factory instance
     */
    constructor(id, options = {}, factory) {
      options.nginxServiceType = 'drupal-nginx';
      super(id, options, factory);
    }
  },
};
