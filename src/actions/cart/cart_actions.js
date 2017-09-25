import Cookies from 'universal-cookie';

let C = require("../../constants/cart/cart.js")
let cookies = new Cookies();

export function addProductToCart(product){
  var current_cart = cookies.get('cart')
  return function(dispatch){
    try {
      for(let i = 0; i < current_cart.quantityproducts; i++){
        if (product.product_id == current_cart.products[i].product_id &&
                                      compareTopings(product.topings,current_cart.products[i].topings) &&
                                      compareSizes(product.size_of,current_cart.products[i].size_of)){
          current_cart.products[i].quantity += 1
          // current_cart.quantityproducts +=1;
          cookies.set('cart', current_cart, {path: '/'})
          dispatch({type: C.UPDATE_CART, cart: current_cart})
          return
        }
      }

      cookies.set('cart', {
        quantityproducts: current_cart.quantityproducts + 1,
        products: [...current_cart.products,{
          quantity: 1,
          product_id: product.product_id,
          priceTotalProduct: getTotalPriceOfProduct(product),
          name: product.name,
          img: product.img,
          description: product.description,
          size_of: product.size_of,
          price: product.price,
          topings: product.topings
        }]}
        ,{path: '/'})
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

export function removeProductFromCart(product){
  var current_cart = cookies.get('cart');
  return function(dispatch){
      if (current_cart.quantityproducts > 0){
        for(var i = 0; i < current_cart.quantityproducts; i++){
          if (product.product_id == current_cart.products[i].product_id &&
                                        compareTopings(product.topings,current_cart.products[i].topings) &&
                                        compareSizes(product.size_of,current_cart.products[i].size_of)){
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
  for (var i = 0; i < product.topings.length; i++){
    totalProduct += product.topings[i].price
  }
  return totalProduct
}

function compareSizes(size1,size2){
  if (size1 == size2){
    return true
  }
  return false
}

function compareTopings(topings1,topings2){
  var arr1 = [], arr2 = [];

  for(var i = 0; i < topings1.length;i++){
    arr1.push(topings1[i].toping_id)
  }

  for(var j = 0; j < topings2.length;j++){
    arr2.push(topings2[j].toping_id)
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
