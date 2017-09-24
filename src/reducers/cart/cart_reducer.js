var C = require("../../constants/cart/cart.js");
var initialState = require("./initial_state.js");

module.exports = function(currentstate = initialState.cart, action) {
  switch(action.type){
    case C.ADD_PRODUCT_TO_CART:
      return {
        productsCartState: C.ADDED_TO_CART
      };
    default: return currentstate;
  }
}
