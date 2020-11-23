---
title: Using WIX to create an MSI
lead: Scratch 3 is here, and there is no official MSI.
date: 2019-03-08T10:45:08.168Z
tags:
  - Work
  - Deploymets
  - WIX
---
I've had the odd rant on twitter before about companies that aim software at education and then provide no MSI to deploy it. I'm not going to repeat that rant here but suffice to say [Scratch 3](https://scratch.mit.edu/download) has followed [Scratch 2](https://scratch.mit.edu/download/scratch2)'s example of only giving us an exe.

Scratch 3 is _RunPointable_ which is my way of saying the software is all files and just be copied around instead of installed. A lot of software falls into this category and I've used a [robocopy](/2018/12/robocopy) script in the past to _deploy_ the RunPoints folder. This doesn't feel great to me. Theres an overhead at each school to setup the script, it doesn't create shortcuts and its all very _manual_.

I've looked into [Wix](http://wixtoolset.org/) in the past and got lost in its config but I decided to wade in again and try to get something working out of it. After a fair bit hacking and slashing I was close to something but it was not pretty. I then spoke to a user on [EduGeek](https://www.edugeek.net) who had created the Wix Config for Scratch 3 and he was kind enough to [share them](https://github.com/tweaktech/Scratch-Desktop-MSI). This gave me a _working example_ to go from which was all I needed.

After looking at the config I quickly realsied that with a bit of PowerShell I could edit the xml files and create a msi for __any folder with an exe in it__. So thats what I've made.

https://github.com/Ed-ITSolutions/create-msi-installer-from-folder

I've been updating the script a lot as I've been using it and with the _0.0.1_ release it is pretty stable.

With 0.0.1 I used this command to create the MSI for Scratch 3

```powershell
.\create-msi-installer-from-folder.ps1 `
-Path "C:\Users\adam\AppData\Local\Programs\scratch-desktop" `
-Product "Scratch 3 Desktop" `
-Version "1.2.1" `
-Executable "Scratch Desktop.exe" `
-Manufacturer "MIT" `
-Contact "Ed-IT Solutions" `
-HelpLink "https://www.ed-itsolutions.com" `
-AboutLink "https://scratch.mit.edu/" `
-DownloadLink "https://scratch.mit.edu/download" `
-Desktop
```

Theres a lot of options there but its quite simple.

 - `Path` Sets the folder to build the msi from.
 - `Product` Is the descriptive name of the product which is used for its folder in `Program Files` and its name in Programs and Features.
 - `Version` is the version of this product. For Scratch 3 (at the time of wiriting) this is `1.2.1`.
 - `Executable` is the location of the exe within `Path`.

After this all the options are optional.

 - `Manufacturer` is the Manufacturer reported to the client.
 - `Contact` is the support contact reported to the client.
 - `HelpLink` is the support address reported to the client.
 - `AboutLink` is the address of the programs website.
 - `DownloadLink` is the url of the page to download this program.
 - `Desktop` is a switch for creating a desktop shortcut during install.

There are more options that can befound in the Readme but this is all I need for Scratch 3.

I've already used it to successfully deploy:

 - Scratch 3
 - [Amazon Kindle PC](https://www.amazon.co.uk/gp/help/customer/display.html?nodeId=201245960)
 - [BBC iPlayer Downloads](https://www.bbc.co.uk/iplayer/install)

And there are so many more things that I will not use _RunPoints_ for any more. I plan on creating a site with a library of confirmed working software and the commands used to build them but thats a little way off at the moment.

I have quite a few ideas for the future that I will implement as I need them, for example providing a `.reg` file to be imported and on complete commands. PRs and suggestions are welcome on the repo and I hope others find it as usefull as we have.
