const request = require('postman-request')

const geocode = (location, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + location + ".json?access_token=pk.eyJ1IjoiemFpbmFicmFqYSIsImEiOiJjbGxzMjU4NG8wdHI2M3RwczdnZnYzcTJ3In0.mwwUQaV6wmHeTCouqzrPPw"
    request({ url, json: true }, (err, res) => {
        if (err) {
            callback("Unable to connect to Weather API!", undefined)
        } else if (res.body.features.length == 0) {
            callback("Unable to find location. Please try again!", undefined)
        } else {
            const latitude = res.body.features[0].center[1]
            const longitude = res.body.features[0].center[0]
            callback(undefined, { latitude, longitude })
        }
    })
}

module.exports = geocode