const Product = require('../models/Product');
const {unlink} = require('fs-extra');
const path = require('path');

const controller = {};

// PRODUCTS ADMIN
controller.productList = async (req, res) => {
    const products = await Product.find({}).sort({date: 'desc'});
    res.render('admin/products/index' , { products });
}

controller.productForm = (req, res) => {
    res.render('admin/products/new');
}

controller.productCreate = async (req, res) => {
    const imagePath = '/uploads/' + req.file.filename;
    req.body.product.image = imagePath;
    const newProduct = new Product(req.body.product);
    await newProduct.save();
    req.flash('success' , 'Producto guardado con exito');
    res.redirect('/admin/products/new');
}

controller.productShow = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('admin/products/show' , {product});
}

controller.productEdit = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('admin/products/edit' , {product});
}

controller.productUpdate = async (req, res) => {
    // Falta eliminar el imagen
    if(req.file){
        const imagePath = '/uploads/' + req.file.filename;
        req.body.product.image = imagePath;
    }
    await Product.findByIdAndUpdate(req.params.id , req.body.product);
    req.flash('success' , 'Product Updated Successfully');
    res.redirect('/admin/products');
}

controller.productDelete = async (req , res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
        await unlink(path.resolve('./src/public/' + product.image));
        await product.remove();
        req.flash('success' , 'Producto Eliminado con exito');
        res.redirect('/admin/products');
    } else {
        req.flash('error' , 'No se Pudo eliminar el producto');
        res.redirect('/admin/products');
    }
}


module.exports = controller;