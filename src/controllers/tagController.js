const Tag       = require("../models/Tag");

const controller = {};

// API ROUTES
controller.tagList = async (req, res) => {
    const tags = await Tag.find({});
    var arrayTagName = tags.map(function(tag) {
        return tag.name;			    
    });
    res.status(200).json(arrayTagName);
};

module.exports = controller;
