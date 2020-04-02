const express	= require('express');
const router 	= express.Router();
const passport	= require("passport");
const User 		= require('../models/user');
const alphaFunc = require('../public/functions/alpha.js');

router.get('', async (req, res) => {
	// if (!req.user.tfatokenvalid || req.user.tfatokenvalid === false){
	// 	res.render('pages/login_tfa');		
	// } else {
	// 	res.redirect('/about')
	// }
	res.render('pages/login_tfa');	
});


router.post('/send', async (req, res) => {
	try {
		let id = '5e78bc140b75260ea198cde1'; //req.user._id;
		let token = alphaFunc.makeSignUpToken(6).toLowerCase();
		console.log(token);
		let update = { 
			  tfatoken : alphaFunc.encrypt(token),
			  tfatokendate : new Date(Number(new Date().getTime()) + 1800000)
		  };
		console.log(update);
		let method = req.body.method;
		let message = "Your verification token is " + token;
		if (method === "whatsapp"){
			console.log("Send WhatsApp " + message); 
		} else if (method === "email"){
			console.log("Send Email " + message);			
		} else if (method === "sms"){
			console.log("Send SMS " + message);
		}
		let foundUser = await User.findById(id);
		let result = 3 - foundUser.tfatokenattempts;
		console.log(result);
		alphaFunc.updateUser(id, update);
		res.status(200).send(result.toString()).end();
	} catch (err) {
		console.log(err);
		res.status(500).end();
  }
});

router.post('/checkcode', async (req, res) => {
	try {
		let id = '5e78bc140b75260ea198cde1'; //req.user._id;
		let token = alphaFunc.encrypt(req.body.token.toLowerCase());
		let foundUser = await User.findById(id);
		let attempts = foundUser.tfatokenattempts;
		let result;
		let date = new Date();		
		if (date > foundUser.tfatokendate) {
			result = {
				status: 'expired',
				msg: 'Token expired please request a new one',
			}
		} else if (token === foundUser.tfatoken) {
			result = {
				status: 'success',
				msg: 'Code Confirmed',
				redirect: '/main/home'
			}
		} else if (token != foundUser.tfatoken && attempts === 2) {
			let update = { 
				tfatokenattempts : 3,
				accountlive : false
			};
			//await alphaFunc.updateUser(id, update);			
			result = {
				status: 'deactive',
				msg: 'You have failed to enter the correct code, your account has been suspended - please contact administrator',
				redirect: 'lockedout'
			}
		} else if (token != foundUser.tfatoken) {
			attempts = attempts + 1;
			let update = { 
				tfatokenattempts : attempts
			};
			//alphaFunc.updateUser(id, update);
			result = {
				status: 'failure',
				msg: 1//3 - attempts,
			}
		}
		console.log(result);
		res.status(200).send(result).end();
	} catch (err) {
		console.log(err);
		res.status(500).end();
  }
});

module.exports = router;