import * as firebase from 'firebase';
var C = require("../../constants/menu/products.js");

module.exports = {
	loadProducts: function(category) {
		return function(dispatch, getState) {
			dispatch({ type: C.LOADING_PRODUCTS });

			firebase.database().ref().child('products').child(category).once('value', snapshot => {
			  var products = [];
				snapshot.forEach(function(childSnapshot) {
						var product = childSnapshot.val();
						product["key"] = childSnapshot.key;
			      products.push(product);
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
			console.log(product);
			console.log(toppings);
			dispatch({
				type: C.ADD_PRODUCT_TO_CART
			});
		}
	}
};
