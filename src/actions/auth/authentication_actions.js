import * as firebase from 'firebase';
let C = require("../../constants/auth/authentication.js")

	// вызывается при инициализации приложения, затем слушает на изменения
	export function startListeningToAuth(){
		return function(dispatch,getState){
			firebase.auth().onAuthStateChanged(function(user) {
				if (user){
					var userInfoForProviders= user.providerData
					var authProviders = []
					for (var i = 0; i < userInfoForProviders.length; i++){
						authProviders.push(userInfoForProviders[i].providerId)
					}
					var isPhoneVerify = false
					if (user.phoneNumber != null){
						isPhoneVerify = true
					}
					//подгрузка данных из базы данных профиля пользователя
					let authRef = firebase.database().ref().child('users').child(user.uid)
					authRef.on('value', function(snapshot){
						dispatch({
							type: C.SIGNIN_USER,
							uid: user.uid,
							authProviders: authProviders,
							email: snapshot.val().email,
							phoneVerified: isPhoneVerify,
							emailVerified: user.emailVerified,
							username: snapshot.val().username
						});
					})
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
		let authRef = firebase.database().ref().child('users')
		return function(dispatch){
			dispatch({type:C.ATTEMPTING})
      firebase.auth().signInWithPopup(provider).then(function(result) {
      }).then(() => {
				var user = firebase.auth().currentUser
				//добавление информации в профиль пользователя в бд
				authRef.once('value')
					.then(function(snapshot){
						if (!snapshot.hasChild(user.uid)){
							//отправление верификации почты, только в первый раз, нужно протестировать
							firebase.auth().onAuthStateChanged(function(user) {
								if(!user.emailVerified){
									user.sendEmailVerification();
								}
							})
							authRef.child(user.uid).set({
								username: user.displayName,
								email: user.email
							})
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
		firebase.auth().onAuthStateChanged(function(user) {
				user.sendEmailVerification();
		})
	}

	export function googleSignin(){
		let authRef = firebase.database().ref().child('users')
		let provider = new firebase.auth.GoogleAuthProvider();
		return function(dispatch){
			dispatch({type:C.ATTEMPTING})
			firebase.auth().signInWithPopup(provider).then(function(result) {
			}).then( () => {
				//зфапись в бд если его там не было
				var user = firebase.auth().currentUser
				authRef.once('value')
					.then(function(snapshot){
						if (!snapshot.hasChild(user.uid)){
							authRef.child(user.uid).set({
								username: user.displayName,
								email: user.email
							})
						}
					})
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

	export function passwordSignup(email,name,lastName,pass){
		let authRef = firebase.database().ref().child('users')
		return function(dispatch){
			dispatch({type:C.ATTEMPTING})
				firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => {
					//отправление письма и запись в бд при регистрации
					var user = firebase.auth().currentUser
					firebase.auth().onAuthStateChanged(function(user) {
						user.sendEmailVerification()
					})
					authRef.once('value')
						.then(function(snapshot){
							if (!snapshot.hasChild(user.uid)){
								authRef.child(user.uid).set({
									username: name + " " + lastName,
									email: user.email
								})
							}
						})
				}).catch(function(error) {
					dispatch({type:C.LOGOUT})
				});
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
