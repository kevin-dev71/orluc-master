const express   = require('express');
const router    = express.Router();

const home = require('../controllers/home');
//const image = require('../controllers/image');

const { isAuthenticated, isAdmin } = require('../middlewares/auth');

module.exports = app => {

    // Home Routes
    router.get('/' , home.index);

    router.get('/login' , home.login);
    router.post('/users/login' , home.signin);

    router.get('/register' , home.register);
    router.post('/users/register' , home.signup);

    router.get('/logout' , home.logout);
    /*router.post('/images' , image.create);
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/comment' , image.comment);
    router.delete('/images/:image_id' , image.remove);*/

    app.use(router);

}