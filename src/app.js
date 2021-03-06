/**
 * Create an application namespace for functions and variables.
 * @namespace app
 */
var app = app || {};

/**
 * Set up and run code for filling elements.
 */
function initialize() {
    'use strict';
    // Default map center; Nanzhi, Taiwan.
    app.center = new google.maps.LatLng(22.735281, 120.353368)
    // Create, configure and append a map div.
    app.map = app.getGoogleMap(document.getElementById('map-canvas'));
    // Add markers from the list in features.js.
    app.addFeaturesToMap();
    // Add photos that have coordinates from my Flickr account.
    app.getPhotoList(app.addPhotoMarkers);
    // Apply KnockoutJS model binding.
    ko.applyBindings(app.viewModel);
}

/**
 * Show error splash screen if Google did not load.
 * Else run init function when DOM loads.
 */
if (window.google === undefined) {
    var errorSplash = document.getElementById('connection-error-splash');
    errorSplash.style.display = 'block';
} else {
    // Why does the google maps listener load the map faster?
    //document.addEventListener('DOMContentLoaded', initialize);
    google.maps.event.addDomListener(window, 'load', initialize);
}

/**
 * Create a KnockoutJS view model instance for the lower right 
 * interactive div.
 */
app.viewModel = new (function() {
    var self = this;
    // Variable for retrieving text field entry
    self.searchPhrase = ko.observable('');
    // Observable and functions for controlling side panel position.
    self.sidebarVisible = ko.observable(false);
    self.sidebarSetVisible = function() { self.sidebarVisible(true) };
    self.sidebarSetInvisible = function() { self.sidebarVisible(false) };
    self.toggleSidebar = function() {
        self.sidebarVisible(!self.sidebarVisible());
    };
    // Register a listener for sidebar visibility changes.
    ko.computed(function() {
        var sidebar = document.getElementById('swipe-bar');
        if (self.sidebarVisible()) {
            sidebar.style.right = '220px';
        } else { 
            sidebar.style.right = '0px';
        }
    });
    // Window size and change detection.
    self.winWidth = ko.observable(window.innerWidth);
    self.winHeight = ko.observable(window.innerHeight);
    // Boolean for switching to/from mobile (small) view.
    self.mobileView = ko.computed(function() {
        return self.winWidth() < 992; 
    });
    // Register a listening to change height of panel list on resize.
    ko.computed(function() {
        document.getElementById('feature-list')
            .style.height = [self.winHeight() - 150, 'px'].join('');
    });
    // Register a listener for search phrase changes.
    self.searchPhrase.subscribe(function(newTerm) {
        if (newTerm == '') return;
        var latlon = app.map.getCenter();
        app.getFoursquareResponse(
            latlon.lat(), latlon.lng(), 
            newTerm, 
            app.processFoursquareResponse
        );
    });
    // List of features to bind to panel.
    self.features = ko.observableArray();
    // Number of foursquare results to bind to input-group-addon.
    self.foursquareCount = ko.observable(0);
    // Moves map to selected image and if mobile view it collapses panel.
    self.panTo = function(feature) {
        document.getElementById("map-canvas").focus();
        if (self.mobileView()) self.sidebarVisible(false);
        app.map.panTo(feature.marker.getPosition());
        app.map.panBy(0,-120); // Shift map down a little for image.
        app.showInfoWindow(feature);
    };
})();

/**
 * Store the window size in app namespace and update it on resize.
 */
window.onresize = function() {
    // Update window size observables in KO view model.
    app.viewModel.winWidth(window.innerWidth);
    app.viewModel.winHeight(window.innerHeight);
    // Update app window size reference.
    app.width = window.innerWidth;
    app.height = window.innerHeight;
}
app.width = window.innerWidth;
app.height = window.innerHeight;

/**
 * This is the callback function used in the async JSON for processing locations
 * in a Foursquare 'explore' response.
 * @param {Object} json Foursquare API response JSON object.
 */
