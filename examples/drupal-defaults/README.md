# Drupal Defaults Example

This example exists primarily to test the following documentation:

* [Drupal Recipe](https://docs.lando.dev/drupal/config.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should serve from app root by default
lando exec appserver -- curl -L localhost | grep "DEFAULTS"

# Should use 8.1 as the default php version
lando php -v | grep "PHP 8.1"

# Should be running apache 2.4 by default
lando exec appserver -- apachectl -V | grep 2.4
lando exec appserver -- curl -IL localhost | grep Server | grep 2.4

# Should be running mysql 5.7 by default
lando mysql -V | grep 5.7

# Should not enable xdebug by default
lando php -m | grep xdebug || echo $? | grep 1

# Should use the default database connection info
lando mysql drupal10 -e quit

# Should use composer 2 by default
lando exec appserver -- /bin/sh -c 'NO_COLOR=1 composer -V' | grep "Composer version 2."

# Should use the correct default config files
lando exec appserver -- cat /usr/local/etc/php/conf.d/zzz-lando-my-custom.ini | grep "; LANDODRUPALPHPINI"
lando exec appserver -- curl -L http://localhost/info.php | grep max_execution_time | grep 91
lando exec database -- cat /opt/bitnami/mysql/conf/my_custom.cnf | grep "LANDODRUPALMYSQLCNF"
lando mysql -u root -e "show variables;" | grep innodb_lock_wait_timeout | grep 121
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
