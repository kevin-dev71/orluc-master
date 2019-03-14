const Product       = require("../models/Product");

// Define escapeRegex function for search feature
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const controller = {};

// Product index
controller.index = async (req, res) => {
  var scripts = [
      { script: '/js/infiniteScroll.js' }
  ];
  let perPage = 6;
  let page = req.query.page || 1;

  Product.find({}) // finding all documents
      .skip(perPage * page - perPage) // in the first page the value of the skip is 0
      .limit(perPage) // output just 9 items
      .sort({date: 'desc'}) 
      .exec((err, products) => {
          Product.countDocuments((err, count) => {
              // count to calculate the number of pages
              if (err) return next(err);
              res.render("products/index", {
                  products,
                  current: page,
                  pages: Math.ceil(count / perPage),
                  scripts: scripts
              });
          });
      });
}


// API ROUTES

// Products paginated
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

// All products
controller.getProducts = async (req, res) => {
    if(req.query.search) {      
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      try{
        const products = await Product.find({name: regex});
        res.status(200).json(products);
      }
      catch(e){

      }
    } else {
      try{
        // Es una peticion no ajax
        /*if(req.xhr) {
          res.json(allCampgrounds);
        } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
        }*/
        const products = await Product.find({});
        
      }
      catch(e){
        console.log(e);
      }
    }
};

module.exports = controller;
