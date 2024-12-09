---
description: Lando docs for Drupal 8 (legacy version).
---

# Drupal 7

## Quickstart

```bash:no-line-numbers
# Initialize a drupal7 recipe using the latest Drupal 8 version
mkdir my-first-drupal7-app \
  && cd my-first-drupal7-app \
  && lando init \
  --source remote \
  --remote-url https://ftp.drupal.org/files/projects/drupal-7.71.tar.gz \
  --remote-options="--strip-components 1" \
  --recipe drupal7 \
  --webroot . \
  --name my-first-drupal7-app

# Start it up
lando start

# Install drupal
lando drush si --db-url=mysql://drupal7:drupal7@database/drupal7 -y

# List information about this app.
lando info
```

## Default Configuration

```yaml
recipe: drupal7
config:
  php: '7.2'
  composer_version: '2.0.7'
  via: apache:2.4
  webroot: .
  database: mysql:5.7
  drush: ^8
  xdebug: false
```


## Using Drush

By default, our Drupal 7 recipe will globally install the [latest version of Drush 8](http://docs.drush.org/en/8.x/install/) or the [latest version of Drush 7](http://docs.drush.org/en/7.x/install/) if you are using php 5.3. This means that you should be able to use `lando drush` out of the box.

That said you can configure this recipe to use any version of Drush to which there is a resolvable package available via `composer`. That means that the following are all valid.

### Use the latest version of Drush

```yaml
recipe: drupal7
config:
  drush: "*"
```

### Use the latest version of Drush 7

```yaml
recipe: drupal7
config:
  drush: ^7
```

### Use a specific version of Drush 8

```yaml
recipe: drupal7
config:
  drush: 8.1.15
```

### Using a site-local Drush

While Lando will globally install Drush for you it is increasingly common and in some cases a straight-up best practice to [install a site-local Drush](https://www.drush.org/latest/install/) by requiring it in your projects `composer.json` file.

Because of how Lando's [php service](https://docs.lando.dev/plugins/php) sets up its [`PATH`](https://docs.lando.dev/plugins/php/caveats.html) this means that if you have indeed installed Drush on your own via `composer` Lando will use yours over its own.

Said more explicitly: **if you've required `drush` via `composer` in your application then this recipe will use your `drush` and not the one you've specified in this recipes config.**

If you are using a site-local Drush, it is also recommended to configure a [build step](https://docs.lando.dev/services/lando-3.html#build-steps) to automatically install Drush before your app starts up. This can prevent weird version mismatches and other issues if you are using Drush in other Lando automation like [events](https://docs.lando.dev/landofile/events.html).

**Automatically composer install before my app starts**

```yaml
recipe: drupal7
services:
  appserver:
    build:
      - composer install
```

If you find that Lando is not using your `drush` as expected, which can happen if you've modified `composer` to install in a different directory than its normal `vendor` you can take advantage of Lando's [tooling overrides](https://docs.lando.dev/landofile/tooling.html#overriding) and specify an absolute path to your Drush.

```yaml
tooling:
  drush:
    cmd: /path/to/my/drush
```

### Default URL Setup

You may see `http://default` show up in many `drush` commands you run.

```bash
lando drush uli
// http://default/user/reset/1/1548025070/Px6PbLyJ_2laXqoDe6OukHXaX-cXExo4ErfrKbkqsE4/login
```

This happens because it is actually a difficult problem for Lando to 100% know the canonical URL or service that is serving your application. However, you can set up your environment so that commands like `lando drush uli` return the proper URL.

Create or edit the relevant `settings.php` file and add these lines. Note that you may need to specify a port depending on your Lando installation. You can run `lando info` to see if your URLs use explicit ports or not.

```php
$base_url = "http://mysite.lndo.site:PORT_IF_NEEDED"
```

### Aliases

You can also use `drush` aliases with a command like `lando drush @sitealias cc all` by following the instructions below.

Make sure the alias file exists within the drush folder in your app. An example could be the files structure below:

```bash
|-- app
   |-- drush
      |-- yoursite.aliases.drushrc.php
```

For info on how to set up your alias, please refer to the following [link](https://www.drupal.org/node/1401522) or see this [example](https://github.com/drush-ops/drush/blob/8.x/examples/example.aliases.drushrc.php).

Then configure the following [build step](https://docs.lando.dev/services/lando-3.html#build-steps) in your [Landofile](https://docs.lando.dev/landofile/) and `lando rebuild`.

```yml
services:
  appserver:
    build:
      - mkdir -p ~/.drush/site-aliases
      - ln -sf /app/drush/yoursite.aliases.drushrc.php ~/.drush/site-aliases/yoursite.drushrc.php
```

### Configuring your root directory

If you are using a webroot besides `.`, you will need to remember to `cd` into that directory and run `lando drush` from there. This is because many site-specific `drush` commands will only run correctly if you run `drush` from a directory that also contains a Drupal site.

If you are annoyed by having to `cd` into that directory every time you run a `drush` command, you can get around it by [overriding](https://docs.lando.dev/landofile/tooling.html#overriding) the `drush` tooling command in your [Landofile](https://docs.lando.dev/landofile/) so that Drush always runs from your `webroot`.

**Note that hard coding the `root` like this may have unforeseen and bad consequences for some `drush` commands such as `drush scr`.**

```yaml
tooling:
  drush:
    service: appserver
    cmd: drush --root=/app/PATH/TO/WEBROOT
```
