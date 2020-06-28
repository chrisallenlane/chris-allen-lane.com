---
title: Building a Cryptocurrency Mining Rig - Part 4
description: Compute-optimizing a cryptocurrency mining rig.
date: 2017-09-13
tags:
  - blockchain
  - diy
  - hardware

postnext: /blog/post/building-a-cryptocurrency-mining-rig-part-5
postprev: /blog/post/building-a-cryptocurrency-mining-rig-part-3
---


This is Part 4 in a series on building a cryptocurrency mining rig.

Previously, I [designed and built the miner chassis][part-1], [corrected
motherboard BIOS settings][part-2], and [optimized my mining strategy][part-3].
Now, in Part 4, I'll discuss how I attempted to:

1. Overclock GPUs to increase the mining hashrate
2. Decrease power consumption
3. Increase overall hardware utilization

Before discussing optimizations, let's review the baseline benchmarks.

<!--more-->

{{< h2 "Benchmarks">}}
These were the top-line benchmarks after adopting the revised mining strategy:

<table>
  <caption>
    <ol>
      <li>
        Measured at the wall using a <a
        href='http://amzn.to/2vCedu0'>Kill-a-watt</a>.
      </li>
      <li>As reported by <code>nvidia-smi</code>.</li>
    </ol>
  </caption>
  <thead>
    <tr>
      <th>Mh/s (ETC)</th>
      <th>Watts <sup>1</sup></th>
      <th>GPU temp (C) <sup>2</sup></th>
    </tr>
  </thead>
  <tbody>
	<tr>
	  <td>160</td>
	  <td>910</td>
	  <td>60-72</td>
	</tr>
  </tbody>
</table>

I drilled down into the power consumption using a
[Kill-a-watt][aff-kill-a-watt], `nvidia-smi` output, and some simple math:

<table>
  <caption>
    <ol>
      <li>As reported by `nvidia-smi`.</li>
      <li>
        Measured at the wall using a <a
        href='http://amzn.to/2vCedu0'>Kill-a-watt</a>.
      </li>
      <li>Chassis fans were being run at maximum speed.</li>
      <li>Values were rounded to first decimal place.</li>
    </ol>
  </caption>
  <thead>
    <tr>
      <th>Component</th>
      <th>Watts</th>
      <th>Percent <sup>4</sup></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GPUs</td>
      <td>777 <sup>1</sup></td>
      <td>85.4</td>
    </tr>
    <tr>
      <td>Motherboard / CPU</td>
      <td>126</td>
      <td>13.8</td>
    </tr>
    <tr>
      <td>Chassis Fans</td>
      <td>7 <sup>2, 3</sup></td>
      <td>0.8</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td>910 <sup>2</sup></td>
      <td>100</td>
    </tr>
  </tfoot>
</table>

It's also worth noting an externality that wasn't captured above: the rig made
my apartment appreciably warmer, which in turn caused me to run the
air-conditioner more frequently. I didn't attempt to quantify the impact that
had on my energy bill, but I imagine it was non-trivial.


{{< h2 "GPU Overclocking">}}
I began the optimization effort by attempting to overclock the GPUs. (EVGA GPUs
are "overclocked out-of-the-box", but it's usually possible to push them
harder.) Internet research indicated that there are two overclocking methods
available on Linux:

1. via global settings specified by `nvidia-settings`
2. via application-specific settings specified by `nvidia-smi`

I first attempted to overclock using `nvidia-settings`, but quickly ran into
trouble. I discovered that `nvidia-settings` will not detect a GPU unless:

1. It is attached to a monitor
2. The `X` server is running

2 was annoying, because I intended to run the rig mostly headless. 1 was
particularly troublesome, however, because I began using integrated graphics
for video after encountering BIOS issues in [Part 2][part-2]. Because I hadn't
  connected monitors to my GPUs, `nvidia-settings` simply wouldn't detect them.

(It's worth noting that [reddit users][reddit-1] actually overcame this problem
by attaching fake monitors to the GPUs via `xorg.conf`, but I had lost interest
in `nvidia-settings` entirely at this point.)

Having given up on `nvidia-settings`, I turned my attention to `nvidia-smi`.

Per the NVIDIA documentation, it should require two steps to set application
clocks:

1. Determine supported clock speeds: `nvidia-smi -q -d SUPPORTED_CLOCKS`
2. Set the desired clock speeds: `nvidia-smi -ac $VRAM,$GPU`

However, this simply didn't work on my system:

