---
title: Caching Apple Downloads
lead: Solving the worst part of iPads in schools.
date: 2015-07-14T15:51:00+01:00
tags:
 - Apple
 - Squid
---
The worst part of working with iPads is waiting for apps to download, watching your internet connection strain at 40+ devices downloading the 599MB Garage Band update. The 10Mb/s connection in the school this article was written in is spread over nearly 200 devices so these iPad updates are causing us a noticeable headache.

Apple do offer a caching server as part of OSX Server which sounds on paper like a good solution to the problem but schools are often behind firewalls outside of their control on large networks that Apple never planned for. There are quite a few issues at the moment within Lancashire due to schools being told to use a caching server at another school that they can’t access.

These issues rule out an Apple caching server, for me they have too much potential for wierdness and to just not work at all.

So I looked at squid and weather it could be used as a cache and as it turns out it can! I found a great article by Luke Arms over on his blog http://lkrms.org/caching-ios-updates-on-a-squid-proxy-server/ which explains how to ignore Apple’s HTTP headers and cache the downloads.

That article assumes that you already use squid which we don’t and more importantly for us our LEA uses a filtering system that uses the devices IP to apply filtering rules and log usage etc… a proxy would mess that right up. This can be solved but first I need to setup squid.

For another iPad issue I already have a debain box running which I can easily add squid to so I quickly installed the `squid3` package and changed `/etc/squid3/squid.conf` to this:

```js
http_port 3128

hierarchy_stoplist cgi-bin ?
cache_mem 1024 MB
cache_dir aufs /squid_cache/cache 81920 16 256
maximum_object_size 5120 MB

cache_store_log /squid_cache/store.log
coredump_dir /var/spool/squid3

refresh_pattern ^ftp: 1440 20% 10080
refresh_pattern ^gopher: 1440 0% 1440
refresh_pattern -i (/cgi-bin/|\?) 0 0% 0
refresh_pattern . 0 20% 4320

refresh_pattern -i appldnld\.apple\.com 129600 100% 129600 ignore-reload ignore-no-store override-expire override-lastmod ignore-must-revalidate

refresh_pattern -i phobos\.apple\.com 129600 100% 129600 ignore-reload ignore-no-store override-expire override-lastmod ignore-must-revalidate

quick_abort_min -1 QB

read_ahead_gap 1 MB

positive_dns_ttl 30 seconds
negative_dns_ttl 1 second

minimum_expiry_time 600 seconds
chunked_request_body_max_size 4096 KB

acl manager proto cache_object

acl localhost src 127.0.0.1/32 ::1
acl to_localhost dst 127.0.0.0/8 0.0.0.0/32 ::1

acl curric src 10.80.64.0/22

http_access allow manager localhost
http_access deny manager

http_access deny to_localhost

http_access allow curric
http_access allow localhost
```

*This file is specific to my network and will need changing if you copy it.*

`cache_dir` is the directory squid saves its cache to, I used `/squid_cache` which a separate partition mounted to that point. I also threw `cache_store_log` into the same folder.

`acl curric src 10.80.64.0/22` is the IP range the iPads are on.

Everything else should be pretty uniform across networks.

At this point squid is running as a cache box and can be used by any device, if used as a device’s proxy server it would work great and cache everything. I don’t want that, not only will it ruin the system we get from the LEA, it might result in Apple cached content being dropped to make room for something new.

To only use this proxy server for Apple downloads I used a PAC file hosted on the IIS server that hosts the school intranet page.

```javascript
function FindProxyForURL(url,host){
    appleURLS= ["*phobos*","*appldnld*"];

    for(i=0; i<appleURLS.length; i++){
        if(shExpMatch(host, appleURLS[i])){
            return "PROXY 10.80.64.10:3128;";
        }
    }

    return "DIRECT";
}
```

Once configured to use this file our iPads will go DIRECT to any URL unless it contains `phobos.apple.com` or `appldnld.apple.com` which it will send to the cache box.

I saw an improvement straight away and the cache logs confirmed that the first iPad caused the cache box to cache the download and then the following iPads were served from the cache instead.

I will keep this article up to date with any improvements I make over time but for now it seems pretty good.
