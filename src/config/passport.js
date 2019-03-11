const passport          = require('passport');
const LocalStrategy     = require('passport-local').Strategy;
const FacebookStrategy  = require('passport-facebook').Strategy;

//const mongoose = require('mongoose');
const User = require('../models/User'); 

// Configuración del autenticado local
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  // Match Email's User
  const user = await User.findOne({email: email});
  if (!user) {
    return done(null, false, { message: 'Not User found.' });
  } else {
    // Match Password's User
    const match = await user.matchPassword(password);
    if(match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect Password.' });
    }
  }

}));

// Serializa al usuario para almacenarlo en la sesión
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializa el objeto usuario almacenado en la sesión para poder utilizarlo
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Configuración del autenticado con Facebook
passport.use(new FacebookStrategy({
  clientID			: process.env.FACEBOOK_APP_ID,
  clientSecret	: process.env.FACEBOOK_APP_SECRET,
  callbackURL	 : '/auth/facebook/callback',
  profileFields : [
    'id', 
    'displayName', 
    /*'provider',*/ 
    'photos',
    'emails',

  ]
}, function(accessToken, refreshToken, profile, done) {
  // El campo 'profileFields' nos permite que los campos que almacenamos
  // se llamen igual tanto para si el usuario se autentica por Twitter o
  // por Facebook, ya que cada proveedor entrega los datos en el JSON con
  // un nombre diferente.
  // Passport esto lo sabe y nos lo pone más sencillo con ese campo
  User.findOne({provider_id: profile.id}, function(err, user) {
    if(err) throw(err);
    if(!err && user!= null) return done(null, user);
    // Al igual que antes, si el usuario ya existe lo devuelve
    // y si no, lo crea y salva en la base de datos
    var user = new User({
      provider_id	: profile.id,
      provider		 : profile.provider,
      name				 : profile.displayName,
      photo				: profile.photos[0].value,
      email       : profile.emails[0].value,
      password    : "nopassword"
    });
    user.save(function(err) {
      if(err) throw err;
      done(null, user);
    });
  });
}));