---
title: Static Code Analysis Using Watchtower
description: Static Code Analysis Using Watchtower - 2600 Magazine reprint.
date: 2015-04-15
tags:
  - 2600
  - foss
  - security
---

The following article was published in _2600_ magazine (Volume 30, Number 2) in
Summer of 2013. It is republished here with permission.

<!--more-->

![2600 Magazine - Volume 30, Number 2][img]

<div class='dark' style='padding:2rem'>

2600 Readers,

I'm writing to introduce watchtower - a [Static Code Analysis][sca] Tool that I
recently published under the GPL license. It's a simple tool - in this age of
automated fuzzers, scanners, and frameworks, I consider watchtower to be a
"dumb" tool for a smart auditor. It is used to locate potentially hazardous
code within a project, and is thus useful for security audits and webapp
incident response.

Watchtower is language-agnostic, written in Ruby, and depends on RubyGems.

It's a _what_ now?
------------------
Watchtower is used for performing _Static Code Analysis_. If you're not
familiar with the term, Static Code Analysis (commonly "SCA") is the analysis
of source code in its written form. (The practice of scanning an application's
source can be contrasted against other types of scans, such a scan against a
running application, for example.) At its core, watchtower simply searches for
the presence of user-specified strings within an application's source, much as
would grep or the "Find" tool that inevitably exists in your preferred
word-processor.

### Why would I do that? ###
There are principally two occasions on which you'd want to grep for strings
within an application, within the security context:

### When performing a security audit on an application's source code ###
Many security vulnerabilities are introduced into applications through very
regular and recognizable programming anti-patterns. For example, when auditing
a PHP application's source, I find that one of the most fruitful strings to
search for is `"$_GET"`. It's both shocking and depressing to see how often
you'll encounter code like this:

```php
<?php
$result = mysql_query("
  SELECT * FROM users WHERE username = '{$_GET['username']}'
  AND `password` = SHA1('{$_GET['password']}')
");
?>
```

Readers of _2600_ will spot the obvious SQL injections, but it seems that many
programmers - remarkably - will not.

### When performing incident response on a compromised web application ###
As another example, compromised web applications frequently contain
easily-recognized signatures as well. One of the most common payloads out there
looks like this:

```php
<?php eval(base64_decode('some-evil-base64-encoded-payload')); ?>
```

(Regular readers may remember `eval(base64_decode(` from StarckTruth's article
_A PHP Rootkit Case Study_ in 29-1.)

Both of these examples demonstrate how, if you know what you're looking for, a
bit of tactical grep-ing can get you a long way while auditing or cleaning up
after a hack. 

If grep is so great, what's the point of watchtower?
--------------------------------------------------------
My problem with grep isn't one of functionality. In fact, if you examine its
source, watchtower is ultimately just a fancy wrapper around grep. My problem
with grep is one of _usability_. I find it to be a bit of a pain to use when
auditing for a few reasons:

1. I struggle to remember its options sometimes, which can be distracting when
   I'm focused on an audit

2. It can be a pain to scan for batches of signatures at once, yet scanning
   ad-hoc makes it easy to overlook important signatures

3. grep can generate a lot of unstructured output (especially when scanning a
   large project), which can be difficult to sift through

Watchtower exists to solve some of these usability problems with grep.

Watchtower, unlike grep, provides several output formats, currently
including plain text, CSV, XML, Markdown, and - most importantly, in my opinion -
HTML. CSV exists primarily to make it possible to import watchtower's data
into a spreadsheet. XML is useful for importing watchtower's output into your
own application. Markdown exists as an intermediary step to compile
watchtower's output into a PDF. (I plan to make it possible for watchtower
to output a PDF directly through `pandoc` in a future release.)

The HTML output format is the most interesting, and is watchtower's primary
feature and use-case. 

So how do I use it?
-------------------
The first thing you need to do (obviously) is [download the project from
github][wt], `cd` into the watchtower directory, and then install the
requisite RubyGems. (You can do this either "the old-fashioned way" or by
running a `bundle install`.) After that's done, run `./watchtower -h` to get a
feel for the program options.

Using watchtower is actually pretty simple: just scan your application, and
then manually review the generated report. For each signature that was
detected, a "Point of Interest" will be outputted to the report. Each Point of
Interest may be marked with one of a few tags: "OK", "Dubious", and "Bad".
Points of Interest may also be "hidden", which moves them out of your way. (The
HTML report uses some clever HTML 5 to save your tags in real-time, thus making
it possible to close your browser without losing any of your work.)

Broadly speaking, the workflow for auditing with watchtower looks something
like this:

1. Specify your signatures (some sensible signatures are loaded by default)

2. Scan your application and output an HTML report

3. Review the report, marking suspicious Points of Interest as "Dubious" or
   "Bad"

4. After you've made your first pass through the report, filter it to display
   only the "Dubious" and "Bad" Points of Interest 

5. Open your preferred editor, and use watchtower to guide you through the
   Points of Interest in more detail

The overarching goal of watchtower is to help you review a large amount of
code quickly. It will identify the potentially problematic parts of your
application to spare you from having to audit the whole thing line-by-line in
an editor. 

Is it extensible?
-----------------
Absolutely. Watchtower allows you to create signature files for any language,
and signatures may be specified as either literal strings or regular
expressions. You may choose which configuration and signature files to load at
run-time, which makes it easy to work on multiple different projects
simultaneously. It's even possible to compile user-defined stylesheets into
your reports, allowing you to override the default styling with your own
branding if you intend to share your reports with clients.

It sounds great! What do I do now?
----------------------------------
Start by checking out [the example report that ships with
watchtower][example]. (Just download that file and open it in a browser.) If
you like what you see, [download the full project][wt], and then twit about it
on your Face-blags and tell your friends! Also remember to email me with bug
reports and feature requests as you have them.

Beyond that, know that watchtower needs a few good contributors. My
experience is principally on the LAMP stack, but there's no reason why
watchtower's utility should be confined to that platform. (There's no reason
why its utility should even be constrained _to the web_, in fact.) With that
said, if you have specialized knowledge of other programming languages or
frameworks - or if you would like to contribute to the languages and frameworks
already accounted for - I encourage you to contact me.

Thanks for reading, and happy hacking.

</div>

Update: 20 Jun 2017
------------------
Since writing this article, I have published <code><a
href='https://github.com/chrisallenlane/drek'>drek</a></code>, which is
`watchtower`'s modern successor. Thus, `watchtower` is now deprecated. If
you're still using it, please give `drek` a try instead. I hope and suspect
that you'll like it better.


[blackarch]: https://blackarch.org/
[drek]:      https://github.com/chrisallenlane/drek
[example]:   https://raw.github.com/chrisallenlane/watchtower/master/examples/report.html
[img]:       /images/watchtower-2600-v30-n2.jpg
[sca]:       http://en.wikipedia.org/wiki/Static_program_analysis
[wt]:        https://github.com/chrisallenlane/watchtower
