const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Prashant Singh'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Prashant Singh'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Prashant Singh'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address is mandatory for information.'
        });
    }

    const address = req.query.address;

    geocode(address, (error, { longitude, latitude, location } = {}) => {
        if(error) {
            return res.send({
                error
            });
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                });
            }

            res.send({
                forecast: forecastData,
                location,
                address
            });
        });
    });
});

// 404
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prashant Singh',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prashant Singh',
        errorMessage: 'Page not found.'
    });
});

// Port
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});