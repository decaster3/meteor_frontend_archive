var C = require("../../constants/profile/profile.js")
var initialState = require("./initial_state.js");

module.exports = function(currentState = initialState.profile, action) {
  switch(action.type) {
    case C.LOAD:
      return {
        userStatus: C.LOADED,
        link: action.link,
        user: action.user
      };
    default: return currentState;
  }
}
