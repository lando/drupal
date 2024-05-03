Drupal MariaDB Example
======================

This example exists primarily to test the following documentation:

* [Drupal Recipe](https://docs.devwithlando.io/tutorials/drupal.html)

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
lando ssh -s appserver -c "curl -L localhost" | grep "MariaDB"

# Should use 8.3 as the default php version
lando php -v | grep "PHP 8.3"

# Should use composer 2.7.4
lando composer -V | grep 2.7.4

# Should be running apache 2.4 by default
lando ssh -s appserver -c "apachectl -V" | grep 2.4
lando ssh -s appserver -c "curl -IL localhost" | grep Server | grep 2.4

# Should be running mariadb 11.3.x
lando mariadb -V | grep 11.3.

# Should not enable xdebug by default
lando php -m | grep xdebug || echo $? | grep 1

# Should use the default database connection info
lando mariadb -udrupal10 -pdrupal10 drupal10 -e quit

# Should use the default mariadb config file
lando ssh -s database -c "cat /opt/bitnami/mariadb/conf/my_custom.cnf" | grep "innodb_lock_wait_timeout = 121"
lando mariadb -e "show variables;" | grep innodb_lock_wait_timeout | grep 121
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
