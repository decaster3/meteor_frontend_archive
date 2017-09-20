import * as firebase from 'firebase';
let C = require("../../constants/auth/authentication.js")

	// вызывается при инициализации приложения, затем слушает на изменения
	export function startListeningToAuth(){
		return function(dispatch,getState){
			firebase.auth().onAuthStateChanged(function(user) {
				if (user){
					console.log(user);
					var isPhoneVerify = false
					if (user.phoneNumber != null){
						isPhoneVerify = true
					}
					console.log(user);
					dispatch({
						type: C.SIGNIN_USER,
						uid: user.uid,
						username: user.email,
						phoneVerified: isPhoneVerify,
						emailVerified: user.emailVerified
					});
				} else {
					if (getState().user.currently !== C.ANONYMOUS){ // иногда выбрасывал что залогинен, хотя не был, хз почему, это костыль
						dispatch({type:C.LOGOUT});
					}
				}
			});
		}
	}

	export function facebookSignin(){
    let provider = new firebase.auth.FacebookAuthProvider();
		return function(dispatch){
			dispatch({type:C.ATTEMPTING})
      firebase.auth().signInWithPopup(provider).then(function(result) {
      }).then(() => {
				var user = firebase.auth().currentUser
				firebase.auth().onAuthStateChanged(function(user) {
					if(!user.emailVerified){
						user.sendEmailVerification();
					}
				})
			}).catch(function(error) {
        console.log(error)
        dispatch({type:C.LOGOUT})
        })
		}
	}
	export function phoneVerify(){

	}

	export function emailVerify(){
		var user = firebase.auth().currentUser
		return function(dispatch){
			firebase.auth().onAuthStateChanged(function(user) {
				user.sendEmailVerification();
			})
		}
	}

	export function googleSignin(){
		let provider = new firebase.auth.GoogleAuthProvider();
		return function(dispatch){
			dispatch({type:C.ATTEMPTING})
			firebase.auth().signInWithPopup(provider).then(function(result) {
			}).catch(function(error) {
				console.log(error)
				dispatch({type:C.LOGOUT})
				})
		}
	}

	export function passwordSignin(email,pass){
		return function(dispatch){
			dispatch({type:C.ATTEMPTING})
			firebase.auth().signInWithEmailAndPassword(email, pass)
		}
	}

	export function passwordSignup(email,pass){
		return function(dispatch){
			dispatch({type:C.ATTEMPTING})
				firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
					dispatch({type:C.LOGOUT})
				});
				var user = firebase.auth().currentUser
				firebase.auth().onAuthStateChanged(function(user) {
					user.sendEmailVerification()
				})
		}
	}

	export function logoutUser(){
		return function(dispatch){
			dispatch({type:C.LOGOUT});
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
		}
	}
