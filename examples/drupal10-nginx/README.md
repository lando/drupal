Drupal 10 w/Nginx Example
================

This example exists primarily to test the following documentation:

* [Drupal 10 Recipe](https://docs.lando.dev/config/drupal10.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should initialize the latest Drupal 10 codebase
rm -rf nginx && mkdir -p nginx && cd nginx
lando init --source remote --remote-url https://ftp.drupal.org/files/projects/drupal-10.0.x-dev.tar.gz --remote-options="--strip-components 1" --recipe drupal10 --webroot . --name lando-drupal10-nginx --option via=nginx

# Should start up successfully
cd nginx
cp -f ../../.lando.local.yml .lando.local.yml && cat .lando.local.yml
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should return the drupal installation page by default
cd nginx
lando ssh -s appserver -c "curl -L appserver_nginx" | grep "Drupal 10"

# Should use 8.1 as the default php version
cd nginx
lando php -v | grep "PHP 8.1"

# Should be running nginx 1.25 by default
cd nginx
lando ssh -s appserver_nginx -c "nginx -v 2>&1 | grep 1.25"
lando ssh -s appserver -c "curl -IL appserver_nginx" | grep Server | grep nginx

# Should be running mysql 5.7 by default
cd nginx
lando mysql -V | grep 5.7

# Should be running sqlite 3.34 by default
cd nginx
lando php -r "print_r(SQLite3::version());" | grep versionString | grep 3.34

# Should not enable xdebug by default
cd nginx
lando php -m | grep xdebug || echo $? | grep 1

# Should use the default database connection info
cd nginx
lando mysql -udrupal10 -pdrupal10 drupal10 -e quit

# Should use site-local drush if installed
cd nginx
lando composer require drush/drush
lando ssh -c "which drush" | grep "/app/vendor/bin/drush"

# Should be able to install drupal
cd nginx
lando drush si --db-url=mysql://drupal10:drupal10@database/drupal10 -y

# Should be able to enable and access jsonapi
cd nginx
lando drush en jsonapi -y
lando ssh -c "curl localhost/jsonapi" | grep "action--action"
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
