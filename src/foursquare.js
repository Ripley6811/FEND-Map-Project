/**
 * This file manages Foursquare API requests.
 */

var app = app || {};

/**
 * Send a search request to Foursquare and process the response.
 * @param {Number}   lat        Latitude of current map center.
 * @param {Number}   lon        Longitude of current map center.
 * @param {String}   searchTerm Search term entered by user.
 * @param {Function} callback   Function to send the response to.
 */
app.getFoursquareResponse = function(lat, lon, searchTerm, callback) {
    'use strict';
    var xmlhttp = new XMLHttpRequest();
    
    // Set up callback
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var json = JSON.parse(xmlhttp.response);
            if (json.meta.code === 200) {
                callback(json);
            } else {
                console.log("ERROR in app.getFoursquareResponse: " + json.message);
            }
        }
    };
    
    var requestString = [
        'https://api.foursquare.com/v2/venues/explore',
        '?client_id=P0APIITDRLPFDGL1ARPRCWMVV055QQOACFUWVNZDWLGLDSZB',
        '&client_secret=SHHYNZZT1QTSR45SQQ1MRQV4FZKHKNYLGJ1LRZVT0HB5RFJU',
        '&v=20130815',
        '&ll=' + lat + ',' + lon,
        '&radius=8000',
        '&query=' + searchTerm
        ].join('');
    xmlhttp.open('GET', requestString, true);
    xmlhttp.send();
};