---
title: Squirrel Release Server
lead: Simple php update provider for squirrel (electron)
date: 2016-11-01T11:26:00Z
tags:
 - PHP
 - Electron
---
Squirrel Release Server is a low featured release server for squirrel.

It supports:

  - Windows clients.
  - Listing all releases after and including the local users current version.
  - Delta updates to reduce file size.

And thats it!

This is all I needed it to support. Our app is Windows only and installed by us using an MSI. I had been using [Electron Release Server](https://github.com/ArekSredzki/electron-release-server) which worked but was lacking the support the delta updates. I also begrudged having another service running with a full UI when our users never saw it.

Delta updates are the main reason I wrote Squirrel Release Server. Our apps `nupkgs` are around 70MB which given the number of clients mean a huge amount of bandwidth used for each update. This is both on our server and the schools internet connections, ever thinking of our customers we didn’t want the start of a computing lesson to mean 30 laptops downloading 70MB each slowing file access etc…

Our latest update was made available as a 100KB delta. That turns the 2.1GB download from above into 3MB. Squirrel appears to take the path of least download. Preferring to update from 0.2.0 to 0.2.3 using 0.2.1-delta, 0.2.2-delta and 0.2.3-delta instead of 0.2.3-full.

PHP might sound like an odd choice but we already have the infrastructure in place to host PHP files without much issue.

We use GitLab for our applications source with the GitLab CI runner on the server that hosts squirrel release server. Updates get built and copied into place automatically after a push to the master branch. This saves building the releases on my Surface (slowly) to upload them to Electron Release Server.

## Using Squirrel Release Server

You can grab a copy from the [git repository](https://github.com/Arcath/squirrel-release-server) which also contains the IIS and apache config required for it to work.

Run `composer install` to install the dependencies. Edit `config.json` so that baseurl matches the path to your install.

You now need to create a releases folder. Inside which you need a win64 and win32 folder. Place you win64 nupkgs in the win64 folder and win32 in win32.

Tell Squirrel to update from http://www.yourdomain.com/yourapp/win64. Assuming that Squirrel release server is in the yourapp folder and you want the win64 updates.

That is it. Squirrel and Squirrel Release Server then does everything you need to install the update.

Squirrel Release Server serves any nupkg in the right folder, this gives the ability to do as I do and have your CI copy the built packages into place.

## The Future

Squirrel Release Server is very low featured, very are some obvious improvements that can be made mainly Mac support but I don’t have a Mac or a squirrel app that works on Mac to test with (PRs welcome).
