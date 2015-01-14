/**
 * Create an application namespace for functions and variables.
 * @namespace app
 */
var app = app || {};
app.center = new google.maps.LatLng(22.735281, 120.353368)

/**
 * Create and add DOM elements and run code for filling elements.
 */
function initialize() {
    'use strict';
    // Create, configure and append a map div.
    var mapDiv = document.createElement('div');
    mapDiv.id = 'map-canvas';  // Delete this?
    mapDiv.style.backgroundColor = 'gold';
    mapDiv.style.width = '100%';
    mapDiv.style.minHeight = '100%';
    document.querySelector('body').appendChild(mapDiv);
    
    app.addMapToDiv(mapDiv);
    
    // Add interactive div in lower right for search and selection.
    var legendDiv = document.createElement('div');
    legendDiv.id = 'legend';  // Delete this?
    legendDiv.style.backgroundColor = 'white';
    legendDiv.style.padding = '10px';
    legendDiv.style.margin = '10px';
    legendDiv.innerHTML = 'Search';
    document.querySelector('body').appendChild(legendDiv);
    
    app.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendDiv);
    
    // Add markers from the list in features.js.
    app.addFeaturesToMap();
    
    // Add photos that have coordinates from my Flickr account.
    app.getPhotoList(app.addPhotoMarkers);
    
    // Add search bar functionality.
    var entryDiv = document.createElement('div');
    entryDiv.innerHTML = '<input data-bind="value: searchPhrase">';
    legendDiv.appendChild(entryDiv);
    
    // Add clickable feature list
    var listDiv = document.createElement('div');
    listDiv.style.maxHeight = '300px';
    listDiv.style.overflow = 'auto';
    listDiv.innerHTML = [
        '<table>',
        '<tbody data-bind="foreach: features">',
        '<tr data-bind="click: $root.panTo">',
        '<td><img alt="feature icon" data-bind="attr: {src: icon}" /></td>',
        '<td data-bind="text: title"></td>',
        '</tr>',
        '</tbody>',
        '</table>'
    ].join('');
    legendDiv.appendChild(listDiv);
    ko.applyBindings(app.viewModel);
    
    // app.map.panTo(LatLng) 
}
//document.addEventListener('DOMContentLoaded', initialize);
// Why does the google maps listener load the map faster?
google.maps.event.addDomListener(window, 'load', initialize);

/**
 * Add a google map to the map div element.
 */
app.addMapToDiv = function(mapDiv) {
    // Configure and add map to map div.
    var mapOptions = {
        center: app.center,
        zoom: 14, // 0 to 22
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    app.map = new google.maps.Map(mapDiv, mapOptions);
};

/**
 * Add markers from the list in features.js.
 */
app.addFeaturesToMap = function() {
    for (var i = 0; i < app.features.length; i++) {
        app.addMapMarker(app.features[i]);
        app.viewModel.features.push(app.features[i]);
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
    for (var i = 0; i < photoList.length; i++) {
        app.getPhotoGeo(photoList[i], function(photo) {
            photo.icon = 'icons/photo.png';
            app.addMapMarker(photo);
            app.viewModel.features.push(photo);
        });
    }
};

/**
 * Add a marker to the map.
 * @param {Object} feature Contains title, position, and icon for marker.
 */
app.addMapMarker = function(feature) {
    var p = feature.position;
    var mapMarker = new google.maps.Marker({
        position: new google.maps.LatLng( p.lat, p.lon ),
        map: app.map,
        title: feature.title,
        icon: feature.icon,
        animation: google.maps.Animation.DROP
    });
};

app.viewModel = new (function() {
    this.searchPhrase = ko.observable('random words');
    
    this.features = ko.observableArray();
    
    this.panTo = function(feature) {
        app.map.panTo(new google.maps.LatLng(feature.position.lat, feature.position.lon));
    };
})();