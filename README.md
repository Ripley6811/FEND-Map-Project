# frontend-nanodegree-map-project

> Frontend Nanodegree Project 5 - Neighborhood Map

* [Overview](#overview)
* [Links](#links)
* [Resources](#resources)
* [Project First Steps](#project-first-steps)
* [License and Copyright](#license-and-copyright)


## Overview
This is a map showing places around Nanzhi where I do different activities.


## Links
- [Live web site](http://ripley6811.github.io/frontend-nanodegree-map-project/)
- [Git repository](https://github.com/Ripley6811/frontend-nanodegree-map-project/tree/gh-pages)
- [Documentation](http://ripley6811.github.io/frontend-nanodegree-map-project/jsdoc/)


## Resources
- [developers.google.com](https://developers.google.com)
    - [Adding a Google Map to your website]
    - [Creating custom map markers]
- [mapicons.nicolasmollet.com](http://mapicons.nicolasmollet.com)
    - [Various sports icons]












[Adding a Google Map to your website]:https://developers.google.com/maps/tutorials/fundamentals/adding-a-google-map
[Creating custom map markers]:https://developers.google.com/maps/tutorials/customizing/custom-markers
[Various sports icons]:http://mapicons.nicolasmollet.com/category/markers/sports/?style=dark


## Project First Steps
### Steps for setting up directory structure
>This is a log of how I created the basic files and file structure. I used **Git Shell** for command prompt entries. File editing done in both **[Notepad++]** and **[Brackets]**.

#### 1) Create package.json with `npm init`
Defaults are provided in parenthesis.
```sh
>npm init
name: (frontend-nanodegree-map-project)
version: (1.0.0)
description: Frontend Nanodegree Project 5 - Neighborhood Map
entry point: (index.js) index.html
test command: test
git repository: https://github.com/Ripley6811/frontend-nanodegree-map-project.git
keywords:
author: Jay W Johnson
license: (ISC) MIT
```

#### 2) Install Grunt and plugins with `npm install <module> --save-dev`

```sh
>npm install grunt --save-dev
>npm install grunt-contrib-uglify --save-dev
>npm install grunt-contrib-cssmin --save-dev
>npm install grunt-contrib-watch --save-dev
>npm install grunt-readme --save-dev
>npm install grunt-jsdoc --save-dev
># npm install ink-docstrap --save-dev
```
Note that **grunt-jsdoc** includes **ink-docstrap**.

#### 3) Create `Gruntfile.js`
0. In **Brackets**, right click in directory tree and select **New File**
0. Name the file **Gruntfile.js**
3. Copy the basic uglify js code from the Grunt web site or from another project.

Simple uglify Gruntfile.js from Grunt web site:
```javascript
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Default task(s).
  grunt.registerTask('default', ['uglify']);
};
```

#### 4) Set up `README.tmpl.md`
> README.tmpl.md is the template that grunt-readme uses to stitch together the final README.md file. This and all other README template files live in the **docs** directory.

0. Create **docs** folder.
0. Copy `BASIC.tmpl.md` or another template from **grunt-readme/templates** to the **docs** folder.
1. Add/configure optional *.md files to include in final README.md


#### 5) Set up `grunt-watch`
- Watch `*.js` files and run **grunt-contrib-uglify** and **grunt-jsdoc**.
- Watch `*.md` files and run **grunt-readme** and **grunt-jsdoc**.

```javascript
        watch: {
            src: {
                files: ['src/*.js'],
                tasks: ['uglify','jsdoc'],
                options: {
                    spawn: false,
                },
            },
            markdown: {
                files: ['docs/*.md'],
                tasks: ['readme','jsdoc'],
                options: {
                    spawn: false,
                },
            }
        },
```

#### 6) HTML assets
1. Placed `index.html` in the root directory.
2. The **src** directory contains all the source css and js files. 
3. The **build** directory contains minified css and js used by `index.html`



[Brackets]:http://brackets.io/
[Notepad++]:http://notepad-plus-plus.org/
[grunt]: http://gruntjs.com/


## License and Copyright
Copyright (c) 2015 Jay W Johnson, contributors.
Released under the MIT license