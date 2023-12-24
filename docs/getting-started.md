---
description: Learn how to get started with the Lando Drupal recipe.
---

# Getting Started

## Requirements

Before you get started with this recipe we assume that you have:

1. [Installed Lando](https://docs.lando.dev/basics/installation.html) and gotten familiar with [its basics](https://docs.lando.dev/basics/)
2. [Initialized](https://docs.lando.dev/basics/init.html) a [Landofile](https://docs.lando.dev/config/lando.html) for your codebase for use with this recipe
3. Read about the various [services](https://docs.lando.dev/config/services.html), [tooling](https://docs.lando.dev/config/tooling.html), [events](https://docs.lando.dev/config/events.html) and [routing](https://docs.lando.dev/config/proxy.html) Lando offers.

## Quick Start

Try out the relevant commands below to spin up a new Landoified vanilla Drupal site.

:::: code-group DRUPAL
::: code-group-item DRUPAL 9

```bash:no-line-numbers
# Initialize a drupal9 recipe
mkdir my-first-drupal9-app \
  && cd my-first-drupal9-app \
  && lando init \
    --source cwd \
    --recipe drupal9 \
    --webroot web \
    --name my-first-drupal9-app
    
# Create latest drupal9 project via composer
lando composer create-project drupal/recommended-project:9.x tmp && cp -r tmp/. . && rm -rf tmp

# Composer can timeout on install for some machines, if that happens, run the following command and then re-run the previous lando composer command:
# lando composer config --global process-timeout 2000

# Start it up
lando start

# Install a site local drush
lando composer require drush/drush

# Install drupal
lando drush site:install --db-url=mysql://drupal9:drupal9@database/drupal9 -y

# List information about this app
lando info
```

:::
<CodeGroupItem title="DRUPAL 10" active>

```bash:no-line-numbers
# Initialize a drupal10 recipe
mkdir my-first-drupal10-app \
  && cd my-first-drupal10-app \
  && lando init \
    --source cwd \
    --recipe drupal10 \
    --webroot web \
    --name my-first-drupal10-app
    
# Create latest drupal10 project via composer
lando composer create-project drupal/recommended-project:10.0.x-dev@dev tmp && cp -r tmp/. . && rm -rf tmp

# Composer can timeout on install for some machines, if that happens, run the following command and then re-run the previous lando composer command:
# lando composer config --global process-timeout 2000

# Start it up
lando start

# Install a site local drush
lando composer require drush/drush

# Install drupal
lando drush site:install --db-url=mysql://drupal10:drupal10@database/drupal10 -y

# List information about this app
lando info
```

</CodeGroupItem>
::::

Or Landoify an existing Drupal site:

```bash:no-line-numbers
cd /path/to/my/repo
lando init --source cwd --recipe drupal9
```

If you are interested in EOL Drupal versions then check out our [legacy docs](./legacy-versions.md).

## Custom Installation

This plugin is included with Lando by default. That means if you have Lando version `3.0.8` or higher then this plugin is already installed!

However if you would like to manually install the plugin, update it to the bleeding edge or install a particular version then use the below. Note that this installation method requires Lando `3.5.0+`.

:::: code-group
::: code-group-item LANDO 3.21+
```bash:no-line-numbers
lando plugin-add @lando/drupal
```
:::
::: code-group-item HYPERDRIVE
```bash:no-line-numbers
# @TODO
# @NOTE: This doesn't actaully work yet
hyperdrive install @lando/drupal
```
:::
::: code-group-item DOCKER
```bash:no-line-numbers
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
# NOTE: Modify the "npm install @lando/drupal" line to install a particular version eg
# npm install @lando/drupal@0.5.2
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:14-alpine sh -c \
  "npm init -y \
  && npm install @lando/drupal --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && npm install --production --cwd /tmp/node_modules/@lando/drupal \
  && mkdir -p /plugins/@lando \
  && mv --force /tmp/node_modules/@lando/drupal /plugins/@lando/drupal"

# Rebuild the plugin cache
lando --clear
```
:::
::::

You should be able to verify the plugin is installed by running `lando config --path plugins` and checking for `@lando/drupal`. This command will also show you _where_ the plugin is being loaded from.
