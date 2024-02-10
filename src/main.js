const path = require('path')
const hbs = require('hbs')
const express = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setting up handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Usman'
    })
})

// About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Usman'
    })
})

// Help page
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is the Help Page',
        title: 'Help',
        name: 'Usman'
    })
})

// Weather route
app.get('/weather', (req, res) => {
    if(req.query.location) {
    
    const location = req.query.location

    // Functions for getting the forecast
    geocode(location, (error, {latitude, longitude}) => {

        if(error) {
          return res.send({
            error
          })
        }
        forecast(latitude, longitude, (error, data) => {
          if(error) {
            return res.send({
                error
            })
          }
          res.send({
            forecast: data,
            city: location.city,
            country: location.country
          })
        })
    })
    } else {

    const latitude = req.query.latitude
    const longitude = req.query.longitude

    // Function for getting the forecast
        forecast(latitude, longitude, (error, data) => {
          if(error) {
            return res.send({
                error
            })
          }
          res.send({
            forecast: data
          })
        })
    }
    })


// 404 Page With Help Page
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errorMessage: 'Help article not found',
        name: 'Usman'
    })
})

// 404 Page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Usman'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})