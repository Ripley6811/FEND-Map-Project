# My Map Project

> Frontend Nanodegree Project 5 - Neighborhood Map

* [Overview](#overview)
* [Links](#links)
* [Resources](#resources)
* [Project First Steps](#project-first-steps)
* [License and Copyright](#license-and-copyright)


## Overview
This is a map web site showing places that I like to go to and my photography from around where I live in Nanzhi, Taiwan. This web site uses the Google Maps, Google Street View Image, Flickr, and Foursquare APIs.  It also uses Bootstrap and Knockout.js for styling and showing a dynamic list of links.

On desktop computer and large screens, the side panel is minimized and will move out with mouseover.
On smaller screens the side panel is hidden and a blue bar shows on the side. Click the bar to 
show the side panel. The side panel contains a foursquare search box and a list of features that are shown 
on the map. Click any feature in the list to be taken to its location. Enter a search term in the 
foursquare search box and results will be added to the top of the feature list below. A number next to the
search box indicates the number of results found.

Error handling. If the Google API cannot load then a splash screen telling user to check internet connection appears.
If the web page cannot connect with Foursquare to perform a search then an alert box appears saying it is unavailable.
If the web page cannot connect with Flickr to load geo-photos then an "unavailable" badge appears under respective icon in legend.

##### Features:
- **Clickable map markers** display images and short descriptions.
- **Flickr images** that link to a larger version on the Flickr web site.
- **Google Street View images** displayed for non-Flickr locations.
- **Foursquare search** box for finding other locations like a "coffee shop".
- Clickable **list view of markers** that pan the map to a selected marker.
- List view and map markers update during search using Knockout.js' `observableArray`.

##### `src` Files:
- **app.js** - Main program.
- **features.js** - Contains an array of pre-defined favorite locations for display.
- **foursquare.js** - Ajax-related methods for communicating with Foursquare.
- **flickr.js** - Ajax-related methods for communicating with Flickr.

##### Build tools:
- **Bootstrap** for css styling.
- **KnockoutJS** for dynamically updating list of markers during search.
- **Grunt** for creating minified *build* css and js files, and creating the README and JSDoc files.
- **Brackets** editor.


## Links
- [Live web site](http://ripley6811.github.io/frontend-nanodegree-map-project/)
- [Git repository](https://github.com/Ripley6811/frontend-nanodegree-map-project/tree/gh-pages)
- [Documentation](http://ripley6811.github.io/frontend-nanodegree-map-project/jsdoc/)


## Resources
- [developers.google.com](https://developers.google.com)
    - [Adding a Google Map to your website]
    - [Creating custom map markers]
    - [API reference: Map 'panTo' and other methods]
    - [Legend box overlay example]
    - [How to use "Info Windows"](https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple)
- [mapicons.nicolasmollet.com](http://mapicons.nicolasmollet.com)
    - [Various sports icons]
- [www.flickr.com](https://www.flickr.com)
    - [Flickr API Methods]
    - [Demonstration of flickr.people.getPublicPhotos request]
    - [How to construct a photo source url](https://www.flickr.com/services/api/misc.urls.html)
- [How to use the Flickr API](http://kylerush.net/blog/flickr-api/)
- [Knockoutjs tutorial](http://learn.knockoutjs.com/#/?tutorial=intro)
    - [Knockoutjs "css" binding](http://knockoutjs.com/documentation/css-binding.html)
    - [How to data-bind to image path with KnockoutJS](http://stackoverflow.com/questions/10659665/knockout-template-using-data-bind-to-image-src-property-not-working)
- [How to add scrollbar to div](http://stackoverflow.com/questions/9707397/making-a-div-vertically-scrollable-using-css)
- [How to style placeholder text in input field](http://coolestguidesontheplanet.com/styling-placeholder-text-input-fields-forms-css/)
- [Bootstrap Documentation](http://getbootstrap.com/components/)
    - [Jumbotron implementation](http://getbootstrap.com/components/#jumbotron)
- [How to monitor XMLHttpRequest progress and add event listeners](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
- [How to test connection errors (link and instructions in Udacity project feedback)](http://www.rackspace.com/knowledge_center/article/how-do-i-modify-my-hosts-file#Windows_Vista)




[Adding a Google Map to your website]:https://developers.google.com/maps/tutorials/fundamentals/adding-a-google-map
[Creating custom map markers]:https://developers.google.com/maps/tutorials/customizing/custom-markers
[API reference: Map 'panTo' and other methods]:https://developers.google.com/maps/documentation/javascript/reference
[Various sports icons]:http://mapicons.nicolasmollet.com/category/markers/sports/?style=dark
[Demonstration of flickr.people.getPublicPhotos request]:https://www.flickr.com/services/api/explore/flickr.people.getPublicPhotos
[Flickr API Methods]:https://www.flickr.com/services/api/
[Legend box overlay example]:https://google-developers.appspot.com/maps/tutorials/customizing/js/legend


## Project First Steps
### Steps for setting up directory structure
>The following are notes on how I created the basic files and file structure. I used **Git Shell** for command prompt entries. File editing done in both **[Notepad++]** and **[Brackets]**.

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
> **README.tmpl.md** is the template that **grunt-readme** uses to stitch together the final **README.md** file. This and all other README template files live in the **docs** directory.

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
            css: {
                files: ['src/*.css'],
                tasks: ['cssmin'],
                options: {
                    spawn: false
                }
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
