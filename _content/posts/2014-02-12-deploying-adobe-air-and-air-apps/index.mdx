---
title: Deploying Adobe Air and Air Apps
lead: It's easy enough to deploy Adobe Air and Apps with a script
date: 2014-02-12T09:29:00+00:00
tags:
 - Ed-IT Solutions
---
As much as I hate Adobe Air some deluded companies think its the best way to make software and I’ve been forced on more than one occasion to deploy it to the whole network, which leads nicely into the big problem… There is no MSI and just as annoying software for it are .air files that it wants to install…

Adobe Air does have a silent install option so its deployment can be scripted, my (& my companies) method of deploying silent exes is to use this script:

```vb
dim shell, DQ, MSI_store, vbsinstall_folder, path_to_exe, options, chkfile

' Constants

DQ = chr(34)
Set FSys = CreateObject("Scripting.FileSystemObject")
vbsinstall_folder = "C:\vbs_install\" 'path to store keys in

if Not Fsys.FolderExists(vbsinstall_folder) Then
	Fsys.CreateFolder(vbsinstall_folder)
End If

' specify installations here
' Install Function takes three params
' First path to exe in quotes
' Second any params to make it silent etc in quotes
' Third file to check against to see if installed (this should include version number) in quotes

Install "\\path\to\installer.exe", "/options /to /make /it /silent", "Identifying key"

' Install After takes an extra option to make sure that it doesnt install until after something else

Install_After "\\path\to\installer.exe", "/options /to /make /it /silent", "Identifying key", "Prereq Key"

' Install Function

Sub Install(path_to_exe, options, chkfile)

	if Not FSys.FileExists(vbsinstall_folder & chkfile) Then

		set shell=createobject("wscript.shell")
		shell.run DQ & path_to_exe & DQ & options ,0 ,true
		set shell=nothing

		Fsys.CreateTextFile vbsinstall_folder & chkfile

	End if

End Sub

' Install After

Sub Install_After(path_to_exe, options, chkfile, prereq)
	if FSys.FileExists(vbsinstall_folder & prereq) Then
		Install path_to_exe, options, chkfile
	End if
End Sub

Wscript.Quit
```

The script documents what you need to do but the install line for Adobe Air would be:

```vb
Install "\\path\to\installer.exe", "-silent -eulaAccepted", "AdobeAir-X-Y"
```

Subsitute X & Y in the key for the version you are deploying e.g. 4-0. You will need to use this method to update Air in the future, so specifying the version number saves you having to remove the key later. Obviously drop the `-eulaAccepted` if you can’t accept it for the end user and want them to do it themselves.

Air provides an installer for apps that you can run silently, but you need to run it after Air has installed (In most cases I only depoy air when it is actually needed so its going out at the same time as an app).

Our script has another install function called `Install_After` that takes a 4th option. This 4th option is a key to check before running the install, the install will then only procede if that key exists. Taking this into account the install line for an Air app would be:

```vb
Install_After "C:\Program Files (x86)\Adobe\Flash\AddIns\airappinstaller\airappinstaller.exe", "-silent \\path\to\air\app\with\no\spaces.air", "App", "AdobeAir-X-Y"
```

This ensures that the installer wont be run before Air is installed and can even be used to make sure that a new version of Air is installed before running.

The installed app will not have a shortcut anywhere so you will need to add them manually using your domain.

Thats about it, our script makes deploying stuff via silent exes quite easy and safe. You can use GPP to delete the key files and have the script automatically re-install the software (unless the exe see the target product and ignores the request).
