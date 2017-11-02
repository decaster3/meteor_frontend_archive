var C = require("../../constants/geolocation/geolocation.js");
var initialState = require("./initial_state.js");

module.exports = function(currentstate = initialState, action){
  switch(action.type){

    case C.SEND_LOCATION:
      return {
        ...currentstate,
        locationState: action.locationState,
        city: action.city,
        country: action.country
      };
    case C.SET_DEFAULT:
      return {
        ...currentstate,
        locationState: C.NOT_DETERMINE
      };
    case C.CHANGING:
      return {
        ...currentstate,
        locationState: C.CHANGING
      };
    case C.INIT:
      return {
        ...currentstate,
        locationState: C.INIT,
        location: "",
        defaultLocation: action.defaultLocation,
        legalLocations: action.legalLocations,
      };
    case C.SET_COUNTRY:
      return {
        ...currentstate,
        address: action.address
      };
    case C.SET_ADDRESS:
      return {
        ...currentstate,
        address: action.address
      };
    case C.SET_HOUSE:
      return {
        ...currentstate,
        house: action.house
      };
    case C.SET_FLAT:
      return {
        ...currentstate,
        flat: action.flat
      };
    default:
      return currentstate;
  }
}
