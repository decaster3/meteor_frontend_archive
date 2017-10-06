let C = require('../../constants/profile/profile')
import * as firebase from 'firebase';

export function setSettingsCategory(category){
  return function(dispatch) {
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

export function reacthenticateWithSocChangeEmail(provider, email){
  let authRef = firebase.database().ref().child('users')
  return function(dispatch){
    firebase.auth().signOut()
    dispatch({type: C.FIELD_CHANGING, changing: C.LOADING_REAUTHENTICATION})
    firebase.auth().signInWithPopup(provider).then(function(result) {
    }).then(() => {
      var user = firebase.auth().currentUser
      user.updateEmail(email).then(function() {
        authRef.child(user.uid).update({
          email: email,
          emailVerified: false
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

    }).catch(function(error) {
      console.log(error)
      dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      })
  }
}

export function changeEmail(email,password){
  let authRef = firebase.database().ref().child('users')
  let user = firebase.auth().currentUser
    return function(dispatch){
      if (Boolean(password)){
        dispatch({type: C.FIELD_CHANGING, changing: C.LOADING_REAUTHENTICATION})
        var credentials = firebase.auth.EmailAuthProvider.credential(
          user.email,
          password
        );
        user.reauthenticateWithCredential(credentials);
      }
      user.updateEmail(email).then(function() {
        authRef.child(user.uid).update({
          email: email,
          emailVerified: user.emailVerified
        })
        authRef.once('value')
          .then(function(snapshot){
              firebase.auth().onAuthStateChanged(function(user) {
                if(!user.emailVerified){
                  user.sendEmailVerification();
                }
              })
          }).then(() =>
          {
            // кейс когда пользователь залогинился недавно, и успешно сменил почту
            dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})}
        )
      }).catch(function(error) {
        // кейс когда пользователь залогинился давно и ему нужно перелогиниться
          dispatch({type: C.FIELD_CHANGING, changing: C.REAUTHENTICATE_USER_FOR_CHANGE_EMAIL})
        });
    }
}

export function verifyEmail(){
  var user = firebase.auth().currentUser
  return function(dispatch){
    user.sendEmailVerification().then(function() {
    console.log("email sent");
    }).catch(function(error) {
    console.log(error.message);
    }).then(() =>
      {dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})}
    )
  }
}

export function addPasswordAuth(email, password){
  // нужно тестить
  var credential = firebase.auth.EmailAuthProvider.credential(email, password);
  auth.currentUser.link(credential).then(function(user) {
    console.log("Account linking success", user);
  }, function(error) {
    console.log("Account linking error", error);
  });
}

export function linkFacebook(){
  //нужно тестить
  let user = firebase.auth().currentUser
  var provider = new firebase.auth.FacebookAuthProvider();
  return function(dispatch){
    dispatch({type: C.FIELD_CHANGING, changing: C.LOADING_LINKING})
    user.linkWithPopup(provider).then(function(result) {
      let authRef = firebase.database().ref().child('users').child(user.uid)
      authRef.update({
        authProviders: user.providerData
      }).then( () => {
        dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      })
      console.log("linked facebook");
      console.log(firebase.auth.FacebookAuthProvider());
    }).catch(function(error) {
      console.log(error.message);
    });
  }
}


export function unlinkFacebook(){
  let user = firebase.auth().currentUser
  let providerId = 'facebook.com'
  return function(dispatch){
    dispatch({type: C.FIELD_CHANGING, changing: C.LOADING_LINKING})
    user.unlink(providerId).then(function() {
      let authRef = firebase.database().ref().child('users').child(user.uid)
      authRef.update({
        authProviders: user.providerData
      }).then( () => {
        dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      })
      console.log('unlink facebook was success');
    }).catch(function(error) {
      console.log(error.message);
    });
  }
}

export function linkGoogle(){
  let user = firebase.auth().currentUser
  var provider = new firebase.auth.GoogleAuthProvider();
  return function(dispatch){
    dispatch({type: C.FIELD_CHANGING, changing: C.LOADING_LINKING})
    user.linkWithPopup(provider).then(function(result) {
      let authRef = firebase.database().ref().child('users').child(user.uid)
      authRef.update({
        authProviders: user.providerData
      }).then( () => {
        dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      })
      console.log("linked google");
    }).catch(function(error) {
      dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      console.log(error.message);
    });
  }
}

export function unlinkGoogle(){
  let user = firebase.auth().currentUser
  let providerId = 'google.com'
  return function(dispatch){
    dispatch({type: C.FIELD_CHANGING, changing: C.LOADING_LINKING})
    user.unlink(providerId).then(function() {
      let authRef = firebase.database().ref().child('users').child(user.uid)
      authRef.update({
        authProviders: user.providerData
      }).then( () => {
        dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      })
      console.log('unlink google was success');
    }).catch(function(error) {
      console.log(error.message);
    });
  }
}

export function reacthenticateWithSocAddPassword(providerName, password){
  // на вход приходит пароль и провайдеры доступные для реауза
  var provider = {};
  if (providerName == "facebook")
    provider = new firebase.auth.FacebookAuthProvider();
  else if (providerName == "google")
    provider = new firebase.auth.GoogleAuthProvider();
  let authRef = firebase.database().ref().child('users')
  return function(dispatch){
    firebase.auth().signOut().then(function() {
      dispatch({type: C.FIELD_CHANGING, changing: C.LOADING_REAUTHENTICATION})
      firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = firebase.auth().currentUser
        var credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
        user.linkWithCredential(credential).then(function(user) {
          console.log("link with password was success");
          let authRef = firebase.database().ref().child('users').child(user.uid)
          authRef.update({
            authProviders: user.providerData
          }).then( () => {
            dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
          })
        }, function(error) {
          dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
          console.log("Account password linking error", error);
        });
      })
      .catch(function(error) {
        console.log(error)
        dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
        })
    }).catch(function(error) {
      console.log(error)
      dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
    });
  }
}

export function linkPassword(password){
  let user = firebase.auth().currentUser
  var credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
  return function(dispatch){
    dispatch({type: C.FIELD_CHANGING, changing: C.LOADING_LINKING})
    user.linkWithCredential(credential).then(function(user) {
      console.log("link with password was success");
      let authRef = firebase.database().ref().child('users').child(user.uid)
      authRef.update({
        authProviders: user.providerData
      }).then( () => {
        dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      })
    }, function(error) {
      dispatch({type: C.FIELD_CHANGING, changing: C.REAUTHENTICATE_USER_FOR_ADD_PASSWORD})
      console.log("Account password linking error", error);
    });
  }
}
export function reacthenticateChangePassword(oldPassword, newPassword){
  let user = firebase.auth().currentUser
  let authRef = firebase.database().ref().child('users')
  return function(dispatch){
    var credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword
    );
    console.log(credentials);
    user.reauthenticateWithCredential(credentials).then(function() {
      user.updatePassword(newPassword).then(function() {
        console.log("update password was successful");
        dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      }).catch(function(error) {
        console.log(error);
        dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      })
    }).catch(function(error) {
      console.log(error.message);
      dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
    });

  }
}
export function changePassword(password) {
  var user = firebase.auth().currentUser;
  var newPassword = password;
  return function(dispatch){
    user.updatePassword(newPassword).then(function() {
      dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
    }).catch(function(error) {
      dispatch({type: C.FIELD_CHANGING, changing: C.REAUTHENTICATE_USER_FOR_CHANGE_PASSWORD})
    })
  }
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
