const path              = require('path');
const exphbs            = require('express-handlebars');
const morgan            = require('morgan');
const multer            = require('multer');
const express           = require('express');
const methodOverride    = require('method-override');
const errorHandler      = require('errorHandler');
const session           = require('express-session');
const flash             = require('connect-flash');
const passport          = require('passport');
const User              = require('../models/User'); 

const routes            = require('../routes/index');

module.exports = app => {

    // authenticate
    require('../config/passport');
    
    // Settings
    app.set('port' , process.env.PORT || 3000);
    app.set('views' , path.join(__dirname, '../views'));
    app.engine('.hbs' , exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')
    }));
    app.set('view engine' , '.hbs');

    //middlewares
    app.use(morgan('dev'));
    app.use(multer({
        dest: path.join(__dirname, '../public/upload/temp')
    }).single('image'));
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());
    app.use(methodOverride('_method'));
    app.use(session({
        secret: 'mysecretapp',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    // Global Variables
    app.use((req, res, next) => {
        res.locals.success      = req.flash('success');
        res.locals.error        = req.flash('error');
        res.locals.user         = req.user || null;
        next();
    });

    // routes
    routes(app);

    // static files
    app.use('/public' , express.static(path.join(__dirname, '../public')));

    //errorhandlers
    if ('development' === app.get('env')){
        app.use(errorHandler);
    }


    return app;
}