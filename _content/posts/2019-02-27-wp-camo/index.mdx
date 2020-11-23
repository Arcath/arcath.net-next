---
title: WP-Camo
lead: Proxy images through your WordPress site
date: 2019-02-27T10:00:15.571Z
tags:
  - WordPress
---
WP-Camo is a WordPress plugin I wrote for [Ed-IT Solutions](https://www.ed-itsolutions.com). It was designed to fix 2 issues we had with the WordPress sites that we where building.

## Mixed Content Errors

We use HTTPS for all the sites that we host. This gives us all the security and privacy of HTTPS as well as letting us get better performance through http/2.

Our issue here was with hotlinking resources from other sites. I make sure that any off-domain resources used in themes and plugins are loaded over https but when the user is adding content to the site is another matter.

A common issue I've had is with _badges_ that the clients want on pages of thier sites. _It's easy_, the badge owner will proclaim, _just put this code on your page_. Cue the site loading _http://somegroup/logo.jpg_ to a mixed content error.

Long term I will come along and download, upload and relink the image so its hosted on server with the site but in the short term I'd like the site to not throw mixed content errors at the users trying to see it.

## Bypassing Filtering

Our other big niggle was with images on un-trusted sites. Mainly Facebook, which in schools is blocked for all pupils and most staff. We had these big _holes_ in the layout where images from the Facebook feed should be.

We can't ask schools to unblock Facebook so that thier sites look right and I didn't want to have the themes do error detection and swap out the image etc...

THe only solution I could come up with was the proxy the images through the site so that instead of https://fbcdn.com/someimage.jpg its https://www.school.county.sch.uk/wp-content/wp-camo/hash.jpg which is an allowed URL.

This is similar to how GitHub handles images using [camo](https://github.com/atmos/camo).

## WP-Camo

WP-Camo does everything we need it to and does it without any noticable performance loss.

As of 1.0.0 instead of proxying the request on demand like camo does, WP-Camo now does all the work during the `apply_filters` call. WP-Camo requests the image and saves it into the `wp-content/uploads/wp-camo` directory and returns that URL from the filter.

One of the great features of WordPress' filters is that if there are no filters for the given name the original data is returned. This lets us use the WP-Camo filter everywhere we might need it without having to worry that the clients site might not have the WP-Camo plugin installed.

WP-Camo's source is available on [GitHub](https://github.com/Ed-ITSolutions/wp-camo) and you can grab a copy of the plugin from the [plugin directory](https://wordpress.org/plugins/wp-camo/#description).
