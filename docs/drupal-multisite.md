---
title: Running Drupal Multisite on Lando
description: How to run multisite Drupal installs on Lando.
guide: true
authors:
  - name: Brook Heaton
    pic: https://avatars.githubusercontent.com/u/19474864
    link: https://github.com/brooke-heaton
updated:
  timestamp: 1613073690000
mailchimp:
  action: https://dev.us12.list-manage.com/subscribe/post?u=59874b4d6910fa65e724a4648&amp;id=613837077f
  title: Want more Drupal guide content?
  byline: Signup and we will send you a weekly blog digest of similar content to keep you satiated.
  button: Sign me up!
---

[Drupal multisite](https://www.drupal.org/docs/multisite-drupal) is a feature of Drupal that allows you to run multiple Drupal installs off of a common codebase.
It's common in universities and other settings where you might want to share themes and modules between a collection of many websites.

## Configuring Lando

To run Drupal multisite you need to do several things:

1. Your `.lando.yml` will need proxies for each multisite in the appserver array
2. The `settings.local.php` file within your subsite directory (ex: `docroot/sites/site1/`) needs settings to connect to the appropriate Lando-hosted database.
3. You need Drush aliases pointing to your local. If you use Drupal console, you'll need to specify your uri (ex: `drupal --uri=http://site1.lndo.site cr all`).

## 1. Configure .lando.yml

Create proxies for each multisite in the appserver array in your `.lando.yml` file. Ex:

```yaml
proxy:
  appserver:
    - site1.lndo.site
    - site2.lndo.s
services:
  site1:
    type: mysql:5.7
    portforward: 33068
    config:
      confd: lando/mysql/conf.d
  site2:
    type: mysql:5.7
    portforward: 33069
    config:
      confd: .lando/mysql/conf.d
```

## 2. Configure each subsite's settings.local.php

Configure each subsite to include the default Lando config to connect to the database, along with specifying the appserver name you defined in `.lando.yml`. For example, in `docroot/sites/site1/settings/settings.local.php` you would include...

```php
/**
 * Database configuration.
 */
$databases['default'] = array (
  'default' => array (
    'driver' => 'mysql',
    'database' => 'database',
    'username' => 'mysql',
    'password' => 'password',
    'prefix' => '',
    'port' => 3306,
  )
);
// The only thing to add from the out-of-the-box Lando db is the special host for each subsite
$databases['default']['default']['host'] = 'site1';
```

::: warning If you're on Acquia...
You must specify $_Server['PWD']=DRUPAL_ROOT if you use Drush 9 on Acquia (this may apply to some other hosts as well). Update your main `sites/default/settings.php` to tell our local Drupal to use the `/settings/settings.local.php` within each subsite:

```php
if (!key_exists('AH_SITE_ENVIRONMENT', $_ENV)) {
  $environment_settings = __DIR__  . '/settings/settings.local.php';
  if (file_exists($environment_settings)) {
    include $environment_settings;
  }
}
// Temporary fix because drush9 blocks superglobals
$_SERVER['PWD']=DRUPAL_ROOT;
```
:::

## 3. Define Drush aliases for each subsite

Finally you'll need some Drush aliases so Drush can find your subsite installs. Here `docroot` is where our Drupal root is. For example, in `site_root/drush/sites/site-aliases/site1.site.yml` we would define...

```yaml
local:
  uri: 'https://site1.lndo.site'
  paths:
  - files: /path_to_your_local_site/site_root/docroot'
dev:
  host: 'site1dev.ssh.prod.acquia-sites.com'
  user: 'site1.dev'
  root: '/var/www/html/site1.dev/docroot'
  uri: 'site1dev.prod.acquia-sites.com'
  ac-site: 'site1'
  ac-env: 'dev'
  ac-realm: 'prod'
  paths:
    drush-script: 'drush8'
test:
  root: '/var/www/html/site1.test/docroot'
  ac-site: 'site1'
  ac-env: 'test'
  ac-realm: 'prod'
  uri: 'site1stg.prod.acquia-sites.com'
  host: 'site1stg.ssh.prod.acquia-sites.com'
  user: 'site1.test'
  paths:
    drush-script: 'drush8'
prod:
  root: '/var/www/html/site1.prod/docroot'
  ac-site: 'site1'
  ac-env: 'prod'
  ac-realm: 'prod'
  uri: 'site1.prod.acquia-sites.com'
  host: 'site1.ssh.prod.acquia-sites.com'
  user: 'site1.prod'
  paths:
    drush-script: 'drush8'
```

I'm using drush8 against the cloud here by specifying that in the drush-script, since I've had issues trying to use drush9 and have no defined drush9 aliases, but that's purely a concern of working with Acquia Cloud.

