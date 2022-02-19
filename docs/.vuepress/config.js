const {path} = require('@vuepress/utils');
const yaml = require('js-yaml');
const fs = require('fs');

module.exports = {
  lang: 'en-US',
  title: 'Lando',
  description: 'Lando Drupal Plugin Documentation',
  base: '/drupal/',
  head: [
    ['meta', {name: 'viewport', content: 'width=device-width, initial-scale=1'}],
    ['link', {rel: 'icon', href: '/drupal/favicon.ico', size: 'any'}],
    ['link', {rel: 'icon', href: '/drupal/favicon.svg', type: 'image/svg+xml'}],
    ['link', {rel: 'preconnect', href: '//fonts.googleapis.com'}],
    ['link', {rel: 'preconnect', href: '//fonts.gstatic.com', crossorigin: true}],
    ['link', {rel: 'stylesheet', href: '//fonts.googleapis.com/css2?family=Lexend:wght@500&display=swap'}],
  ],
  theme: '@lando/vuepress-theme-default-plus',
  themeConfig: {
    landoDocs: true,
    logo: '/images/icon.svg',
    docsDir: 'docs',
    docsBranch: 'main',
    repo: 'lando/drupal',
    sidebarHeader: {
      enabled: true,
      title: 'Drupal Plugin',
      icon: '/images/drupalicon.svg',
    },
    sidebar: [
      {
        text: 'Overview',
        link: '/index.md',
      },
      '/getting-started.md',
      '/config.md',
      '/tooling.md',
      '/legacy-versions.md',
      {
        text: 'Guides',
        collapsible: true,
        children: [
          {
            text: 'Landoifying an existing Drupal site',
            link: '/landoify-d7.md',
          },
          {
            text: 'Running Drupal multisite',
            link: '/drupal-multisite.md',
          },
        ],
      },
      '/support.md',
      {text: 'Examples', link: 'https://github.com/lando/drupal/tree/main/examples'},
      {text: 'Release Notes', link: 'https://github.com/lando/drupal/releases'},
      '/development.md',
    ],
  },
};
