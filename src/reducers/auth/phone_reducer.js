let C = require("../../constants/auth/phone.js");
let initialState = require("./initial_state_phone.js");

module.exports = function(currentstate,action){
  switch(action.type){
    case C.SEND_VERIFICATION_CODE:
      return {
        currently: C.WAITING_VERIFICATION_CODE,
        phoneNumber: null
      };
    case C.VERIFIED:
      return {
        currently: C.PHONE_EXIST,
        phoneNumber: action.phoneNumber
      };
    default: return currentstate || initialState;
  }
}
