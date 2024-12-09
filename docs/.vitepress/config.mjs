import {createRequire} from 'module';

import {defineConfig} from '@lando/vitepress-theme-default-plus/config';

const require = createRequire(import.meta.url);

const {name, version} = require('../../package.json');
const landoPlugin = name.replace('@lando/', '');

export default defineConfig({
  title: 'Lando Drupal Plugin',
  description: 'The offical Lando plugin for Drupal.',
  landoDocs: 3,
  landoPlugin,
  version,
  head: [
    ['meta', {name: 'viewport', content: 'width=device-width, initial-scale=1'}],
    ['link', {rel: 'icon', href: '/drupal/favicon.ico', size: 'any'}],
    ['link', {rel: 'icon', href: '/drupal/favicon.svg', type: 'image/svg+xml'}],
  ],
  themeConfig: {
    multiVersionBuild: {
      satisfies: '>=1.10.0',
    },
    sidebar: sidebar(),
  },
});

function sidebar() {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        {text: 'Introduction', link: '/'},
        {text: 'Installation', link: '/install'},
        {text: 'Getting Started', link: '/getting-started'},
        {text: 'Configuration', link: '/config'},
        {text: 'Tooling', link: '/tooling'},
      ],
    },
    {
      text: 'Legacy Versions',
      collapsed: true,
      items: [
        {text: 'Drupal 8', link: '/legacy/drupal-8'},
        {text: 'Drupal 7', link: '/legacy/drupal-7'},
        {text: 'Drupal 6', link: '/legacy/drupal-6'},
      ],
    },
    {
      text: 'Contribution',
      collapsed: false,
      items: [
        {text: 'Development', link: '/development'},
        {text: 'Team', link: '/team'},
      ],
    },
    {
      text: 'Help & Support',
      collapsed: false,
      items: [
        {text: 'GitHub', link: 'https://github.com/lando/drupal/issues/new/choose'},
        {text: 'Slack', link: 'https://www.launchpass.com/devwithlando'},
        {text: 'Contact Us', link: '/support'},
        {text: 'Examples', link: 'https://github.com/lando/drupal/tree/main/examples'},
      ],
    },
    {text: 'Guides', link: '/guides', activeMatch: '/guides'},
  ];
};
