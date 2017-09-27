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
						product["product_id"] = childSnapshot.key;
						product["count"] = 0;
						product["category"] = category;

			      products.push(product);
			  });

				dispatch({
					type: C.LOAD_PRODUCTS,
					cards: products,
					currentCategory: category
				});
			});
    }
  }


};
