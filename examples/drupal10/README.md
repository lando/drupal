Drupal 10 Example
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
rm -rf drupal10 && mkdir -p drupal10 && cd drupal10
lando init --source remote --remote-url https://ftp.drupal.org/files/projects/drupal-10.0.x-dev.tar.gz --remote-options="--strip-components 1" --recipe drupal10 --webroot . --name lando-drupal10

# Should start up successfully
cd drupal10
lando composer install
echo -e "\nplugins:\n  \"@lando/drupal/\": ./../../" >> .lando.yml
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should return the drupal installation page by default
cd drupal10
lando ssh -s appserver -c "curl -L localhost" | grep "Drupal 10"

# Should use 8.1 as the default php version
cd drupal10
lando php -v | grep "PHP 8.1"

# Should be running apache 2.4 by default
cd drupal10
lando ssh -s appserver -c "apachectl -V | grep 2.4"
lando ssh -s appserver -c "curl -IL localhost" | grep Server | grep 2.4

# Should be running mysql 5.7 by default
cd drupal10
lando mysql -V | grep 5.7

# Should be running sqlite 3.34 by default
cd drupal10
lando php -r "print_r(SQLite3::version());" | grep versionString | grep 3.34

# Should not enable xdebug by default
cd drupal10
lando php -m | grep xdebug || echo $? | grep 1

# Should use the default database connection info
cd drupal10
lando mysql -udrupal10 -pdrupal10 drupal10 -e quit

# Should use site-local drush if installed
cd drupal10
lando composer require drush/drush
lando ssh -c "which drush" | grep "/app/vendor/bin/drush"

# Should be able to install drupal
cd drupal10
lando drush si --db-url=mysql://drupal10:drupal10@database/drupal10 -y
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd drupal10
lando destroy -y
lando poweroff
```
