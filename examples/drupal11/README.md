# Drupal 11 Example

This example exists primarily to test the following documentation:

* [Drupal 11 Recipe](https://docs.lando.dev/plugins/drupal)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should initialize the latest Drupal 11 codebase
rm -rf drupal11 && mkdir -p drupal11 && cd drupal11
lando init --source remote --remote-url https://ftp.drupal.org/files/projects/drupal-11.0.x-dev.tar.gz --remote-options="--strip-components 1" --recipe drupal11 --webroot . --name lando-drupal11

# Should start up successfully
cd drupal11
cp -f ../../.lando.upstream.yml .lando.upstream.yml && cat .lando.upstream.yml
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should return the drupal installation page by default
cd drupal11
lando exec appserver -- curl -L localhost | grep "Drupal 11"

# Should use 8.3 as the default php version
cd drupal11
lando php -v | grep "PHP 8.3"

# Should be running apache 2.4 by default
cd drupal11
lando exec appserver -- apachectl -V | grep 2.4
lando exec appserver -- curl -IL localhost | grep Server | grep 2.4

# Should be running mysql 8.0.x by default
cd drupal11
lando mysql -V | grep 8.0

# Should be running sqlite 3.34 by default
cd drupal11
lando php -r "print_r(SQLite3::version());" | grep versionString | grep 3.34

# Should not enable xdebug by default
cd drupal11
lando php -m | grep xdebug || echo $? | grep 1

# Should use the default database connection info
cd drupal11
lando mysql -udrupal11 -pdrupal11 drupal11 -e quit

# Should use a composer version above 2.7.0
cd drupal11
lando composer --version | cut -d " " -f 3 | head -n 1 | awk -v min=2.7.0 -F. '($1 > 2) || ($1 == 2 && $2 > 7) || ($1 == 2 && $2 == 7 && $3 > 0)'

# Should use site-local drush if installed
cd drupal11
lando composer require drush/drush
lando exec appserver -- which drush | grep "/app/vendor/bin/drush"

# Should be able to install drupal
cd drupal11
lando drush si --db-url=mysql://drupal11:drupal11@database/drupal11 -y

# Should be able to enable and access jsonapi
cd drupal11
lando drush en jsonapi -y
lando exec appserver -- curl localhost/jsonapi | grep "action--action"
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd drupal11
lando destroy -y
lando poweroff
```
