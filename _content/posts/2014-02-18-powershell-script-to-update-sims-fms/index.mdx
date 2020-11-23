---
title: Powershell script to update SIMS & FMS
date: 2014-02-18T14:25:00+00:00
lead: A script that handles updates for SIMS & FMS in the absence of SOLUS 3
tags:
 - Powershell
 - Ed-IT Solutions
 - SIMS
---
SIMS is a large application made by Capita that the schools are forced to use by the LEA, one of its many *features* is that it installs its own updates on launch (in theory) but over the years I’ve had no end of problems with it either not updating or failing to update properly so I started looking into scripting it.

There is an EXE called `SIMSLoad.exe` that when run does nothing but install updates! Even on machines that have failed or just never decided to update. My first idea was to use this EXE to trigger updates, maybe by adding it as a startup script but I couldn’t get it to run silently.

Next came the idea to copy its functionality which at a very basic level is to check the `SIMS\Setups` Directory for the installer versions and compare them to the versions `SIMSLoad.ini` says are installed on this machine. If there are any differences it installs the version from the server.

This is the script I came up with:

```powershell
$SimsInstall = "C:\Program Files (x86)\SIMS\Sims .net"
$FMSInstall = "C:\Program Files (x86)\SIMS\FMSSQL"

if(Test-Path $SimsInstall){
    Get-Content ($SimsInstall + "\SimsLoad.ini") | ForEach {
        $application, $version = $_.Split("=")

        if(!($application -Match "Last")){
            $current_version = [System.Diagnostics.FileVersionInfo]::GetVersionInfo($SimsPath + "\Setups\" + $application + ".exe").FileVersion
            if($current_version.compareTo($version)){
                $install = $SimsPath + "\Setups\" + $application + '.exe'
                & $install '{QuietMode} [SIMSDotNetDirectory]="' + $SimsInstall + '"'
            }
        }
    }
}

if(Test-Path $FMSInstall){
    Get-Content ($FMSInstall + "\FMSLoad.ini") | ForEach {
        $application, $version = $_.Split("=")

        if(!($application -Match "Last")){
            $current_version = [System.Diagnostics.FileVersionInfo]::GetVersionInfo($SimsPath + "\Setups\FMS\" + $application + ".exe").FileVersion
            if($current_version.compareTo($version)){
                $install = $SimsPath + "\Setups\FMS\" + $application + '.exe'
                & $install '{QuietMode}'
            }
        }
    }
}
```

So what does this script do? For `SIMSLoad.ini` and `FMSLoad.ini` it runs through all the applications listed in the file discarding any that contain "_last_" to ignore the check dates and then gets the current version from the EXE on the server. If the versions do not match (assuming that the only cause for this is that the server has been updated and this client hasn’t) it then runs that applications installer silently.

This script does require a permissions change on your SIMS share due to it being run on startup as SYSTEM. Firstly add all the machines with SIMS or FMS on to a security group in AD (I called mine `SIMS Machines`) then give `SYSTEM` and `SIMS Machines` read access to the shared area.

## A Disclaimer

This script subverts SIMS normal updater and although it works fine for me you will need to perform significant testing before you roll it out to end users machines.

You can fake the need for a SIMS update by lowering the version numbers in SIMSLoad.ini and I urge you to mess around with this as much as possible before you make the final decision about using this script.

By using this script you agree that any damage caused to your SIMS is your fault, I can’t predict how it will effect updates years down the line.

I will happily respond to queries about this script and any suggestions for improvements will be taken seriously.
