/**
 * Application namespace for functions and variables.
 * @namespace app
 */
var app = app || {};

/**
 * Adds a google map div element to html body.
 */
app.addMap = function() {
    'use strict';
    var mapDiv = document.createElement('div');
    mapDiv.id = 'map-canvas';
    mapDiv.style.backgroundColor = '#fb4';
    mapDiv.style.width = '100%';
    mapDiv.style.minHeight = '100%';
    document.querySelector('body').appendChild(mapDiv);
    
    var mapOptions = {
        center: new google.maps.LatLng(22.735281, 120.333368),
        zoom: 14, // 0 to 22
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    app.map = new google.maps.Map(mapDiv, mapOptions);
    
    // Add each marker from the list in features.js.
    for (var i = 0; i < app.features.length; i++) {
        app.addMapMarker(app.features[i]);
    };
    
    // Add each photo that has coordinates from my Flickr account.
    var photos = app.getPhotoList(app.addPhotoMarkers);    
};
document.addEventListener('DOMContentLoaded', app.addMap);

/**
 * Process a list of photo response objects from Flickr and
 * adds a marker to the map if the photo has coordinates. Used as
 * a callback for `app.getPhotoList`.
 * @param {Object} jsonResponse JSON response object from Flickr.
 * @see app.getPhotoList
 */
app.addPhotoMarkers = function(jsonResponse) {
    var photos = jsonResponse.photos.photo;
    for (var i = 0; i < photos.length; i++) {
        app.getPhotoGeo(photos[i], function(photo) {
            photo.icon = 'icons/photo.png';
            app.addMapMarker(photo);
        });
    };
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
        icon: feature.icon
    });
};