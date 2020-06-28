---
title: "Wordpress: Format wp_head() Output as HTML 4.01 Transitional"
description: Notes on formatting wp_head() output in Wordpress.
date: 2012-03-31
tags:
  - wordpress
---

While I'm no longer as much of a purist as I used to be, whenever I'm tasked
with writing HTML, I usually go to great lengths to make sure that it is valid.
For academic reasons beyond the scope of this artcle, my preferred DOCTYPE is
still HTML 4.01 Transitional, and I almost always code - and validate my code -
to that standard.

Having been doing a lot of Wordpress work recently, however, I've discovered an
annoying Wordpress quirk that can make it difficult to produce valid HTML 4.01
Transitional code: the [`wp_head()`][1] method outputs markup formatted for
XHTML, and thus, its output will register as invalid when validated against the
HTML 4.01 Transitional DOCTYPE.

<!--more-->

This problem is easily solved, however. Rather than calling `wp_head()` within
a theme directly, I've just started using a modified function instead:

```php
<?php
/**
 * Returns wp_head() formatted for an HTML 4.01 transitional DOCTYPE
 * 
 * @return string $html
 */
function wp_head_html_401(){
    ob_start();
    wp_head();
    $html = ob_get_clean();
    $html = str_replace('/>', '>', $html);
    return $html;
}
```

The above function can be copied into your `functions.php` file, and simply
invoked in your `header.php` file. (Remember to echo the output of this
function in your header file, since, unlike the original `wp_head()` function,
this function returns, rather than echoes, its output. I'm generally not a fan
of functions which echo their output by default.)

What this code is doing should be fairly obvious: we're starting an output
buffer, running `wp_head()`, and doing a simple string substitution on the
output. We are thus able to generate markup that's compliant with our desired
DOCTYPE.

[1]: http://codex.wordpress.org/Plugin_API/Action_Reference/wp_head
