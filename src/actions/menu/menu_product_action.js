import * as firebase from 'firebase';
var C = require("../../constants/menu/products.js");

module.exports = {
	loadProducts: function(category) {
		return function(dispatch, getState) {
			dispatch({ type: C.LOADING_PRODUCTS });

			firebase.database().ref().child('products').child(category).once('value', snapshot => {
			  var products = [];
				snapshot.forEach(function(childSnapshot) {
			      products.push(childSnapshot.val());
			  });

				dispatch({
					type: C.LOAD_PRODUCTS,
					cards: products,
					currentCategory: category
				});
			});
    }
  },
	addProductToCart: function(product, toppings) {
		return function(dispatch, getState) {
			console.log(getState().products);
			var cart = getState().products.cart;
			cart.push(product)
			console.log(cart);
			dispatch({
				type: C.ADD_PRODUCTS,
				cart: cart
			});
		}
	}
};
