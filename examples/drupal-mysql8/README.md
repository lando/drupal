Drupal PHP 8.1 Example
===============

This example exists primarily to test the following documentation:

* [Drupal Recipe](https://docs.devwithlando.io/tutorials/drupal.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Initialize an empty drupal recipe
rm -rf mysql8 && mkdir -p mysql8 && cd mysql8
lando init --source cwd --recipe drupal --webroot app/public --name lando-drupal-mysql8 --option php='8.1' --option database=mysql:8.0.22
cp -f ../../.lando.local.yml .lando.local.yml && cat .lando.local.yml

# Should start up successfully
cd mysql8
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should use 7.4 as the default php version
cd mysql8
lando php -v | grep "PHP 8.1"

# Should be running apache 2.4 by default
cd mysql8
lando ssh -s appserver -c "apachectl -V | grep 2.4"
lando ssh -s appserver -c "curl -IL localhost" | grep Server | grep 2.4

# Should be running mysql 8.0.x by default
cd mysql8
lando mysql -V | grep 8.0

# Should not enable xdebug by default
cd mysql8
lando php -m | grep xdebug || echo $? | grep 1

# Should use the default database connection info
cd mysql8
lando mysql -udrupal -pdrupal drupal -e quit

# Should have artisan available
cd mysql8
lando artisan env
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd mysql8
lando destroy -y
lando poweroff
```
