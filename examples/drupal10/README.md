# Drupal 10 Example

This example exists primarily to test the following documentation:

* [Drupal 10 Recipe](https://docs.lando.dev/config/drupal10.html)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should initialize the latest Drupal 10 codebase
rm -rf drupal10 && mkdir -p drupal10 && cd drupal10
lando init --source remote --remote-url https://ftp.drupal.org/files/projects/drupal-10.0.x-dev.tar.gz --remote-options="--strip-components 1" --recipe drupal10 --webroot . --name lando-drupal10

# Should start up successfully
cd drupal10
cp -f ../../.lando.upstream.yml .lando.upstream.yml && cat .lando.upstream.yml
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should return the drupal installation page by default
cd drupal10
lando exec appserver -- curl -L localhost | grep "Drupal 10"

# Should use 8.1 as the default php version
cd drupal10
lando php -v | grep "PHP 8.1"

# Should be running apache 2.4 by default
cd drupal10
lando exec appserver -- apachectl -V | grep 2.4
lando exec appserver -- curl -IL localhost | grep Server | grep 2.4

# Should be running mysql 5.7 by default
cd drupal10
lando mysql -V | grep 5.7

# Should be running sqlite 3.40 by default
cd drupal10
lando php -r "print_r(SQLite3::version());" | grep versionString | grep 3.40

# Should not enable xdebug by default
cd drupal10
lando php -m | grep xdebug || echo $? | grep 1

# Should use the default database connection info
cd drupal10
lando mysql -udrupal10 -pdrupal10 drupal10 -e quit

# Should use a composer version above 2.3.6
cd drupal10
lando composer --version | cut -d " " -f 3 | head -n 1 | awk -v min=2.3.6 -F. '($1 > 2) || ($1 == 2 && $2 > 3) || ($1 == 2 && $2 == 3 && $3 > 6)'

# Should use site-local drush if installed
cd drupal10
lando composer require drush/drush
lando exec appserver -- which drush | grep "/app/vendor/bin/drush"

# Should be able to install drupal
cd drupal10
lando drush si --db-url=mysql://drupal10:drupal10@database/drupal10 -y

# Should use default drush_uri based on proxy settings
cd drupal10
lando drush uli --no-browser | tee >(cat 1>&2) | grep "lando-drupal10.lndo.site"

# Should be able to enable and access jsonapi
cd drupal10
lando drush en jsonapi -y
lando exec appserver -- curl localhost/jsonapi | grep "action--action"
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd drupal10
lando destroy -y
lando poweroff
```
