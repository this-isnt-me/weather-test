const express		= require('express');
const router 		= express.Router();
const passport		= require("passport");
const User 			= require('../models/user');
const alphaFunc 	= require('../public/functions/alpha.js');
const middleware 	= require('../middleware/index.js');

router.get('', (req, res) => {
	res.render('pages/index',{
		code: 'false'
	});
});

router.get('/signup/:id', (req, res) => {
	let code = alphaFunc.decrypt(req.params.id);
	res.render('pages/index',{
		code: code,
	});
});


router.post('/checksignup', (req, res) => {
});

router.post('/signup', (req, res) => {
	User.register(new User({username: req.body.username, accountlive : true}), req.body.password, function(err, user) {
		if (err) {
			console.log(err);
			return res.render("pages/signup", { error: err.message });
		}
		passport.authenticate("local")(req, res, function() {
			res.redirect("/about");
		});
	});	
});


router.post('/login', passport.authenticate("local", {	
    successRedirect: "/2fa",
    failureRedirect: "",
    failureFlash: true
}), (req, res) => {});


router.get('/lockout', (req, res) => {
    req.logout();
	res.render('pages/lockout');
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

router.get('/about', (req, res) => {
	res.render('pages/about',{
		title: 'This is the Home Page',
		name: 'Hitch Advisor Limited',
		code: 'false'
	});
});

module.exports = router;