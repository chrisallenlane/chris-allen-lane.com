---
title: "PhoneGap: the Good, the Bad, and the Ugly"
description: Some thoughts regarding the Phonegap platform.
date: 2012-12-20
tags:
  - android
  - mobile
  - phonegap
---

Having recently completed [my first PhoneGap application][ppt], I wanted to
take a moment to summarize my experience. What follows are my opinions
regarding "The Good", "The Bad", and "The Ugly" of the [PhoneGap
framework][phonegap].

<!--more-->

The Good
--------

### The Vision ###
The PhoneGap team's stated purpose is to promote the use of open standards like
HTML5 for application development, [such that the need for the PhoneGap
framework itself would eventually disappear][1].  I personally think that's a
worthy goal, and support it.

### Using Web Technologies for App Development ###
One of PhoneGap's principal selling points is that it allows web developers to
create mobile applications. A web developer (with no mobile experience) should
allegedly be able to jump into PhoneGap and quickly bang out an application
without being subject to a steep learning curve.

While I personally had _some_ mobile experience before undertaking my
newly-released project, I won't claim to have had a lot. And with that said, I
felt like PhoneGap lived up to its promise. With few exceptions, I didn't find
writing a PhoneGap app to be much different from writing a typical web
application. I was able to hack out a "Hello World" type app only moments after
getting the dependencies installed, and even did most of my development
directly within a browser like I normally would.

### Cross-Device Compatibility ###
PhoneGap also claims to make it easier to develop for multiple platforms and
devices by abstracting away much of the complexity that would normally entail.
While I tailored my application strictly to Android (wanting nothing to do with
Apple's nightmare of a publishing process), I have yet to discover a single
cross-device bug in testing.

I don't have a strong basis of comparison for cross-device bugs between a
PhoneGap app and an app coded the traditional way (though I've heard horror
stories), but at the very least, I can say that PhoneGap did not disappoint me.
I only had to write my application "once", and it functioned fine on all
devices tested.

### Short API Learning-curve ###
Provided that you're already a proficient client-side programmer (skilled with
HTML5, CSS3, JavaScript, and Responsive Design), the PhoneGap API itself is
simple to learn. It struck me as being well-conceived and well-structured, and
feels natural and idiomatic to JavaScript.

### Good API Documentation ###
I thought that the [PhoneGap API documentation][2] was clearly structured and
well-written, and provided helpful code samples. It was also relatively brief,
which I consider to be a feature.

The Bad
-------

### Out-of-Date Documentation ###
While PhoneGap's _API_ documentation was well-written, most of its other
documentation was not. I had a particularly rough time tracking down
information on what the many default project files did, including `build.xml`,
everything in the `res` directory, and the required (I think?)
`assets/www/cordova.js`. While the API documentation covers how to structure
your resources within `assets/www` (mostly), I could find virtually no
documentation on any of the other files that ship with a default project.

Worse than a lack of available documentation, though, was that there seemed to
be a huge amount of _misinformation_ out there as well. While I'm glad that
PhoneGap is being aggressively developed, it seems that many of its recent
changes have been backwards-incompatible, and that the documentation that
applies to earlier versions of PhoneGap (though version numbers are
infrequently specified in the documentation) does not necessarily apply to the
current build at any given time. This is true not only on third-party sites
over which the PhoneGap team would have no direct control (like [Stack
Overflow][] and such), but also through the official PhoneGap channels.
Naturally, I found this to be frustrating and counter-productive.

### Blurry Distinctions between PhoneGap and Cordova ###
Sometime around when Adobe acquired Nitobi, Nitobi open-sourced the "engine" of
PhoneGap to the Apache Foundation as a project named "Cordova". While I applaud
them for open-sourcing their framework, this move has led to some very
confusing documentation. (See [the comments][3].)

For starters, "PhoneGap" ships with "Cordova". (All of PhoneGap's compilation
assets live in `cordova`). That raises the question, though: where
does Cordova end and PhoneGap begin? Does one entail the other? Does one
_contain_ the other? And what does the distinction between the two have
to do with the myriad files mentioned above whose purpose I could never
determine?

