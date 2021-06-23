---
title: wp_enqueue_less a replacement for WP-Less
lead: A new LESS compiler for WordPress
date: 2018-07-06T11:20:00+01:00
tags:
 - WordPress
---
I’ve used WP-Less for a couple of years now and been pretty happy with it, but on a couple of occasions I’ve had issues with it and with and the underlying [lessphp](https://github.com/leafo/lessphp).

There is a filter that can make it use the more upto date less.php instead but the fiter seemed to be ignored when I tried to use it.

This has lead me to having to build a replacement, which is something I’ve looked at on more than one occasion. With my replacement I want to:

  - Use less.php instead of lessphp
  - Use composer properly and have the functions loaded through vendor/autoload.php.
  - Only provide the function, if a theme or plugin wants less support they can use the composer module instead of installing a plugin.

## `wp_enqueue_less`

I was surprised how easy this was to make. WP-Less has quite a lot of code and I assumed wrongly that it would take as much or more to do what I wanted. The current version (0.0.4) is only 91 lines of code and it ticks all my requirements.

There are 3 parts to `wp_enqueue_less`, the function called by the theme, an action to parse and cache the less file, and a wp-cron task to tidy up unused stylesheets.

Both the action and cron job are internal to `wp_enqueue_less` and should not be used by themes directly.

### The Function

The function `wp_enqueue_less` takes 3 options.

  - key – The identifying key for this stylesheet.
  - file – The on disk path of the stylesheet (e.g. `get_template_directory() . '/style.less'`)
  - variables  – An array of variables to pass to the less compiler. The array should take for form variableName => value.

```php
add_action('wp_enqueue_scripts', function(){
  wp_enqueue_less('theme-main', get_template_directory() . '/less/main.less', array(
    'main-color' => '#99bbff' // Becomes @main-color in your less stylesheet
  ));
});
```

As mentioned in my original post about wp-less I get my variables from the theme customizer. If you need a way of interacting with the theme customiser my [theme options](/2017/03/theme-options/) library is a great place to start.

The fuction then fetches its data about the stylesheet from the database. If it doesn’t have any it calls the less compile action to compile the stylesheet and build up the data object.

If it does have data it then begins some comparisons. It first checks if the variables have been changed by hashing them and comparing them to the stored hash. If they have changed the action is called, if they haven’t it continues on.

Next it compares the file hashes of all the included less files, if any of them have changed it will call the action, if not it continues.

At this point either the stylesheet is new and got built, changed and got built or remained the same and should exist in the cache directory already. All that is left is to call wp_enqueue_style to queue up the cached stylesheet.

Lastly it ensures that the cron job exists.

## The Action

The action takes 2 options.

  - The internal data object for the stylesheet
  - An array of variables.

It’s then a simple process of using less.php to compile the stylesheet and save the outputted css to a css file in the uploads directory.

It then saves the hash, the file hashes and the variables hash to the data object and returns.

## The Cron Job

Because `wp_enqueue_less` writes a css file for each hash (to browser cache bust) if left unchecked it could fill up your webserver with random css files. The cron job solves this by  going through the output folder and deleting all files other than the current file for each stylesheet key.

## Use it

`wp_enqueue_less` has been released through the Ed-IT Solutions Git Hub org as an open source library and is availbe on composer as `ed-itsolutions/wp_enqueue_less`. You can install it quickly using:

```bash
composer require ed-itsolutions.wp_enqueue_less
```

Require composers autoload like normal and thats it, you now have the function wp_enqueue_less.

There are 2 filters that changed the directory of the cached css files.

  - `wp_enqueue_less_css_dir` – Needs to return the on disk path to the less css cache. Defaults to wp-content/uploads/less
  - `wp_enqueue_less_css_url` – Needs to return the URL of the less css folder.

I’ve swapped most of our themes over to `wp_enqueue_less` without much hassle and will be using and updating it for all our themes.
