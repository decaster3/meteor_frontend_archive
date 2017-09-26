var C = require("../../constants/menu/products.js");
var initialState = require("./initial_state.js");

module.exports = function(currentstate = initialState.products, action) {
  switch(action.type){
    case C.LOAD_PRODUCTS:
      return {
        productsState: C.LOADED,
        cards: action.cards,
        currentCategory: action.currentCategory,
        cart: []
      };
    case C.LOADING_PRODUCTS:
      return {
        productsState: C.LOADING,
        cards: [],
        currentCategory: ""
      };
    case C.ADD_PRODUCT_TO_CART:
      return {
        productsState: C.ADDED_TO_CART
      };
    default: return currentstate;
  }
}