The documentation seemingly uses the terms "PhoneGap" and "Cordova"
interchangeably, which was unhelpful to the point that I frequently didn't even
know which product I was using, let alone if the documentation I was reading
was appropriate for the current release.

### Insufficient Abstraction ###
I was disappointed with the far-from-perfect job that PhoneGap did with
abstracting away implementation details for each platform, and I was surprised
by how many Android assets lived directly within my project's root. Given that
my project was built for Android only, I fear that this problem scales linearly
with the number of different platforms an app is trying to support.

At its worst, PhoneGap felt like it was _adding_ layers of technical
complexity to my project, rather than subtracting them through abstraction. I
had to learn far more about Android programming than I anticipated, given that
the purpose of the framework was to abstract away those details.

### Performance ###
The graphical performance of my application didn't live up to my expectations
either. My app is essentially just a timer, which is about as simple as an app
can get. And yet, at times its interface (implemented in [jQuery Mobile][])
feels laggy and unresponsive. This is not a huge problem for an application
like mine, but I could see it being a _major_ problem for an app that requires
more user interaction.

(The sluggish UI is admittedly not a fault of the PhoneGap project itself, but
it was an unpleasant surprise that made me question whether its fundamental
strategy - wrapping a web application in a single-purpose browser in order to
make it appear native - was a good one.)

The Ugly
--------

### PhoneGap Build ###
The absolute worst thing about PhoneGap - without question - is its build
system.

The PhoneGap team seems to expect you to use [PhoneGap Build][] to compile your
applications for deployment. I have two _major_ problems with PhoneGap Build,
though:

1. I think its pricing model is just plain stupid. Why would I want to subscribe
  to a build service for $9.99 per month when I'm just trying to compile an
  application once? (One that I intend to give away for free, no less?)

2. Worse: it only allows you to upload your web assets (those that live in
   `assets/www`) during the compilation process. The PhoneGap team is giving
   itself too much credit here if they think that's going to work for everyone,
   because [I had to modify some of the Android assets (that lived elsewhere)
   in order to get my app to function as desired][4]. This means that PhoneGap
   Build would never be able to successfully compile my application, period.

So what if you're trying to compile your application _without_ using PhoneGap
Build? You're shit out of luck - that's what. I couldn't find documentation
_anywhere_ describing how to do this, [and eventually ended up having to dig
through the Cordova (or is it PhoneGap?) code to see how it worked "under the
hood" when it compiled debug APKs][5]. From there, I had to rely on the Android
SDK documentation to implement my own build/sign/align tool so that I could
actually publish the app.

I personally found those omissions in the documentation to be glaring, and
bad-form on PhoneGap's part. While I understand that PhoneGap Build is likely
central to PhoneGap's business model, I feel they should have made at least
_some_ effort to explain how to package your application without it -
especially given that PhoneGap Build is essentially broken.

Concluding Thoughts
-------------------
Despite my objections above, my overall experience with PhoneGap was generally
positive, and I would consider using it again for another project. With that
said, though, it did not turn out to be the silver-bullet that I had hoped it
would be, and I am considering writing my next app in plain Java. We'll see
which approach turns out to be better.


[1]: http://phonegap.com/2012/05/09/phonegap-beliefs-goals-and-philosophy
[2]: http://docs.phonegap.com/en/2.2.0/index.html
[3]: http://phonegap.com/2012/03/19/phonegap-cordova-and-what%E2%80%99s-in-a-name/
[4]: /blog/post/phonegap-prevent-an-android-devices-screen-from-sleeping
[5]: /blog/post/phonegap-compiling-a-release-apk-without-using-phonegap-build
[PhoneGap Build]: http://build.phonegap.com
[Stack Overflow]: http://stackoverflow.com
[jQuery Mobile]: http://jquerymobile.com/
[phonegap]: http://phonegap.com
[ppt]: https://play.google.com/store/apps/details?id=com.chrisallenlane.presentationtimerpro
