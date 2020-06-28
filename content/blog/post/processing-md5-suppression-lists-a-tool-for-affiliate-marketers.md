---
title: Processing MD5 Suppression Lists - a Tool for Affiliate Marketers
description: A tool for processing MD5 suppression lists.
date: 2011-11-28
tags:
  - foss
  - ruby
  - wordpress
---

Affiliate marketers will from time to time have to process what's called an
"[MD5 suppression list][1]". In brief, an MD5 suppression list is a list of
email addresses which a marketer must remove from her mailing lists, in order
to comply with the [CAN SPAM Act of 2003][2], and respect the rights of
individuals to opt-out of email marketing campaigns.

An MD5 suppression list is simply a file containing a long list of [MD5
hashes][3] of unsubscribers' email addresses, the hashing being a security
measure designed to prevent unscrupulous marketers from using suppression lists
themselves as sources for obtaining more email addresses to use in email
marketing campaigns.  

To use a suppression list, an email marketer must compare each hash in the
suppression list against an MD5 hash of each contact in her mailing lists. A
matched pair of MD5 hashes indicates that an email address has been found in
the suppression list, and thus must be removed from the marketer's email
lists. (The mechanic here, obviously, is similar to how user passwords are
hashed before being stored in a database.)

Recently, at work, I had to process a 2 gigabyte suppression list (of about 62
million rows) from Groupon. To my surprise, I didn't find any readily available
tools to do this, and thus, rolled my own.

<!--more-->

The tool is (unimaginatively) called `md5-suppression-list-match`, and [is
available on Github][4]. It's a relatively small (&lt;300 lines) Ruby script
that is designed to run on Unix/Linux systems, and can process lists of any
size (tested up to 2G) using a SQLite database. For faster performance (and
smaller lists), it can also be configured to run entirely in RAM as an
in-memory hash.

More detailed instructions are available in the [README][5].

If you find the tool useful, have a feature request, or otherwise have
feedback, feel free to let me know in the comments.

Update: 3 Dec 2011
------------------
After using this tool for a few days, I was able to improve its performance
dramatically by solving the problem via a different algorithm. As such, I've
pushed major revisions to the script, which are currently available at the same
URL on github.

The new tool is **dramatically** faster - lists that used to take me 10+ hours
to process now get processed in around 20 minutes. It's also significantly
simpler to configure, and will now automatically produce both a whitelist and a
blacklist with each run.

[1]: http://en.wikipedia.org/wiki/Suppression_list
[2]: http://en.wikipedia.org/wiki/CAN-SPAM_Act_of_2003
[3]: http://en.wikipedia.org/wiki/Md5
[4]: https://github.com/chrisallenlane/md5-suppression-list-match
[5]: https://github.com/chrisallenlane/md5-suppression-list-match/blob/master/README.md
