# Drupal Nginx Example

This example exists primarily to test the following documentation:

* [Drupal Recipe](https://docs.lando.dev/drupal/config.html)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should serve from web folder
lando exec appserver -- curl -L appserver_nginx | grep "NGINX"

# Should run using nginx if specified
lando exec appserver -- curl -IL appserver_nginx | grep Server | grep nginx

# Should use nginx 1.25 by default
lando nginx -v 2>&1 | grep "nginx version" | grep "nginx/1.25"

# Should use the php version specified by the user eg 7.4
lando php -v | grep "PHP 7.4"

# Should load the correct default nginx config
lando exec appserver_nginx -- cat /opt/bitnami/nginx/conf/vhosts/lando.conf | grep "LANDODRUPALNGINXCONF"
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
