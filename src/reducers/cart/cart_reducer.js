let C = require("../../constants/cart/cart.js");
let initialState = require("./initial_state_cart.js");

module.exports = function(currentstate = initialState , action){
  switch(action.type){
    case C.UPDATE_CART:
      return {
        currently: C.CART_EXIST,
        priceTotalCart: getCartTotal(action.cart),
        products_quantity: action.cart.quantityproducts,
        products: action.cart.products
      };
    default: return currentstate;
  }
}
function getCartTotal(cart){
  var count = 0
  for(var i = 0; i < cart.quantityproducts; i++){
      count += cart.products[i].price * cart.products[i].quantity
  }
  return count
}
