---
title: Funding Open-Source Development with Cryptocurrency Mining
description: Thoughts regarding funding open-source development with voluntary user cryptocurrency mining.
date: 2017-10-31
tags:
  - blockchain
  - foss
---


[The Pirate Bay][tpb] recently [made the news][bi] by mining the cryptocurrency
[Monero][] in users' browsers without their knowledge or consent. They did this
in an effort to [reduce their reliance on advertising][tpb-blog], whose utility
as a revenue-generator is [increasingly being undermined by ad-blocking
software][npr].

Around the same time, [CBS Showtime was maliciously compromised to likewise
mine cryptocurrency in users' browsers][fortune], stoking fears that
"[cryptojacking][wired]" attacks will become commonplace in the future.
Moreover, a new company called [Coinhive][] began offering in-browser mining as
a service, possibly furthering the likelihood of "legitimate" in-browser mining
becoming mainstream.

In this article, I will discuss the pros and cons of these mining trends, and
propose what I consider to be a superior alternative to this style of ad-hoc,
in-browser mining.

<!--more-->


{{< h2 "\"Uncoordinated\" Mining">}}
To establish a vocabulary, let's refer to The Pirate Bay's style of ad-hoc,
in-browser mining as "uncoordinated" mining. Let's discuss its pros and cons:

{{< h3 "The Good">}}
The good of uncoordinated mining is obvious: it provides another revenue stream
for publishers that are increasingly unable to pay their bills with
advertising. And, while it may be tempting to dismiss publishers' fiscal
concerns as "not our problem", I believe we do so at our own peril.

Without straying too far off-topic into politics, I believe that a causal line
can be drawn that connects:

1. The rise of ad-blockers
2. The [financial incentives to write "clickbait" articles at the expense of
   journalistic integrity][pbs]
3. The [decline in public trust of news media][gallup-trust] ([Pew
   research][pew-trust])
4. The [present state of US politics][538]

I believe that we are collectively depriving a handful of important
institutions of the resources required to do their work, and that this has
manifested real harm in the broader world. Uncoordinated mining provides these
institutions with a potential revenue stream that users may find more palatable
than advertisements.

{{< h3 "The Bad">}}
Regardless, I believe that uncoordinated, on-page mining is sub-optimal for
publishers for a few reasons. Chief among those reasons is that on-page mining
is necessarily performed in JavaScript, which is itself poorly-suited to mining
in that it:

1. Is single-threaded
2. Executes more slowly than compiled code
3. Has limited access to GPUs

(Informed readers may argue that the above are less true now than in the past.
Regardless, I consider these points to be at least "true enough" when comparing
JavaScript to other options.)

The uncoordinated model suffers from an innate drawback as well: a reader will
only mine on behalf of a publisher for as long as the publisher's site remains
open in a browser. And, in some common cases (like news sites and blogs), that
interval is likely brief.

{{< h3 "The Ugly">}}
Uncoordinated mining has significant disadvantages for users as well:

1. **Expense (without consent)**: Mining consumes resources, including
   electricity (and thus battery life) and bandwidth - the latter being
   potentially expensive on mobile devices. It is unethical to extract these
   costs from users without consent.

2. **Risk of damaging hardware**: [Proof-of-work][pow] mining typically
   generates a lot of heat, which could damage certain types of devices.
   (Ultrabooks and mobile devices are poor platforms for mining, for example.)

3. **Risk of degrading performance**: Uncoordinated mining would almost
   certainly degrade a user's computing experience, as each open browser tab
   would compete for resources.

In my opinion, the net result of all of the above is that uncoordinated,
in-browser mining is sub-optimal for publishers, and outright hostile to users.
But is there an alternative?


{{< h2 "Coordinated Mining">}}
What's the alternative to uncoordinated mining? _Coordinated_ mining!

Rather than relying on uncoordinated, ad-hoc, in-browser mining, I propose the
creation of software whose purpose is to provide a _coordinated hub_ for mining
cryptocurrency on behalf of third-party beneficiaries. I will devote the
remainder of this article to describing how I believe such an application could
function.

Going forward, let's eschew [bikeshedding][] and unimaginatively refer to this
application as "`mine`".

I propose that the `mine` software:

1. Enable desktop users and server administrators to donate unused computing
   cycles to mine cryptocurrency on behalf of multiple third-party benefactors.

2. Be able to utilize both spare CPU and GPU cycles.

3. Be able to mine multiple types of cryptocurrencies (a corollary of the above).

4. Provide configurable resource-consumption limits.

Regarding implementation details, I further propose that `mine` be written as
two components: a standalone cli-based application that implements the mining
"guts", and a GUI wrapper around the former. This will allow the software to
run headlessly on servers and graphically on desktops.

{{< h3 "Advantages">}}
In my opinion, using an application to perform "coordinated" mining has
significant advantages over "uncoordinated", in-browser mining:

1. User participation would be opt-in and consensual.

2. A miner implemented in a compiled language (C++, [Rust][], etc.) would have
   full access to system resources, and could achieve high performance.

3. Donors could mine on behalf of beneficiaries even when not consuming their
   content. (I.e., you could mine on behalf of Wikipedia without having
   Wikipedia open in a browser tab.)

4. A "headless" miner could run even on servers - many of which sit idle for
   long periods of time. (My personal webserver is nearly always 99% idle.)

{{< h3 "Prior Work - the BOINC Client">}}
I believe there exists a well-known application that can serve as a template
for `mine` - the BOINC client.

If you're not familiar with the project, [BOINC][] ("Berkeley Open
Infrastructure for Network Computing") allows users to donate processor time
(both CPU and GPU) to scientific research. (You may recall the Playstation 3's
"[Folding at Home][folding-at-home]" - this was a BOINC project.)

The BOINC client allows users to precisely define how and when their hardware
is to be donated. Here is a screenshot of its configuration panel:

![BOINC control panel][boinc-control-panel]

Designing `mine` similarly would make it unobtrusive and painless to use in
many common cases. (I run BOINC 100% of the time while working, and it doesn't
perceptibly degrade my computing experience.)

Another relevant feature of BOINC is that it allows a user to participate in
multiple projects simultaneously; the BOINC Manager equitably allocates
processing time automatically. `mine` should behave the same way.

{{< h3 "Interface">}}
I envision `mine` having an interface that looks similar to this (expressed in
[Docopt][] format):

```markdown
mine

Donate unused CPU/GPU computing cycles to cryptocurrency mining on behalf of
worthy organizations.

Usage:
  mine [options]

Options:
  -h --help  Show this screen.
  --version  Show version.
  -c --config=<path>       Path to config file. [default: "$XDG_HOME/mine.yaml"]
  -b --beneficiary=<name>  Mine for a specific beneficiary only.
  -o --output=<type>       Output type. One of: "text" or "json".
  --colorize               Colorize output.
```

{{< h3 "Configuring">}}
I envision `mine` being configured via a configuration file
(`$XDG_HOME/mine.yaml`) with values resembling the following:

```yaml
# CPU mining configuration
cpu:
  # usage limits
  usage:
    cores: 3               # maximum number of cores to use
    percent: 25%           # maximum percent of CPU time to use

  # mining suspend triggers
  suspend:
    when_in_use: true      # suspend CPU mining when computer is "in use"
    when_on_battery: true  # suspend CPU mining when on battery

# GPU mining configuration
gpu:
  # usage limits
  usage:
    number: 1              # maximum number of GPUs to use
    percent: 25%           # maximum percent of GPU time to use

  # mining suspend triggers
  suspend:
    when_in_use: true      # suspend GPU mining when computer is "in use"
    when_on_battery: true  # suspend GPU mining when on battery

# Array of organizations to which you'd like to donate. Mining time will (by
# default) be equally divided among all beneficiaries.
beneficiaries:
  - eff:
      stratum: some-stratum-server  # the stratum server to which to connect
      currency: some-currency       # the currency to mine ("xmr", "eth", etc.)
      wallet: some-wallet-address   # the wallet into which to deposit mined coins
      # `percent` allows the user to manually allocate mining time for a
      # specific organization. Unallocated mining time will be divided equally
      # among beneficiaries for whom `percent` is unspecified. (Allocated
      # mining time may not exceed 100%.)
      percent: 30%

  - mozilla:
      stratum: some-stratum-server
      currency: some-currency
      wallet: some-wallet-address

  - wikipedia:
      stratum: some-stratum-server
      currency: some-currency
      wallet: some-wallet-address

  - the-linux-foundation:
      stratum: some-stratum-server
      currency: some-currency
      wallet: some-wallet-address
```

(Note that a real implementation would likely require configuration options for
technical minutia like [stratum][] connection details. Those details are beside
the point here, so I won't address them now.)


{{< h2 "Beyond the Web">}}
So far, I have primarily discussed how coordinated mining could benefit
publishers that operate a website. However, it's important to note that the
coordinated mining model could benefit _any_ organization - regardless of
whether it is web-based.

I believe this could be particularly transformational for open-source software,
which is [notoriously hard to monetize][hn] and [(literally) dangerously
under-funded][mit].

What could be accomplished if an application like `mine` shipped (in an
"opt-in" way) with all versions of Ubuntu?

What could be accomplished if the social norm became to configure servers to
financially support the software on which they depend?

Or, moving away from software entirely - what impact could be made in
"meatspace" with a few config file changes?

```yaml
# ...

beneficiaries:

  # ...

  - my-university:
      stratum: some-stratum-server
      currency: some-currency
      wallet: some-wallet-address

  - my-childs-school:
      stratum: some-stratum-server
      currency: some-currency
      wallet: some-wallet-address

  - my-local-hackerspace:
      stratum: some-stratum-server
      currency: some-currency
      wallet: some-wallet-address

  - my-favorite-twitch-streamer:
      stratum: some-stratum-server
      currency: some-currency
      wallet: some-wallet-address

# ...
```

{{< h3 "Adoption">}}
Writing an application like `mine` is not technically daunting: its core
functionality could be kludged together with existing mining software and a few
shell scripts. The purpose of the `mine` software would be to reduce the
friction involved in deployment, and thus (hopefully) promote adoption.

And that will be the hard part: promoting adoption. It will likely involve a
few steps:

1. Collectively deciding whether this is a good idea
2. If "yes", propagating the meme (in the [academic sense][meme]) that this
   should be done
3. Shipping the relevant software

This post intends to begin "Step 1". With that said, I request feedback on the
ideas presented in this article. If you have something to say, please tweet it
to me at [@chrisallenlane][me]. Let's figure this out.

In my next article, I'm going to propose a web standard for donation
discoverability that complements - but does not strictly depend upon - what
has been discussed here.

[538]:                 https://fivethirtyeight.com/features/americans-dont-trust-their-institutions-anymore/
[Coinhive]:            https://coinhive.com/ 
[Monero]:              https://getmonero.org/
[Rust]:                https://www.rust-lang.org/en-US/
[YAML]:                http://yaml.org/
[bi]:                  http://www.businessinsider.com/the-pirate-bay-hijacks-web-browsers-mine-cryptocurrency-monero-2017-9
[bikeshedding]:        https://en.wikipedia.org/wiki/Law_of_triviality
[boinc-control-panel]: /images/boinc-control-panel.jpg
[boinc]:               https://boinc.berkeley.edu/ 
[docopt]:              http://docopt.org/ 
[folding-at-home]:     https://en.wikipedia.org/wiki/Folding@home#PlayStation_3
[fortune]:             http://fortune.com/2017/09/26/showtime-homeland-hack-cryptocurrency-monero/
[gallup-trust]:        http://news.gallup.com/poll/195542/americans-trust-mass-media-sinks-new-low.aspx
[hn]:                  https://news.ycombinator.com/item?id=14446516
[me]:                  https://twitter.com/chrisallenlane
[meme]:                https://en.wikipedia.org/wiki/Meme
[mit]:                 https://www.technologyreview.com/s/526386/the-underfunded-project-keeping-the-web-secure/
[npr]:                 http://www.npr.org/sections/alltechconsidered/2015/07/20/424630545/with-ad-blocking-use-on-the-rise-what-happens-to-online-publishers
[pbs]:                 https://www.pbs.org/newshour/economy/what-you-dont-know-about-click-bait-journalism-could-kill-you
[pew-trust-govt]:      http://www.people-press.org/2017/05/03/public-trust-in-government-1958-2017/
[pew-trust]:           http://www.journalism.org/2017/05/10/americans-attitudes-about-the-news-media-deeply-divided-along-partisan-lines/pj_2017-05-10_media-attitudes_a-05/
[pow]:                 https://en.wikipedia.org/wiki/Proof-of-work_system
[stratum]:             https://en.bitcoin.it/wiki/Stratum_mining_protocol
[tpb-blog]:            https://thepiratebay.org/blog/242
[tpb]:                 https://thepiratebay.org/
[wired]:               https://www.wired.com/story/cryptojacking-cryptocurrency-mining-browser/
[zdnet]:               http://www.zdnet.com/article/funding-vital-but-ignored-open-source-projects/
