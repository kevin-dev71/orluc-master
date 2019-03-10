const ProductHelper = require("../products");
const UserHelper    = require("../users");

module.exports = async viewModel => {
  const results = await Promise.all([
    ProductHelper.totalProducts(),
    ProductHelper.totalCost(),
    UserHelper.totalUsers()
  ]);

  viewModel.sidebar = {
    totalProducts: results[0],
    totalCost: results[1],
    totalUsers: results[2]
  };

  return viewModel;
};
