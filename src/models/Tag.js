var mongoose = require("mongoose");

var tagSchema = mongoose.Schema({
    name: {type : String , unique: true}
});

tagSchema.index({ "name": 1 } , {unique: true}); // schema level

module.exports = mongoose.model("Tag", tagSchema);