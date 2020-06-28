---
title: Making Wordpress Domain-agnostic
description: Notes on making Wordpress function across multiple domains.
date: 2011-04-16
tags:
  - php
  - wordpress
---

I like Wordpress a lot. It's one of my favorite open-source projects, and I use
it often for both my professional and personal projects. It's been my go-to web
development framework for a number of years now.

There's one thing I don't like about Wordpress, though: the domain to which a
Wordpress site is deployed is saved as a setting in its database. I don't think
that was a good design decision, because it makes it painful to move a
Wordpress site from one domain to another. This shortcoming is especially
evident if you're trying to develop a Wordpress site on one domain, but would
like to deploy to another. (For example, I always set up my local sandbox such
that the WIP lives at `example.dev`, while deployments are pushed to
`example.com`). I really wish Wordpress had been designed to path against its
own document root, much like MediaWiki (another great piece of web software).

A while ago, though, I came up with a little hack to make Wordpress do exactly
that. <!--more--> If you read the Wordpress documentation, it turns out that
the settings stored in the Wordpress database can be overridden by defining
these two constants:

[`WP_SITEURL`][1]
<br>[`WP_HOME`][2]

You can easily set those values dynamically like this:

```php
/** Make sandbox development a little easier */
define('WP_HOME',       "http://{$_SERVER['SERVER_NAME']}/");
define('WP_SITEURL',    "http://{$_SERVER['SERVER_NAME']}/");
```

If you add those lines somewhere to your `wp-config.php` file, you no longer
have to worry about updating your database when you're developing on one domain
and deploying to another. It can really make your life a lot easier when you're
doing Wordpress development.

[1]: http://codex.wordpress.org/Editing_wp-config.php#WordPress_address_.28URL.29
[2]: http://codex.wordpress.org/Editing_wp-config.php#Blog_address_.28URL.29
