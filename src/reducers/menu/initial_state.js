var PRODUCTS = require("../../constants/menu/products.js");
var CATEGORY = require("../../constants/menu/category.js");

module.exports = {
  products: {
    cards: [],
    currentCategory: "",
    productsState: PRODUCTS.NOT_LOADED,
    cart: []
  },
  categories: {
    categoryState: CATEGORY.NOT_LOADED,
    categories: []
  }
}
