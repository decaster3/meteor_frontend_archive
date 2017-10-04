var C = require("../../constants/geolocation/geolocation.js");
var initialState = require("./initial_state.js");

module.exports = function(currentstate = initialState, action){
  if (currentstate.locationState == C.DETERMINED)
    return currentstate;
  switch(action.type){
    case C.SEND_LOCATION:
      return {
        locationState: action.locationState,
        location: action.location,
        defaultLocation: currentstate.defaultLocation,
        legalLocations: currentstate.legalLocations,
      };
    case C.SET_DEFAULT:
      return {
        locationState: C.NOT_DETERMINE,
        location: currentstate.defaultLocation,
        defaultLocation: currentstate.defaultLocation,
        legalLocations: currentstate.legalLocations,
      };
    case C.CHANGING:
      return {
        locationState: C.CHANGING,
        location: currentstate.defaultLocation,
        defaultLocation: currentstate.defaultLocation,
        legalLocations: currentstate.legalLocations,
      };
    case C.INIT:
      return {
        locationState: C.INIT,
        location: "",
        defaultLocation: action.defaultLocation,
        legalLocations: action.legalLocations,
      };
    default:
      return currentstate;
  }
}
