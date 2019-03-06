const express       = require('express');
const router        = express.Router();

const homeCtlr      = require('../controllers/homeController');
const adminCtlr     = require('../controllers/adminController');
const productsCtlr  = require('../controllers/productsController');

const { isAuthenticated, isAdmin } = require('../middlewares/auth');

module.exports = app => {

    // HOME ROUTES
    router.get('/' , homeCtlr.index);

    router.get('/login' , homeCtlr.login);
    router.post('/users/login' , homeCtlr.signin);

    router.get('/register' , homeCtlr.register);
    router.post('/users/register' , homeCtlr.signup);

    router.get('/logout' , homeCtlr.logout);

    // PRODUCTS ADMIN ROUTES
    //Pagination
    router.get('/admin/products' ,isAuthenticated, isAdmin, adminCtlr.productListPaginated);

    /*router.get('/admin/products' ,isAuthenticated, isAdmin, adminCtlr.productList);*/
    router.get('/admin/products/new' ,isAuthenticated, isAdmin, adminCtlr.productForm);
    router.post('/admin/products' ,isAuthenticated, isAdmin, adminCtlr.productCreate);
    router.get('/admin/products/:id' ,isAuthenticated, isAdmin, adminCtlr.productShow);
    router.get('/admin/products/:id/edit' ,isAuthenticated, isAdmin, adminCtlr.productEdit);
    router.put('/admin/products/:id' ,isAuthenticated, isAdmin, adminCtlr.productUpdate);
    router.delete('/admin/products/:id' , isAuthenticated, isAdmin , adminCtlr.productDelete);

    // API ROUTES
    router.get('/api/products' , productsCtlr.productListPaginated);

    app.use(router);

    

}