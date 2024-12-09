---
title: Configuration
description: Learn how to configure the Lando Drupal recipe.
---

# Configuration

While Lando [recipes](https://docs.lando.dev/landofile/recipes.html) set sane defaults so they work out of the box they are also [configurable](https://docs.lando.dev/landofile/recipes.html#config).

Here are the configuration options, set to the default values, for this recipe's [Landofile](https://docs.lando.dev/landofile/). If you are unsure about where this goes or what this means we *highly recommend* scanning the [recipes documentation](https://docs.lando.dev/landofile/recipes.html) to get a good handle on how the magicks work.

```yaml
recipe: drupal9
config:
  php: '8.0'
  composer_version: '2-latest'
  via: apache:2.4
  webroot: .
  database: mysql:5.7
  drush: false
  xdebug: false
  config:
    database: SEE BELOW
    php: SEE BELOW
    server: SEE BELOW
    vhosts: SEE BELOW
```

Note that if the above config options are not enough all Lando recipes can be further [extended and overriden](https://docs.lando.dev/landofile/recipes.html#extending-and-overriding-recipes).

## Choosing a Drupal version

If you've initialized a site with `lando init` there is a good chance this is already set correctly. However, definitely make sure you are vibing the correct major version of Drupal as the underlying server config differs.

```yaml
recipe: drupal11|drupal10|drupal9|drupal8|drupal7|drupal6
config:
  php: '7.4'
```

## Choosing a PHP version

You can set `php` to any version that is available in our [php service](https://docs.lando.dev/plugins/php/).

However, you should consult the [Drupal requirements](https://www.drupal.org/docs/getting-started/system-requirements) to make sure that the version of `php` you choose is actually supported by the version of `drupal` you are running.

Here is the [recipe config](https://docs.lando.dev/landofile/recipes.html#config) to set the Drupal 9 recipe to use `php` version `7.4`

```yaml
recipe: drupal9
config:
  php: '7.4'
```

## Choosing a composer version

You can set `composer_version` to any version that is available in our [php service](https://docs.lando.dev/plugins/php/config.html#installing-composer).

```yaml
recipe: drupal9
config:
  composer_version: '1.10.1'
```

By default, Drupal 9 and above use the latest version of Composer 2.x.

## Choosing a webserver

By default this recipe will be served by the default version of our [apache](https://docs.lando.dev/plugins/apache) service but you can also switch this to use [`nginx`](https://docs.lando.dev/plugins/nginx). We *highly recommend* you check out both the [apache](https://docs.lando.dev/plugins/apache) and [nginx](https://docs.lando.dev/plugins/nginx) services before you change the default `via`.

#### With Apache (default)

```yaml
recipe: drupal9
config:
  via: apache
```

#### With nginx

```yaml
recipe: drupal9
config:
  via: nginx
```

## Choosing a database backend

By default this recipe will use the default version of our [mysql](https://docs.lando.dev/plugins/mysql) service as the database backend but you can also switch this to use [`mariadb`](https://docs.lando.dev/plugins/mariadb) or [`postgres`](https://docs.lando.dev/plugins/postgres) instead. Note that you can also specify a version *as long as it is a version available for use with lando* for either `mysql`, `mariadb` or `postgres`.

If you are unsure about how to configure the `database` we *highly recommend* you check out the [`mysql`](https://docs.lando.dev/plugins/mysql), [`mariadb`](https://docs.lando.dev/plugins/mariadb) and [`postgres`](https://docs.lando.dev/plugins/postgres) services before you change the default.

Also note that like the configuration of the `php` version you should consult the [Drupal requirements](https://www.drupal.org/docs/getting-started/system-requirements) to make sure the `database` and `version` you select is actually supported by the version of Drupal you are using.

#### Using MySQL (default)

```yaml
recipe: drupal9
config:
  database: mysql
```

#### Using MariaDB

```yaml
recipe: drupal9
config:
  database: mariadb
```

#### Using Postgres

```yaml
recipe: drupal9
config:
  database: postgres
```

#### Using a custom version

```yaml
recipe: drupal9
config:
  database: mariadb:10.4
```

## Connecting to your database

Lando will automatically set up a database with a user and password and also set an environment variables called [`LANDO INFO`](https://docs.lando.dev/guides/lando-info.html) that contains useful information about how your application can access other Lando services.

Here is the default database connection information for a Drupal 9 site. Note that the `host` is not `localhost` but `database`. Also note that you will want to replace `drupal9` if you are using a different major version of Drupal eg `drupal8` for Drupal 8.

```yaml
database: drupal9
username: drupal9
password: drupal9
host: database
# for mysql
port: 3306
# for postgres
# port: 5432
```

You can get also get the above information, and more, by using the [`lando info`](https://docs.lando.dev/cli/info.html) command.


## Using custom config files

You may need to override our [default Drupal config](https://github.com/lando/drupal/tree/main/builders) with your own.

If you do this you must use files that exist inside your application and express them relative to your project root as below.

Note that the default files may change based on how you set both `ssl` and `via`. Also note that the `vhosts` and `server` config will be either for `apache` or `nginx` depending on how you set `via`. We *highly recommend* you check out both the [apache](https://docs.lando.dev/plugins/apache/config.html) and [nginx](https://docs.lando.dev/plugins/nginx/config.html) if you plan to use a custom `vhosts` or `server` config.

**A hypothetical project**

Note that you can put your configuration files anywhere inside your application directory. We use a `config` directory in the below example but you can call it whatever you want such as `.lando`.

```bash
./
|-- config
   |-- default.conf
   |-- my-custom.cnf
   |-- php.ini
   |-- server.conf
|-- index.php
|-- .lando.yml
```

**Landofile using custom drupal9 config**

```yaml
recipe: drupal9
config:
  config:
    database: config/my-custom.cnf
    php: config/php.ini
    server: config/server.conf
    vhosts: config/default.conf
```
