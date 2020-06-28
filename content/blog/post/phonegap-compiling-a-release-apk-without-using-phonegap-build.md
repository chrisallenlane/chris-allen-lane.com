---
title: "PhoneGap: Compiling a Release APK without using PhoneGap Build"
description: Notes on compiling a release APK in Phonegap.
date: 2012-12-19
tags:
  - android
  - mobile
  - phonegap
---

While recently finishing up [my first PhoneGap application][1] (which was
tailored strictly for the Android platform), I encountered a problem that
wasted some of my time. I'm documenting the problem and solution below for the
sake of others who may run into the same issue.

<!--more-->

The Problem
-----------
When you're compiling a PhoneGap application for release, the PhoneGap team
seems to expect that you'll use [PhoneGap build][2] to package your
application. That was not an option for me, however, because the PhoneGap build
system only allows you to upload your web asset files for compilation (ie,
those that live in `app-root/assets/www`). For [reasons documented
elsewhere][3], that didn't work for me, because I was forced to modify my
application's main Java file by hand.

Though I assume that this is a fairly common problem, I had a hard time
tracking down precisely how to compile an APK for release without using
PhoneGap build. Learning how to do so required some sleuthing.

Reversing Cordova
-----------------
My first step in figuring out how to build a release APK was simply to take a
look at some of the Cordova code, where I noticed that `app-root/cordova/BOOM`
was simply a wrapper that invoked `app-root/cordova/cordova BOOM`. Inspecting
`app-root/cordova/cordova`, I then discovered that `BOOM` merely invokes `ant
clean` and `ant debug` to generate the debugging APKs.

With that, I knew that `ant` was actually doing all of the work behind the
scenes. (This would probably be obvious to a Java developer, but I have
virtually no Java experience.) Once I knew that Cordova was silently invoking
the native Android tool chain for compilation, I began reading the appropriate
SDK documentation.

The Android Build Process
-------------------------
I learned a few things from the Android SDK documentation. The first was that
an Android application must be cryptographically signed before it can be
published to the Google Play store, and that [the APKs produced by `debug` and
`BOOM` were being automatically signed by a debugging key][4]. (I also learned
that APKs that were signed by a debugging key may not be distributed in the
Play store, so don't waste your time trying to do so.)

I also learned that [there are two ways to compile a release APK][5]:

### First Approach ###
1. Generate a debug APK
2. Sign it
3. Align it

### Second Approach ###
1. Generate an unsigned APK from scratch
2. Sign and align it in one step

(The concept of "alignment" was new to me, but it seems to be some form of
compression/file arrangement whereby asset bytes are aligned in some specified
way. My important takeaway here wasn't the details - about which I really
didn't care - but that this was a step that needed to be done.)

Simply put, that first approach didn't work for me. I had a recurring problem
whereby the APK that was supposed to be unsigned was not signing correctly. (At
least, that's what [this thread on Stack Overflow][6] led me to believe.) Not
wanting to waste time, I moved on and tried the second approach.

The Solution
------------
My first step in successfully building a release APK was to create a private
key with which I could sign the application. I used a shell command modeled
after the following to generate a new key:

    keytool -genkey -v -keystore my-release-key.keystore -alias alias_name \
    -keyalg RSA -keysize 2048-validity 10000

The resultant key is a _private_ key. Do not distribute it with your
application!

I then added the following two lines to `app-root/ant.properties`:

    key.store=/path/to/my-release-key.keystore
    key.alias=alias_name

(Obviously, you would substitute your actual key name, path, and alias above.)

I was then able to compile a release APK using:

    jarsigner -verbose -sigalg MD5withRSA -digestalg SHA1 -keystore
    my-release-key.keystore my_application.apk alias_name

With this I had a release APK that I was able to successfully upload to the
Play store for distribution.

[1]: https://play.google.com/store/apps/details?id=com.chrisallenlane.presentationtimerpro&amp;feature=search_result
[2]: https://build.phonegap.com/
[3]: /blog/post/phonegap-prevent-an-android-devices-screen-from-sleeping/
[4]: http://community.phonegap.com/nitobi/topics/why_does_my_apk_file_have_debug
[5]: http://developer.android.com/tools/publishing/app-signing.html#releasemode
[6]: https://stackoverflow.com/questions/5089042/jarsigner-unable-to-sign-jar-java-util-zip-zipexception-invalid-entry-compres
