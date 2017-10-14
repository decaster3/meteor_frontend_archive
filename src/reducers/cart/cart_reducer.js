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
    case C.BIRTHDAY_DICOUNT_ON:
      return {
        currently: currentstate.currently,
        priceTotalCart: Math.round(getCartTotal(action.cart) * 0.75),
        products_quantity: currentstate.quantityproducts,
        products: currentstate.products
      }
    case C.BIRTHDAY_DICOUNT_OFF:
    console.log(currentstate);
      return {
        currently: currentstate.currently,
        priceTotalCart: getCartTotal(action.cart),
        products_quantity: currentstate.quantityproducts,
        products: currentstate.products
      }
    default: return currentstate;
  }
}
function getCartTotal(cart){
  var count = 0
  for(let i = 0; i < cart.quantityproducts; i++){
      count += cart.products[i].priceTotalProduct * cart.products[i].quantity
  }
  return count
}
