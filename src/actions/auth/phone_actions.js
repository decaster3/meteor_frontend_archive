import * as firebase from 'firebase';
let C = require("../../constants/auth/phone.js")

export function sendVerificationCode(phoneNumber, appVerifier){
  return function(dispatch){
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        dispatch({type: C.SEND_VERIFICATION_CODE})
        appVerifier.confirmationResult = confirmationResult
      })
  }
}

export function afterSendVerifeingCode(code, appVerifier){
  var user1 = firebase.auth.currentUser
  var user2 = firebase.auth().currentUser
  console.log(1);
  console.log(user1);
  console.log(2);
  console.log(user2);
  var credential = firebase.auth.PhoneAuthProvider.credential(appVerifier.confirmationResult.verificationId, code);
  // var prevUser = firebase.auth().currentUser;
  return function(dispatch){
    firebase.auth().currentUser.linkWithCredential(credential).then(function(user) {
      dispatch({type: C.VERIFIED, phoneNumber: firebase.auth.currentUser.phoneNumber})
      console.log("Account linking success", user);
    }, function(error) {
      console.log("Account linking error", error);
    });

  }
}
