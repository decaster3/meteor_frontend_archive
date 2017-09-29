var C = require("../../constants/profile/profile.js");
var initialState = require("./initial_state.js");

module.exports = function(currentstate = initialState.profile_settings, action){
  switch(action.type){
    case C.LOADING:
    return {
      profile_settings_category: C.LOADING_CATEGORY
    };
    case C.SETTINGS_CATEGORY_SELECTED:
      return {
        profile_settings_category: action.category
      };
    default:
      return currentstate;
  }
}
