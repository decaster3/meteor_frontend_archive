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

export function changeLocation(){

}

export function rememberPassword(){

}

export function changeEmail(){

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

export function addAddress(){

}
