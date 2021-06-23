---
title: Caching Apple downloads on a Windows server
lead: Following my recent post I look at how to implement Apple caching on a Windows server.
date: 2015-07-15T16:04:00+01:00
tags:
 - Apple
 - Squid
---
Yesterday I posted about [caching apple downloads](/2015/07/caching-apple-downloads/) which was great but most of my schools do not have a linux server available nor do they have the spare equipment to setup anything that could be considered reliable enough.

Now we do have plenty of Windows capacity so we need to run squid on a Windows server.

A quick google and yes there is a version of [squid for Windows](http://docs.diladele.com/tutorials/installing_squid_windows/index.html) which I installed to D:\Squid.

The default config is pretty good and is 2 line changes away from being a caching server and then only needs the rules for the Apple download servers.

```js
#
# Recommended minimum configuration:
#

# Example rule allowing access from your local networks.
# Adapt to list your (internal) IP networks from where browsing
# should be allowed
acl localnet src 10.0.0.0/8	# RFC1918 possible internal network
acl localnet src 172.16.0.0/12	# RFC1918 possible internal network
acl localnet src 192.168.0.0/16	# RFC1918 possible internal network
acl localnet src fc00::/7       # RFC 4193 local private network range
acl localnet src fe80::/10      # RFC 4291 link-local (directly plugged) machines

acl SSL_ports port 443
acl Safe_ports port 80		# http
acl Safe_ports port 21		# ftp
acl Safe_ports port 443		# https
acl Safe_ports port 70		# gopher
acl Safe_ports port 210		# wais
acl Safe_ports port 1025-65535	# unregistered ports
acl Safe_ports port 280		# http-mgmt
acl Safe_ports port 488		# gss-http
acl Safe_ports port 591		# filemaker
acl Safe_ports port 777		# multiling http
acl CONNECT method CONNECT

#
# Recommended minimum Access Permission configuration:
#
# Deny requests to certain unsafe ports
http_access deny !Safe_ports

# Deny CONNECT to other than secure SSL ports
http_access deny CONNECT !SSL_ports

# Only allow cachemgr access from localhost
http_access allow localhost manager
http_access deny manager

# We strongly recommend the following be uncommented to protect innocent
# web applications running on the proxy server who think the only
# one who can access services on "localhost" is a local user
#http_access deny to_localhost

#
# INSERT YOUR OWN RULE(S) HERE TO ALLOW ACCESS FROM YOUR CLIENTS
#

# Example rule allowing access from your local networks.
# Adapt localnet in the ACL section to list your (internal) IP networks
# from where browsing should be allowed
http_access allow localnet
http_access allow localhost

# And finally deny all other access to this proxy
http_access deny all

# Squid normally listens to port 3128
http_port 3128

# Uncomment and adjust the following to add a disk cache directory.
cache_dir ufs /var/cache/squid 10000 16 256
maximum_object_size 5120 MB

# Leave coredumps in the first cache dir
coredump_dir /var/cache/squid

#
# Add any of your own refresh_pattern entries above these.
#
refresh_pattern ^ftp:		1440	20%	10080
refresh_pattern ^gopher:	1440	0%	1440
refresh_pattern -i (/cgi-bin/|\?) 0	0%	0
refresh_pattern .		0	20%	4320

refresh_pattern -i appldnld\.apple\.com 129600 100% 129600 ignore-reload ignore-no-store override-expire override-lastmod ignore-must-revalidate

refresh_pattern -i phobos\.apple\.com 129600 100% 129600 ignore-reload ignore-no-store override-expire override-lastmod ignore-must-revalidate
```

When I first tried to start squid with this config squid crashed on launch with an error about the cache not having the right folders in it. Running `D:\Squid\bin\squid.exe -z` fixed this.

I then used the same PAC file as before modified to point at this proxy server which I hosted on IIS and then pointed all the iPads too.

Its working the same as the other install as at the end of the day it is the same proxy server program just different OS.

My [original article](/2015/07/caching-apple-downloads/) has more about what we are actually doing with this config.
