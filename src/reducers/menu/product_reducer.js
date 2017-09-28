var C = require("../../constants/menu/products.js");
var initialState = require("./initial_state.js");

module.exports = function(currentstate = initialState.products, action) {
  switch(action.type){
    case C.LOAD_PRODUCTS:
      return {
        productsState: C.LOADED,
        products: action.products,
        all_products: action.all_products,
        sub_categories: action.sub_categories
      };
    case C.LOADING_PRODUCTS:
      return {
        productsState: C.LOADING,
        products: [],
        currentCategory: ""
      };
    case C.SWITCH_PRODUCT:
      return {
        productsState: C.LOADED,
        currentCategory: action.currentCategory,
        all_products: currentstate.all_products,
        sub_categories: currentstate.sub_categories,
        products: filterProducts(currentstate, action.currentCategory)
      };

    default: return currentstate;
  }
}

function filterProducts(currentstate, currentCategory) {
  var categories = currentstate.sub_categories;
  var products = currentstate.all_products;
  var currentProducts = [];
  if (currentCategory === "Все")
    return products;

  currentProducts = products.filter((product) => {return product.sub_category == currentCategory});
  return currentProducts;
}
