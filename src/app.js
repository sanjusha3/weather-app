const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index.hbs', {
        title: "Weather",
        name: "Zainab Raja"
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: "About",
        name: "Zainab Raja"
    })
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        title: "Help",
        name: "Zainab Raja"
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query
    if (!address) {
        return res.send({
            error: "Please provide an address!"
        })
    }

    geocode(address, (err, { latitude, longitude } = {}) => {
        if (err) {
            return res.send({ error: err })
        }

        forecast(latitude, longitude, (err, { location, forecast }) => {
            if (err) {
                return res.send({ error: err })
            }

            res.send({
                location, forecast
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404.hbs', {
        title: "404",
        error: "Help article not found!"
    })
})

app.get('*', (req, res) => {
    res.render('404.hbs', {
        title: "404",
        error: "Page not found!"
    })
})

app.listen(3000, () => {
    console.log("Listening on port 3000!")
})