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

# Should start up successfully
rm -rf mysql8 && mkdir -p mysql8 && cp .lando.yml mysql8/.lando.yml && cd mysql8
echo -e "\nplugins:\n  \"@lando/drupal/\": ./../../" >> .lando.yml
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should be running mysql 8.0.x
cd mysql8
lando mysql -V | grep 8.0

# Should use the default database connection info
cd mysql8
lando mysql -udrupal10 -pdrupal10 drupal10 -e quit

# Should be able to retrieve Drupal 10 codebase
cd mysql8
lando composer create-project drupal/recommended-project:10.0.x-dev@dev tmp && cp -r tmp/. . && rm -rf tmp

# Should use site-local drush if installed
cd mysql8
lando composer require drush/drush
lando ssh -c "which drush" | grep "/app/vendor/bin/drush"

# Should be able to install drupal
cd mysql8
lando drush si --db-url=mysql://drupal10:drupal10@database/drupal10 -y

# Should show drupal homepage
cd mysql8
lando ssh -s appserver -c "curl -L localhost" | grep "Drush Site-Install"
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
