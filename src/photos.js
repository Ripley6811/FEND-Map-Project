var app = app || {};

/**
 * Request a list of my photos from Flickr.
 * @param {Function} callback Requests geo info for each photo.
 */
app.getPhotoList = function(callback) {
    "use strict";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(JSON.parse(xmlhttp.response));
        }
    };
    
    var requestParams = [
        "method=flickr.people.getPublicPhotos",
        "api_key=0111e8c95512c6cfe3546f7a77517620",
        "user_id=91602303%40N03",
        "per_page=500",
        "format=json",
        "nojsoncallback=1"
    ];
    xmlhttp.open("GET", "https://api.flickr.com/services/rest/?" + requestParams.join("&"), true);
    xmlhttp.send();
};

/**
 * Request the geo information for a photo and adds it to the photo
 * object. This only runs the callback if a location exists.
 * @param {Object}   photo    JSON returned for a Flickr photo.
 * @param {Function} callback Adds photos with geolocation to map.
 */
app.getPhotoGeo = function(photo, callback) {
    "use strict";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var json = JSON.parse(xmlhttp.response);
            // stat "ok" if coordinates exists.
            if (json.stat === "ok") {
                photo.position = { lat: json.photo.location.latitude,
                                   lon: json.photo.location.longitude };
                callback(photo);
            }
        }
    };
    
    var requestParams = [
        "method=flickr.photos.geo.getLocation",
        "api_key=0111e8c95512c6cfe3546f7a77517620",
        "photo_id=" + photo.id,
        "format=json",
        "nojsoncallback=1"
    ];
    xmlhttp.open("GET", "https://api.flickr.com/services/rest/?" + requestParams.join("&"), true);
    xmlhttp.send();
    
};