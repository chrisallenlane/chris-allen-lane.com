---
title: Building a Cryptocurrency Mining Rig - Part 2
description: Motherboard BIOS modifications for a cryptocurrency mining rig.
date: 2017-08-29
tags:
  - blockchain
  - diy
  - hardware

postnext: /blog/post/building-a-cryptocurrency-mining-rig-part-3
postprev: /blog/post/building-a-cryptocurrency-mining-rig-part-1
---


This is Part 2 in a series on building a cryptocurrency mining rig.

In [Part 1][part-1], I designed and built a custom miner chassis. In Part 2,
I'll discuss how I resolved some BIOS-related issues that I encountered.

<!--more-->


{{< h2 "Problem: Motherboard Failed to Detect More than 4 GPUs">}}
The miner would initially detect a maximum of 4 of the 6 [GPUs][aff-gpu]. After
ruling out hardware failures, I turned to Google to see if others had
encountered the same problem.

They had. The solution was simple:

  1. Flash a [new motherboard BIOS][bios] (`v7998v1B`)
  2. Boot into the BIOS config
  3. Navigate to `Settings\Advanced\PCI Subsystem Settings`
  4. Set `Above 4G memory/Crypto Currency Mining` to `[Enabled]`

I rebooted the miner after making the above changes. The video output had
become corrupted, and would "blank" after POST.

I `ssh`-ed into the miner to determine if it was booting successfully. It was.
Additionally, `nvidia-smi` now detected all 6 GPUs.

So, progress had been made, but one problem had been traded for another.


{{< h2 "Problem: Corrupted Video Output">}}
I once again turned to Google, but this time found no useful results, and was
forced to resolve the problem by myself.

I hypothesized that the prior BIOS change had - somehow - interfered with the
GPUs' ability to perform "graphics" tasks. As a workaround, I decided to
reconfigure my BIOS to use the processor's "integrated graphics" to drive the
video output.

I booted into BIOS config and did the following:

  1. Navigated to `Settings\Advanced\Integrated Graphics Configuration`
  2. Set `Initiate Graphic Adapter` to `[IGD]`

I rebooted the system. Video output was now fine while booting, but became
"fuzzy" after the `X` server started. I had one final problem to solve.


{{< h2 "Problem: Fuzzy Video Output in X Server">}}
At a glance, it looked as though the monitor had been configured at the wrong
refresh rate. I popped open `xorg.conf` to view the display configuration. It
had two issues:

  1. It was still configured against an "NVIDIA" device, rather than IGP.
  2. It was configured to output in 1080i, rather than 1080p.

I simply deleted `xorg.conf`, rebooted the machine, and restarted `X`. Finally,
the video output became crytal clear, and `nvidia-smi` (and `claymore`) could
detect all 6 GPUs.

With that, I moved on to more interesting work. In [Part 3][part-3], I'll
discuss tuning the system for performance.

[Proceed to Part 3 &raquo;][part-3]


[aff-gpu]: http://amzn.to/2vC51G5
[bios]:    https://us.msi.com/Motherboard/support/Z170A-SLI-PLUS.html#down-bios
[part-1]:  /blog/post/building-a-cryptocurrency-mining-rig-part-1
[part-3]:  /blog/post/building-a-cryptocurrency-mining-rig-part-3
