import React, { Component } from 'react';
import { connect } from 'react-redux';
import { passwordSignin, passwordSignup, googleSignin, facebookSignin, logoutUser } from '../../actions/auth/authentication_actions';
import PhoneVerificationContainer from './phone_verification_container'
import { bindActionCreators } from 'redux';
import * as firebase from 'firebase';

import  MainAuthComponent from '../../components/auth_page/main_auth_component'
let C = require("../../constants/auth/authentication.js")

class AuthenticateContainer extends Component {
  constructor(props){
    super(props)

    }

  render(){
		let p = this.props
    let user = p.user
    let s = this.state
		switch(user.currently){
			case C.SIGNED_IN:
        return (
          <div>
            <button
              onClick = { () => p.logoutUser()}>
              Log Out
            </button>
            <PhoneVerificationContainer />
          </div>
			   );
			case C.AWAITING:
        return (
				  <div>Loading...</div>
			  );
      case C.ANONYMOUS:
        return (
          <MainAuthComponent
            facebookSignin = {p.facebookSignin}
            googleSignin = {p.googleSignin}
            passwordSignup = {p.passwordSignup}
            passwordSignin = {p.passwordSignin}/>
        );
			default:
        return (
          <div>Loading...</div>
        );
		}
	}
}

function mapStateToProps(state){
    return {
      user: state.user
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      passwordSignin: passwordSignin,
      passwordSignup: passwordSignup,
      googleSignin: googleSignin,
      facebookSignin: facebookSignin,
      logoutUser: logoutUser
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer)
