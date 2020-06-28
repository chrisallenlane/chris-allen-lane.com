---
title: Cross-Site Scripting with TinyURL for Lulz and Profit
description: Masquerading Cross-site Scripting (XSS) attacks using TinyUrl.
date: 2010-02-10
tags:
  - security
---

[TinyURL][] is a service that transforms long, inconvenient URLs (like
http://www.the-medium-and-the-messenger.com) into short, convenient ones
(like http://tinyurl.com/yb6p4oz). Services like TinyURL are frequently used
when posting links into Twitter, where character space is at a premium.

Like so many other web technologies, though, TinyURL can be abused for
nefarious purposes. Specifically, it can be used for disguising payloads used
in Cross-Site Scripting (XSS) attacks.

<!--more-->

In brief, _Cross-Site Scripting_ is an attack methodology wherein malicious
users of a web site may target other users of the same site, by serving them
links that contain malicious payloads. XSS has been written about extensively
before (and I have no desire to re-hash the discussion), but for a quick primer
[read the Wikipedia article on the topic][xss].

For our purposes right now, however, we only need to know one thing about XSS:
one of the principal ways to carry out an XSS attack is to send a victim (via
whatever channels are available) a URL containing a malicious payload.  The
purpose of the payload is typically to inject one of the following into a
target page:

1. JavaScript
2. An iframe
3. An `<img>` tag, which may or may not be sourced to an actual image

To see XSS in action, click on the "malicious" link below. (The effect is
harmless enough - I promise!):

`http://www.chris-allen-lane.com/demos/security/xss.php?message=<script>alert('XSS!');</script>`

_(Note: the above demonstration will not actually work for users of [Google
Chrome][].  Team Google seems to have built some clever security mechanism into
the browser itself that seals off the vulnerability.  Well done, Google!)_

The above link contains a payload that will execute arbitrary JavaScript in
your browser. In this case, it just prints a pop-up alert as a demonstration.

However, anyone who knows _anything_ about web security will see this attack
coming from a mile away. An experienced web citizen would know never to click
on a link that contains visible `<script>` tags.

By abusing TinyURL however, you can fool even the saaviest user.  Because
TinyURL performs no kind of sanitization or escaping upon the target link, an
obviously malicious link can be disguised to appear benign.  After all, who
would be suspicious of this link?

http://tinyurl.com/yd249k8

Or, worst of all, this:

http://tinyurl.com/253ftf

[Google Chrome]: http://www.google.com/chrome
[tinyurl]: http://tinyurl.com
[xss]: http://en.wikipedia.org/wiki/Cross-site_scripting
