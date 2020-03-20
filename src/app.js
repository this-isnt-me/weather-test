require('dotenv').config();
const express	= require('express');
const app		= express();
const validator = require('validator');
const chalk 	= require('chalk');
const yargs 	= require('yargs');
const request 	= require('request');
const path 		= require('path');
const hbs 		= require('hbs');
const alphaFunc = require('../public/functions/alpha.js');
const address	= process.argv[2];
const publicDir = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//define paths to templates and using Handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
	res.render('index',{
		title: 'This is the Weather Application',
		name: 'Frank'
	});
});

app.get('/about', (req, res) => {
	res.render('about',{
		title: 'This is the About Page',
		name: 'Frank'
	});
});

app.get('/help', (req, res) => {
	res.render('help',{
		title: 'This is the Help Page',
		help: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley' + 
		' of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.' +  
		'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker' + 
		'including versions of Lorem Ipsum.'
	});
});

app.get('/help/*', (req, res) => {
	res.render('404',{
		title: 'This is the help 404 Page',
		message: 'Something broke',
		name: "Frank"
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.loc){
		return res.send({
			error: "There is no location provided"
		})
	}
	let loc = req.query.loc;
	alphaFunc.locationHunt(loc, (err, data) => {
		if (err) {
			return res.send({ err })			
		} else {
			alphaFunc.weatherHunt(data, (err, data) => {
				if (err) {
					return res.send({error: err })			
				} else {
					res.send({
						dispTxt : data.dispTxt,
						temp : data.temp,
						summary :data.summary,
						rain: data.rain,
					}); 
				}
			})
		}
	});	
});

app.get('*', (req, res) => {
	res.render('404',{
		title: 'This is the Standard 404 Page',
		message: 'Something broke',
		name: "Frank"
	});
});

app.listen(3000, function() {
	//console.log(process.env.PORT);	
    console.log("The Server Has Started!");
});