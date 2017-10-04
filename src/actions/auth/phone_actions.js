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
  var credential = firebase.auth.PhoneAuthProvider.credential(appVerifier.confirmationResult.verificationId, code);
  return function(dispatch){
    firebase.auth().currentUser.linkWithCredential(credential).then(function(user) {
      let authRef = firebase.database().ref().child('users').child(user.uid)
      authRef.update({
        phoneVerified: true,
        authProviders: user.providerData,
        phoneNumber: user.phoneNumber
      })
      dispatch({type: C.VERIFIED, phoneNumber: user.phoneNumber})
      console.log("Account linking success", user);
    }, function(error) {
      console.log("Account linking error", error);
    });

  }
}
