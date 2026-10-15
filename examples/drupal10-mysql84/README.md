# Drupal 10 w/MySQL 8.4 Example

This example exists primarily to test the following documentation:

* [Drupal 10 Recipe](https://docs.lando.dev/config/drupal10.html)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should initialize the latest Drupal 10 codebase
rm -rf mysql84 && mkdir -p mysql84 && cd mysql84
lando init --source remote --remote-url https://ftp.drupal.org/files/projects/drupal-10.0.x-dev.tar.gz --remote-options="--strip-components 1" --recipe drupal10 --webroot . --name lando-drupal10-mysql84 --option database=mysql:8

# Should start up successfully
cd mysql84
cp -f ../../.lando.upstream.yml .lando.upstream.yml && cat .lando.upstream.yml
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should return the drupal installation page by default
cd mysql84
lando exec appserver -- curl -L localhost | grep "Drupal 10"

# Should use 8.1 as the default php version
cd mysql84
lando php -v | grep "PHP 8.1"

# Should be running apache 2.4 by default
cd mysql84
lando exec appserver -- apachectl -V | grep 2.4
lando exec appserver -- curl -IL localhost | grep Server | grep 2.4

# Should be running mysql 8.4.x via the mysql:8 alias
cd mysql84
lando mysql -V | grep '8.4.'

# Should use the default mysql8 config file
cd mysql84
lando exec database -- cat /opt/bitnami/mysql/conf/my_custom.cnf | grep "LANDODRUPALMYSQL8CNF"

# Should use binlog_expire_logs_seconds instead of the removed expire_logs_days
cd mysql84
lando mysql -u root -e "show variables;" | grep binlog_expire_logs_seconds | grep 864000

# Should be running sqlite 3.40 by default
cd mysql84
lando php -r "print_r(SQLite3::version());" | grep versionString | grep 3.40

# Should not enable xdebug by default
cd mysql84
lando php -m | grep xdebug || echo $? | grep 1

# Should use the default database connection info
cd mysql84
lando mysql -udrupal10 -pdrupal10 drupal10 -e quit

# Should use site-local drush if installed
cd mysql84
lando composer require drush/drush
lando exec appserver -- which drush | grep "/app/vendor/bin/drush"

# Should be able to install drupal
cd mysql84
lando drush si --db-url=mysql://drupal10:drupal10@database/drupal10 -y
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd mysql84
lando destroy -y
lando poweroff
```
