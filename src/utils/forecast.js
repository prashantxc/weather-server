const request = require('request');

const WEATHER_URL = 'https://api.darksky.net/forecast/2e64da1cc0ec196717545eb97658cf8d/LATITUDE,LONGITUDE?units=si&lang=en';

const forecast = (longitude, latitude, callback) => {
    let url = WEATHER_URL.replace('LONGITUDE', longitude).replace('LATITUDE', latitude);

    request({ url, json: true }, (error, response) => {
        if(error) {
            callback('Weather Service is not available right now', undefined);
        } else if(response.body.error) {
            callback('Problem with location.', undefined);
        } else {
            callback(undefined, `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degree out. There is a ${response.body.currently.precipProbability}% chance of rain.`);
        }
    });
}

module.exports = forecast;