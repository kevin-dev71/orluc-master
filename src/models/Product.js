var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
   name: { type: String, required: true },
   image: { type: String, required: true },
   description: { type: String, required: true },
   cost_price: { type: Number, required: true },
   sale_price: { type: Number, required: true },
   quantity: { type: Number, required: true },
   tags: String,
   category: String,
   date:     { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", ProductSchema);