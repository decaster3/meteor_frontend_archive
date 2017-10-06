var C = require("../../constants/profile/profile.js");
var initialState = require("./initial_state.js");

module.exports = function(currentstate = initialState.profile_settings, action){
  switch(action.type){
    case C.SETTINGS_CATEGORY_SELECTED:
      return {
        profile_settings_category: action.category,
        changing: currentstate.changing
      };
    case C.FIELD_CHANGING:
      return {
        profile_settings_category: currentstate.profile_settings_category,
        changing: action.changing
      };
    default:
      return currentstate;
  }
}
