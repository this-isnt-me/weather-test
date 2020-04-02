console.log('alpha.js file calling');
require('dotenv').config();
const validator = require('validator');
const chalk 	= require('chalk');
const yargs 	= require('yargs');
const request 	= require('request');
const crypto 	= require('crypto');
const User 		= require('../../models/user');

const makeToken = () =>{	
	let token = "";
	for (let i = 0; i < 6; i++) {
		let j = Math.floor((Math.random() * 10));
		j = j.toString();
		token = token + j;		
	}
	return token
}

const makeSignUpToken = (length) =>{
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

const encrypt = (input) => {
    let cipher = crypto.createCipher('aes-256-cbc', process.env.ECODING_KEY);
    let crypted = cipher.update(input, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

const decrypt = (input) => {
    if (input === null || typeof input === 'undefined') { return input }
    let decipher = crypto.createDecipher('aes-256-cbc', process.env.ECODING_KEY);
    let dec = decipher.update(input, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

const updateUser = async (id, update) => {
	await User.findByIdAndUpdate(id, update);
}

module.exports = {
	updateUser: updateUser,
	makeToken: makeToken,
	encrypt: encrypt,
	decrypt: decrypt,
	makeSignUpToken: makeSignUpToken,
}