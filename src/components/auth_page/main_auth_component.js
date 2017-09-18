import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startListeningToAuth, attemptLogin, logoutUser } from '../../actions/auth/authentication_actions.js';
import { bindActionCreators } from 'redux';

var C = require("../../constants/auth/authentication.js")

class MainAuthComponent extends Component {

  render(){
    console.log(this.props);
		var p = this.props
    var auth = p.user;
		switch(auth.currently){
			case C.LOGGED_IN: return (
				<div className="authpanel">
					<span>Logged in as {auth.username}.</span>
          {' '}<button onClick={p.logoutUser}>Log out</button>
				</div>
			);
			case C.AWAITING_AUTH_RESPONSE: return (
				<div className="authpanel">
					<button disabled><i className="fa fa-spinner fa-spin"></i> authenticating...</button>
				</div>
			);
			default: return (
				<div className="authpanel">
					<button onClick={p.attemptLogin}>Log in</button>
				</div>
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
      startListeningToAuth: startListeningToAuth,
      attemptLogin: attemptLogin,
      logoutUser: logoutUser
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainAuthComponent)
