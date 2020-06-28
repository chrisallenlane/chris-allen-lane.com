---
title: Building a Cryptocurrency Mining Rig - Part 3
description: Financially optimizing a cryptocurrency mining strategy.
date: 2017-09-01
tags:
  - blockchain
  - diy
  - hardware

postnext: /blog/post/building-a-cryptocurrency-mining-rig-part-4
postprev: /blog/post/building-a-cryptocurrency-mining-rig-part-2
---

This is Part 3 in a series on building a cryptocurrency mining rig.

I physically constructed a mining rig in [Part 1][part-1], and made motherboard
BIOS adjustments in [Part 2][part-2]. Now, in Part 3, I'll discuss how I
financially optimized my mining strategy.

<!--more-->


{{< h2 "Baseline Benchmarks">}}
I began the optimization effort by recording baseline mining benchmarks. The
following was achieved using [Claymore][] v9.6 to [dual-mine][] ETC and DCR:

<table>
  <caption>
    <ol>
      <li>Hashrate as reported by Claymore v9.6.</li>
    </ol>
  </caption>
  <thead>
    <tr>
      <th>Mh/s (ETC) <sup>1</sup></th>
      <th>Mh/s (DCR) <sup>1</sup></th>
      <th>Watts</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>151</td>
      <td>1515</td>
      <td>960</td>
    </tr>
  </tbody>
</table>

Though Claymore provides for it, I did not attempt to dual-mine [SC][],
[LBRY][], [PASC][], or [PASL][], because I am personally not interested in
those coins from a "fundamentals" perspective.


{{< h2 "Mining Software Comparisons">}}
When I built my miner, I initially chose the mining software mostly
arbitrarily. Wanting to rectify that, I next performed comparative
benchmarking to help determine which mining software to use, and whether or not
to dual-mine.

Benchmarking yielded the following data:

<div class='overflow'>

<table>
  <caption>
    <ol>
      <li>Comma-separated values are ETC/DCR pairs.</li>
      <li>
        Claymore charges a "DevFee" of 1% when mining ETC, and 2% when mining
        ETC+DCR.
      </li>
      <li>"Adjusted" rates account for losses accrued by the DevFee.</li>
      <li>
        Wattage was measured at the wall using a
        <a href='http://amzn.to/2vCedu0'>Kill-a-watt</a>.
      </li>
    </ol>
  </caption>
  <thead>
    <tr>
      <th>Miner</th>
      <th>Coin</th>
      <th>Mh/s <sup>1</sup></th>
      <th>Fee <sup>2</sup></th>
      <th>Mh/s (Adj) <sup>3</sup></th>
      <th>Watts <sup>4</sup></th>
      <th>Mh/s (Adj)/Watt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Claymore v9.6</td>
      <td>ETC+DCR</td>
      <td>151, 1515</td>
      <td>2%</td>
      <td>148, 1485</td>
      <td>960</td>
      <td>0.154, 1.557</td>
    </tr>
    <tr>
      <td>Claymore v9.6</td>
      <td>ETC</td>
      <td>156, <del>0000</del></td>
      <td>1%</td>
      <td>154, <del>0000</del></td>
      <td>850</td>
      <td>0.181, <del>0000</del></td>
    </tr>
    <tr>
      <td>Claymore v9.8</td>
      <td>ETC+DCR</td>
      <td>156, 1560</td>
      <td>2%</td>
      <td>153, 1529</td>
      <td>960</td>
      <td>0.159, 1.593</td>
    </tr>
    <tr>
      <td>Claymore v9.8</td>
      <td>ETC</td>
      <td>160, <del>0000</del></td>
      <td>1%</td>
      <td>158, <del>0000</del></td>
      <td>870</td>
      <td>0.182, <del>0000</del></td>
    </tr>
    <tr>
      <td>Ethminer v0.12.0</td>
      <td>ETC</td>
      <td>160, <del>0000</del></td>
      <td>0</td>
      <td>160, <del>0000</del></td>
      <td>880</td>
      <td>0.183, <del>0000</del></td>
    </tr>
  </tbody>
