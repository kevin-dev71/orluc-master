const User       = require("../models/User");

const controller = {};

// EDIT
controller.profile = (req, res) => {
    res.render('users/profile' , { user: res.locals.user}); 
};

module.exports = controller;