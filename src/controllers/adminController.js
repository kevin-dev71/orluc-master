const Product       = require("../models/Product");
const User          = require("../models/User");
const Tag           = require("../models/Tag");
const sidebar       = require('../helpers/dashboard/sidebar');
const { unlink }    = require("fs-extra");
const path          = require("path");
const puppeteer     = require('puppeteer');

const controller = {};

// PRODUCTS ADMIN
controller.productListPaginated = async (req, res) => {
  var scripts = [
    { script: '/js/confirm.js' }
  ];
  let perPage = 4;
  let page = req.query.page || 1;

  Product.find({}) // finding all documents
    .skip(perPage * page - perPage) // in the first page the value of the skip is 0
    .limit(perPage) // output just 9 items
    .sort({date: 'desc'}) 
    .exec((err, products) => {
      Product.count((err, count) => {
        // count to calculate the number of pages
        if (err) return next(err);
        res.render("admin/products/index", {
          products,
          current: page,
          pages: Math.ceil(count / perPage),
          scripts: scripts
        });
      });
    });
};

controller.productList = async (req, res) => {
  const products = await Product.find({}).sort({ date: "desc" });
  res.render("admin/products/index", { products });
};

controller.productForm = (req, res) => {
  var scripts = [
    { script: 'https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.4/awesomplete.min.js'},
    { script: '/js/awesomplete.js' }
  ];
  var styles = [
    { style: 'https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.4/awesomplete.min.css'}
  ];
  res.render("admin/products/new" , { scripts , styles});
};

controller.productCreate = async (req, res) => {
  const imagePath = "/uploads/" + req.file.filename;
  req.body.product.image = imagePath;
  const newProduct = new Product(req.body.product);
  await newProduct.save();
  let mapTag = req.body.product.tags.replace(/\s/g,'').split(',').map(function(tag) {
    return { "name": tag };
  });
  try {
    await Tag.insertMany( mapTag , { ordered: false } );
  } catch (e) {
    console.log("hay tags repetidos");
  }
  req.flash("success", "Producto guardado con exito");
  res.redirect("/admin/products/new");
};

controller.productShow = async (req, res) => {
  var styles = [
    { style: '/css/products/show.css' }
  ];
  const product = await Product.findById(req.params.id);
  res.render("admin/products/show", { product , styles });
};

controller.productEdit = async (req, res) => {
  var scripts = [
    { script: 'https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.4/awesomplete.min.js'},
    { script: '/js/awesomplete.js' }
  ];
  var styles = [
    { style: 'https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.4/awesomplete.min.css'}
  ];
  const product = await Product.findById(req.params.id);
  res.render("admin/products/edit", { product , scripts, styles });
};

controller.productUpdate = async (req, res) => {
  // Falta eliminar el imagen
  if (req.file) {
    const imagePath = "/uploads/" + req.file.filename;
    req.body.product.image = imagePath;
  }
  // Tags update
  let mapTag = req.body.product.tags.replace(/\s/g,'').split(',').map(function(tag) {
    return { "name": tag };
  });
  try {
    await Tag.insertMany( mapTag , { ordered: false } );
  } catch (e) {
    console.log("hay tags repetidos");
  }
  
  await Product.findByIdAndUpdate(req.params.id, req.body.product);
  
  req.flash("success", "Product Updated Successfully");
  res.redirect("/admin/products");
};

controller.productDelete = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (product) {
    try{
      await unlink(path.resolve("./src/public/" + product.image));
      await product.remove();
      req.flash("success", "Producto Eliminado con exito");
      res.redirect("/admin/products");
    }
    catch(e){
      console.log("no se consiguio imagen relacionado al producto con id: " + product._id);
      req.flash("success", "Producto Eliminado con exito!!!");
      res.redirect("/admin/products");
    }    
  } else {
    req.flash("error", "No se Pudo eliminar el producto");
    res.redirect("/admin/products");
  }
};

// ================ DASHBOARD =========================

controller.dashboard = async (req , res) => {
  let viewModel = {};
  viewModel = await sidebar(viewModel);
  res.render("admin/dashboard/index" , {viewModel});
}

controller.catalogGenerator = async (req , res) => {
  var scripts = [
    { script: '/js/input-product-finder.js' }
  ];
  res.render("admin/catalog/index" , {scripts});
}

// ================ FIDELITY =========================

controller.fidelity = async (req , res) => {
  let scripts = [
    { script: '/js/fidelity.js' }
  ];
  let styles = [
    { style: '/css/admin/fidelity.css' }
  ];
  let perPage = 8;
  let page = req.query.page || 1;

  User.find({}) // finding all documents
    .skip(perPage * page - perPage) // in the first page the value of the skip is 0
    .limit(perPage) // output just 9 items
    .sort({date: 'desc'}) 
    .exec((err, users) => {
      User.count((err, count) => {
        // count to calculate the number of pages
        if (err) return next(err);
        res.render("admin/fidelity/index", {
          users,
          current: page,
          pages: Math.ceil(count / perPage),
          scripts ,
          styles
        });
      });
    });
}

controller.fidelityApiPost = (req , res) => {
  User.findOneAndUpdate(
    {
      _id : req.params.id
    },
    { $inc: { fidelity: 1 } } ,
    {new : true } ,
    function(err , updatedUser){
    if(err){
      //req.flash("error", "Premiado No actualizado satisfactoriamente");
      res.status(400).json(err);
    } else {
      //req.flash("success", "Premiado satisfactoriamente");
      res.status(200).json(updatedUser);
    }
  });
};

// ======================= PRODUCTS CATALOG PDF REPORT ====================

controller.productsPDF = async (req, res) => {
  var styles = [
    { style: '/css/admin/product-catalog.css' }
  ];
  /*let scripts = [    
    { script: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js' } ,
    { script: '/js/html2canvas.min.js' } ,
    { script: '/js/genPDF.js' }
  ];*/
  const products = await Product.find({}).sort({ name: 1 });

  res.render("admin/catalog/report" , { products , styles });
};

controller.convertBodyToPDF = async (req, res) => {
  try{

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    const options = {
      path: __dirname.split('controllers')[0] + '/public/reportes/report.pdf',
      format: 'A4',
      landscape: true      
    }

    await page.goto('http://localhost:3000/admin/pdf' , {waitUntil: 'networkidle2'});
    /*
    In case you need to log in first to generate a PDF from a protected page, first you need to navigate to the login page, inspect the form elements for ID or name, fill them in, then submit the form:

    await page.type('#email', process.env.PDF_USER)
await page.type('#password', process.env.PDF_PASSWORD)
await page.click('#submit')*/
    await page.pdf(options);
    
    await browser.close();

    console.log('pdf creado');
    res.download(__dirname.split('controllers')[0] + '/public/reportes/report.pdf');

  } catch (e){
    console.log('error converting PDF' , e);
    res.send("Error Creating PDF");
  }
}

module.exports = controller;