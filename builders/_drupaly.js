'use strict';

// Modules
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const semver = require('semver');
const utils = require('../lib/utils.js');
const warnings = require('../lib/warnings.js');

// "Constants"
const DRUSH8 = '8.5.0';
const DRUSH7 = '7.4.0';

// Tooling defaults
const toolingDefaults = {
  'composer': {
    service: 'appserver',
    cmd: 'composer --ansi',
  },
  'db-import <file>': {
    service: ':host',
    description: 'Imports a dump file into a database service',
    cmd: '/helpers/sql-import.sh',
    user: 'root',
    options: {
      'host': {
        description: 'The database service to use',
        default: 'database',
        alias: ['h'],
      },
      'no-wipe': {
        description: 'Do not destroy the existing database before an import',
        boolean: true,
      },
    },
  },
  'db-export [file]': {
    service: ':host',
    description: 'Exports database from a database service to a file',
    cmd: '/helpers/sql-export.sh',
    user: 'root',
    options: {
      host: {
        description: 'The database service to use',
        default: 'database',
        alias: ['h'],
      },
      stdout: {
        description: 'Dump database to stdout',
      },
    },
  },
  'php': {
    service: 'appserver',
    cmd: 'php',
  },
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
 * Helper to get config defaults
 */
const getConfigDefaults = options => {
  // Get the viaconf
  if (_.startsWith(options.via, 'nginx')) options.defaultFiles.vhosts = 'default.conf.tpl';

  // Get the default db conf
  const dbConfig = _.get(options, 'database', 'mysql');
  const database = _.first(dbConfig.split(':'));
  const version = _.last(dbConfig.split(':')).substring(0, 2);
  if (database === 'mysql' || database === 'mariadb') {
    if (version === '8.') {
      options.defaultFiles.database = 'mysql8.cnf';
    } else {
      options.defaultFiles.database = 'mysql.cnf';
    }
  }

  // Verify files exist and remove if it doesn't
  _.forEach(options.defaultFiles, (file, type) => {
    if (!fs.existsSync(`${options.confDest}/${file}`)) {
      delete options.defaultFiles[type];
    }
  });

  // Return
  return options.defaultFiles;
};

/*
 * Helper to get services
 */
const getServices = options => ({
  appserver: {
    build_as_root_internal: options.build_root,
    build_internal: options.build,
    composer: options.composer,
    composer_version: options.composer_version,
    config: getServiceConfig(options),
    run_as_root_internal: options.run_root,
    ssl: true,
    type: `drupal-php:${options.php}`,
    via: options.via,
    xdebug: options.xdebug,
    webroot: options.webroot,
  },
  database: {
    config: getServiceConfig(options, ['database']),
    authentication: '',
    type: `drupal-${options.database}`,
    portforward: true,
    creds: {
      user: options.recipe,
      password: options.recipe,
      database: options.recipe,
    },
  },
});

/*
 * Helper to get the phar build command
 */
const getDbTooling = database => {
  const [db, ver] = database.split(':');
  // Choose wisely
  if (db === 'mysql') {
    return {mysql: mysqlCli};
  } else if (db === 'mariadb' && semver.lt(semver.coerce(ver), '10.4.0')) {
    // Use mysql command for MariaDB 10.3.x and below
    return {mysql: mysqlCli};
  } else if (db === 'mariadb') {
    return {mariadb: mariadbCli};
  } else if (db === 'postgres') {
    return {psql: postgresCli};
  } else if (db === 'mongo') {
    return {
      mongo: {
        service: 'database',
        description: 'Drop into the mongo shell',
      },
    };
  }
};

/*
 * Helper to get proxy config
 */
const getProxy = (options, proxyService = 'appserver') => {
  // get any intial proxy stuff for proxyService
  const urls = _.get(options, `_app.config.proxy.${proxyService}`, []);
  // add
  urls.push(`${options.app}.${options._app._config.domain}`);
  // return
  return {[proxyService]: _.uniq(_.compact(urls))};
};

/*
 * Helper to get service config
 */
const getServiceConfig = (options, types = ['php', 'server', 'vhosts']) => {
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
 * Helper to get tooling
 */
const getTooling = options => _.merge({}, toolingDefaults, getDbTooling(options.database));

/*
 * Build Drupal 7
 */
module.exports = {
  name: '_drupaly',
  parent: '_recipe',
  config: {
    build: [],
    composer: {},
    confSrc: __dirname,
    config: {},
    database: 'mysql:5.7',
    defaultFiles: {
      php: 'php.ini',
    },
    php: '7.2',
    tooling: {
      drush: {
        service: 'appserver',
      },
    },
    via: 'apache:2.4',
    webroot: '.',
    xdebug: false,
    proxy: {},
    drush_uri: null,
  },
  builder: (parent, config) => class LandoDrupal extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);

      // Set the default drush version if we don't have it
      if (!_.has(options, 'drush')) options.drush = (options.php === '5.3') ? DRUSH7 : DRUSH8;

      // Figure out the drush situation
      if (options.drush !== false) {
        // Start by assuming a composer based install
        options.composer['drush/drush'] = options.drush;
        // Switch to phar based install if we can
        if (semver.valid(options.drush) && semver.major(options.drush) === 8) {
          delete options.composer['drush/drush'];
          options.build.unshift(utils.getDrush(options.drush, ['drush', '--version']));
        }
        // Attempt to set a warning if possible
        const coercedDrushVersion = semver.valid(semver.coerce(options.drush));
        if (!_.isNull(coercedDrushVersion) && semver.gte(coercedDrushVersion, '10.0.0')) {
          options._app.addWarning(warnings.drushWarn(options.drush));
        }
      }

      // Set legacy envars
      options.services = _.merge({}, options.services, {
        appserver: {
          overrides: {
            environment: {
              SIMPLETEST_BASE_URL: (options.via === 'nginx') ? 'https://appserver_nginx' : 'https://appserver',
              SIMPLETEST_DB: `mysql://${options.recipe}:${options.recipe}@database/${options.recipe}`,
            },
          },
        },
      });

      // Switch the proxy service if needed
      if (!_.has(options, 'proxyService')) {
        if (_.startsWith(options.via, 'nginx')) options.proxyService = 'appserver_nginx';
        else if (_.startsWith(options.via, 'apache')) options.proxyService = 'appserver';
      }

      // Rebase on top of any default config we might already have
      options.defaultFiles = _.merge({}, getConfigDefaults(_.cloneDeep(options)), options.defaultFiles);
      options.proxy = _.merge({}, getProxy(options, options.proxyService), options.proxy);
      options.services = _.merge({}, getServices(options), options.services);
      options.tooling = _.merge({}, getTooling(options), options.tooling);

      // Set DRUSH_OPTIONS_URI based on drush_uri config or proxy settings
      let drushUri = options.drush_uri;
      if (!drushUri) {
        const proxyUrl = options.proxy[options.proxyService]?.[0];
        if (proxyUrl) {
          // Check SSL setting for the proxy service
          const proxyServiceSsl = options.services[options.proxyService]?.ssl;
          const ssl = proxyServiceSsl !== undefined ? proxyServiceSsl : options.services.appserver?.ssl;
          const protocol = ssl ? 'https' : 'http';
          // Include port if non-standard (e.g. proxy on 444 instead of 443)
          const ports = _.get(options, '_app._config.proxyLastPorts');
          let port = '';
          if (ports) {
            const activePort = ssl ? ports.https : ports.http;
            if (activePort && ((ssl && activePort !== '443') || (!ssl && activePort !== '80'))) {
              port = `:${activePort}`;
            }
          }
          drushUri = `${protocol}://${proxyUrl}${port}`;
        }
      }

      if (drushUri) {
        options.services.appserver.environment = options.services.appserver.environment || {};
        options.services.appserver.environment.DRUSH_OPTIONS_URI = drushUri;
      }

      // Send downstream
      super(id, _.merge({}, config, options));
    }
  },
};
