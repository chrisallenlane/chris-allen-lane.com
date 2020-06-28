---
title: "Video: Deploying Wordpress on Multiple Load-Balanced Servers on Amazon EC2"
description: A presentation I gave on deploying Wordpress across load-balanced servers.
date: 2012-07-12
tags:
  - aws
  - video
  - wordpress
---

I gave this brief talk about deploying a high-traffic Wordpress site on EC2 in
Fall 2011 at the [Gainesville Hackerspace][]. The content discussed here can be
considered a follow-up to [my post on solving a file-synchronization issue when
deploying Wordpress across multiple servers on EC2][post].

<!--more-->

{{< youtube zEkR5NbyZ8I >}}

As an addendum to the video:

While I no longer work with the employer whose application I was describing as
"done the most wrong way possible", I'm happy to say that I was able to talk
them into letting me burn it down and re-implement it from scratch.

Interestingly, when I rebuilt the application properly, it was so dramatically
more efficient that the multiple server deployment system described here was no
longer even necessary. (What at one point required 3 X-Large servers was able
to be scaled back comfortably to a single Large server.)

With that said, for the time we needed it, this deployment system served our
needs admirably.

[Gainesville Hackerspace]: https://www.gainesvillehackerspace.org/
[post]: /blog/post/deploying-wordpress-syncing-servers-in-a-multi-server-wordpress-installation
