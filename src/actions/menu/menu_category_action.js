var C = require("../../constants/menu/category.js");
import * as firebase from 'firebase';
import { loadProducts} from './menu_product_action.js';

module.exports = {
	loadingCategories: function(){
		return function(dispatch, getState) {
			dispatch({ type: C.LOADING });

			firebase.database().ref().child('categories').once('value', snapshot => {
	      var categories = snapshot.val();
				dispatch({
					type: C.LOAD_CATEGORY,
					categories: categories
				});
				dispatch(loadProducts(categories[0]));
	    });
    }
  }
};
