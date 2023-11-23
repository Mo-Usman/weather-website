const request = require('request')

const forecast = (lat, lng, callback) => {

    const url = 'https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lng+'&current=temperature_2m'

    request({url, json: true}, (error, {body}) => {

        if(error) {
            callback('Unable to connect to the weather API!', undefined)
        } else if(body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const temp = body.current.temperature_2m
            callback(undefined, 'Currently, It is ' +temp + ' degrees outside')
        }
    })
}

module.exports = forecast