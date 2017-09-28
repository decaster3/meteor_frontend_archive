import * as firebase from 'firebase';
var C = require("../../constants/menu/products.js");

module.exports = {
	switchProducts: function(category) {
	  return {
      type: C.SWITCH_PRODUCT,
      currentCategory: category
    };
  },

	loadProducts: function(category) {
		return function(dispatch, getState) {
			dispatch({ type: C.LOADING_PRODUCTS });
			firebase.database().ref().child('products').child(category).once('value', snapshot => {
			  var products = [];
				var sub_categories = [];

				snapshot.forEach(function(childSnapshot) {
						if (childSnapshot.key === "sub_categories") {
							sub_categories = childSnapshot.val();
						} else {
							var product = childSnapshot.val();
							product["product_id"] = childSnapshot.key;
							product["count"] = 0;
							product["category"] = category;

				      products.push(product);
						}
			  });
				dispatch({
					type: C.LOAD_PRODUCTS,
					products: products,
					all_products: products,
					sub_categories: sub_categories
				});
			});
    }
  }


};
