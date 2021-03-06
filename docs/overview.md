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