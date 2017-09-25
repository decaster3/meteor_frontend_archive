import * as firebase from 'firebase';
var C = require("../../constants/profile/profile.js")

module.exports = {
	// вызывается при инициализации приложения, затем слушает на изменения
	loadProfile: function(){
		return function(dispatch,getState){
      var {uid} = firebase.auth().currentUser || {uid: "Some_key"}

      const userRef = firebase.database().ref().child('users').child(uid);

      userRef.once('value', snapshot => {
        var user = snapshot.val();
        var referalCode = '/sign_up?ref=' + user.referalCode;
        dispatch({
          type: C.LOAD,
          link: referalCode,
          user: user
        });
      });
		}
	}
};
