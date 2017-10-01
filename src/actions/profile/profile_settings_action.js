let C = require('../../constants/profile/profile')
import * as firebase from 'firebase';

export function setSettingsCategory(category){
  return function(dispatch) {
    dispatch({type: C.LOADING})
    dispatch({type: C.SETTINGS_CATEGORY_SELECTED, category: category})
  }
}

export function changeName(name, lastName){
  let authRef = firebase.database().ref().child('users')
  var user = firebase.auth().currentUser
  return function(dispatch){
    authRef.once('value')
      .then(function(snapshot){
          authRef.child(user.uid).update({
            username: name + " " + lastName,
          })
      }).then(() =>
      {dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})})
}
////
}
export function addAvatar(){

}

export function changeAvatar(){

}

export function changeLocation(country, city){
  let authRef = firebase.database().ref().child('users')
  var user = firebase.auth().currentUser
  return function(dispatch){
    authRef.once('value')
      .then(function(snapshot){
          authRef.child(user.uid).update({
            default_country: country,
            default_city: city
          })
      }).then(() =>
      {dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})})
  }
}

export function addLocation(country,city){
  let authRef = firebase.database().ref().child('users')
  var user = firebase.auth().currentUser
  return function(dispatch){
    authRef.once('value')
      .then(function(snapshot){
          authRef.child(user.uid).update({
            default_country: country,
            default_city: city
          })
      }).then(() =>
      {dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})})
  }
}

export function rememberPassword(){

}

export function changeEmail(email){
  let authRef = firebase.database().ref().child('users')
  console.log(email);
  return function(dispatch){
    let user = firebase.auth().currentUser
    user.updateEmail(email).then(function() {
      authRef.child(user.uid).update({
        email: email
      })
      authRef.once('value')
        .then(function(snapshot){
            firebase.auth().onAuthStateChanged(function(user) {
              if(!user.emailVerified){
                user.sendEmailVerification();
              }
            })
        }).then(() =>
        {dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})}
      )
    })
  }
}

export function verifyEmail(){
  var user = firebase.auth().currentUser
  return function(dispatch){
    firebase.auth().onAuthStateChanged(function(user) {
        user.sendEmailVerification();
    }).then(() =>
      {dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})}
    )
  }
}

export function addPassword(){

}

export function changePassword(){

}

export function resendEmailVerification(){

}

export function addFacebook(){

}

export function changeFacebook(){

}
export function deleteFacebook(){

}

export function addGmail(){

}

export function changeGmail(){

}

export function deleteGmail(){

}

export function addAddress(country, city, flat, building, comments){
  let authRef = firebase.database().ref().child('users')
  var user = firebase.auth().currentUser
  return function(dispatch){
    authRef.once('value')
      .then(function(snapshot){
          authRef.child(user.uid).child('addresses').push({
            country: country,
            city: city,
            flat: flat,
            building: building,
            comments: comments
          })
      }).then(() =>
      {dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})})
  }
}
export function removeAddress(key){
  let authRef = firebase.database().ref().child('users')
  var user = firebase.auth().currentUser

  return function(dispatch){
    authRef.child(user.uid).child("addresses").child(key).remove()
    .then( () => {
      dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
    })
  }
}
