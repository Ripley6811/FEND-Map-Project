/**
 * This file manages Flickr requests.
 */

var app = app || {};

app.flickr_user_id = '91602303%40N03';

/**
 * Request a list of my photos from Flickr. Parses the response and passes
 * the photo list to the callback.
 * @param {Function} callback Pass Flickr response photo list to callback.
 */
app.getPhotoList = function(callback) {
    'use strict';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var json = JSON.parse(xmlhttp.response);
            if (json.stat === 'ok') {
                callback(json.photos.photo);
            } else {
                console.log("ERROR in app.getPhotoList: " + json.message);
            }
        }
    };
    
    var requestParams = [
        'method=flickr.people.getPublicPhotos',
        'api_key=e224e71bda1508efe89de86b3b30ed9f',
        'user_id=' + app.flickr_user_id,
        'per_page=500',
        'format=json',
        'nojsoncallback=1'
    ];
    xmlhttp.open('GET', 'https://api.flickr.com/services/rest/?' + requestParams.join('&'), true);
    xmlhttp.send();
};

/**
 * Request the geo information for a photo and add it to the photo
 * object. Photo object is then passed to callback if a location 
 * exists. Called by `app.addPhotoMarkers`.
 * @param {Object}   photo    JSON returned for a Flickr photo.
 * @param {Function} callback Pass each photo that has location to callback.
 * @see app.addPhotoMarkers
 */
app.getPhotoGeo = function(photo, callback) {
    'use strict';
//    if (photo.title.substring(0, 2) === '20') return;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var json = JSON.parse(xmlhttp.response);
            // stat 'ok' if coordinates exists.
            if (json.stat === 'ok') {
                photo.position = { lat: json.photo.location.latitude,
                                   lon: json.photo.location.longitude };
                callback(photo);
            }
        }
    };
    
    var requestParams = [
        'method=flickr.photos.geo.getLocation',
        'api_key=e224e71bda1508efe89de86b3b30ed9f',
        'photo_id=' + photo.id,
        'format=json',
        'nojsoncallback=1'
    ];
    xmlhttp.open('GET', 'https://api.flickr.com/services/rest/?' + requestParams.join('&'), true);
    xmlhttp.send();
    
};

/**
 * Create an html Flickr image link from feature object.
 * @param   {Object} feature Contains information about a map location.
 * @returns {String} IMG tag wrapped in a link to photo on Flickr.com.
 */
app.toFlickrDiv = function(feature) {
    // Add a Flickr image and link
    imgDiv = [
        '<a href="https://www.flickr.com/photos/{user-id}/{id}">',
        '<img src="https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg" alt="{title}">',
        '</a>'
    ].join('')
    imgDiv = imgDiv.replace('{user-id}', app.flickr_user_id);
    imgDiv = imgDiv.replace('{farm-id}', feature.farm);
    imgDiv = imgDiv.replace('{server-id}', feature.server);
    imgDiv = imgDiv.replace('{id}', feature.id);
    imgDiv = imgDiv.replace('{id}', feature.id);
    imgDiv = imgDiv.replace('{secret}', feature.secret);
    imgDiv = imgDiv.replace('[mstzb]', 'n');
    imgDiv = imgDiv.replace('{title}', feature.title.replace(/"/g, '&quot;'));
    return imgDiv;
};