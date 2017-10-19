import Cookies from 'universal-cookie';
import * as firebase from 'firebase';
let C = require("../../constants/cart/cart.js")
let cookies = new Cookies();
var moment = require('moment');
import * as axios from 'axios';

export function addProductToCart(product,quantity){
  var current_cart = cookies.get('cart')
  return function(dispatch, getState){
    try {
      for(let i = 0; i < current_cart.quantityproducts; i++){
        if (product.product_id == current_cart.products[i].product_id &&
                                      comparetoppings(product.toppings,current_cart.products[i].toppings) &&
                                      compareSizes(product.radius,current_cart.products[i].radius)){
          current_cart.products[i].quantity += quantity || product.quantity
          // current_cart.quantityproducts +=1;
          cookies.set('cart', current_cart, {path: '/', maxAge: 6*60*60})
          dispatch({type: C.UPDATE_CART, cart: current_cart})
          if(getState().cart.birthdayCurrently == C.BIRTHDAY_ON){
            dispatch({type: C.BIRTHDAY_DICOUNT_ON, cart: current_cart})
          }
          validateCart(getState().cart, dispatch)
          return
        }

      }
      console.log("action: " + product.category);
      cookies.set('cart', {
        quantityproducts: current_cart.quantityproducts + 1,
        products: [...current_cart.products,{
          quantity: product.quantity,
          product_id: product.product_id,
          priceTotalProduct: getTotalPriceOfProduct(product),
          name: product.name,
          img: product.img,
          category: product.category,
          description: product.description,
          weight: product.weight,
          radius: product.radius,
          price: product.price,
          toppings: product.toppings
        }]}
        ,{path: '/', maxAge: 6*60*60})

        dispatch({type: C.UPDATE_CART, cart: cookies.get('cart')})
        if(getState().cart.birthdayCurrently == C.BIRTHDAY_ON){
          dispatch({type: C.BIRTHDAY_DICOUNT_ON, cart: cookies.get('cart')})
        }
        validateCart(getState().cart, dispatch)
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
  return function(dispatch, getState){
    dispatch({type: C.BIRTHDAY_DICOUNT_ON, cart: cookies.get('cart')})
    dispatch({type: C.CHOOSE_GIFT, choosenGifts: []})
    validateCart(getState().cart, dispatch)
  }
}
export function birthdayDiscountOff(){
  return function(dispatch, getState){
    dispatch({type: C.BIRTHDAY_DICOUNT_OFF, cart: cookies.get('cart')})
    dispatch({type: C.CHOOSE_GIFT, choosenGifts: []})
    validateCart(getState().cart, dispatch)
  }
}
export function setGiftProducts(){
  return function(dispatch){
    dispatch({type: C.LOADING_GIFT_PRODUCTS})
    let giftProductsRef = firebase.database().ref().child('products_for_promotion').child('gift_products')
    var giftProducts = []
    giftProductsRef.once('value')
      .then(function(snapshot){
        snapshot.forEach(function(gp) {
          var product = gp.val();
          product["id"] = gp.key;
          giftProducts.push(product);
        })
      }
    ).then( () => {
      dispatch({type: C.SET_GIFT_PRODUCTS, gitftProducts: giftProducts})
    })
  }
}
export function validateTime(){
  var now = moment()
  var startTime = {}
  var endTime = {}
  let timeWorkingRef = firebase.database().ref().child('time_working')
  timeWorkingRef.once('value')
    .then(function(snapshot){
      startTime = moment(snapshot.val().start, 'hh:mm:ss')
      endTime = moment(snapshot.val().end, 'hh:mm:ss')
    })
    .then( () => {
      console.log(now);
      if (!now.isBetween(endTime, startTime)){
        console.log('yes');
      }
      else{
        console.log('no');
      }
    })
}

export function makeOrder() {
  return function(dispatch,getState) {
    var cart = getState().cart;
    var data = {
      "products": cart.products,
      "choosenGifts": cart.choosenGifts,
      "priceTotalCart": cart.priceTotalCart,
      "birthday": cart.birthdayCurrently == C.BIRTHDAY_ON
    };

    const url = 'http://localhost:5000/meteor-764bf/us-central1/checkOrder';
    console.log(data);
    axios.post(url, data)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export function validateCart(cart, dispatch){
  var stepFir = 0
  let stepRef = firebase.database().ref().child('products_for_promotion')
    stepRef.once('value')
      .then(function(snapshot){
        // TODO:
        stepFir = snapshot.val().step
      }
    ).then( () => {
      if (cart.choosenGifts){
        if (cart.choosenGifts.length + 1 > cart.priceTotalCart/stepFir){
          dispatch({type: C.VALIDATE_GIFTS, validationGiftsCurrently: C.NO_MORE_GIFTS})
        }
        else {
          dispatch({type: C.VALIDATE_GIFTS, validationGiftsCurrently: C.ONE_MORE_GIFT})
        }
      }
      // TODO:
      if (cart.priceTotalCart > 2500){
        dispatch({type: C.VALIDATE_TOTAL_CART, order_possibility: C.CAN_MAKE_ORDER})
      }
      else {
        dispatch({type: C.VALIDATE_TOTAL_CART, order_possibility: C.CANT_MAKE_ORDER})
      }
    })
}


export function addGiftProductToCart(product){
    return function(dispatch,getState){
      dispatch({type: C.VALIDATE_GIFTS, validationGiftsCurrently: C.LOCK_GIFTS_ADDING})
      if(getState().cart.choosenGifts){
        let currentGifts = getState().cart.choosenGifts
        dispatch({type: C.CHOOSE_GIFT, choosenGifts: [...currentGifts, product]})
      }else {
        dispatch({type: C.CHOOSE_GIFT, choosenGifts: [product]})
      }
      validateCart(getState().cart, dispatch)
    }
}

export function removeGiftProductFromCart(product){

    return function(dispatch,getState){
      if(getState().cart.choosenGifts){
        let currentGifts = getState().cart.choosenGifts.slice(0)
        for (var i = 0; i < currentGifts.length; i++){
          if (currentGifts[i].name == product.name){
            console.log(currentGifts[i].name);
            currentGifts.splice(i,1)
          }
        }

        dispatch({type: C.CHOOSE_GIFT, choosenGifts: currentGifts})
        validateCart(getState().cart, dispatch)
      }else {
        console.log("There is no gift products in your cart!");
      }
    }
}

export function removeProductFromCart(product){
  var current_cart = cookies.get('cart');
  return function(dispatch, getState){
      if (current_cart.quantityproducts > 0){
        for(var i = 0; i < current_cart.quantityproducts; i++){
          if (product.product_id == current_cart.products[i].product_id &&
                                        comparetoppings(product.toppings,current_cart.products[i].toppings) &&
                                        compareSizes(product.radius,current_cart.products[i].radius)){
            if (current_cart.products[i].quantity > 1){
              current_cart.products[i].quantity -= 1;
              cookies.set('cart', current_cart, {path: '/'});
              dispatch({type: C.UPDATE_CART, cart: current_cart})
              if(getState().cart.birthdayCurrently == C.BIRTHDAY_ON){
                dispatch({type: C.BIRTHDAY_DICOUNT_ON, cart: current_cart})
              }
              dispatch({type: C.CHOOSE_GIFT, choosenGifts: []})
              validateCart(getState().cart, dispatch)
              return;
            }
            else{
              current_cart.products.splice(i,1);
              current_cart.quantityproducts -=1;
              cookies.set('cart', current_cart, {path: '/'});
              dispatch({type: C.UPDATE_CART, cart: current_cart})
              if(getState().cart.birthdayCurrently == C.BIRTHDAY_ON){
                dispatch({type: C.BIRTHDAY_DICOUNT_ON, cart: current_cart})
              }
              dispatch({type: C.CHOOSE_GIFT, choosenGifts: []})
              validateCart(getState().cart, dispatch)
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