app.processFoursquareResponse = function(json) {
    // Delete previous search results markers
    for (var i = app.viewModel.features().length - 1; i >= 0; i = i-1) {
        if (app.viewModel.features()[i].marker.icon === 'icons/foursquare.png') {
            app.viewModel.features()[i].marker.setMap(null);
            app.viewModel.features.splice(i, 1);
        }
    }
    // Add new search results.
    var items = json.response.groups['0'].items;
    // Update observable for number of foursquare features.
    app.viewModel.foursquareCount(items.length);
    if (items.length == 0) {
        alert('No results found for "' + app.viewModel.searchPhrase() + '"');
    } else {
        for (var i = 0; i < items.length; i = i+1) {
            var feature = {
                title: items[i].venue.name,
                icon: 'icons/foursquare.png',
                position: {
                    lat: items[i].venue.location.lat,
                    lon: items[i].venue.location.lng
                },
            };
            app.addMapMarker(feature, 0);
        }
    }
};

/**
 * Opens an info window above a feature marker.
 * @param {Object} feature An object containing a google marker and other info.
 */
app.showInfoWindow = function(feature) {
    var imgDiv = '';
    // Add Flickr image link if it is an image feature.
    // If not an image feature than attempt StreetView image.
    if (feature.farm) {
        // Add a Flickr image and link
        imgDiv = app.toFlickrDiv(feature);
    } else {
        // Attach a street view image if not a Flickr feature.
        imgDiv = '<img src="http://maps.googleapis.com/maps/api/streetview?size={size}&location={location}" alt="{title}"><br>';
        imgDiv = imgDiv.replace('{size}', app.width < 600 ? '150x120' : '320x200');
        var p = feature.position;
        imgDiv = imgDiv.replace('{location}', [p.lat, p.lon].join(','));
        imgDiv = imgDiv.replace('{title}', feature.title.replace(/"/g, '&quot;'));
    }
    // Keep reference to open infoWindow for closing and replacing.
    if (app.infoWindow) app.infoWindow.close();
    app.infoWindow = new google.maps.InfoWindow({
        content: [
            '<div style="text-align: center">',
            imgDiv,
            '<br>',
            feature.title.replace(/"/g, '&quot;'),
            '</div>'].join('')
    });
    app.infoWindow.open(app.map, feature.marker);
    
        if (app.currentMarker != null) {
            app.currentMarker.setAnimation(null);
        }
        feature.marker.setAnimation(google.maps.Animation.BOUNCE);
        app.currentMarker = feature.marker;
};

/**
 * Add a google map to the div element and returns reference to map.
 * @param   {Object} mapDiv HTML element to place map inside.
 * @returns {Object} The google map object.
 */
app.getGoogleMap = function(mapDiv) {
    // Configure and add map to map div.
    var mapOptions = {
        center: app.center,
        zoom: 14, // 0 to 22
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    return new google.maps.Map(mapDiv, mapOptions);
};

/**
 * Add markers from the list in features.js.
 */
app.addFeaturesToMap = function() {
    for (var i = 0; i < app.features.length; i++) {
        app.addMapMarker(app.features[i]);
    };
};

/**
 * Process a list of photo response objects from Flickr and
 * adds a marker to the map if the photo has coordinates. Used as
 * a callback for `app.getPhotoList`.
 * @param {Object} jsonResponse JSON response object from Flickr.
 * @see app.getPhotoList
 */
app.addPhotoMarkers = function(photoList) {
    if ('error' in photoList) {
        return;
    } else {
        var flickrStatus = document.getElementById('flickr-availability');
        flickrStatus.style.display = 'none';
    }
    for (var i = 0; i < photoList.length; i++) {
        app.getPhotoGeo(photoList[i], function(photo) {
            photo.icon = 'icons/photo.png';
            app.addMapMarker(photo);
        });
    }
};

/**
 * Add a marker to the map.
 * @param {Object} feature Contains title, position, and icon for marker.
 */
app.currentMarker = null;
app.addMapMarker = function(feature, index) {
    // Add google maps marker to feature object.
    var p = feature.position;
    feature.marker = new google.maps.Marker({
        position: new google.maps.LatLng( p.lat, p.lon ),
        map: app.map,
        title: feature.title,
        icon: feature.icon,
        animation: google.maps.Animation.DROP
    });
    // Add a listener for clicking on icon.
    google.maps.event.addListener(feature.marker, 'click', function() {
        app.showInfoWindow(feature);
    });
    // Add feature with marker to the knockoutjs observable list.
    if (index !== undefined && index / 1 == index) {
        app.viewModel.features.splice(0, 0, feature);
    } else {
        app.viewModel.features.push(feature);
    }
};