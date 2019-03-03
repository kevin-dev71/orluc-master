const controller = {};
/*const sidebar = require('../helpers/sidebar');
const { Image } = require('../models');*/

controller.index = (req, res) => {
    /*const images = await Image
        .find()
        .sort({ timestamp: -1 });

    let viewModel = { images: [] };
    viewModel.images = images;
    viewModel = await sidebar(viewModel);*/
    res.render('index');
}

module.exports = controller;