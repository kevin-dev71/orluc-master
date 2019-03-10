const Product = require("../models/Product");

module.exports = {

  async totalProducts() {
    return await Product.countDocuments();
  },

  async totalCost() {
    const result = await Product.aggregate([
      {
        $group: {
          _id: "1",
          totalcost: { $sum: "$cost_price" }
        }
      }
    ]);

    let totalcost = 0;
    if (result.length > 0) {
      totalcost += result[0].totalcost;
    }
    return totalcost;
  }
  
};
