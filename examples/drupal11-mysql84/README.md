# Drupal 11 with MySQL 8.4 Example

This example exists primarily to test the following documentation against MySQL 8.4:

* [Drupal 11 Recipe](https://docs.lando.dev/plugins/drupal)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should initialize the latest Drupal 11 codebase
rm -rf drupal11 && mkdir -p drupal11 && cd drupal11
lando init --source remote --remote-url https://ftp.drupal.org/files/projects/drupal-11.2.x-dev.tar.gz --remote-options="--strip-components 1" --recipe drupal11 --webroot . --name lando-drupal11 --option database=mysql:8.4

# Should start up successfully
cd drupal11
cp -f ../../.lando.upstream.yml .lando.upstream.yml && cat .lando.upstream.yml
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should include recipe defaults in the landofile
cd drupal11
cat .lando.yml | tee >(cat 1>&2) | grep 'php: "8.3"'
cat .lando.yml | grep "drush: ^13"
cat .lando.yml | grep "composer_version: 2-latest"

# Should be running mysql 8.4.x
cd drupal11
lando mysql -V | tee >(cat 1>&2) | grep '8.4.'

# Should return the drupal installation page by default
cd drupal11
lando exec appserver -- curl -L localhost | grep "Drupal 11"

# Should use 8.3 as the default php version
cd drupal11
lando php -v | grep "PHP 8.3"

# Should be running apache 2.4 by default
cd drupal11
lando exec appserver -- apachectl -V | tee >(cat 1>&2) | grep '2.4'
lando exec appserver -- curl -IL localhost | grep Server | tee >(cat 1>&2) | grep '2.4'

# Should be running sqlite 3.46 by default
cd drupal11
lando php -r "print_r(SQLite3::version());" | grep versionString | tee >(cat 1>&2) | grep 3.46.

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
lando composer require drush/drush --no-interaction
lando exec appserver -- which drush | grep "/app/vendor/bin/drush"

# Should be able to install drupal
cd drupal11
lando drush site:install --db-url=mysql://drupal11:drupal11@database/drupal11 -y

# Should be able to enable and access jsonapi
cd drupal11
lando drush en jsonapi -y
lando exec appserver -- curl localhost/jsonapi | grep "action--action"

# Should be able to dump the database with drush
cd drupal11
lando drush sql-dump --result-file=drupal11.sql --extra-dump="--no-tablespaces"
lando mysql -udrupal11 -pdrupal11 drupal11 -e "SELECT COUNT(*) FROM users;" | grep -A 2 COUNT | tee >(cat 1>&2) | grep 2

# Should be able to drop and restore the database with drush
cd drupal11
lando drush sql-drop -y
lando drush sql-cli < drupal11.sql
lando mysql -udrupal11 -pdrupal11 drupal11 -e "SELECT COUNT(*) FROM users;" | grep -A 2 COUNT | tee >(cat 1>&2) | grep 2

# Should be able to export the database with Lando
cd drupal11
rm -f drupal11.sql
lando db-export drupal11.sql

# Should be able to import the database with Lando
cd drupal11
lando db-import drupal11.sql.gz
lando mysql -udrupal11 -pdrupal11 drupal11 -e "SELECT COUNT(*) FROM users;" | grep -A 2 COUNT | tee >(cat 1>&2) | grep 2

# Should be able to drop database tables
cd drupal11
lando drush sql-drop -y

# Should be able to pipe in file through appserver
cd drupal11
lando exec appserver -- 'zcat drupal11.sql.gz | mysql -h database -udrupal11 -pdrupal11 drupal11'
lando mysql -udrupal11 -pdrupal11 drupal11 -e "SELECT COUNT(*) FROM users;" | grep -A 2 COUNT | tee >(cat 1>&2) | grep 2

# Should bootstrap Drupal successfully
cd drupal11
lando drush status | grep "Drupal bootstrap" | tee >(cat 1>&2) | grep "Successful"
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd drupal11
lando destroy -y
lando poweroff
```
