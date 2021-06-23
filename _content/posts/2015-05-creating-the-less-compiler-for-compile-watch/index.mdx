---
title: Creating the Less compiler for compile-watch
date: 2015-04-27T13:53:00+01:00
lead: Compile Watch is easy to modify with additional watchers
tags:
 - Atom
 - CompileWatch
---
[compile-watch](https://github.com/Arcath/compile-watch) is the latest [Atom](https://atom.io/) package I’ve been working on, it is the successor to [sass-watch](https://github.com/Arcath/sass-watch) and takes over all the functionality of sass-watch whilst adding a lot more.

The primary improvement is that it is able to compile any kind of file as long as there is a format defined for it. So as an example I’m going to detail how I added [LESS](http://www.lesscss.org/) support in this post.

## Step 1 the test

The first and by far most important step is to add a test for your new format.

Since LESS will be compiled _in-process_ by Atom it will work the same as Coffee Script so the quickest solution is to copy the Coffee Script test and change coffee/js to less/css resulting in this:

```coffee
describe 'LESS Watcher', ->
    beforeEach ->
        if fs.existsSync(path.join(__dirname, 'examples', 'test.less-css'))
            fs.unlinkSync path.join(__dirname, 'examples', 'test.less-css')

        waitsForPromise ->
            atom.workspace.open 'test.less'

        runs ->
            workspaceElement = atom.views.getView(atom.workspace)
            jasmine.attachToDOM(workspaceElement)
            editor = atom.workspace.getActiveTextEditor()
            editorView = atom.views.getView(editor)

    it 'should compile a file', ->
        process.compileWatch.emitter.emit 'watch-file', [path.join(__dirname, 'examples', 'test.less'), path.join(__dirname, 'examples', 'test.less-css'), process.compileWatch.formats['less'], editor]

        expect(fs.existsSync(path.join(__dirname, 'examples', 'test.css'))).toBe true
```

At this point that test will fail obviously so now its time to add the new format.

## Step 2 add less as a dependancy

Add `"less" : "2.5.0"` to `package.json` and run `apm install`. Less is now installed into `node_modules` and is ready to be used.

## Step 3 writing the format

Create an empty file at `lib/formats/less.coffee` and open it.

### Requires

At the top of the file we need to require LESS,the format class and fs.

```coffee
less = require 'less'
Format = require '../format'
fs = require 'fs-plus'
```

### Format Class

Next we need to define a format class which will look like this:

```coffee
class LESS extends Format
    this.outputFileType = "css"
    this.name = "LESS"

    renderFile: ->
        less.render @getText(), (e, output) => @handleRender(e, output)

    handleRender: (e, output) ->
        if e
            atom.notifications.addError("LESS Compile Error", { detail: e.message })
        else
            fs.writeFileSync @outPath, output.css
            atom.notifications.addSuccess("LESS Compile completed!")
```

### Register the format

Now at the bottom of the file the class needs to be registered as the compiler for less.

```coffee
process.compileWatch.formats['less'] = LESS
```

## Step 4 run the test

Run the package specs and make sure that the LESS format works as it should *and* that nothing else has been broken by adding the LESS format.

## Open a pull request

Open a pull request on the github repository I will merge it assuming everything looks right with it.

You can view the [full commit here](https://github.com/Arcath/compile-watch/commit/a0b2285acbb0897d9d1d3bb65263a98f7a44ba0c) which has everything I added in.

