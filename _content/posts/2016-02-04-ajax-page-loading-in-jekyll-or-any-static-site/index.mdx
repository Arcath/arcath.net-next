---
title: AJAX Page loading in Jekyll (Or any static site)
lead : Making fast faster.
date: 2016-02-04T08:59:00+00:00
tags:
 - Jekyll
---
This site is pretty fast, lets be honest static HTML loads incredibly quickly as there is no rendering or database overheads to slow it down. That being said AJAX page loading is even faster so can it be done without the use of HTTP headers etc…?

Yes it can, quite easily, I spent more time working on getting Disqus and Google Analytics working again.

```js
$(document).on('ready', function(){
    bindLinks()
})

$(window).on("popstate", function(e) {
    // When the browser goes back replace the content and title
    $('title').html(e.originalEvent.state.title)
    $('#content').html(e.originalEvent.state.content)
})

function bindLinks(){
    $("a[href^='/']").on('click', function(e){
        // Stop link from activating
        e.preventDefault()

        // Get the URL to load
        url = $(this).attr('href')

        // Send a Get request to the URL
        $.get(url, function(data){
            // Get the title of the new page
            regex = /<title>(.*)<\/title>/g
            newTitle = regex.exec(data)[1]

            // Set the title to the new title
            $('title').html(newTitle)

            // Replace the content
            $('#content').html($(data).find('#content').html())

            // Push a new state to the browser
            history.pushState({
                'title': $('title').html(),
                'content': $('#content').html()
            }, newTitle, url)

            // Re Bind to all the links on the page
            bindLinks()
        })
    })
}
```

Not much code there is there. So how does it work?

First off in the _documents_ ready event the function `bindLinks` gets run which is just to start the process off.

The only part of the function is an event binding for all internal links which in turn starts with a call to `e.preventDefault()` to stop the links from being handled by the browser. Next we get the target url from the links `href` attribute and send off a get request to it.

The callback for the get request is passed a string containing the HTML for the page which can be passed into jQuery and used like the normal DOM. In Theory… jQuery has some issues around the root node being html/head/body which means you cant just use `$(data).find('title')` to get the title of the new page. In light of this I had to use regex to pull the title out of the received code. My content is 2 layers into divs which lets me fetch it quite nicely with `$(data).find('#content').html()` making the replace nice and easy.

Then `history.pushState` tells the browser the new pages URL and title. Lastly `bindLinks` is called again to bind to the links inside #content and that is it!

The code in use on this site is slightly different, I added [NProgress](http://ricostacruz.com/nprogress/) to give some feedback to the user that loading is taking place. I also needed to update Google Analytics with the fact that the user has changed page. Lastly [Disqus](https://disqus.com/) needed to be reset if you opened a second post (which I hope you do).

```js
(document).on('ready', function(){
    bindLinks()
})

$(window).on("popstate", function(e) {
    NProgress.start()
    $('title').html(e.originalEvent.state.title)
    $('#content').html(e.originalEvent.state.content)
    updateExternals()
    bindLinks()
    NProgress.done()
})

function bindLinks(){
    $("a[href^='/']").on('click', function(e){
        // Stop link from activating
        e.preventDefault()

        // Start the NProgress bar
        NProgress.start()

        // Get the URL to load
        url = $(this).attr('href')

        // Send a Get request to the URL
        $.get(url, function(data){
            // Get the title of the new page
            regex = /<title>(.*)<\/title>/g
            newTitle = regex.exec(data)[1]

            // Set the title to the new title
            $('title').html(newTitle)

            // Replace the content
            $('#content').html($(data).find('#content').html())

            // Push a new state to the browser
            history.pushState({
                'title': $('title').html(),
                'content': $('#content').html()
            }, newTitle, url)

            updateExternals()

            // Make NProgress finish
            NProgress.done()

            // Re Bind to all the links on the page
            bindLinks()
        })
    })
}

function updateExternals(){
    // Update Google Analytics
    ga('set', 'location', window.location.href);
    ga('send', 'pageview');

    // Update disqus
    // If there is a disqus_thread on the page?
    if($('#disqus_thread').length !== 0){
        // Has Disqus been loaded before
        if ('undefined' !== typeof DISQUS){
            // Reset Disqus
            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.identifier = disqus_identifier
                    this.page.url = disqus_url
                }
            });
        }
    }
}
```

This effect is pretty cool and does speed up navigating my site a bit on Github Pages but mostly it just looks cool.

> Revised 25/2/16 to include popstate support fixing an issue with going back
