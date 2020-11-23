---
title: Etch Router
lead: A Router component for Etch.
date: 2017-05-23T09:29:00Z
tags:
 - Node
---
[Etch](https://github.com/atom/etch) is Atom’s system for updating the DOM. Like other DOM managers (e.g. React) it uses javascript to define a DOM structure and then applies it to a given DOM node. When the state of the page changes Etch computes the required changes to the DOM and then applies them.

The Etch ecosystem is pretty small at the moment. Whilst Atom makes heavy use of it not much else does and you are going to have to write a lot of utility code to make full use of it.

Etch Router is my submission into this ecosystem.

Etch Router is built using Etch components which allows you build your routes in the same way as you build anything else. This is the same as react-router which honestly is where I got my inspiration.

## Using It

Etch-Router is available on npm. Etch is a peer dependency and needs installing by you as well, this gives you control of the etch version in your project.

  > npm install –save etch etch-router

Once it is installed require its components and begin building!

```js
const etch = require('etch')
const {Route, Router} = require('etch-router')

const Layout = require('./layout') # Require your Etch Components
const Home = require('./home')
const About = require('./about')

var app = new Router(
  {},
  new Route(
    {path: '/', component: Layout},
    new Route({path: '/', component: Home}),
    new Route({path: '/about', component: About})
  )
)
```

This is a very quick example which doesn’t touch on half of Etch Routers features. For a better guide see the quick start guide in the docs.

## Examples

I used Etch-Router with Jekyll to create the [docs site](http://etch-router.arcath.net). This site uses all the hooks and features to create a nice UI.

In our [Customer Support App](/2016/11/electron-app-customer-support/), I swapped out React & React-Router for Etch & Etch-Router which was rather painless. After doing so the renderer webpack bundle went from 1.2MB to 414KB which is a pretty huge saving. Functionally there is no difference to the end user and I only needed to add a couple of functions to make Etch work a bit more like react.

My main addition to all my components was a setProp function which works the same as react’s setState.

```js
setProp(props){
  var newProps = Object.assign({}, this.props, props)
  this.update(newProps)
}
```

As you can see this merges the new props with the old ones and then triggers an update of the component.

## The Future

I have plans for how Etch-Router can be used in the long run. I can see me dropping a few more etch-* packages on NPM as I use Etch Router in more and more places.

As always the source is available on [GitHub](https://github.com/Arcath/etch-router) and I welcome PRs with fixes & new features. The docs are hosted on GitHub pages [here](http://etch-router.arcath.net/).
