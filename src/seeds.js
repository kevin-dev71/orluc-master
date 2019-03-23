const User = require("./models/User");
const Product = require("./models/Product");
const Tag = require("./models/Tag");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const faker = require("faker");

async function seedDB() {
  var adminUser = new User({
    name: "Administrador",
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin", bcrypt.genSaltSync(10)),
    isAdmin: true
  });

  adminUser.resetCount(function(err, count){
    // nextCount === 1000 -> true
  });

  await User.remove({}, function(err) {
    console.log("Users removed");
  });
  await Product.remove({}, function(err) {
    console.log("Products removed");
  });
  await Tag.remove({}, function(err) {
    console.log("Tags removed");
  });
  // Create a Admin User
  await User.create(adminUser, function(e) {
    if (e) {
      throw e;
    }
  });
  // Create 90 products
  /*for (let i = 0; i < 8; i++) {
    const product = new Product();
    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.description = faker.hacker.phrase();
    product.cost_price = faker.commerce.price();
    product.sale_price = faker.commerce.price();
    product.quantity = 18;
    product.image = faker.image.image();
    await product.save(err => {
      if (err) {
        return next(err);
      }
    });
  }*/
  console.log("BD Seeded  with Admin User");
}

module.exports = seedDB;