---
title: Motorway
lead: Application flow control for NodeJS
date: 2015-11-10T16:07:00+00:00
tags:
 - Motorway
---
Motorway provides flow control for your node applications through Junctions and Actions.

Motorway was created to streamline my application launchers. I found that I normally ended up with a main.js that looked like this:

```js
Database = require('db/database')

Database.init()

app = Express()

RouterA = require('routes/routerA')

app.use('/', RouterA)

app.listen(3000)

//and so on
```

Which got messy and ambiguos. At no point does the code imply that `Database.init()` has to happen before requiring routers it just does in this case. I would also then be duplicating most of this in my tests without `app.listen(3000)` so I could test app instead of running it.

This left a bit too much code outside my test coverage for my liking so I needed to make it re-usable which quickly lead to:

```js
myApp = require('./lib/myApp')

myApp.initDatabase()
myApp.initExpress()
myApp.loadMiddleware()
myApp.loadRouters()
myApp.loadErrorMiddleware()
myApp.launch()
```

Nicer but still nothing in-code that implies the right order. Cue [Motorway](https://github.com/Arcath/Motorway) which solves all this:

```js
Motorway = require('motorway')

Database = require('./database')
Express = require('express')

app = null
mway = new Motorway

mway.addJunction('init')
mway.addJunction('configure', ['init'])
mway.addJunction('launch', ['configure'])

mway.addAction('init', function(){
    _runner = this
    Database.init(function(){
        _runner.rejoin()
    })
})

mway.addAction('init', function(){
    app = Express()
    this.rejoin()
})

mway.addAction('configure', function(){
    RouterA = require('./routers/routera')

    app.use('/', RouterA)
})

mway.addAction('launch', function(){
    _runner = this
    app.listen(3000, function(){
        _runner.rejoin()
    })
})

module.exports = {"Motorway": mway, "Application": app}
```

You can even store your junctions in their own files, so that file can become:

```js
module.exports = {
    name: 'configure',
    runAfter: ['init'],
    actions: [
        function(){
            this.rejoin()
        }
    ]
}
```

Making your code even neater.

When it comes to running Motorway in an applications tests it works very much the same, except it drops the launch junction.

In my tests (Mocha/Chai.expect) I have a test that makes sure my application inits okay which looks like this:

```coffee
launch = mway.junctions.findOne({name: 'launch'})

mway.addJunction 'test', launch.runAfter

mway.addAction 'test', ->
    done()
    @rejoin()

mway.dropJunction 'launch'
mway.start 'init'
```

Which creates a new junction to finish the async test with the same run conditions as the original launch junction and it then drops the launch junction. Calling `mway.start('init')` now runs exactly the same code in the same order as normal but this time ends in a passed test not a listening server.

Motorway now forms a large part of my latest project and I’m wedging it into older ones that could really do with the help.

The source is [over on github along](https://github.com/Arcath/Motorway) with the issue tracker etc…

Hopefully Motorway will help you as much as it helped me.
