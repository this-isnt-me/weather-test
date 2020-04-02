const mongoose = require("mongoose");
var createuserSchema = new mongoose.Schema({
	//Details
	first: String,
	last: String,
    emailaddress: String,
	phone: String,
	jobtitle: String,
	level: Number,
	//security
	tfatoken: String,
	tfatokendate: Date,
});
module.exports = mongoose.model("CreateUser", createuserSchema);
