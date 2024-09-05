Drupal 11 w/Nginx Example
================

This example exists primarily to test the following documentation:

* [Drupal 11 Recipe](https://docs.lando.dev/config/drupal10.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should initialize the latest Drupal 11 codebase
rm -rf nginx && mkdir -p nginx && cd nginx
lando init --source remote --remote-url https://ftp.drupal.org/files/projects/drupal-11.0.x-dev.tar.gz --remote-options="--strip-components 1" --recipe drupal11 --webroot . --name lando-drupal11-nginx --option via=nginx

# Should start up successfully
cd nginx
cp -f ../../.lando.upstream.yml .lando.upstream.yml && cat .lando.upstream.yml
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should return the drupal installation page by default
cd nginx
lando exec appserver -- curl -L appserver_nginx | grep "Drupal 11"

# Should use 8.3 as the default php version
cd nginx
lando php -v | grep "PHP 8.3"

# Should be running nginx 1.25 by default
cd nginx
lando exec appserver_nginx -- nginx -v 2>&1 | grep 1.25
lando exec appserver -- curl -IL appserver_nginx | grep Server | grep nginx

# Should be running mysql 8.0.x by default
cd nginx
lando mysql -V | grep 8.0

# Should be running sqlite 3.34 by default
cd nginx
lando php -r "print_r(SQLite3::version());" | grep versionString | grep 3.34

# Should not enable xdebug by default
cd nginx
lando php -m | grep xdebug || echo $? | grep 1

# Should use the default database connection info
cd nginx
lando mysql -udrupal11 -pdrupal11 drupal11 -e quit

# Should use site-local drush if installed
cd nginx
lando composer require drush/drush
lando exec appserver -- which drush | grep "/app/vendor/bin/drush"

# Should be able to install drupal
cd nginx
lando drush si --db-url=mysql://drupal11:drupal11@database/drupal11 -y

# Should be able to enable and access jsonapi
cd nginx
lando drush en jsonapi -y
lando exec appserver -- curl lando-drupal11-nginx.lndo.site/jsonapi | grep "action--action"
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd nginx
lando destroy -y
lando poweroff
```
