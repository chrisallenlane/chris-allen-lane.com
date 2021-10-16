---
title: Building a GPU Lab Server (Work-in-Progress)
description: A brief look at a GPU lab server that I'm building for my homelab.
date: 2021-10-15
tags:
  - diy
  - gpu
  - hardware
  - homelab
---

In 2017, [I built an etherium mining rig][rig]. Having since lost interest in
cryptocurrency, I am currently converting that rig into a machine-learning lab
environment. Below are a few photos of the build in-progress.

<!--more-->

I once again used [OpenBeam][openbeam] (now "MakerBeam") to build a simple
cradle for the GPUs:

{{< picture
	src="/images/gpu-lab-frame.jpg"
	alt="A GPU cradle constructed from Openbeam"
>}}

The GPUs are locked into the cradle by lateral tension applied by the cross beams:

{{< picture
	src="/images/gpu-lab-frame-loaded.jpg"
	alt="The cradle with GPUs inserted"
>}}

The GPU cradle press-fits into a Rosewill 4u server chassis. Tension is
adequate to hold the GPUs securely in-place:

{{< picture
	src="/images/gpu-lab-chassis-2.jpg"
	alt="A second image of a GPUs loaded into the 4u rack chassis"
>}}
{{< picture
	src="/images/gpu-lab-chassis-1.jpg"
	alt="An image of a GPUs loaded into the 4u rack chassis"
>}}

The chassis shipped with an internal array of three 120mm cooling fans, but it
collided with the GPUs. Fortunately, I was able to trivially modify the chassis
to mount the fans externally:

{{< picture
	src="/images/gpu-lab-fans.jpg"
	alt="A second image of a GPUs loaded into the 4u rack chassis"
>}}

This machine is ultimately going to be racked in my homelab, which is likewise
a work-in-progress:

{{< picture
	src="/images/gpu-lab-rack.jpg"
	alt="A 25u server rack containing various hardware"
>}}

All that remains is to run power cabling to the GPUs, though I'll postpone that
until after I've had time to create custom cables of the appropriate length.
I'm striving to make this build as tidy as possible.

I'll update this post as the project progresses.


[openbeam]: https://www.makerbeam.com/
[rig]:      /blog/post/building-a-cryptocurrency-mining-rig-part-1/
