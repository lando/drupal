# Drupal 7 Example

This example exists primarily to test the following documentation:

* [Drupal 7 Recipe](https://docs.devwithlando.io/tutorials/drupal7.html)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should initialize the latest Drupal 7 codebase
rm -rf drupal7 && mkdir -p drupal7 && cd drupal7
lando init --source remote --remote-url https://ftp.drupal.org/files/projects/drupal-7.71.tar.gz --remote-options="--strip-components 1" --recipe drupal7 --webroot . --name lando-drupal7 --option drush="^8"

# Should start up successfully
cd drupal7
cp -f ../../.lando.upstream.yml .lando.upstream.yml && cat .lando.upstream.yml
cp -f ../lando.local.yml .lando.local.yml && cat .lando.local.yml
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should return the drupal installation page by default
cd drupal7
lando exec appserver -- curl -L localhost | grep "Drupal 7"

# Should use 7.4 as the default php version
cd drupal7
lando php -v | grep "PHP 7.4"

# Should be running apache 2.4 by default
cd drupal7
lando exec appserver -- apachectl -V | grep 2.4
lando exec appserver -- curl -IL localhost | grep Server | grep 2.4

# Should be running mysql 5.7 by default
cd drupal7
lando mysql -V | grep 5.7

# Should be using the mysql_native_password authentication plugin by default
cd drupal7
lando mysql -e "SELECT user,plugin FROM mysql.user;" | grep drupal7 | grep mysql_native_password

# Should not enable xdebug by default
cd drupal7
lando php -m | grep xdebug || echo $? | grep 1

# Should use the default database connection info
cd drupal7
lando mysql -udrupal7 -pdrupal7 drupal7 -e quit

# Should use drush 8.5.x by default
cd drupal7
lando drush version | grep 8.5

# Should be able to install drupal
cd drupal7
lando drush si --db-url=mysql://drupal7:drupal7@database/drupal7 -y

# Should have infinite memory for drush
cd drupal7
lando drush eval "phpinfo();" | grep memory_limit | grep -e "-1"

# Should have SIMPLETEST envvars set correctly
cd drupal7
lando exec appserver -- env | grep SIMPLETEST_BASE_URL | grep "https://appserver"
lando exec appserver -- env | grep SIMPLETEST_DB | grep "mysql://drupal7:drupal7@database/drupal7"

# Should have proxy urls present in lando info
cd drupal7
lando info | grep "lando-drupal7.lndo.site"
lando info | grep "another.lando-drupal7.lndo.site"

# Should be able to pipe data directly into lando drush sql-cli
cd drupal7
lando db-export --stdout > dump.sql
lando destroy -y
lando start
lando drush sql-cli < dump.sql
lando mysql drupal7 -e "show tables;" | grep user
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd drupal7
lando destroy -y
lando poweroff
```
