---
title: Tooling
description: Learn about Lando Drupal tooling commands like composer, php, drush, etc
---

# Tooling

By default each Lando Drupal recipe will also ship with helpful dev utilities.

This means you can use things like `drush`, `composer` and `php` via Lando. This helps avoid mucking up your actual computer because you dont have to manage `php` versions, global `composer` dependencies and other less than savory things.

```bash
lando composer          Runs composer commands
lando db-export [file]  Exports database from a service into a file
lando db-import <file>  Imports a dump file into database service
lando drush             Runs drush commands
lando mysql             Drops into a MySQL shell on a database service
lando php               Runs php commands
```

:::warning Make sure you install Drush
If you are running `Drupal 8.4+` then you will need [a site-local install of Drush](https://www.drush.org/latest/install/). Check out [Using Drush](#using-drush) below for more info.
:::

**Usage examples**

```bash
# Doing a drush site install
lando drush si --db-url=mysql://drupal9:drupal9@database/drupal9 -y

# Run composer tests
lando composer test

# Drop into a mysql shell
lando mysql

# Check hte app's installed php extensions
lando php -m
```

You can also run `lando` from inside your app directory for a complete list of commands which is always advisable as your list of commands may not 100% be the same as the above. For example if you set `database: postgres` you will get `lando psql` instead of `lando mysql`.


## Using Drush

As of Drupal 8.4+  it is preferred you use [a site-local install of Drush](https://www.drush.org/latest/install/). For that reason Lando **will not** globall install a version of Drush for Drupal 9 sites.

You can site-local install drush by requiring it in your projects `composer.json` file.

```bash
lando composer require drush/drush
```

Once you do, Lando will be able to use `drush` normally.

#### Build steps

Once `drush` is listed in your `composer.json` it is also recommended to configure a [build step](https://docs.lando.dev/config/services.html#build-steps) to automatically install Drush before your app starts up. This ensures `drush` is available after `lando start` and during any other build steps or events.

**Automatically composer install before my app starts**

```yaml
recipe: drupal9
services:
  appserver:
    build:
      - composer install
```

If you find that Lando is not using your `drush` as expected, which can happen if you've modified `composer` to install in a different directory than its normal `vendor` you can take advantage of Lando's [tooling overrides](https://docs.lando.dev/config/tooling.html#overriding) and specify an absolute path to your Drush.

```yaml
tooling:
  drush:
    cmd: /path/to/my/drush
```

#### Default URL Setup

You may see `http://default` show up in many `drush` commands you run.

```bash
lando drush uli
// http://default/user/reset/1/1548025070/Px6PbLyJ_2laXqoDe6OukHXaX-cXExo4ErfrKbkqsE4/login
```

This happens because it is actually a difficult problem for Lando to 100% know the canonical URL or service that is serving your application. However you can set up your environment so that commands like `lando drush uli` return the proper URL.

```yaml
tooling:
  drush:
    service: appserver
    env:
      DRUSH_OPTIONS_URI: "https://mysite.lndo.site"
```

## Using xdebug

This is just a passthrough option to the [xdebug setting](https://docs.lando.dev/php/config.html#using-xdebug) that exists on all our [php services](https://docs.lando.dev/php). The `tl;dr` is `xdebug: true` enables and configures the php xdebug extension and `xdebug: false` disables it.

```yaml
recipe: drupal9
config:
  xdebug: true|false
```

However, for more information we recommend you consult the [php service documentation](https://docs.lando.dev/php).


## Importing Your Database

Once you've started up your Drupal 9 site you will need to pull in your database and files before you can really start to dev all the dev. Pulling your files is as easy as downloading an archive and extracting it to the correct location. Importing a database can be done using our helpful `lando db-import` command.

```bash
# Grab your database dump
curl -fsSL -o database.sql.gz "https://url.to.my.db/database.sql.gz"

# Import the database
# NOTE: db-import can handle uncompressed, gzipped or zipped files
# Due to restrictions in how Docker handles file sharing your database
# dump MUST exist somewhere inside of your app directory.
lando db-import database.sql.gz
```

You can learn more about the `db-import` command [over here](https://docs.lando.dev/guides/db-import.html)
