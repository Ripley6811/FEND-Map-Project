This is a map web site showing places that I like to go to and my photography from around where I live in Nanzhi, Taiwan. This web site uses the Google Maps, Google Street View Image, Flickr, and Foursquare APIs.  It also uses Bootstrap and Knockout.js for styling and showing a dynamic list of links.

On desktop computer and large screens, the side panel is minimized and will move out with mouseover.
On smaller screens the side panel is hidden and a blue bar shows on the side. Click the bar to 
show the side panel. The side panel containes a foursquare search box and a list of features that are shown 
on the map. Click any feature in the list to be taken to its location.

#### Features:
- **Clickable map markers** display images and short descriptions.
- **Flickr images** that link to a larger version on the Flickr web site.
- **Google Street View images** displayed for non-Flickr locations.
- **Foursquare search** box for finding other locations like a "coffee shop".
- Clickable **list view of markers** that pan the map to a selected marker.
- List view and map markers update during search using Knockout.js' `observableArray`.

#### `src` Files:
- **app.js** - Main program.
- **features.js** - Contains an array of pre-defined favorite locations for display.
- **foursquare.js** - Ajax-related methods for communicating with Foursquare.
- **flickr.js** - Ajax-related methods for communicating with Flickr.

#### Build tools:
- **Bootstrap** for css styling.
- **KnockoutJS** for dynamically updating list of markers during search.
- **Grunt** for creating minified *build* css and js files, and creating the README and JSDoc files.
- **Brackets** editor.