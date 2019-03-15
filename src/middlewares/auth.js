const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', 'Not Authorized.');
    res.redirect('/login');
  }  
};

helpers.isNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/users/profile');
  }  
};

helpers.isAdmin = (req, res, next) => {
  if(req.user.isAdmin) {
    next();
  } else {
    req.flash('error', 'This site is now read only thanks to spam and trolls.');
    res.redirect('back');
  }
}

module.exports = helpers;