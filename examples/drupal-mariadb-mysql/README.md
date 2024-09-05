Drupal MariaDB/MySQL Example
============================

This example exists primarily to test the following documentation:

* [Drupal Recipe](https://docs.devwithlando.io/tutorials/drupal.html)

Versions of MariaDB 10.3.x and lower do not have the mariadb command and must use the mysql executable.

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should start up successfully
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should serve from web folder
lando exec appserver -- curl -L localhost | grep "MySQL"

# Should use 8.3 as the default php version
lando php -v | grep "PHP 8.3"

# Should use composer 2.7.4
lando composer -V | grep 2.7.4

# Should be running apache 2.4 by default
lando exec appserver -- apachectl -V | grep 2.4
lando exec appserver -- curl -IL localhost | grep Server | grep 2.4

# Should be running mariadb 10.3.x
lando mysql -V | grep "MariaDB" | grep 10.3.

# Should not enable xdebug by default
lando php -m | grep xdebug || echo $? | grep 1

# Should use the default database connection info
lando mysql -udrupal10 -pdrupal10 drupal10 -e quit

# Should use the default mariadb config file
lando exec database -- cat /opt/bitnami/mariadb/conf/my_custom.cnf | grep "innodb_lock_wait_timeout = 121"
lando mysql -e "show variables;" | grep innodb_lock_wait_timeout | grep 121
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
