import Cookies from 'universal-cookie';
import * as firebase from 'firebase';
let C = require("../../constants/cart/cart.js")
let cookies = new Cookies();

export function addProductToCart(product,quantity){
  var current_cart = cookies.get('cart')
  return function(dispatch){
    try {
      for(let i = 0; i < current_cart.quantityproducts; i++){
        if (product.product_id == current_cart.products[i].product_id &&
                                      comparetoppings(product.toppings,current_cart.products[i].toppings) &&
                                      compareSizes(product.radius,current_cart.products[i].radius)){
          current_cart.products[i].quantity += quantity || product.quantity
          // current_cart.quantityproducts +=1;
          cookies.set('cart', current_cart, {path: '/', maxAge: 6*60*60})
          dispatch({type: C.UPDATE_CART, cart: current_cart})
          return
        }

      }

      cookies.set('cart', {
        quantityproducts: current_cart.quantityproducts + 1,
        products: [...current_cart.products,{
          quantity: product.quantity,
          product_id: product.product_id,
          priceTotalProduct: getTotalPriceOfProduct(product),
          name: product.name,
          img: product.img,
          description: product.description,
          weight: product.weight,
          radius: product.radius,
          price: product.price,
          toppings: product.toppings
        }]}
        ,{path: '/', maxAge: 6*60*60})

        dispatch({type: C.UPDATE_CART, cart: cookies.get('cart')})
    }catch(err){
      console.log(err.message);
    }
  }
};

export function createCart(){
  return function(dispatch){
    if (cookies.get('cart') == undefined){
      cookies.set('cart', {
        quantityproducts: 0,
        products:[]
      }
      ,{path:'/'})
    }
    else {
      var current_cart = cookies.get('cart')
      dispatch({type: C.UPDATE_CART, cart: cookies.get('cart')})
    }
  }
};
export function birthdayDiscountOn(){
  return function(dispatch){
    dispatch({type: C.BIRTHDAY_DICOUNT_ON, cart: cookies.get('cart')})
  }
}
export function birthdayDiscountOff(){
  return function(dispatch){
    dispatch({type: C.BIRTHDAY_DICOUNT_OFF, cart: cookies.get('cart')})
  }
}
export function setGiftProducts(){
  return function(dispatch){
    dispatch({type: C.LOADING_GIFT_PRODUCTS})
    let giftProductsRef = firebase.database().ref().child('products_for_promotion').child('gift_products')
    var giftProducts = []
    giftProductsRef.once('value')
      .then(function(snapshot){
        snapshot.forEach(function(gp){
          giftProducts.push(gp)
        })
      }
    ).then( () => {
      dispatch({type: C.SET_GIFT_PRODUCTS, gitftProducts: giftProducts})
    })
  }
}

export function removeProductFromCart(product){
  var current_cart = cookies.get('cart');
  return function(dispatch){
      if (current_cart.quantityproducts > 0){
        for(var i = 0; i < current_cart.quantityproducts; i++){
          if (product.product_id == current_cart.products[i].product_id &&
                                        comparetoppings(product.toppings,current_cart.products[i].toppings) &&
                                        compareSizes(product.radius,current_cart.products[i].radius)){
            if (current_cart.products[i].quantity > 1){
              current_cart.products[i].quantity -= 1;
              cookies.set('cart', current_cart, {path: '/'});
              dispatch({type: C.UPDATE_CART, cart: current_cart})
              return;
            }
            else{
              current_cart.products.splice(i,1);
              current_cart.quantityproducts -=1;
              cookies.set('cart', current_cart, {path: '/'});
              dispatch({type: C.UPDATE_CART, cart: current_cart})
              return;
            }
          }
        }
     }else {

       console.log("Thre is no such products in cart");
       return;
     }
  }
}

function getTotalPriceOfProduct(product){

  var totalProduct = product.price
  for (var i = 0; i < product.toppings.length; i++){
    totalProduct += product.toppings[i].price * product.toppings[i].count;
  }
  return totalProduct
}

function compareSizes(size1,size2){
  if (size1 == size2){
    return true
  }
  return false
}

function comparetoppings(toppings1,toppings2){
  var arr1 = [], arr2 = [];

  for(var i = 0; i < toppings1.length;i++){
    arr1.push(toppings1[i].topping_id)
  }

  for(var j = 0; j < toppings2.length;j++){
    arr2.push(toppings2[j].topping_id)
  }

  for (var i = 0; i < arr2.length; i++){
    if (!arr1.includes(arr2[i])){
      return false;
    }
  }

  for (var i = 0; i < arr1.length; i++){
    if (!arr2.includes(arr1[i])){
      return false;
    }
  }
  return true;
};
