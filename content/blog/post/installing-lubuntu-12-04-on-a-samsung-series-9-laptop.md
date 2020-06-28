---
title: Installing Lubuntu 12.04 on a Samsung Series 9 Laptop
description: Notes on installing Lubuntu 12.04 on a Samsung Series 9 laptop.
date: 2012-07-24
tags:
  - linux
---


I recently reformatted my system for the first time [since I originally
installed Ubuntu 11.04 on it][1], and I want to document some of the "gotchas"
I encountered. I unnecessarily lost a few hours to trial-and-error, and I hope
to spare you the same frustration.

For this rebuild, I personally installed **L**ubuntu (with an "L") 12.04,
because I _hate_ Unity, and because `gnome-panel` shares too many of Unity's
constraints (like only supporting four workspaces) to be useful. With that
said, I'd imagine that the following advice applies to some of the other
\*buntus as well.

This was the process I used to install Lubuntu 12.04 on a clean system:

<!--more-->

The Obvious
-----------
Start by downloading Lubuntu 12.04 from an official source. If you're
installing to a Samsung Series 9, you'll want the AMD64 build.

Once the download is complete, use the "Startup Disk Creator"
(`usb-creator-gtk`, I think) to create a bootable USB drive from which you will
run the install. (The Series 9 has no optical drive, so USB is the easiest
option.) This is straightforward and documented elsewhere, so I won't describe
the process here.

The Devious
-----------
There are two real gotchas to watch out for.

### Insert your bootable USB into the proper USB slot ###
I learned [last time][] that the Series 9 is not able to boot from both of its
USB ports. On my model (a first-generation Series 9), I'm only able to boot
from the right-hand USB.  ("Right-hand" presuming that you are looking at the
screen.)

### UEFI support will break Grub ###
This was the real bitch of a problem that cost me a few hours this time. The
Series 9 has [UEFI][] support, and as such, `grub` seems to be unable to
properly install its bootloader. I solved this by **disabling UEFI support in
the BIOS before attempting the installation**. If you do that, the installation
proceeds smoothly, and you'll be able to boot without issue. (I'd recommend
that you research this step a bit beforehand if you're planning on
dual-booting, though, because I think this may have consequences for
dual-booters. I only run Lubuntu 12.04 personally, so it works fine for me.)

Post-Installation
-----------------
All that follows now applies strictly to Lubuntu specifically.

### Supporting dual-monitors ###
When I booted into the new desktop, I discovered quickly that multiple monitors
were not well supported. I found that `arandr` (`sudo apt-get install arandr`)
provided that support easily and effectively. In fact, it seems far more
reliable to me than Gnome's touchy monitor auto-detection, so I consider this
to be an upgrade.

### Supporting multiple sound cards ###
I also shortly discovered that there was no obvious way to switch between
multiple sound cards on a clean Lubuntu install. This was a hassle for me,
because I frequently like to switch between outputting to speakers and [my Sony
headset][] (for Skype, etc.). I looked for a way to do this in `alsamixer`, but
I don't believe it is possible.

[PulseAudio][] ultimately got this working for me:

```sh
sudo apt-get install pulseaudio pavucontrol
```

PulseAudio seemed pretty plug-and-play to me, in that it required no special
configuration effort beyond installation.

Once installed, running `pavucontrol` will bring up the Pulse Audio
Volume Controller. To switch sound cards, click on the "Output Devices" tab,
and switch the "Port" control to the sound card you want to use. This switch
can be made in real-time, and does not require any processes (or the system) to
be restarted.

`pavucontrol` makes it possible to adjust volume levels on a
per-application basis, so I consider this too to be an upgrade over the default
Ubuntu audio controls. (I think Ubuntu _does_ use PulseAudio, but I
never saw these per-application volume controls before in the default Sound
Preferences.)

### Etc. ###
Beyond the above, I'm still encountering little snags from time to time, and
I'll document them here as I find reliable solutions.

[1]:               /blog/post/installing-ubunutu-on-a-samsung-series-9-laptop/
[PulseAudio]:      http://en.wikipedia.org/wiki/PulseAudio
[UEFI]:            http://en.wikipedia.org/wiki/Unified_Extensible_Firmware_Interface
[last time]:       /blog/post/installing-ubunutu-on-a-samsung-series-9-laptop/
[my Sony headset]: http://www.amazon.com/gp/product/B0053OLY9O/ref=as_li_ss_tl?ie=UTF8&amp;tag=chrisallenlan-20&amp;linkCode=as2&amp;camp=1789&amp;creative=390957&amp;creativeASIN=B0053OLY9O
