const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=00462a9f99bc8b9f2ef71c995bf9a2d7&query=${latitude},${longitude}`

    request({ url, json: true }, (err, res) => {
        if (err) {
            callback("Unable to connect to Weather API!", undefined)
        } else if (res.body.error) {
            callback(res.body.error, undefined)
        } else {
            const { weather_descriptions, precip, temperature } = res.body.current
            const { name, region, country } = res.body.location

            const location = `${name}, ${region}, ${country}`
            const forecast = `It is ${weather_descriptions[0]} outside. There is ${precip}% chances of rain. The current temperature is ${temperature}.`

            callback(undefined, { location, forecast })
        }
    })
}


module.exports = forecast