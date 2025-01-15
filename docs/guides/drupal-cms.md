---
title: Installing Drupal CMS Locally with Lando
description: This guide will walk you through setting up Drupal CMS locally for development using Lando

authors:
  - name: Aaron Feledy
    pic: https://avatars.githubusercontent.com/u/1000487
    link: https://x.com/aaronfeledy
---

# Installing Drupal CMS with Lando

[Drupal CMS](https://drupal.org/drupal-cms) is a new product that puts the power of Drupal into the hands of marketers, designers and content creators. It's built on Drupal 11 and comes with smart defaults and AI-powered features to help you launch your site quickly.

This guide will walk you through setting up Drupal CMS locally for development using Lando.

<details>
<summary>TLDR; Quick Install Commands</summary>

::: code-group

```bash:no-line-numbers [Bash]
# Prompt for app name (or change this line to set it directly)
read -p "Enter your app name [my-drupalcms-app]: " APP_NAME
APP_NAME=${APP_NAME:-my-drupalcms-app}  # Default if no input provided

# Create and initialize project
mkdir $APP_NAME \
  && cd $APP_NAME \
  && lando init \
    --source cwd \
    --recipe drupal11 \
    --webroot web \
    --name $APP_NAME

# Start environment and install Drupal CMS
lando start
lando composer create-project drupal/cms tmp && cp -r tmp/. . && rm -rf tmp
lando drush site:install recipes/drupal_cms_starter --db-url=mysql://drupal11:drupal11@database/drupal11 -y

# Get site URL to login
lando drush user:login /admin/dashboard/welcome --uri="$(lando info -s appserver --path 'urls[1]' | tr -d '\n' | tr -d "'")"
```

```powershell:no-line-numbers [PowerShell]
# Prompt for app name (or change this line to set it directly)
$APP_NAME = Read-Host "Enter your app name [my-drupalcms-app]: "
if ([string]::IsNullOrWhiteSpace($APP_NAME)) { $APP_NAME = "my-drupalcms-app" }

# Create and initialize project
mkdir $APP_NAME; `
cd $APP_NAME; `
lando init `
  --source cwd `
  --recipe drupal11 `
  --webroot web `
  --name $APP_NAME

# Start environment and install Drupal CMS
lando start
lando composer create-project drupal/cms tmp; cp -r tmp/* .; rm -rf tmp
lando drush site:install recipes/drupal_cms_starter --db-url=mysql://drupal11:drupal11@database/drupal11 -y

# Get the login link
lando drush user:login /admin/dashboard/welcome --uri="$(lando info -s appserver --path 'urls[1]' | tr -d '\n' | tr -d "'")"
```

:::

</details>

## Prerequisites

Before starting, you'll need:

1. [Lando installed on your system](https://docs.lando.dev/getting-started/installation.html)
2. Basic familiarity with command line tools
3. A terminal application

## Installation Steps

1. **Create and enter project directory**

First, we'll create a new directory for our Drupal CMS project files and navigate into it:

```bash:no-line-numbers
mkdir my-drupalcms-app
cd my-drupalcms-app
```

2. **Initialize a new Lando app with Drupal 11 recipe**

Now that we have our project directory, let's set up the Lando configuration. We'll use the `lando init` command to create a `.lando.yml` file that will define our development environment. We'll tell it to use the `drupal11` recipe since that's what Drupal CMS is built on, and specify that our web files will live in a 'web' directory:

```bash:no-line-numbers
lando init \
  --source cwd \
  --recipe drupal11 \
  --webroot web \
  --name my-drupalcms-app
```

3. **Start the Lando environment**

With the Lando configuration in place, start the development environment by running the command below. This 
will take a few minutes the first time as Lando downloads and configures everything needed to host Drupal CMS locally:

```bash:no-line-numbers
lando start
```

4. **Install Project Files via Composer**

Now that the environment is running, we use Composer to download and install the Drupal CMS project files.

```bash:no-line-numbers 
lando composer create-project drupal/cms tmp && cp -r tmp/. . && rm -rf tmp
```

5. **Install Drupal**

With the environment running and the project files in place, we need to configure Drupal to use Lando's database service, create the database, and run Drupal's installation process. Fortunately, Drush makes this easy with its `site:install` command:

```bash:no-line-numbers
lando drush site:install recipes/drupal_cms_starter --db-url=mysql://drupal11:drupal11@database/drupal11 -y
```

## Post-Installation

Now that Drupal CMS is installed and running, it's time to login. We'll use the `lando drush user:login` command to generate a one-time login link:

```bash:no-line-numbers
lando drush user:login /admin/dashboard/welcome --uri="$(lando info -s appserver --path 'urls[1]' | tr -d '\n' | tr -d "'")"
```

2. Start exploring the [Drupal CMS interface](https://new.drupal.org/docs/drupal-cms/get-started/get-to-know-drupal-cms/getting-around-drupal-cms) and its features like:
   - The Dashboard
   - Content management tools
   - Built-in SEO tools
   - [Smart default recipes](https://new.drupal.org/docs/drupal-cms/get-started/get-to-know-drupal-cms/adding-functionality-with-smart-defaults) for common functionality
   - [AI tools](https://new.drupal.org/docs/drupal-cms/get-to-know-drupal-cms/ai-tools-in-drupal-cms) for site administrators and content creators

## Customizing Your Setup

Lando's Drupal plugin offers many configuration options. You can customize:

- PHP version
- Web server (Apache or Nginx)
- Database backend (MySQL, MariaDB, or PostgreSQL)
- Composer version
- And more

For detailed configuration options, see the [Lando Drupal Plugin Configuration Documentation](https://docs.lando.dev/plugins/drupal/config.html).

## Starting and Stopping

- To stop your local environment: `lando stop`
- To start it again: `lando start`
- To rebuild the environment: `lando rebuild`

## Next Steps

Now that you have Drupal CMS running locally, you can:

1. [Get familiar with the Drupal CMS features and interface](https://new.drupal.org/docs/drupal-cms/get-started/get-to-know-drupal-cms)

## Troubleshooting

If you encounter issues during installation:

- Try running `lando rebuild -y` to rebuild your app with the latest configuration
- Check Lando's [troubleshooting guide](https://docs.lando.dev/help/troubleshooting.html)
- Join the [Lando Slack](https://www.launchpass.com/devwithlando) for community support

Remember to check the [Drupal CMS documentation](https://drupal.org/docs/drupal-cms) for detailed information about working with Drupal CMS.