```markdown
chris@cryptos:~$ nvidia-smi -q -d SUPPORTED_CLOCKS

==============NVSMI LOG==============

Timestamp                           : Wed Sep 13 15:18:47 2017
Driver Version                      : 375.66

Attached GPUs                       : 6
GPU 0000:01:00.0
    Supported Clocks                : N/A

GPU 0000:02:00.0
    Supported Clocks                : N/A

GPU 0000:04:00.0
    Supported Clocks                : N/A

GPU 0000:05:00.0
    Supported Clocks                : N/A

GPU 0000:07:00.0
    Supported Clocks                : N/A

GPU 0000:08:00.0
    Supported Clocks                : N/A

chris@cryptos:~$ nvidia-smi -ac 3505,1455
Setting applications clocks is not supported for GPU 0000:01:00.0.
Treating as warning and moving on.
Setting applications clocks is not supported for GPU 0000:02:00.0.
Treating as warning and moving on.
Setting applications clocks is not supported for GPU 0000:04:00.0.
Treating as warning and moving on.
Setting applications clocks is not supported for GPU 0000:05:00.0.
Treating as warning and moving on.
Setting applications clocks is not supported for GPU 0000:07:00.0.
Treating as warning and moving on.
Setting applications clocks is not supported for GPU 0000:08:00.0.
Treating as warning and moving on.
All done.
```

[Others appeared to have encountered this problem as well][reddit-2], and [some
even suggested that application clocks are not supported on "consumer"
cards][devtalk]. (I never determined if this was true.)

I never discovered the failure's root cause. Instead, I decided that small
performance gains were not worth a large headache, and gave up on overclocking
the GPUs.


{{< h2 "GPU Undervolting">}}
With overclocking a bust, I decided to try undervolting instead.

On Linux, undervolting is managed using `nvidia-smi`. Contrary to overclocking,
undervolting proved to be surprisingly simple:

```
sudo nvidia-smi -pl $WATTS
```

