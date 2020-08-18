const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
const port = process.env.PORT ||3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rohit'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        name: 'Rohit'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        msg: "Getting help!!!",
        title: 'Help',
        name: 'Rohit'
    })
})
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error!',
        msg: 'Help article not found !!!',
        name: 'Rohit'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    //geocode call
    geocode(address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        //forecast call
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                location,
                forecast: forecastData,
                address

            })
        })
    })
})


app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error!',
        msg: '404 Page not found!!!',
        name: 'Rohit'
    })
})
app.listen(port, () => {
    console.log('server is up on port '+port)
})