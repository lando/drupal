---
title: Installation
description: How to install the Lando Drupal Plugin.
---

# Installation

If you are using Lando 3 then its *highly likely* you already have this plugin as its included by default in most installation pathways. You can verify this by running:

```sh
lando version --component @lando/drupal
```

However if you would like to manually install the plugin, update it to the bleeding edge or install a particular version then use the below.

::: code-group
```sh [lando 3.21+]
lando plugin-add @lando/drupal
```

```sh [hyperdrive]
# @NOTE: This doesn't actaully work yet
hyperdrive install @lando/drupal
```

```sh [docker]
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
# NOTE: Modify the "npm install @lando/drupal" line to install a particular version eg
# npm install @lando/drupal@0.5.2
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:20-alpine sh -c \
  "npm init -y \
  && npm install @lando/drupal --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && npm install --production --cwd /tmp/node_modules/@lando/drupal \
  && mkdir -p /plugins/@lando \
  && mv --force /tmp/node_modules/@lando/drupal /plugins/@lando/drupal"

# Rebuild the plugin cache
lando --clear
```
:::

You should be able to verify the plugin is installed by running `lando config --path plugins` and checking for `@lando/drupal`. This command will also show you _where_ the plugin is being loaded from.
