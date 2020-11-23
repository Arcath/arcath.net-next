---
title: Building Windows 10 Images
lead: Keeping up with the Windows releases.
date: 2016-02-01T14:26:00+00:00
tags:
 - Windows 10
---
Windows 10 is fantastic and naturally lots of my Schools are chomping at the bit to get it deployed to their devices.

This has lead to a couple of problematic image builds over the past couple of months due to sysprep being unable to complete **after** the store has been setup for a user. It seems that if you want to sysprep an image you can’t use the store **or** let Windows 10 do a big update e.g. 1511.

Our existing method for build images was pretty close to working there are just a few gotchas that needed to be corrected before first login.

We had to start from scratch. No updating the existing 7 or 8.1 image it had to be a fresh install, and an up to date 10 version as well we couldn’t install the 1511 update ourselves it has to be pre-installed. This means getting an *install.wim* from the latest edition of Windows 10 we wanted to use which for us was *Windows 10 Education 1511*. We then added that to our WDS server as a deployable image. Personally I prefer having the clean disk images on WDS just as a backup but they can be removed after creating the base image.

Next we needed to get around the stores first run which since we wanted the sore gone anyway we decided to do with the domain. This meant getting a GPO to turn the store off and getting the image to join the domain straight from imaging.

An unattended join of the domain is nothing new, I use it in all my schools and there are plenty of guides on how to do it on the internet already like [this one](http://sharepointgeorge.com/2009/windows-deployment-services-waik-and-windows-7-part1/) so I wont go into detail here.

I spent quite a while trying to get [Windows SIM](https://technet.microsoft.com/en-gb/library/hh824929.aspx) to generate my catalog file, with 7 the .clg was on the disk but for some reason Microsoft no longer provide them so we had to generate it. It appears the SIM can’t generate a catalog unless you are on the same OS as the catalog is for. Reading into the issues to begin with confused me as it only mention processor architecture not OS version, once I tried on a machine running Education 1511 is went through straight away.

Now that we had the *base image* ready to deploy and join the domain by itself we needed to make the domain turn off the store. We grabbed the ADMX templates from [here](https://www.microsoft.com/en-us/download/details.aspx?id=48257) and dropped them into the central store on our Domain. We added a new GPO that applied to all our users and added the following config:

`User Configuration -> Policies -> Administrative Templates -> Windows Components -> Store`

enable `Turn off the Store Application`

After getting that GPO setup the base image deployed no problem, joined the domain and sat on the login screen. First login by an administrator *did not* cause the store to initialize which in turn meant that we could sysprep that image.

## Future Issues

Having updates like 1511 cause sysprep to break is going to be a right pain. We will either have to let big updates through WSUS and hope that all clients install them successfully or build the image again on the new updated version.

Not great.

I hope that Microsoft do something about this issues before the Redstone update otherwise they are drastically increasing our workload if we want to stay up to date.