This instructs the GPUs to self-tune to comply with a power budget of `$WATTS`.
(I don't know how the GPUs manage that internally.)

Initially, each GPU consumed approximately 130 watts. I used trial-and-error to
incrementally reduce the allowed wattage, while monitoring the effect on
hashrate.

85 watts proved to be the "sweet spot". At 85 watts, each GPU continued to hash
at its maximum rate - it simply did so more efficiently. With 6 GPUs, that
adjustment saved 270 watts without introducing a performance penalty.

With the wattage dialed in, I next wrote a small shell script to spare me from
having to apply these settings manually when starting the miner:

```sh
#!/bin/sh

# configure GPU changes to persist across reboots
sudo nvidia-smi -pm ENABLED

# restrict to 85W per card (seems to be the sweet-spot)
sudo nvidia-smi -pl 85

# mine!
ethminer \
  --cuda \
  --farm-recheck 3000 \
  -S my-pool.org:19999 \
  -O 0xmy-wallet-address.my-worker
```

The miner ran noticeably cooler after making these changes.


{{< h2 "Motherboard BIOS Adjustments">}}
With the large, obvious power savings made in the GPUs, I turned my attention
to smaller optimizations in the motherboard BIOS. My strategy was simply to
turn off all functionality that I wasn't using with the hope of saving a few
watts.

I booted into BIOS and made the following changes:

**Settings\Advanced\PCI Subsystem Settings**
  - `PEG{0,1} - Max Link Speed` => `[Gen1]`

**Settings\Advanced\Integrated Peripherals**
  - `HD Audio Controller` => `[Disabled]`
  - `HPET` => `[Disabled]`

**Settings\Advanced\Super IO Configuration\Serial(COM) Port 0 Configuration**
  - `Serial(COM) Port0` => `[Disabled]`

**Settings\Advanced\Super IO Configuration\Parallel(LPT) Port Configuration**
  - `Parallel(LPT) Port` => `[Disabled]`

{{< h3 "Overclocking\CPU Features">}}
  - `Intel Virtualization Tech` => `[Disabled]`

These changes saved about 2 watts in total (as measured out of the wall).


{{< h2 "Fans">}}
The rig now ran much cooler, so I was able to turn the chassis fans down to
their lowest setting. This saved 2 watts.

After undervolting the GPUs, I probably could have removed the chassis fans
entirely. I opted to keep them, though, preferring to spend a few extra watts
to keep the GPUs as cool as possible. (The fans may also prove necessary with
other computing I intend to do in the future, like hash-cracking.)


{{< h2 "Final Benchmarks">}}
This was the new top-line after making the above changes:

Mh/s (ETC) | Watts | GPU temp (C)
-----------|-------|-------------
160        | 585   | 55-68

These were the new drilled-down numbers:

<table>
  <caption>
    <ol>
      <li>Chassis fans were being run at minimum speed.</li>
      <li>Values were rounded to first decimal place.</li>
    </ol>
  </caption>
  <thead>
    <tr>
      <th>Component</th>
      <th>Watts</th>
      <th>Percent <sup>2</sup></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GPUs</td>
      <td>510</td>
      <td>87.9</td>
    </tr>
    <tr>
      <td>Motherboard / CPU</td>
      <td>70</td>
      <td>12.1</td>
    </tr>
    <tr>
      <td>Chassis Fans</td>
      <td>5 <sup>1</sup></td>
      <td>0.9</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td>580</td>
      <td>100</td>
    </tr>
  </tfoot>
</table>

Optimizations reduced power consumption by 36% without negatively impacting
performance. Additionally, the rig now ran entirely silently, and didn't
noticeably heat my apartment. I was very happy with those results.

As an aside, I was surprised by the power savings within the Motherboard/CPU as
a result of the GPU adjustments. My guess was that the CPU began consuming less
power due to receiving fewer GPU interrupt requests.


{{< h2 "Increasing Utilization">}}
I'll use this rig for purposes beyond mining. At a minimum, I intend to use it
to run the following:

- Full [BTC][], [LTC][], and [DOGE][] nodes
- A full [Gridcoin][GRC] node ([I've been participating][me-boinc] in [BOINC][]
  for over 10 years.)
- A full [SIA][] (or other disk-based cryptocurrency) node 
- A [TOR][] node


The new hardware will also enable me to experiment with [CUDA][] programming,
[tensorflow][], [hashcat][] and [RainbowCrack][rainbow-crack], as well as
parallelize some video-processing work that I do on occasion. I will "get my
money's worth" out of this hardware even if it doesn't make me an Ethereum
millionaire.


{{< h2 "Final Thoughts">}}
I'm really happy with how this project turned out. It gave me hands-on
experience with [Fusion 360][f360] and my [Shapeoko][], lead me to discover
[OpenBeam][], and gave me a platform for experimenting with new tech. It may
even make some money in the crypto markets - we'll see.

So, I happily declare this project a success, and I hope you enjoyed the build.
If you have questions or comments, tweet to me at
[@chrisallenlane][me-twitter].


{{< h2 "Update: 2 Sep 2017">}}
This project [was featured in Hack-a-Day][hackaday].


{{< h2 "Update: 5 Oct 2017">}}
The [Gainesville Hackerspace][hs] kindly invited me to talk about this build.
My talk is posted in-full in [Part 5][part-5], along with an accompanying image
gallery.

[Proceed to Part 5 &raquo;][part-5]


[BOINC]:           https://boinc.berkeley.edu/
[BTC]:             https://bitcoin.org/en/
[CUDA]:            https://en.wikipedia.org/wiki/CUDA
[DOGE]:            http://dogecoin.com/ 
[GRC]:             http://www.gridcoin.us/
[LTC]:             https://litecoin.org/
[OpenBeam]:        http://www.openbeamusa.com/
[SIA]:             http://sia.tech/
[Shapeoko]:        http://carbide3d.com/shapeoko/
[TOR]:             https://www.torproject.org/projects/torbrowser.html.en
[aff-kill-a-watt]: http://amzn.to/2vCedu0
[devtalk]:         https://devtalk.nvidia.com/default/topic/977467/cuda-setup-and-installation/having-trouble-overclocking-gtx-1070/post/5021575/#5021575
[f360]:            https://www.autodesk.com/products/fusion-360/overview
[gist]:            https://gist.github.com/bsodmike/369f8a202c5a5c97cfbd481264d549e9
[hackaday]:        https://hackaday.com/2017/09/02/cryptocurrency-mining-post-bitcoin/
[hashcat]:         https://hashcat.net/hashcat/
[hs]:              https://www.gainesvillehackerspace.org/
[me-boinc]:        https://setiathome.berkeley.edu/view_profile.php?userid=8696231
[me-twitter]:      https://twitter.com/chrisallenlane
[part-1]:          /blog/post/building-a-cryptocurrency-mining-rig-part-1
[part-2]:          /blog/post/building-a-cryptocurrency-mining-rig-part-2
[part-3]:          /blog/post/building-a-cryptocurrency-mining-rig-part-3
[part-5]:          /blog/post/building-a-cryptocurrency-mining-rig-part-5
[rainbow-crack]:   http://project-rainbowcrack.com/
[reddit-1]:        https://www.reddit.com/r/EtherMining/comments/6gfnzi/overclocking_of_multiple_gtx_1070_cards_on_375/dj8san2/
[reddit-2]:        https://www.reddit.com/r/EtherMining/comments/6gfnzi/overclocking_of_multiple_gtx_1070_cards_on_375/
[tensorflow]:      https://www.tensorflow.org/
