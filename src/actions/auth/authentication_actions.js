import * as firebase from 'firebase';
var C = require("../../constants/auth/authentication.js")

module.exports = {
	// вызывается при инициализации приложения, затем слушает на изменения
	startListeningToAuth: function(){
		return function(dispatch,getState){
			firebase.auth().onAuthStateChanged(function(user) {
				if (user){
					dispatch({
						type: C.LOGIN_USER,
						uid: user.uid,
						username: user.email
					});
				} else {
					if (getState().user.currently !== C.ANONYMOUS){ // иногда выбрасывал что залогинен, хотя не был, хз почему, это костыль
						dispatch({type:C.LOGOUT});
					}
				}
			});
		}
	},
	attemptLogin: function(){
    var provider = new firebase.auth.FacebookAuthProvider();
		return function(dispatch,getState){
			dispatch({type:C.ATTEMPTING_LOGIN})
      firebase.auth().signInWithPopup(provider).then(function(result) {
      }).catch(function(error) {
        console.log(error)
        dispatch({type:C.LOGOUT})
        })
		}
	},
	logoutUser: function(){
		return function(dispatch,getState){
			dispatch({type:C.LOGOUT});
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
		}
	}
};
