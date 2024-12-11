## {{ UNRELEASED_VERSION }} - [{{ UNRELEASED_DATE }}]({{ UNRELEASED_LINK }})

* Added default config values to the `.lando.yml` file after init.

## v1.12.0 - [January 16, 2025](https://github.com/lando/drupal/releases/tag/v1.12.0)

* Updated globally installed Drush to `v8.5.0`.
* Added docs for setting up [Drupal CMS](https://drupal.org/docs/drupal-cms).
* Updated to [@lando/php@1.7.1](https://github.com/lando/php/releases/tag/v1.7.1).
* Updated to [@lando/mysql@1.5.0](https://github.com/lando/mysql/releases/tag/v1.5.0).

## v1.11.0 - [December 9, 2024](https://github.com/lando/drupal/releases/tag/v1.11.0)

* Optimized for `midcore`
* Updated to [@lando/mariadb@1.6.3](https://github.com/lando/mariadb/releases/tag/v1.6.3).
* Updated to [@lando/mssql@1.4.3](https://github.com/lando/mssql/releases/tag/v1.4.3).
* Updated to [@lando/mysql@1.4.4](https://github.com/lando/mysql/releases/tag/v1.4.4).
* Updated to [@lando/php@1.6.3](https://github.com/lando/php/releases/tag/v1.6.3).
* Updated to [@lando/postgres@1.4.4](https://github.com/lando/postgres/releases/tag/v1.4.4).

## v1.10.2 - [December 6, 2024](https://github.com/lando/drupal/releases/tag/v1.10.2)

* Updated the version index.md to get Docuverse page to build correctly.

## v1.10.1 - [December 4, 2024](https://github.com/lando/drupal/releases/tag/v1.10.1)

* Updated to [@lando/vitepress-theme-default-plus@v1.1.0-beta.24](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.1.0-beta.24).

## v1.10.0 - [December 2, 2024](https://github.com/lando/drupal/releases/tag/v1.10.0)

* Updated to [@lando/leia@1.0.0-beta.4](https://github.com/lando/leia/releases/tag/v1.0.0-beta.4)
* Updated to [@lando/mariadb@1.6.1](https://github.com/lando/mariadb/releases/tag/v1.6.1)
* Updated to [@lando/mssql@1.4.1](https://github.com/lando/mssql/releases/tag/v1.4.1)
* Updated to [@lando/mysql@1.4.1](https://github.com/lando/mysql/releases/tag/v1.4.1)
* Updated to [@lando/php@1.6.1](https://github.com/lando/php/releases/tag/v1.6.1)
* Updated to [@lando/postgres@1.4.1](https://github.com/lando/postgres/releases/tag/v1.4.1)

## v1.9.2 - [November 4, 2024](https://github.com/lando/drupal/releases/tag/v1.9.2)

* Updated to [@lando/vitepress-theme-default-plus@v1.1.0-beta.18](https://github.com/lando/vitepress-theme-default-plus/releases/tag/v1.1.0-beta.18).

## v1.9.1 - [October 29, 2024](https://github.com/lando/drupal/releases/tag/v1.9.1)

* Released to update critically broken docs

## v1.9.0 - [October 25, 2024](https://github.com/lando/drupal/releases/tag/v1.9.0)

* Updated release process to generate an edge release when stable releases are created.
* Removed unnecessary dependency `@lando/nginx`

## v1.8.0 - [October 18, 2024](https://github.com/lando/drupal/releases/tag/v1.8.0)

* Updated to [@lando/php@1.5.0](https://github.com/lando/php/releases/tag/v1.5.0)

## v1.7.0 - [September 30, 2024](https://github.com/lando/drupal/releases/tag/v1.7.0)

* Updated to [@lando/mariadb@1.5.0](https://github.com/lando/mariadb/releases/tag/v1.5.0)
* Updated to [@lando/mysql@1.5.0](https://github.com/lando/mariadb/releases/tag/v1.3.0)

## v1.6.1 - [September 5, 2024](https://github.com/lando/drupal/releases/tag/v1.6.1)

## Bug Fixes

* Fixed bug causing default `proxy` settings to be clobbered by user specified ones

## Internal

* Updated DevOps to use new `lando exec`
* Updated `ubuntu` test runners to `24.04`

## v1.6.0 - [May 27, 2024](https://github.com/lando/drupal/releases/tag/v1.6.0)

* Use mysql command for MariaDB 10.3.x and below

## v1.5.0 - [May 8, 2024](https://github.com/lando/drupal/releases/tag/v1.5.0)

* Updated mariadb plugin and added tooling support for the mariadb executable. [#51](https://github.com/lando/mariadb/issues/51
* Added support for Drupal 11. [#109](https://github.com/lando/drupal/pull/109)

## v1.4.0 - [April 16, 2024](https://github.com/lando/drupal/releases/tag/v1.4.0)

* Updated version of Composer used with Drupal 9 and 10 to `2-latest`. [#31](https://github.com/lando/drupal/issues/31)

## v1.3.0 - [March 8, 2024](https://github.com/lando/drupal/releases/tag/v1.3.0)

* Updated to latest database services.

## v1.2.0 - [February 26, 2024](https://github.com/lando/drupal/releases/tag/v1.2.0)

### Internal

* Updated to `@lando/php@1.2.0`
* Config tests.

## v1.1.0 - [February 20, 2024](https://github.com/lando/drupal/releases/tag/v1.1.0)

* Included ability to specify `database: mssql` in the `config` section to maintain backwards compatibility. [@lando/mssql#31](https://github.com/lando/mssql/issues/31)

## v1.0.1 - [January 15, 2024](https://github.com/lando/drupal/releases/tag/v1.0.1)

* Fixed issue with missing `semver` dependency.

## v1.0.0 - [December 7, 2023](https://github.com/lando/drupal/releases/tag/v1.0.0)

* Dialed fully for `lando update`

## v0.12.0 - [October 4, 2023](https://github.com/lando/drupal/releases/tag/v0.12.0)

* Fixed issue with compiled assets on Drupal 10.1 [#71](https://github.com/lando/drupal/issues/71)


## v0.11.0 - [July 3, 2023](https://github.com/lando/drupal/releases/tag/v0.11.0)
  * Removed bundle-dependencies and version-bump-prompt from plugin.
  * Updated package to use prepare-release-action.
  * Updated documentation to reflect new release process.
  * Added tests for using nginx [#58](https://github.com/lando/drupal/pull/58)

## v0.10.0 - [May 17, 2023](https://github.com/lando/drupal/releases/tag/v0.10.0)

* Fixed issue with Drupal lazy aggregation and added test. [#56](https://github.com/lando/drupal/issues/56)

## v0.9.0 - [May 11, 2023](https://github.com/lando/drupal/releases/tag/v0.9.0)

* Added support for Drupal lazy aggregation [#48](https://github.com/lando/drupal/pull/48)

## v0.8.0 - [February 24, 2022](https://github.com/lando/drupal/releases/tag/v0.8.0)

* Added compatibility for MySQL 8.x [lando/lando#1426](https://github.com/lando/lando/issues/1462)

## v0.7.0 - [December 12, 2022](https://github.com/lando/drupal/releases/tag/v0.7.0)

* Added bundle-dependencies to release process.
* Fixed bug in plugin dogfooding test.

## v0.6.0 - [September 8, 2022](https://github.com/lando/drupal/releases/tag/v0.6.0)

* HYPERDRIVED

## v0.5.3 - [March 2, 2022](https://github.com/lando/drupal/releases/tag/v0.5.2)

Lando is **free** and **open source** software that relies on contributions from developers like you! If you like Lando then help us spend more time making, updating and supporting it by [contributing](https://github.com/sponsors/lando).

* Set Drupal 7 to use php 7.4 [https://github.com/lando/drupal/issues/9](#9)
* Fix linting issues

## v0.5.2 - [March 2, 2022](https://github.com/lando/drupal/releases/tag/v0.5.2)

Lando is **free** and **open source** software that relies on contributions from developers like you! If you like Lando then help us spend more time making, updating and supporting it by [contributing](https://github.com/sponsors/lando).

* Set Drupal 7 to use php 7.4 [https://github.com/lando/drupal/issues/9](#9)

## v0.5.1 - [February 2, 2022](https://github.com/lando/drupal/releases/tag/v0.5.1)

Lando is **free** and **open source** software that relies on contributions from developers like you! If you like Lando then help us spend more time making, updating and supporting it by [contributing](https://github.com/sponsors/lando).

* Add in Drupal 10 recipe [https://github.com/lando/drupal/issues/4](#4)
* Set Drupal 9 to use Drush 11 [https://github.com/lando/drupal/issues/6](#6)

## v0.5.0 - [January 11, 2022](https://github.com/lando/drupal/releases/tag/v0.5.0)

Lando is **free** and **open source** software that relies on contributions from developers like you! If you like Lando then help us spend more time making, updating and supporting it by [contributing](https://github.com/sponsors/lando).

* Initial Release
