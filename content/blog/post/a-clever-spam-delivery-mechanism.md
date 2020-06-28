---
title: A Clever Spam Delivery Mechanism
description: An interesting spam vector I discovered in the wild.
date: 2012-09-15
tags:
  - security
  - wordpress
---

This week a client forwarded me a spam email he received that I thought was
interesting. It is reproduced below, with sensitive information and spam links
redacted out:

<!--more-->

{{< gist chrisallenlane 3729849 >}}

The spammers were seemingly spoofing the email address of my client while
making a malformed shipping request against a web service on the
`www.jal.co.jp` domain. When the web service received the malformed request, it
sent an error message back to my client's email address, the content of which
contained links to a pharma site.

I think this is a really clever tactic, because the spam messages benefit from
the strength of the legitimate `www.jal.co.jp` domain, and are thus less likely
to be blocked by spam filters.
