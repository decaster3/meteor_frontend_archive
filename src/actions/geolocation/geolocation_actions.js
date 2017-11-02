import * as firebase from 'firebase';
var C = require("../../constants/geolocation/geolocation.js");
var AUTH = require("../../constants/auth/authentication.js");

export function getLocation() {
  return function(dispatch, getState){
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      var googleMapsClient = require('@google/maps').createClient({
        key: 'AIzaSyDeRt-ekVSI0anD_b1zE5Kl7WobsRGutvc'
      });

      googleMapsClient.reverseGeocode({
         latlng: [lat, lng],
         result_type: ['locality'],
         location_type: ['ROOFTOP', 'APPROXIMATE']
      }, (err, response) => {

        if (!err && response.json.status != "ZERO_RESULTS") {

          var city = null;
          var country = null;

          response.json.results[0].address_components.map(result => {
            if (result.types.includes("locality")) {
              city = result.long_name;
            }
            if (result.types.includes("country")) {
              country = result.long_name;
            }
          });

          var location = {city, country};
        
          if (getState().geolocation.legalLocations[city] != country)
            location = getState().geolocation.defaultLocation;
          dispatch(checkUserLocation(location));
        }
        else
          dispatch({ type: C.SET_DEFAULT });
      })
    },
    (error) => dispatch({ type: C.SET_DEFAULT }),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
}

//TODO add to auth state changer
export function checkUserLocation(location = null) {
  return function(dispatch, getState){

    if (!location) {
      location = { "city": getState().geolocation.city, "country": getState().geolocation.country };
      if (!location)
        return;
    }

    var user = getState().user;
    var locationState = C.NOT_DETERMINE;

    if (user.currently == AUTH.SIGNED_IN) {
      var city = user.default_city;
      var country = user.default_country;
      var userLocation = { city, country };

      if (!city || !country)
        changeUserDefaultLocation(location);

      if (userLocation == location)
        locationState = C.DETERMINED
    }

    dispatch({
      type: C.SEND_LOCATION,
      city: location.city,
      country: location.country,
      locationState
    });
  }
}

export function setLocation(location) {
  return function(dispatch, getState) {
    var user = getState().user;

    if (user.currently == AUTH.SIGNED_IN) {
      changeUserDefaultLocation(location);
    }

    dispatch({
      type: C.SEND_LOCATION,
      city: location.city,
      country: location.country,
      locationState: C.DETERMINED
    });
  }
}

export function changeUserDefaultLocation(location){
  var user = firebase.auth().currentUser;
  var { uid } = user;
  firebase.database().ref().child('users').child(uid).child("default_country").set(location.country);
  firebase.database().ref().child('users').child(uid).child("default_city").set(location.city);
}

export function initLocation() {
  return function(dispatch,getState){
      firebase.database().ref().child('locations').once('value', snapshot => {
        var legalLocations = snapshot.val();
        var city = Object.keys(legalLocations)[0];
        var defaultLocation = { city, "country": legalLocations[city] };

        dispatch({
          type: C.INIT,
          legalLocations,
          defaultLocation
        });
        dispatch(getLocation());
      })
  }
}

export function setAddress(address) {
  return {
      type: C.SET_ADDRESS,
      address
  }
}

export function setHouse(house) {
  return {
      type: C.SET_HOUSE,
      house
  }
}

export function setFlat(flat) {
  return {
      type: C.SET_FLAT,
      flat
  }
}

export function setChaingingState() {
  return {
    type: C.CHANGING
  }
}
