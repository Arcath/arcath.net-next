---
title: Theme Options
lead: A composer module to help with the theme customizer in WordPress.
date: 2017-03-29T10:11:00Z
tags:
 - WordPress
---
My latest composer release is a small library to help with theme options in WordPress. It provides a simple interface for defining theme options and retrieving them later.

I made this library quite a while ago and manually copied it from theme to theme as I built them. Newer themes have newer versions and I decided it was time to move it onto composer.

I originally built it to replace the function `themeslug_theme_option_or_default('option_name', 'default_value');` which required me to remember the default value everywhere I used the option. Theme options solves this by having you declare your options in the `init` action. Now when you call `$themeOptions->themeOption('option_name');` it handles returning the default value if needed.

## Getting it.

You can get theme options from composer using

> composer require arcath/theme-options

or [download it from GitHub](https://github.com/Arcath/theme-options).

Once you have it require it (or use composers autoload) at the top of your `functions.php`.

## Using It.

Somewhere near the top of your `functions.php` you need to create a new instance of `Arcath\ThemeOptions` and pass your themes slug. This instance then needs to be globally referenced whenever you want to use it.

```php
<?php
$themeOptions = new Arcath\ThemeOptions('theme_slug');

add_action('init', function(){
  global $themeOptions;

  // Add an option using a custom control class
  $themeOptions->addThemeOptionCustomControl('logo_light',
    array(
      'type' => 'option',
      'default' => 0
    ),
    array(
      'section' => 'home',
      'label' => __('Light Logo', 'theme_slug'),
      'description' => __('Light Logo used on darker backgrounds', 'theme_slug'),
    ),
    'WP_Customize_Image_Control'
  );

  // Add an option with the standard control class
  $themeOptions->addThemeOption('phone_number',
    array(
      'capability' => 'edit_theme_options',
      'type'       => 'option',
      'default'    => '0123456789',
    ),
    array(
      'label' => 'Phone Number',
      'section' => 'home',
      'description' => __('Your Phone Number', 'theme_slug')
    )
  );
});
add_action('customize_register', function($wp_customize){
  // Create the required sections
  $wp_customize->add_section(
    'home',
    array(
      'title' => 'Home',
      'description' => __('Home Page Template options.', 'theme_slug'),
      'capability' => 'edit_theme_options',
    )
  );
});
?>
```

To define an option you use either `addThemeOption` or `addThemeOptionCustomControl`. Both take the same 3 arguments with `addThemeOptionCustomControl` taking a 4th.

  - `Option Name`, The name of your option, used to recall it later.
  - `Setting Options`, Passed to `$wp_customize->addSetting`. You can omit the setting name. The default supplied here will be used as the default when you ask for the option later.
  - `Control Options`, Passed to `$wp_customize->addControl`. You can omit the setting name.
  - `Control Class Name`, A string containing the name of the class you want to use for your control. Only used by `addThemeOptionCustomControl`.

To use your theme options in your theme simply call themeOption and pass the name of your setting.

```php
<?php
global $themeOptions;

echo($themeOptions->themeOption('phone_number'));
?>
```

Theme options is a pretty simple library, I will update it more in the future as I need to. Feel free to open issues on GitHub if you have any suggestions or issues.
