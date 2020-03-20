console.log('js file calling');
require('dotenv').config();
const validator = require('validator');
const chalk 	= require('chalk');
const yargs 	= require('yargs');
const request 	= require('request');

const locationHunt = (location, callback) => {
	const mapurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ location +'.json?access_token=' + process.env.MAPBOX_KEY + '&limit=1';
	request({url:mapurl, json:true}, (err, res)=>{
		if (err){
			callback('There has been a problem connecting to the location service', undefined);
		} else if(!res.body.features || res.body.features.length === 0) {
			callback('Unable to find Location', undefined);
		} else {
			let data = res.body;
			let dataRtn = {
				dispTxt : data.features[0].place_name,
				lat : data.features[0].center[1],
				lon : data.features[0].center[0], 				
			}
			callback(undefined, dataRtn);
		}	
	});
}

const weatherHunt = (dataIn, callback) => {
	const url = 'https://api.darksky.net/forecast/'+ process.env.DARK_SKY_KEY +'/' + dataIn.lat + ',' + dataIn.lon + '?units=si&exclude=minutely,hourly,daily,alerts,flags';
	request({url:url, json:true}, (err, res)=>{
		if (err){
			console.log('There has been a problem connecting to the weather service');
		} else if(res.body.error) {
			console.log('Unable to find Location');
		} else {
			let data = res.body.currently;
			let dataBack = {
				dispTxt : dataIn.dispTxt,
				temp : data.temperature,
				summary : data.summary,
				rain: data.precipProbability * 100,
			}
			callback(undefined, dataBack);		
		}
	});
}

module.exports = {
	locationHunt: locationHunt,
	weatherHunt: weatherHunt,
}