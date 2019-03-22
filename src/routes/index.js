const express       = require('express');
const router        = express.Router();

const homeCtlr      = require('../controllers/homeController');
const adminCtlr     = require('../controllers/adminController');
const productsCtlr  = require('../controllers/productsController');
const tagsCtlr      = require('../controllers/tagController');
const usersCtlr      = require('../controllers/usersController');

const { isAuthenticated, isNotAuthenticated, isAdmin } = require('../middlewares/auth');

module.exports = app => {

    // =============== FACEBOOK AUTH ==============
    app.get('/auth/facebook', homeCtlr.facebook);
    app.get('/auth/facebook/callback', homeCtlr.facebookCallback);

    // =============== HOME ROUTES ==============
    router.get('/' , homeCtlr.index);

    router.get('/login' , isNotAuthenticated, homeCtlr.login);
    router.post('/users/login' , isNotAuthenticated, homeCtlr.signin);

    router.get('/register' , isNotAuthenticated, homeCtlr.register);
    router.post('/users/register' , isNotAuthenticated, homeCtlr.signup);

    router.get('/logout' , homeCtlr.logout);

    router.get('/fidelity' , isAuthenticated, homeCtlr.userFidelity);

    router.get('/products/:id' , adminCtlr.productShow);

    router.get('/privacy' , (req, res) => {
        res.render('privacy-pages/privacy');
    });

    // =============== USERS ==================
    router.get('/users/profile' , isAuthenticated, usersCtlr.profile);
    router.put('/users/:id' , isAuthenticated, usersCtlr.update);

    // =============== PRODUCTS  ==============

    router.get('/products' , productsCtlr.index);

    // =================== PRODUCTS ADMIN ROUTES =============
    //Pagination
    router.get('/admin/products' ,isAuthenticated, isAdmin, adminCtlr.productListPaginated);
    router.get('/admin/products/new' ,isAuthenticated, isAdmin, adminCtlr.productForm);
    router.post('/admin/products' ,isAuthenticated, isAdmin, adminCtlr.productCreate);
    router.get('/admin/products/:id' ,isAuthenticated, isAdmin, adminCtlr.productShow);
    router.get('/admin/products/:id/edit' ,isAuthenticated, isAdmin, adminCtlr.productEdit);
    router.put('/admin/products/:id' ,isAuthenticated, isAdmin, adminCtlr.productUpdate);
    router.delete('/admin/products/:id' , isAuthenticated, isAdmin , adminCtlr.productDelete);

    // DASHBOARD ADMIN ROUTE
    router.get('/admin/dashboard' ,isAuthenticated, isAdmin, adminCtlr.dashboard);

    router.get('/admin/catalog' ,isAuthenticated, isAdmin, adminCtlr.catalogGenerator);    

    // FIDELITY ADMIN ROUTE
    router.get('/admin/fidelity' ,isAuthenticated, isAdmin, adminCtlr.fidelity);

    // FIDELITY API ADMIN ROUTE
    router.get('/admin/fidelity/:id' ,isAuthenticated, isAdmin, adminCtlr.fidelityApiPost); // deberia ser POST
    router.get('/admin/redeem/:id' ,isAuthenticated, isAdmin, adminCtlr.redeemApiPost);

    // ============== API ROUTES ====================
    // PRODUCTS
    router.get('/api/products' , productsCtlr.productListPaginated);
    router.get('/api/allProducts' , productsCtlr.getProducts); // hay que refactorizar esto
    

    // TAGS
    router.get('/api/tags' , tagsCtlr.tagList);
    
    // PDF CATALOG GENERATOR

    router.get('/admin/pdf' , adminCtlr.productsPDF); 
    router.get('/admin/pdf/generate' , adminCtlr.convertBodyToPDF);

    // SEARCH ROUTES AJAX
    router.get('/admin/search/products' , adminCtlr.productSearchList);
    router.get('/admin/search/users' , adminCtlr.userSearchList);

    app.use(router);

}