</table>

</div>

My takeaway from the above was that dual-mining DCR:

1. reduced potential ETC yield by about 5% (Ethminer (ETC) => Claymore v9.8 (ETC+DCR))
2. increased power consumption by about 9%

So - was mining DCR worth it?


{{< h2 "What to Mine?">}}
I used [whattomine.com][whattomine] to run the numbers:

<table>
  <caption>
    <ol>
      <li>The numbers above were calculated on 1 Sep 2017.</li>
    </ol>
  </caption>
  <thead>
    <tr>
      <th>Coin</th>
      <th>Monthly Profit (USD)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ETC</td>
      <td><a href='https://whattomine.com/coins/162-etc-ethash?utf8=%E2%9C%93&hr=161.0&p=880.0&fee=1.0&cost=0.17&hcost=0.0&commit=Calculate'>$311.35</a></td>
    </tr>
    <tr>
      <td>ETC+DCR</td>
      <td><a href='https://whattomine.com/merged_coins/3-etc-dcr?utf8=%E2%9C%93&hr_etc=153&fee_etc=1&hr_dcr=1529&fee_dcr=1&p=960&cost=0.17&commit=Calculate'>$313.89</a></td>
    </tr>
  </tbody>
</table>

By the numbers, yes - DCR was (barely) worth mining.  However, _beyond_ the
numbers, I had some concerns.

I had been dual-mining ETC+DCR for weeks before making the above benchmarks.
When I checked [my mining pool][suprnova], however, I was surprised to see how
little DCR I had earned. Investigating why, I discovered that the pool reported
my DCR hashrate to be less than half of what Claymore reported. (I still don't
know which number was correct, or how the disparity came to be.)

I had additional concerns beyond the dubious hashrate numbers.

When measuring power consumption, I noticed that dual-mining was very "peaky" -
draw would swing +/-100 watts perhaps a dozen times per minute. I feared that
the temperature fluctuations that (likely) accompanied those swings would
eventually damage the GPUs via thermal expansion and contraction.

Lastly, I found Claymore somewhat unpleasant to use. Configuration seemed
awkward to me, in that it read configuration from text files (with a
proprietary syntax) from its application directory. Likewise, it continuously
downloaded `.bin` files (containing I-know-not-what) and logged output (again
into text files) into the same directory. This all felt terribly disorganized,
and inconsistent with sound software engineering practices.

In light of all of the above, I decided to forego dual-mining entirely, and to
simply "single-mine" ETC using [Ethminer][].

Thus, with a revised mining strategy, I next turned my attention to optimizing
my miner's computational performance. In [Part 4][part-4], I'll discuss how I
was able to (dramatically) reduce power consumption without impacting hashrate.

[Proceed to Part 4 &raquo;][part-4]


[Claymore]:        https://github.com/nanopool/Claymore-Dual-Miner
[DCR]:             https://www.decred.org/
[ETC]:             https://ethereumclassic.github.io/
[Ethminer]:        https://github.com/ethereum-mining/ethminer
[LBRY]:            https://lbry.io/
[PASC]:            http://www.pascalcoin.org/ 
[PASL]:            https://pascallite.com/
[SC]:              http://sia.tech/
[aff-kill-a-watt]: http://amzn.to/2vCedu0
[dual-mine]:       http://www.cryptobadger.com/2017/06/dual-mining-claymore/
[part-1]:          /blog/post/building-a-cryptocurrency-mining-rig-part-1
[part-2]:          /blog/post/building-a-cryptocurrency-mining-rig-part-2
[part-4]:          /blog/post/building-a-cryptocurrency-mining-rig-part-4
[suprnova]:        https://dcr.suprnova.cc/
[whattomine]:      https://whattomine.com/
