require('dotenv').config();
//NPM PAckages
const express				= require('express');
const validator 			= require('validator');
const chalk 				= require('chalk');
const yargs 				= require('yargs');
const request 				= require('request');
const path 					= require('path');
const hbs 					= require('hbs');
const mongoose  			= require('mongoose');
const bodyParser 			= require("body-parser");
const passport				= require("passport");
const cookieParser 			= require("cookie-parser");
const LocalStrategy 		= require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const methodOverride 		= require("method-override");
const flash 				= require("connect-flash");

//My Packages
const alphaFunc 			= require('../public/functions/alpha.js');
const User 					= require('../models/user');
const indexRoutes			= require('../routes/index.js');
const tfaRoutes				= require('../routes/tfa.js');
const consoleRoutes			= require('../routes/console.js');
const operationsRoutes		= require('../routes/operations.js');
const personnelRoutes		= require('../routes/personnel.js');
const suppliersRoutes		= require('../routes/suppliers.js');
const accountRoutes			= require('../routes/useraccount.js');
const address				= process.argv[2];
const publicDir 			= path.join(__dirname,'../public');
const viewsPath 			= path.join(__dirname,'../templates/views');
const partialsPath 			= path.join(__dirname,'../templates/partials');

const app	= express();
const port 	= process.env.PORT || 3000;


// assign mongoose promise library and connect to database
mongoose.Promise = global.Promise;
const databaseUri = process.env.MONGO_DATABASE_CONNECT;
mongoose.connect(databaseUri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
	})
    .then(() => console.log(`Database connected`))
    .catch(err => console.log(`Database connection error: ${err.message}`
));


//define paths to templates and using Handlebars
app.set("view engine", "ejs");
app.use(express.static(publicDir));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));
//require moment
app.locals.moment = require('moment');

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: process.env.PASSPORT_CONFIG,
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use("/", indexRoutes);
app.use("/2fa", tfaRoutes);
app.use("/console", consoleRoutes);
app.use("/operations", operationsRoutes);
app.use("/personnel", personnelRoutes);
app.use("/suppliers", suppliersRoutes);
app.use("/account", accountRoutes);

app.get('/help', (req, res) => {
	res.render('pages/help',{
		title: 'This is the Help Page',
		help: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley' + 
		' of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.' +  
		'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker' + 
		'including versions of Lorem Ipsum.',
		name: "Frank"
	});
});

app.get('/help/*', (req, res) => {
	res.render('/pages/404');
});

app.get('*', (req, res) => {
	res.render('pages/404');
});

app.listen(port, function() {	
    console.log("The Server Has Started on Port "  + port);
});

// app.listen(process.env.PORT, process.env.IP, function() {
//     console.log("The Server Has Started!");
// });