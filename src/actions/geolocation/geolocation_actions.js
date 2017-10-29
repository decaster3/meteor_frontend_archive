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
          var location = response.json.results[0].formatted_address.split(",")[0];

          if (!getState().geolocation.legalLocations.includes(location))
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
export function checkUserLocation(default_country = null) {
  return function(dispatch, getState){

    if (!default_country){
      default_country = getState().geolocation.location;
      if (!default_country)
        return;
    }

    var user = getState().user;
    var locationState = C.NOT_DETERMINE;

    if (user.currently == AUTH.SIGNED_IN) {

      var userCountry = user.default_country;

      if (!userCountry)
        changeUserCountry(default_country);

      if (userCountry == default_country)
        locationState = C.DETERMINED
    }
    dispatch({
      type: C.SEND_LOCATION,
      location: default_country,
      locationState
    });
  }
}

export function setChaingingState() {
  return {
    type: C.CHANGING
  }
}

export function setLocation(location) {
  return function(dispatch, getState) {
    var user = getState().user;

    if (user.currently == AUTH.SIGNED_IN) {
      changeUserCountry(location);
    }

    dispatch({
      type: C.SEND_LOCATION,
      location,
      locationState: C.DETERMINED
    });

  }
}

export function changeUserCountry(default_country){
  var user = firebase.auth().currentUser;
  var {uid} = user;
  firebase.database().ref().child('users').child(uid).child("default_country").set(default_country);
}

export function initLocation() {
  return function(dispatch,getState){
      firebase.database().ref().child('locations').once('value', snapshot => {
        var legalLocations = snapshot.val();
        var defaultLocation = legalLocations[0];

        dispatch({
          type: C.INIT,
          legalLocations,
          defaultLocation
        });
        dispatch(getLocation());
      })
  }
}
