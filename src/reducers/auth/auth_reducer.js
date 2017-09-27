let C = require("../../constants/auth/authentication.js");
let initialState = require("./initial_state_user.js");

module.exports = function(currentstate = initialState.auth,action){
  switch(action.type){
    case C.ATTEMPTING:
      return {
        currently: C.AWAITING,
        emailVerified: false,
        phoneVerified: false,
        username: "guest",
        uid: null
      };
    case C.LOGOUT:
      return {
        currently: C.ANONYMOUS,
        emailVerified: false,
        phoneVerified: false,
        username: "guest",
        uid: null
      };
    case C.SIGNIN_USER:
      return {
        currently: C.SIGNED_IN,
        email: action.email,
        username: action.username,
        emailVerified: action.emailVerified,
        phoneVerified: action.phoneVerified,
        uid: action.uid
      };
    default: return currentstate;
  }
}
