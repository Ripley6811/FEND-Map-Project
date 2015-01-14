/**
 * Create an application namespace for functions and variables.
 * @namespace app
 */
var app = app || {};

/**
 * Add a google map in a div element to html body.
 */
app.addMap = function() {
    'use strict';
    // Create, configure and append a map div.
    var mapDiv = document.createElement('div');
    mapDiv.id = 'map-canvas';
    mapDiv.style.backgroundColor = 'gold';
    mapDiv.style.width = '100%';
    mapDiv.style.minHeight = '100%';
    document.querySelector('body').appendChild(mapDiv);
    
    // Configure and add map to map div.
    var mapOptions = {
        center: new google.maps.LatLng(22.735281, 120.333368),
        zoom: 14, // 0 to 22
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    app.map = new google.maps.Map(mapDiv, mapOptions);
    
    // Add markers from the list in features.js.
    for (var i = 0; i < app.features.length; i++) {
        app.addMapMarker(app.features[i]);
    };
    
    // Add photos that have coordinates from my Flickr account.
    var photos = app.getPhotoList(app.addPhotoMarkers);
    
    // Add search bar functionality.
    
    
    // Add interactive feature list.
    var legendDiv = document.createElement('div');
    legendDiv.id = 'legend';
    legendDiv.style.backgroundColor = 'white';
    legendDiv.style.padding = '10px';
    legendDiv.style.margin = '10px';
    legendDiv.innerHTML = 'Legend';
    document.querySelector('body').appendChild(legendDiv);
    app.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendDiv);
    
    
    // app.map.panTo(LatLng) 
    
};
//document.addEventListener('DOMContentLoaded', app.addMap);
google.maps.event.addDomListener(window, 'load', app.addMap);

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
        icon: feature.icon,
        animation: google.maps.Animation.DROP
    });
};