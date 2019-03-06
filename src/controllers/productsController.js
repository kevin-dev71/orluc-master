const Product       = require("../models/Product");

const controller = {};

// API ROUTES
controller.productListPaginated = async (req, res) => {
  let perPage = 6;
  let page = req.query.page || 1;

  Product.find({}) // finding all documents
    .skip(perPage * page - perPage) // in the first page the value of the skip is 0
    .limit(perPage) // output just 9 items
    .sort({ date: "desc" })
    .exec((err, products) => {
      Product.countDocuments((err, count) => {
        // count to calculate the number of pages
        const viewModel = { 
            products,
            current: page,
            pages: Math.ceil(count / perPage)
        }
        res.json(viewModel);        
      });
    });
};

module.exports = controller;
