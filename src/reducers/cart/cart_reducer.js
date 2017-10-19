let C = require("../../constants/cart/cart.js");
let initialState = require("./initial_state_cart.js");

module.exports = function(currentstate = initialState , action){
  switch(action.type){
    case C.UPDATE_CART:
      return {
        ...currentstate,
        currently: C.CART_EXIST,
        priceTotalCart: getCartTotal(action.cart),
        products_quantity: action.cart.quantityproducts,
        products: action.cart.products,
      };
    case C.BIRTHDAY_DICOUNT_ON:
      return {
        ...currentstate,
        birthdayCurrently: C.BIRTHDAY_ON,
        priceTotalCart: Math.round(getCartTotal(action.cart) * 0.75),
      }
    case C.BIRTHDAY_DICOUNT_OFF:
      return {
        ...currentstate,
        birthdayCurrently: C.BIRTHDAY_OFF,
        priceTotalCart: getCartTotal(action.cart),
      }
    case C.LOADING_GIFT_PRODUCTS:
      return {
        ...currentstate,
        gitftProductsCurrently: C.GIFT_PRODUCTS_LOADING,
        gitftProducts: currentstate.gitftProducts
      }
    case C.SET_GIFT_PRODUCTS:
      return {
        ...currentstate,
        gitftProductsCurrently: C.GIFT_PRODUCTS_LOADED,
        gitftProducts: action.gitftProducts
      }
    case C.CHOOSE_GIFT:
      return {
        ...currentstate,
        choosenGifts: action.choosenGifts
      }
    case C.REMOVE_GIFT:
      return {
        ...currentstate,
        choosenGifts: action.choosenGifts
      }
    case C.VALIDATE_GIFTS:
      return {
        ...currentstate,
        validationGiftsCurrently: action.validationGiftsCurrently
      }
    case C.VALIDATE_TOTAL_CART:
      return {
        ...currentstate,
        order_possibility: action.order_possibility
      }
    case C.VALIDATE_TIME:
      return {
        ...currentstate,
        timeValidation: action.timeValidation
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
