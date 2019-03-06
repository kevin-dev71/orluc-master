const User      = 	require("./models/User");
const Product   =   require("./models/Product");
const mongoose 	= 	require("mongoose");
const bcrypt    =   require('bcryptjs');
const faker     =   require('faker');

var adminUser = {
    name: "Administrador", 
    email: "admin@admin.com",
    password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)),
    isAdmin: true
};

function seedDB(){
    // Create a Admin User
    User.create(adminUser, function(e) {
	    if (e) {
	        throw e;
	    }
    });
    // Create 90 products
    for(let i = 0; i < 90; i++) {
        const product = new Product();
        product.category = faker.commerce.department();
        product.name = faker.commerce.productName();
        product.description = faker.hacker.phrase();
        product.cost_price = faker.commerce.price();
        product.sale_price = faker.commerce.price();
        product.quantity = 18;
        product.image = faker.image.image();
        product.save(err => {
          if (err) { return next(err); }
        });
      }
      console.log("BD Seeded with 90 products and Admin User");
}

module.exports = seedDB;
