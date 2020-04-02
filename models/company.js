var mongoose = require("mongoose");

var companySchema = new mongoose.Schema({
    companyname: String,
	location: String,
    datecreated: Date,
    status: String,
    companylogo: String,
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
	staff: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

module.exports = mongoose.model("Company", companySchema);
