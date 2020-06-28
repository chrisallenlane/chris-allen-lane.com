---
title: "PhoneGap: Prevent an Android Device's Screen from Sleeping"
description: How to prevent an Android device's screen from sleeping using Phonegap.
date: 2012-11-08
tags:
  - android
  - mobile
  - phonegap
---

I'm currently developing an Android application via PhoneGap. It took me two
entire workdays to learn how to prevent this application's screen from dimming
or sleeping (after 5 minutes of inactivity), so I want to document what I
learned here for the sake of others who need to solve the same problem.

<!--more-->

First, let's discuss a few strategies that will **not** work. Keep in mind that
I'm working specifically in the PhoneGap environment (around the time of
Cordova version 2), and that "Your Mileage May Vary" if you're working outside
of PhoneGap.


What Did Not Work
-----------------
### Modifying config.xml ###
I thought there might be a way to change this behavior in `config.xml`, but
that seems not to be the case. [It seems that this functionality is planned for
a later release, however][1].

### Modifying AndroidManifest.xml ###
[Some][2] [sources][3] said that adding `android:keepScreenOn="true"` to
AndroidManifest.xml would solve this problem. Simply put, it didn't work for
me.

### Using the PowerManagement PhoneGap plugin ###
[This plugin][4] seems to have been designed to do exactly what we want -
however, it just doesn't work anymore. [The problem seems to be that it was
broken by changes in Cordova sometime beyond the 1.6 version][5], so if you're
working with a version newer than that, don't waste your time.

### Trying to simulate user interactions with jQuery Mobile ###
Out of desperation, I tried something cute: I created a link within my
application whose `href` was simply `javascript:void(0)`.  I then created a
timer that would invoke a jQuery `.click()` event on that link every 30
seconds.

This didn't work either, presumably because the JavaScript layer sits "above"
the Android/hardware layer, which didn't buy the ruse that an event triggered
in JavaScript was caused by the touch of a user's finger. (I would, in fact,
consider this to be a bug in Android should this have worked, so I'm glad it
didn't).


What Did Work
-------------
Ultimately, [this answer on Stack Overflow][6] pointed me in the right
direction. In the case of PhoneGap, however (at least as of the time of this
writing), it was missing an important detail: **You must import some extra
dependencies at the beginning of your application's main Java file**:

   import android.view.WindowManager;
   import android.view.Window;

(When I say your "application's main Java file", I mean the file that lives
within `approot/src/`. For me, it was
`approot/src/com/chrisallenlane/presentationtimerpro/PresentationTimerPro.java`.)

As an example in-context, the following file worked for me:

```java
package com.chrisallenlane.presentationtimerpro;

import android.app.Activity;
import android.os.Bundle;
import org.apache.cordova.*;

// add the following import statements
import android.view.WindowManager;
import android.view.Window;

public class PresentationTimerPro extends DroidGap
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        // this is the specific line that prevents the screen from sleeping
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        super.loadUrl("file:///android_asset/www/index.html");
    }
}
```

I hope this saves you some time.

[1]: http://community.phonegap.com/nitobi/topics/dimming_screen
[2]: http://stackoverflow.com/a/12706803/461108
[3]: http://www.coderzheaven.com/2011/09/03/how-to-keep-your-screen-on-through-xml-in-android/
[4]: https://github.com/phonegap/phonegap-plugins/tree/master/Android/PowerManagement
[5]: https://github.com/phonegap/phonegap-plugins/pull/799
[6]: http://stackoverflow.com/a/2134602/461108

