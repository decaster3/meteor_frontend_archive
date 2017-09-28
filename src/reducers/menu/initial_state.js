var PRODUCTS = require("../../constants/menu/products.js");
var CATEGORY = require("../../constants/menu/category.js");

module.exports = {
  products: {
    products: [],
    all_products: [],
    productsState: PRODUCTS.NOT_LOADED,
    sub_categories: [],
    currentCategory: ""
  },
  categories: {
    categoryState: CATEGORY.NOT_LOADED,
    categories: []
  }
}
