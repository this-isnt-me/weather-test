const express	= require('express');
const router 	= express.Router();
const passport	= require("passport");
const User 		= require('../models/user');
const alphaFunc = require('../public/functions/alpha.js');

router.get('', async (req, res) => {
	res.render('pages/personnel');	
});

module.exports = router;