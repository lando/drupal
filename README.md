# Drupal Lando Plugin

This is the _official_ [Lando](https://lando.dev) plugin for [Drupal](https://www.drupal.org/). When installed it...

* Allows users to run `drupal` cms
* Allows users to configure `php` version from `5.3` all the way to `8.3`
* Allows users to configure `webroot`
* Allows users to configure web server to (`apache` or `nginx`)
* Allows users to configure database backend to (`mariadb`, `mysql`, or `postgres`)
* Allows users to configure `composer`
* Allows users to run `drush` commands
* Allows users to configure `xdebug`

Of course, once a user is running their Drupal project with Lando they can take advantage of [all the other awesome development features](https://docs.lando.dev) Lando provides.

## Basic Usage

Add a `drupal9` recipe to your Landofile

```yaml
name: Drupal 9
recipe: drupal9
```

For more info you should check out the [docs](https://docs.lando.dev/drupal):

* [Getting Started](https://docs.lando.dev/drupal/getting-started.html)
* [Configuration](https://docs.lando.dev/drupal/config.html)
* [Tooling](https://docs.lando.dev/drupal/tooling.html)
* [Examples](https://github.com/lando/drupal/tree/main/examples)
* [Development](https://docs.lando.dev/drupal/development.html)

## Installation

```bash
# With npm
npm install @lando/drupal

# With yarn
yarn add @lando/drupal
```

## Issues, Questions and Support

If you have a question or would like some community support we recommend you [join us on Slack](https://launchpass.com/devwithlando). Note that this is the Slack community for [Lando](https://lando.dev) but we are more than happy to help with this module as well!

If you'd like to report a bug or submit a feature request then please [use the issue queue](https://github.com/lando/drupal/issues/new/choose) in this repo.

## Changelog

We try to log all changes big and small in both [THE CHANGELOG](https://github.com/lando/drupal/blob/main/CHANGELOG.md) and the [release notes](https://github.com/lando/drupal/releases).


## Development

* Requires [Node 14+](https://nodejs.org/dist/latest-v14.x/)
* Prefers [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)

```bash
git clone https://github.com/lando/drupal.git && cd drupal
yarn install
```

If you don't want to install Node 18 or Yarn for whatever reason you can install [Lando](https://docs.lando.dev/basics/installation.html) and use that:

```bash
git clone https://github.com/lando/drupal.git && cd drupal
# Install deps and get node
lando start

# Run commands
lando node
lando yarn
```

## Testing

```bash
# Lint the code
yarn lint

# Run unit tests
yarn test
```

## Releasing

```bash
yarn release
```


## Maintainers

* [@pirog](https://github.com/pirog)
* [@reynoldsalec](https://github.com/reynoldsalec)

## Contributors

<a href="https://github.com/lando/drupal/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lando/drupal" />
</a>

Made with [contributors-img](https://contrib.rocks).

## Other Resources

* [Important advice](https://www.youtube.com/watch?v=WA4iX5D9Z64)
