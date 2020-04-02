console.log("Comms File Connected");

console.log('alpha.js file calling');
require('dotenv').config();


const sendEmail = (location, callback) => {}

const sendSms = (dataIn, callback) => {}

const sendWhatsapp = () =>{}

module.exports = {
	sendEmail: sendEmail,
	sendSms: sendSms,
	sendWhatsapp: sendWhatsapp
}