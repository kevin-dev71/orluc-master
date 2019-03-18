const User       = require("../models/User");

const controller = {};

// EDIT
controller.profile = (req, res) => {
    res.render('users/profile' , { user: res.locals.user}); 
};

// UPDATE
controller.update = async (req, res) => {
    let { name , email, password } = req.body;
    const errors = [];
    let conditions = { _id : req.params.id };
    // Validate maybe use validator.js
    if(name.length <= 0 ){
        errors.push({ text: 'Por Favor ingresa un nombre'});
    }
    if(password){
        if(password.length < 4) {
            errors.push({ text: 'Password debe tener al menos 4 Caracteres'});
        }
    }    
    if(errors.length > 0) {
        res.render('users/profile' , {errors , name , email });
    } else {        
        if(password){
            var aux = new User();
            password = await aux.encryptPassword(password);
            await User.findOneAndUpdate(conditions , { name , email, password })
                .exec((err , user) => {
                    if(err){
                        console.log(err);
                        req.flash('error' , 'Error');
                        res.redirect('/users/profile');
                    } else {
                        req.flash('success' , 'Usuario y Contrasena Actualizado Satisfactoriamente');
                        res.redirect('/users/profile');
                    }                    
                });
        } else {
            await User.findOneAndUpdate(conditions , { name , email })
                .exec((err , user) => {
                    if(err){
                        console.log(err);
                        req.flash('error' , 'Error');
                        res.redirect('/users/profile');
                    } else {
                        req.flash('success' , 'Usuario Actualizado Satisfactoriamente');
                        res.redirect('/users/profile');
                    }                    
                });
        }
    }
    
}

module.exports = controller;