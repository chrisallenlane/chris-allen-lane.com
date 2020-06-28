---
title: Installing Ubuntu on a Samsung Series 9 Laptop
description: Notes on installing Ubuntu 11.04 on a Samsung Series 9 laptop.
date: 2011-04-16
tags:
  - linux
---

Earlier this week, my trusty Toshiba Satellite died after five years of
faithful service. I decided to go with the new [Samsung Series 9 Laptop][1] as
its successor, with the intention of configuring the system to dual-boot into
Ubuntu and Windows 7. I encountered a few brutal gotchas during the
installation process, so I figured I'd document them here. (To the best of my
Googling, there's not a lot of information out there on the net as of today.)

What follows is what I believe to be the shortest path to a clean installation.
It is _not_ the path that I took. Therefore, if you find that anything
does not work as described, please let me know.

<!--more-->

Gotcha 1 - the Operating System
-------------------------------
On my first pass through this process, I installed Ubuntu 10.10 on the system,
only to find that the graphics performance was very poor. (I was getting screen
tearing even when trying to use a terminal.) Recalling that improved Sandy
Bridge support was supposed ship with Natty (11.04), I pulled down a daily
build, ran a distro upgrade, and saw that the performance dramatically
improved. (I would call the performance "great" at this point.) So, when you're
choosing your Ubuntu build, I'd recommend that you skip right to Natty 11.04.

Gotcha 2 - the Boot Medium
--------------------------
Because the Samsung Series 9 has no optical drive, you're going to need to
create a bootable USB installation medium, as described on [the Ubuntu download
page][2]. (That process itself is very straightforward.) I was having a very
hard time getting a successful boot, though. The system would begin to boot
from the USB drive, but ultimately would fail with the following error message:

    unable to find a medium containing a live filesystem

I Googled around a bit, and found a thread on the Ubuntu forums where some Asus
owners were having the same problem. The issue for them, it turned out, was
that the USB installation medium needed to be inserted into a specific USB port
for the boot to be successful. The Samsung Series 9 has the same problem. On my
system, the right port allowed for a successful boot. The left failed every
time.

It's worth noting that the USB medium - at least, in my case - had to be
inserted singularly into the right port for the system to boot successfully.
Initially, I inserted it via a USB multiplexer (which split the port among a
keyboard, mouse, and the boot medium), and it did not work.

Gotcha 3 - Kernel Panic
-----------------------
If your installation fails at any point (and especially if you see the exact
same error message specified above), you're likely going to be dropped into a
limited command line prompt. If you reach this point, **hold down the power
button to perform a hard-reset on the system!** When I was kicked to this
terminal, I figured I might as well see if I could manually set things right
again. I could not. In fact, I sent the system into a kernel panic by simply
running the `help` command.

Kernel panic isn't typically a huge problem, except in this case: when the
system went into Kernel panic, the hard-reset itself no longer worked! I called
Samsung tech support to see if a hard-reset called for anything more than
holding down the power button until the system turned off, but it did not. The
system was simply too deeply locked up to even be reset.

Given the machine's seven-hour battery life, I didn't feel like waiting out the
problem, so I ultimately ended up taking apart the hardware to yank the battery
cable. Surprisingly, that effort didn't end in tragedy for me, but save
yourself the trouble - **if at any point your installation goes off course, do
a hard reset as early as possible to minimize your risk of kernel panic**.

Bonus Gotcha - If You Don't Like Unity
--------------------------------------
If you manage to avoid the issues outlined above, hopefully you will be logging
in to your new system in short order. After I logged in successfully the first
time, I encountered to be what I consider a "bonus" gotcha - I _despise_ the
new Unity interface.

If you feel the same way, the solution to this one is actually pretty painless.
First, log out. Second, when you are returned to the login screen, take a look
at the bar at the bottom of the screen. One of the select boxes down there will
read "Ubuntu". Change it to the "Ubuntu Classic" option, and you'll be greeted
with the older Gnome interface when you log in.

Final Thoughts
--------------
I do occasionally have system crashes, but that's par for the course for a Beta
OS. I've never again encountered a kernel panic that has forced me to
disassemble the hardware. All in all, I'm very happy with the purchase and this
system, so despite the potential complexities invovled, I would not dissuade
you from trying to install Ubuntu on a Samsung Series 9.

Update: 23 Apr 2012
-------------------
Since I posted this article initially, Steve (from the comments) has started a
really good thread on the Ubuntu forums.  You'll want to follow it as well:
http://ubuntuforums.org/showthread.php?t=1737086

Update: 24 Jul 2012
-------------------
I just published a post about [installing Lubuntu 12.04 on a Series 9][3] as
well. I'd encourage you to check it out, because I discuss a workaround for a
bug in `grub` that might spare you from banging your head against a wall for a
few hours.

[1]: http://www.amazon.com/gp/product/B004NF5RU6/ref=as_li_ss_tl?ie=UTF8&amp;tag=chrisallenlan-20&amp;linkCode=as2&amp;camp=1789&amp;creative=390957&amp;creativeASIN=B004NF5RU6
[2]: http://www.ubuntu.com/desktop/get-ubuntu/download
[3]: /blog/post/installing-lubuntu-12-04-on-a-samsung-series-9-laptop

