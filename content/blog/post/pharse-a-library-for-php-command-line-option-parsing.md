---
title: "Pharse: a Library for PHP Command-line Option Parsing"
description: "Pharse: a command-line option-parser written in PHP."
date: 2012-03-31
tags:
  - php
  - foss
---

I enjoy using PHP for writing command-line applications. PHP's power and
flexibility make it ideal, in my opinion, for writing both full-featured
applications, as well as for use as a "glue language" for automating various
system-administrative tasks. There's one area where PHP has traditionally
fallen short in my mind, however - it lacks a good command-line option parser.

<!--more-->

While hacking around in Ruby a while ago, I discovered the [Trollop gem][1],
which I consider to be an absolutely first-class command-line option parser. A
few nights ago, I hacked around for a few hours, trying to port its
functionality over to PHP. The result is _Pharse_ - a lightweight command-line
option parsing library for PHP. [Pharse is available for free download and use
on Github][2].

Pharse is designed to be easy to use and configure. To use the library, simply
import its base file into your application. From there, options may be
specified as an associative array:

```php
<?php
 
# specify some options
$options = array(
'user_name'    => array(
  'description' => 'Your username',
  'default'     => 'admin',
  'type'        => 'string',
  'required'    => true,
  'short'       => 'u',
  ),
'password'      => array(
  'description' => 'Your password',
  'default'     => 'sexsecretlovegod',
  'type'        => 'string',
  'required'    => true,
  ),
);
 
# You may specify a program banner thusly:
$banner = "This program logs you in to the Gibson.";
Pharse::setBanner($banner);
 
# After you've configured Pharse, run it like so:
$opts = Pharse::options($options);
 
?>
```

Pharse will perform basic validation and type-checking on the inputs. Provided
that the user inputs satisfied the specified constraints, they will be
accessible via (in this case) the `$opts` array. It will also create handy
booleans for determining whether or not a certain (un-required) variable was
provided, as in `$opts['user_name_given']`. This functionality is better
explained in the [project documentation][3] and [example][4].

Notes
-----
There are two things you should know before you start using Pharse in your own
projects.

First: I hacked out Pharse quickly for casual use on personal projects.  I have
not yet taken the time to write formal unit tests for it. With that said, be
sure to thoroughly kick its tires before choosing to use it in a production
environment.

Second: For my own purposes, I don't need sub-command support (`git push origin
master`, etc), so unlike Trollop, Pharse does not currently support
subcommands. If my own needs change, I may add this functionality in the
future.

[1]: http://trollop.rubyforge.org/
[2]: https://github.com/chrisallenlane/Pharse
[3]: https://github.com/chrisallenlane/Pharse/blob/master/README.md
[4]: https://github.com/chrisallenlane/Pharse/blob/master/example.php

