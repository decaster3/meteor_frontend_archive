var C = require("../../constants/cart/cart.js");

module.exports = {
	addProductToCart: function(product, toppings) {
		return function(dispatch, getState) {
			console.log(product);
			console.log(toppings);
		
		}
	}
};
