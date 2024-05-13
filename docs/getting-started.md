---
description: Learn how to get started with the Lando Drupal recipe.
---

# Getting Started

## Requirements

Before you get started with this recipe we assume that you have:

1. [Installed Lando](https://docs.lando.dev/getting-started/installation.html) and gotten familiar with [its basics](https://docs.lando.dev/cli/)
2. [Initialized](https://docs.lando.dev/cli/init.html) a [Landofile](https://docs.lando.dev/core/v3) for your codebase for use with this recipe
3. Read about the various [services](https://docs.lando.dev/core/v3/services/lando.html), [tooling](https://docs.lando.dev/core/v3/tooling.html), [events](https://docs.lando.dev/core/v3/events.html) and [routing](https://docs.lando.dev/core/v3/proxy.html) Lando offers.

## Quick Start

Try out the relevant commands below to spin up a new Landoified vanilla Drupal site.

::: code-group
```bash:no-line-numbers [DRUPAL 10]
# Initialize a drupal10 recipe
mkdir my-first-drupal10-app \
  && cd my-first-drupal10-app \
  && lando init \
    --source cwd \
    --recipe drupal10 \
    --webroot web \
    --name my-first-drupal10-app
    
# Create latest drupal10 project via composer
lando composer create-project drupal/recommended-project:10.x tmp && cp -r tmp/. . && rm -rf tmp

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

```bash:no-line-numbers [DRUPAL 9]
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

```bash:no-line-numbers [DRUPAL 11.x-dev]
# Initialize a drupal11 recipe
mkdir my-first-drupal11-app \
  && cd my-first-drupal11-app \
  && lando init \
    --source cwd \
    --recipe drupal11 \
    --webroot web \
    --name my-first-drupal11-app
    
# Create latest drupal11 project via composer
lando composer create-project drupal/recommended-project:11.0.x-dev@dev tmp && cp -r tmp/. . && rm -rf tmp

# Composer can timeout on install for some machines, if that happens, run the following command and then re-run the previous lando composer command:
# lando composer config --global process-timeout 2000

# Start it up
lando start

# Install a site local drush
lando composer require drush/drush

# Install drupal
lando drush site:install --db-url=mysql://drupal11:drupal11@database/drupal11 -y

# List information about this app
lando info
```
:::

Or Landoify an existing Drupal site:

```bash:no-line-numbers
cd /path/to/my/repo
lando init --source cwd --recipe drupal9
```

If you are interested in EOL Drupal versions then check out our legacy docs:
 - Drupal 8 (./legacy/drupal-8).
 - Drupal 7 (./legacy/drupal-7).
 - Drupal 6 (./legacy/drupal-6).

