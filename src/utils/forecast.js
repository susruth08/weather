const request = require('request')
const forecast = (latitude, longitude, callback) => {
	const url = "https://api.darksky.net/forecast/0a3938b495e93398d468275597654bed/"+ latitude + "," + longitude + "?units=us"
	request({url, json: true},(error, {body}) => {
		if(error){
			callback('unable to connect to weather service', undefined)
		}else if(body.error){
			callback('unable to find location', undefined)
		}else{
			//console.log( body.daily.data[0].summary +' it is currently '+body.currently.temperature + ' degrees out. there is a ' + body.currently.precipProbability +' % chance of rain')

			forecastData=  body.daily.data[0].summary +' it is currently '+body.currently.temperature + ' degrees out. there is a ' + body.currently.precipProbability +' % chance of rain'
			callback(undefined, {forecastData})
		}

	})
	
}
module.exports = forecast