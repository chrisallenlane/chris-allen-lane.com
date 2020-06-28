---
title: Generating Weekly Reports from Git Commit Logs
description: A tool for generating weekly work reports from git commit logs.
date: 2011-12-04
tags:
  - foss
---

As a programmer who works remotely from home, part of my job is to produce
weekly reports detailing what I have accomplished each week. Having found that
attempting to write such a list from memory on a Friday is futile, I developed
a tool to generate these reports automatically from my git commit logs.

<!-- more -->

The script (written in Ruby) is configured by specifying a hash of project
names and git repository locations. When the script is run, it parses each
project's git log for commits I've made since the most recent Monday (or any
other date specified as a command-line parameter), and outputs a log file for
each project.

The script itself is very lightweight and easily modified. It's [available on
github][], and is free to use for all purposes.

[available on github]: https://github.com/chrisallenlane/git-weekly-report
