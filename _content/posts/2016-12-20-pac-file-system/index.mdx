---
title: A PAC File System using Jekyll
date: 2016-12-20T12:29:00Z
lead: Creating easy to maintain pac files using Jekyll.
tags:
 - Jekyll
---


A PAC (Proxy Auto-Config) File is a small javascript file that a browser can be configured to use when choosing a proxy server. For a few reasons over at [Ed-IT Solutions](https://www.ed-itsolutions.com/), we decided we needed a PAC file system to create these files for each school.

Normally a school’s ISP or filtering solution provides the PAC file but we have found issues with some due to them being too generic.

The one provided by [Censor Net](https://www.censornet.com/solutions/education) is great, but it needs some exceptions. When using NTLM authentication on the proxy some programs (iTunes & Java updater to name a couple) don’t use NTLM and instead prompt for a username and password. With complete control of the firewall, I can allow requests to Apple through without the proxy. I just need the PAC file to send Apple requests directly.

The [BT Lancashire Services PAC](http://www.btlancashire.co.uk/) file is just plain awful. They have aimed for every school in one PAC file by using a huge if/else statement. That’s right there is currently an if with 53 else’s to decide which school you are and which port to use on the proxy server. I feel for the last school on the list who have to wait for 52 falses before it works out if they should use the proxy. When the school is found it then only uses the proxy for requests to google, youtube, and bing which doesn’t solve the SSL error for block pages. Even worse are the schools who use the PAC file but don’t need to, 53 falses then it returns DIRECT.

[Cumbria ICT Centre](http://cict.org.uk/) don’t provide one that I know of. This puts all the config into the browser which can be an issue with applications that can only take a basic proxy config.

## The Solution

We decided that our best solution was to create our own PAC file. Not wanting to repeat the mistakes of BT Lancashire Services we opted for a PAC file per school.

Generating a few static pages from even fewer templates sounds like a great job for Jekyll. Jekyll doesn’t care what you put into it. If it has a front matter it builds it, if it doesn’t Jekyll just copies it. There was a little hack needed to get the .htaccess to copy over neatly which you can find here.

Each school has a .pac file which has a front matter and no content. The front matter needs a few things set in it including:

  - Which template to use.
  - The school’s name (for a comment at the top).
  - The school’s domain name.
  - The IP ranges in the school.
  - The proxy server port (each school has their own port for BT LS).

Jekyll then builds each PAC file like it would any page from the supplied layout. Not every variable is used in every layout and there are some pretty big differences between each.

I added a comment to the top of the PAC file with the git commit hash using this [Jekyll plugin](https://github.com/yegor256/jekyll-git-hash) so we can see when caching is happening.

We then get GitLab CI to build the site for us on one of our web servers. Zero downtime deployments!

Having all our PAC files built from a list of templates saves the issues we have had in the past with PAC files hosted in the schools getting outdated.

## The Future

This system is very flexible. Jekyll can have infinite templates or PAC files added to it with zero slowdowns. We won’t have to split schools between servers and try to balance any load as we are just serving static files.

For now, we are using it in a few test schools to ensure that our PAC files work as intended and the speed is as good as we expect.

Once we are happy we are going to roll it out to every school, even if they need no proxy settings. We have a template called direct which as you might have guessed returns DIRECT for every request. This allows a school to use a PAC file that does nothing so that if and when they change filtering solution we can change the template in the config and sit back as they suddenly start using a proxy server with no on site config changes.
