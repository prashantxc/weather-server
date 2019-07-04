const request = require('request');

const GEOCODE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/ADDRESS.json?access_token=pk.eyJ1IjoicHJhc2hhbnR4YyIsImEiOiJjanhsaGNuNzcwNjYwM3JtZzUwNzN6OWNoIn0.I-skCxjmKCtglI72PSHJcg&limit=1';

const geocode = (address, callback) => {
    let url = GEOCODE_URL.replace('ADDRESS', encodeURIComponent(address))
    request({ url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connect with location services. [check your internet]', undefined);
        } else if(response.body.features.length === 0) {
            callback('Are you searching for a different planet? Unable to find location.', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;