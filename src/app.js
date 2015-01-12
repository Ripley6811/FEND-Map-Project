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
      zoom: 14, // 0-22
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    app.map = new google.maps.Map(mapDiv, mapOptions);
    
    for (var i = 0; i < app.features.length; i++) {
        app.addMapMarker(app.features[i]);
    };
}
document.addEventListener('DOMContentLoaded', app.addMap);

app.features = [
    {
        title: 'Archery range',
        position: new google.maps.LatLng(22.734471, 120.333068),
        icon: 'icons/archery.png'
    },
    {
        title: 'Jogging in the park',
        position: new google.maps.LatLng(22.731795, 120.316772),
        icon: 'icons/jogging.png'
    },
    {
        title: 'Mountain hiking',
        position: new google.maps.LatLng(22.725501, 120.370888),
        icon: 'icons/hiking.png'
    },
    {
        title: 'Swimming pool',
        position: new google.maps.LatLng(22.733508, 120.331715),
        icon: 'icons/swimming.png'
    },
    {
        title: 'Bicycle maintenance',
        position: new google.maps.LatLng(22.731711, 120.329520),
        icon: 'icons/cycling.png'
    },
]

/**
 * Add a marker to the map.
 * @param {Object} feature Contains title, coordinate, and icon for marker.
 */
app.addMapMarker = function(feature) {
    var mapMarker = new google.maps.Marker({
        position: feature.position,
        map: app.map,
        title: feature.title,
        icon: feature.icon
    });
}