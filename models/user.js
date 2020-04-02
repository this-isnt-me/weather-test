const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	//Details
    username: { type: String, unique: true, required: true },
    emailaddress: String,
	phone: String,
	firstname: String,
	lastname: String,	
	//contact Methods
	whatsapp: Boolean,
	sms: Boolean,
	email: Boolean,
	//security
    password: String,
	tfatoken: String,
	tfatokendate: Date,
	tfatokenvalid: Boolean,
	tfatokenattempts: Number,
	accountlive: Boolean,
	//accoun type
	ultraadmin: Boolean,
	hitchadmin: Boolean,
	employee: Boolean,
	contractor: Boolean,
	admin: Boolean,
	level: String,
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
