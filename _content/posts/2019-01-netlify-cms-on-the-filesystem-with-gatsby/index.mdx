---
title: Netlify CMS on the filesystem with Gatsby
lead: Using a Netlify localy on your machine for testing.
date: 2019-01-19T20:00:00Z
tags:
 - Netlify
 - Gatsby
syndication:
  dev: https://dev.to/arcath/netlify-cms-on-the-filesystem-with-gatsby-2lge
---
I was looking at [Netlify CMS](https://www.netlifycms.org/) for a website I was building and I wanted to test it before I put code to repo. Unfortunatley by default Netlify CMS will only let you use git as a backend which is great once the site is launched but when I want to test the CMS or dratically change the config the only way to test it would be to commit code that _should_ work and then hope. This leaves a bad taste in my mouth, if code is hitting the repo it should pass tests so comitting something that on paper should work doesn't feel right to me.

Netlify CMS edits the _source_ files directly normally by commiting to the git repo. I needed a way of making changes to the local file system directly.

Before making changes to the config I needed to install [gatsby-plugin-netlify-cms](https://www.npmjs.com/package/gatsby-plugin-netlify-cms) which adds everything you need to get going with Netlify CMS and Gatsby and created `static/admin/config.yml`.

The important part of the file for this article is the `backend` which for me is:

```yml
backend:
  name: github
  repo: Arcath/...
```

# FS Backend

Enter [netlify-cms-backend-fs](https://www.npmjs.com/package/netlify-cms-backend-fs).

> Update 25/2/19 `netlify-cms-backend-fs` is in beta and there may/will be breaking changes eventually.

To get this working in Gatsby I needed to make a couple of edits to my `gatsby-config.js` to load the fs-api and configure `gatsby-plugin-netlify-cms` so that it uses the fs backend.

First off the entry in the `plugins` array needs changing to this:

```js
{
  resolve: `gatsby-plugin-netlify-cms`,
  options: {
    modulePath: `${__dirname}/src/cms/init.js`, // Or another path if you don't want to create /src/cms/init.js
    enableIdentityWidget: false,
    publicPath: 'admin',
    htmlTitle: 'Content Manager',
    manualInit: true,
  },
}
```

After that I needed to require the file system api from the backend.

```js
let fsApi = require('netlify-cms-backend-fs/dist/fs/fs-express-api')
```

The Gatsby config needs the middleware loading which can be done by adding `developMiddleware: fsApi` to the config object.

To use it in development I added a `development_overrides` key to my `config.yml`:

```yml
development_overrides:
  backend:
    name: file-system
    api_root: 'http://localhost:8000/api'
```

Now I have all the config in place I just need to tie it all together with `src/cms/init.js`

```js
import CMS, { init } from 'netlify-cms'
import {FileSystemBackend} from 'netlify-cms-backend-fs'

// If running in development
if(process.env.NODE_ENV === 'development') {
  window.CMS_ENV = 'development_overrides' // Set the CMS_ENV to the development_ overrides.
  CMS.registerBackend('file-system', FileSystemBackend) // Register the FileSystemBackend.
}

// Start NetlifyCMS
init()
```

This has worked really well for me letting me test and use Netlify CMS on my local machine.
