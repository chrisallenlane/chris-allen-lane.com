---
title: "Tin Eye and Personal Privacy: A Hypothetical Attack Vector"
description: Thoughts on Tin-Eye as a threat to personal privacy.
date: 2010-02-12
tags:
  - privacy
  - security
---

If you who haven't heard of it, [Tin Eye][] is an image search engine with a
unique twist. While most image search engines (like [Google Image search][])
allow you to search for images based off of textual search criteria, TinEye
allows you to search for images that are _similar to other images_.  The
service works by allowing a user to upload an image file to TinEye.  Images
that are "similar to" the uploaded image are returned in the search results.
 (The ways in which the images are "similar", of course, is up to the TinEye
algorithm, but in my opinion/experience, its groupings make sense to me as a
human.)

TinEye is thus a great resource for finding images in a series, or for finding
different variations upon a specific image.  Looking for a higher quality
version of a low-res pic?  Try TinEye. Curious where your favorite wallpaper
came from originally?  Try TinEye.  Looking for the same without Longcat
'shopped into it?  TinEye.

I believe, however, that this unique functionality has some interesting
security implications.  I propose that, as TinEye is given more and more time
to index the web, it may open up new attack vectors on personal privacy.

<!--more-->

As an example, let's say that Alice has signed up for an online-dating site.
Her would-be online suitor, Bob, takes a pass at her and is quickly shot down
(or perhaps never attempts to contact her online at all). As Bob's interest
escalates to infatuation, however, he transitions from suitor to stalker and
decides to try to learn as much about Alice as he can with the intention of
encountering her "in real life".

In the past, Bob's next several moves would likely look something like this:

- Google Alice's username, looking for hits on other sites, forums, etc.

- If available, Google her email address

- Take any personal information gleaned from her profile (hometown, graduating
  class, major, birth year, club memberships, interests vis-a-vis geographic
  location, place of work, etc.) and begin a brute-force search through
  Facebook, MySpace, Flickr, Twitter, etc.

- Employ [social engineering][] as necessary

- Repeat 1 - 4 above until enough information has been obtained on Alice to
  locate her physically

Due to TinEye, however, Bob potentially has a few more tools for compromising
Alice's identity:

- Save all of Alice's profile pics to his hard drive, and then upload them to
  TinEye. Had Alice posted the same photos to multiple sites (Facebook,
  MySpace, other dating sites, etc.), they may appear in the search results.
  From there, begin scraping these newly-uncovered sites for information as
  well.

- If applicable, download whatever avatar image Aliced was using, and perform
  the same search once more. (While avatars are by no means unique, you never
  know when you might get lucky.)

This has a few important implications:

Firstly, and as always, be careful about what you post online!  Recognize that
the possibility exists that links can be drawn among the sites where you post
the same pictures. If you don't want to go as far as not posting pictures of
yourself online (which is understandable in the context of an online dating
site), consider never posting the same photo to multiple sites.

Secondly, recognize the fundamental shift that the above signifies. In the
past, it was possible to locate pictures of an individual based off of her
textual descriptors (name, username, etc.). Now, however, the reverse is
possible: you may now be able to locate textual information on a target based
off of her picture.

To be clear, I'm not advocating that individuals flee from online dating. Nor
am I stating that online dating, nor partcipating in the various "social media"
sites in general, is intrinsically unsafe.

I _am_ stating, however, that we must be increasingly vigiliant regarding what
we post online.  We must also recognize that, as technologies like TinEye
continue to develop and mature, potential attack vectors on our personal
privacy will likely continue to develop accordingly.

[Google Image Search]: http://images.google.com
[Tin Eye]: http://www.tineye.com/
[social engineering]: http://en.wikipedia.org/wiki/Social_engineering_(security)

