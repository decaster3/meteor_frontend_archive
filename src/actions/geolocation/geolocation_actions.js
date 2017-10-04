import * as firebase from 'firebase';
var C = require("../../constants/geolocation/geolocation.js");

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
         result_type: ['country'],
         location_type: ['ROOFTOP', 'APPROXIMATE']
      }, (err, response) => {

        if (!err) {
          var location = response.json.results[0].formatted_address;
          if (!getState().geolocation.legalLocations.includes(location))
            dispatch({ type: C.SET_DEFAULT });
          else {
            checkUserLocation(location);
          }
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
    if (!location)
      location = getState().geolocation.location;

    var user = getState().user;
    var locationState = C.NOT_DETERMINE;

    if (user.currently == C.SIGNED_IN) {
      var userCountry = user.country;

      if (!userCountry)
        changeUserCountry(country);

      confused = userCountry == location ? C.DETERMINED : C.NOT_DETERMINE;
    }
    dispatch({
      type: C.SEND_LOCATION,
      location,
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

    if (user.currently == C.SIGNED_IN) {
      changeUserCountry(location);
    }

    dispatch({
      type: C.SEND_LOCATION,
      location,
      locationState: C.DETERMINED
    });
  }
}

export function changeUserCountry(country){
  var user = firebase.auth.currentUser;
  var {uid} = user;
  firebase.database().ref().child('users').child(uid).child("country").set(country);
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
