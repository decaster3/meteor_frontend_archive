var C = require("../../constants/menu/category.js");
var initialState = require("./initial_state.js");

module.exports = function(currentstate = initialState.categories, action){
  switch(action.type){
    case C.LOAD_CATEGORY:
      return {
        categoryState: C.LOADED,
        categories: action.categories
      };
    case C.LOADING:
      return {
        categoryState: C.LOADING,
        categories: []
      };
    default:
      return currentstate;
  }
}
