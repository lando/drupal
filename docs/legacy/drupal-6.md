---
description: Lando docs for Drupal 8 (legacy version).
---

# Drupal 6

## Quickstart

```bash:no-line-numbers
# Initialize a drupal6 recipe using the latest Drupal 6 version
mkdir my-first-drupal6-app \
  && cd my-first-drupal6-app \
  && lando init \
  --source remote \
  --remote-url https://ftp.drupal.org/files/projects/drupal-6.38.tar.gz \
  --remote-options="--strip-components 1" \
  --recipe drupal6 \
  --webroot . \
  --name my-first-drupal6-app

# Start it up
lando start

# Install drupal
lando drush si --db-url=mysql://drupal6:drupal6@database/drupal6 -y

# List information about this app.
lando info
```

## Default Configuration

```yaml
recipe: drupal6
config:
  php: '5.6'
  composer_version: '2.0.7'
  via: apache:2.4
  webroot: .
  database: mysql:5.7
  drush: ^8
  xdebug: false
```

## Using Drush

By default, our Drupal 6 recipe will globally install the [latest version of Drush 8](http://docs.drush.org/en/8.x/install/) or the [latest version of Drush 7](http://docs.drush.org/en/7.x/install/) if you are using php 5.3. This means that you should be able to use `lando drush` out of the box.

That said you can configure this recipe to use any version of Drush to which there is a resolvable package available via `composer`. That means that the following are all valid.

**Use the latest version of Drush**

```yaml
recipe: drupal6
config:
  drush: "*"
```

**Use the latest version of Drush 7**

```yaml
recipe: drupal6
config:
  drush: ^7
```

**Use a specific version of Drush 8**

```yaml
recipe: drupal6
config:
  drush: 8.1.15
```

## Configuring your root directory

If you are using a webroot besides `.`, you will need to remember to `cd` into that directory and run `lando drush` from there. This is because many site-specific `drush` commands will only run correctly if you run `drush` from a directory that also contains a Drupal site.

If you are annoyed by having to `cd` into that directory every time you run a `drush` command, you can get around it by [overriding](https://docs.lando.dev/core/v3/tooling.html#overriding) the `drush` tooling command in your [Landofile](https://docs.lando.dev/core/v3) so that Drush always runs from your `webroot`.

**Note that hard coding the `root` like this may have unforeseen and bad consequences for some `drush` commands such as `drush scr`.**

```yaml
tooling:
  drush:
    service: appserver
    cmd: drush --root=/app/PATH/TO/WEBROOT
```
