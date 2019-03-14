const User      = require('../models/User');
const Product   = require('../models/Product');
const passport  = require('passport');

const controller = {};

controller.index = async (req, res) => {
    res.render('index', {layout: 'landing.hbs'});
}

controller.login = (req , res) => {
    res.render('users/login');
}

controller.register = (req , res) => {
    res.render('users/register');
}

controller.signin = (req , res, next) => {
    passport.authenticate('local' , {
        successRedirect:  '/' ,
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: 'Bienvenido!'
     })(req, res, next);
}

controller.signup = async (req, res) => {
    const { name , email, password, confirm_password } = req.body;
    const errors = [];
    // Validate maybe use validator.js
    if(name.length <= 0 ){
        errors.push({ text: 'Please insert name'});
    } 
    if(password != confirm_password) {
        errors.push({ text: 'Password do not match'});
    }
    if(password.length < 4) {
        errors.push({ text: 'Password must be at least 4 Characters'});
    }
    if(errors.length > 0) {
        res.render('users/register' , {errors , name , email, password , confirm_password });
    } else {
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('error' , 'Email Already Taken');
            res.redirect('/register');
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success' , 'Registered, please login');
        res.redirect('/login');
    }
    
}

controller.logout = (req, res) => {
    req.logOut();
    req.flash('success' , 'Chao');
    res.redirect('/');
}

// ========= FACEBOOK AUTH ===========
controller.facebook = (req , res, next) => {
    passport.authenticate('facebook' , { scope : ['email'] })(req, res, next);
}

/*controller.facebook = () => {
    passport.authenticate('facebook');
}*/

controller.facebookCallback = (req , res, next) => {
    passport.authenticate('facebook', {
        successRedirect: '/', 
        failureRedirect: '/login' 
    })(req, res, next);
}

controller.userFidelity = (req , res) => {
    res.render('fidelity/index');
}

module.exports = controller;