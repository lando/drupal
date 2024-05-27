'use strict';

// Modules
const _ = require('lodash');
const path = require('path');

/*
 * Helper to get a phar download and setupcommand
 * @TODO: clean this mess up
 */
exports.getPhar = (url, src, dest, check = 'true') => {
  // Arrayify the check if needed
  if (_.isString(check)) check = [check];
  // Phar install command
  const pharInstall = [
    ['curl', url, '-LsS', '-o', src],
    ['chmod', '+x', src],
    ['mv', src, dest],
    check,
  ];
  // Return
  return _.map(pharInstall, cmd => cmd.join(' ')).join(' && ');
};

// MariaDB cli commands
const mariadbCli = {
  service: ':host',
  description: 'Drops into a MariaDB shell on a database service',
  cmd: 'mariadb -uroot',
  options: {
    host: {
      description: 'The database service to use',
      default: 'database',
      alias: ['h'],
    },
  },
};
// MySQL cli commands
const mysqlCli = {
  service: ':host',
  description: 'Drops into a MySQL shell on a database service',
  cmd: 'mysql -uroot',
  options: {
    host: {
      description: 'The database service to use',
      default: 'database',
      alias: ['h'],
    },
  },
};
// Postgres cli commands
const postgresCli = {
  service: ':host',
  description: 'Drops into a psql shell on a database service',
  cmd: 'psql -Upostgres',
  user: 'root',
  options: {
    host: {
      description: 'The database service to use',
      default: 'database',
      alias: ['h'],
    },
  },
};

/*
 * Helper to get DRUSH phar url
 */
const getDrushUrl = version => `https://github.com/drush-ops/drush/releases/download/${version}/drush.phar`;

/*
 * Helper to get the phar build command
 */
exports.getDbTooling = database => {
  // Make sure we strip out any version number
  db = database.split(':')[0];
  ver = database.split(':')[1];
  // Choose wisely
  if (db === 'mysql') {
    return {mysql: mysqlCli};
  } else if (db === 'mariadb' && ver < 10.4) {
    // Use mysql command for MariaDB 10.3.x and below
    return {mysql: mysqlCli};
  } else if (db === 'mariadb') {
    return {mariadb: mariadbCli};
  } else if (db === 'postgres') {
    return {psql: postgresCli};
  } else if (db === 'mongo') {
    return {mongo: {
      service: 'database',
      description: 'Drop into the mongo shell',
    }};
  }
};

/*
 * Helper to get the phar build command
 */
exports.getDrush = (version, status) => exports.getPhar(
  getDrushUrl(version),
  '/tmp/drush.phar',
  '/usr/local/bin/drush',
  status,
);

/*
 * Helper to get a phar download and setupcommand
 * @TODO: clean this mess up
 */
exports.getPhar = (url, src, dest, check = 'true') => {
  // Arrayify the check if needed
  if (_.isString(check)) check = [check];
  // Phar install command
  const pharInstall = [
    ['curl', url, '-LsS', '-o', src],
    ['chmod', '+x', src],
    ['mv', src, dest],
    check,
  ];
  // Return
  return _.map(pharInstall, cmd => cmd.join(' ')).join(' && ');
};

/*
 * Helper to get service config
 */
exports.getServiceConfig = (options, types = ['php', 'server', 'vhosts']) => {
  const config = {};
  _.forEach(types, type => {
    if (_.has(options, `config.${type}`)) {
      config[type] = options.config[type];
    } else if (!_.has(options, `config.${type}`) && _.has(options, `defaultFiles.${type}`)) {
      if (_.has(options, 'confDest')) {
        config[type] = path.join(options.confDest, options.defaultFiles[type]);
      }
    }
  });
  return config;
};

/*
 * Parse config into raw materials for our factory
 */
exports.parseConfig = (recipe, app) => _.merge({}, _.get(app, 'config.config', {}), {
  _app: app,
  app: app.name,
  confDest: path.join(app._config.userConfRoot, 'config', recipe),
  home: app._config.home,
  project: app.project,
  recipe,
  root: app.root,
  userConfRoot: app._config.userConfRoot,
});
