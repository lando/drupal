# Drupal Drush URI Example

This example exists primarily to test the following documentation:

* [Drupal Recipe Configuration](https://docs.lando.dev/config/drupal.html#configuring-drush-uri)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Should initialize the latest Drupal 10 codebase
rm -rf drupal-drush-uri && mkdir -p drupal-drush-uri && cd drupal-drush-uri
lando init --source remote --remote-url https://ftp.drupal.org/files/projects/drupal-10.0.x-dev.tar.gz --remote-options="--strip-components 1" --recipe drupal10 --webroot . --name lando-drupal-drush-uri

# Should start up successfully
cd drupal-drush-uri
cp -f ../../.lando.upstream.yml .lando.upstream.yml && cat .lando.upstream.yml
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should use default drush_uri based on proxy settings
cd drupal-drush-uri
lando exec appserver -- env | grep DRUSH_OPTIONS_URI | grep "https://lando-drupal-drush-uri.lndo.site"

# Should use site-local drush if installed
cd drupal-drush-uri
lando composer require drush/drush
lando exec appserver -- which drush | grep "/app/vendor/bin/drush"

# Should be able to install drupal
cd drupal-drush-uri
lando drush si --db-url=mysql://drupal10:drupal10@database/drupal10 -y

# Should be able to use drush with default uri
cd drupal-drush-uri
lando drush status | grep "Site URI" | grep "https://lando-drupal-drush-uri.lndo.site"
```

## Custom drush_uri test

Now let's test with a custom drush_uri configuration.

```bash
# Should update the .lando.yml file
cd drupal-drush-uri
cat > .lando.yml << EOF
name: lando-drupal-drush-uri
recipe: drupal10
config:
  drush_uri: 'https://custom-uri.lndo.site'
EOF

# Should rebuild with new configuration
cd drupal-drush-uri
lando rebuild -y

# Should use custom drush_uri
cd drupal-drush-uri
lando exec appserver -- env | grep DRUSH_OPTIONS_URI | grep "https://custom-uri.lndo.site"

# Should use site-local drush if installed
cd drupal-drush-uri
lando composer require drush/drush
lando exec appserver -- which drush | grep "/app/vendor/bin/drush"

# Should be able to use drush with custom uri
cd drupal-drush-uri
lando drush status | grep "Site URI" | grep "https://custom-uri.lndo.site"
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd drupal-drush-uri
lando destroy -y
lando poweroff
``` 
