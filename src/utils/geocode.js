const request = require('request')

const geocode = (city, country, callback) => {
    const url = 'https://api.opencagedata.com/geocode/v1/json?key=df87f4d424d845098f02bf3986bc7746&q=' +city+ ' '+country+ '&limit=1&no_annotations=1'

    request({url, json: true}, (error, {body}) => {

        if(error) {
            callback('Unable to connect to the location API!', undefined)
        } else {
            callback(undefined, {
                latitude: body.results[0].geometry.lat,
                longitude: body.results[0].geometry.lng
            })
        }
    })
}

module.exports = geocode