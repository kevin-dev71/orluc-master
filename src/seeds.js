var User        = 	require("./models/User");
var mongoose 	= 	require("mongoose");
const bcrypt    = require('bcryptjs');

var adminUser = {
    name: "Administrador", 
    email: "admin@admin.com",
    password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)),
    isAdmin: true
};

function seedDB(){
    User.create(adminUser, function(e) {
	    if (e) {
	        throw e;
	    }
	});
}

module.exports = seedDB;
