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
passport.use('facebook' , new FacebookStrategy({
  clientID			: process.env.FACEBOOK_APP_ID,
  clientSecret	: process.env.FACEBOOK_APP_SECRET,
  callbackURL	  : process.env.FACEBOOK_CALLBACK_URL,
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
  User.findOne({
    $or: [
      {'facebook.provider_id': profile.id},
      {'email': profile.emails[0].value}
    ]    
  }, function(err, user) {
    if(err) return done(err);//throw(err);
    if(!err && user!= null) {
      if (user.facebook.provider_id == undefined) {
        user.facebook.provider_id = profile.id;
        user.facebook.provider		  = profile.provider,
        user.facebook.token       = accessToken;
        user.facebook.email = profile.emails[0].value;
        //user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
        user.facebook.name = profile.displayName;
        user.facebook.photo = profile.photos[0].value;
        user.save();
      }
      return done(null, user);
    } else {
      var user = new User({
        'facebook.provider_id'	: profile.id,
        'facebook.provider'		  : profile.provider,
        'facebook.token'        : accessToken,
        'facebook.name'         : profile.displayName,
        'facebook.photo'        : profile.photos[0].value,
        'facebook.email'        : profile.emails[0].value,
        name				: profile.displayName,
        email       : profile.emails[0].value,
        password    : "nopassword"
      });
      user.save(function(err) {
        if(err){
          console.log(err);
          throw err;
        }
        return done(null, user);
      });
    }
    // Al igual que antes, si el usuario ya existe lo devuelve
    // y si no, lo crea y salva en la base de datos
    
  });
}));