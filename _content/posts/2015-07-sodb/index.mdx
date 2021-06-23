---
title: SODB
lead: For when you need DB like searching on an object
date: 2015-07-14T15:57:00+01:00
tags:
 - SODB
---
[sodb](https://www.npmjs.com/packages/sodb) is the latest of my little projects to hit [npm](https://www.npmjs.com/) and I really enjoyed making this one.

It is written in [coffee-script](http://coffeescript.org/) and [fully tested](https://coveralls.io/r/Arcath/sodb).

The idea is to have the features of a database table available to an array of objects. You have to admit that `{name: 'bob', age: 10, height: 120}` already looks a lot like a database record so that is all sodb needs to add a record!

Creating a database is as easy as creating a new object:

```coffee
sodb = require 'sodb'

db = new sodb()
```

Which can now have objects added to it

```coffee
db.add {name: 'bob', age: 10, height: 120}
```

The database now has 1 entry in it which can be searched for (not that you need to) and updated or removed when ever you want.

Finding records is done through the `where` method which takes varying arguments like so:

```coffee
db.where {name: 'bob'}
db.where {name {is: 'bob'}} # this is the same as the line above, sodb assumes you mean is
db.where {age: {gt: 8}}
db.where {age: {lt: 12}}
db.where {name: {isnot: 'steve'}}
```

You can have multiple _searches_ which are run one after another on an ever decreasing set of the results.

```coffee
db.where {name: 'bob'}, {age: {gt: 8}}
```

If you need to find records where X is a *or* b you can use:

```coffee
db.where {name: ['bob', 'kevin']}
```

sodb also features a cache to help speed up the finding of data in large databases, or to be more specific finding the same data again in a large database.

Caching uses a hash of of the search object(s) to store the returned results and then returns them to you if they exist.

sodb was written for an as yet unreleased version of [express-permissions](https://www.npmjs.com/packages/express-permissions) which needed the permissions to be stored where I could run a query like:

```coffee
db.where {route: '/foo/bar'}, {method: ['get', 'all']}
```
