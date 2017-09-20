import React, { Component } from 'react';
import { connect } from 'react-redux';
import { passwordSignin, passwordSignup, googleSignin, facebookSignin, logoutUser } from '../../actions/auth/authentication_actions';
import { bindActionCreators } from 'redux';
import * as firebase from 'firebase';

let C = require("../../constants/auth/authentication.js")

class MainAuthComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      emailSignup: '',
      passSignup: '',
      emailSignin: '',
      passSignin: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('ivisible_recaptcha', {
      'size': 'invisible',
      'callback': function(response) {
        console.log(response);
      }
    });
  }

  handleChange(event){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  render(){
		let p = this.props
    let auth = p.user;
		switch(auth.currently){
			case C.SIGNED_IN: return (
				<div className="authpanel">
          <div id="ivisible_recaptcha"></div>
					<span>Logged in as {auth.username}.</span>
          <span>Email {() => {
              if(!auth.emailVerified){
                return ("Verify your email!")
              }
            }}
          </span>
          {' '}<button onClick={p.logoutUser}>Log out</button>
				</div>
			);
			case C.AWAITING: return (
				<div className="facebookSignin">
          <div id="ivisible_recaptcha"></div>
					WAIT
				</div>
			);
			default: return (
        <div>
          <div id="ivisible_recaptcha"></div>
          <div className="facebookSignin">
            <button onClick={p.facebookSignin}>Log in with facebook</button>
          </div>

          <div className="googleSignin">
            <button onClick={p.googleSignin}>Log in with google</button>
          </div>

              PASSWORD SIGNUP<br />
              <label>
                Email:
                <input name="emailSignup" type = "text" defaultValue = {this.state.emailSignup} onChange = {this.handleChange}/>
              </label>
              <label>
                Passwprd:
                <input name = "passSignup" type = "password" defaultValue = {this.state.passSignup} onChange = {this.handleChange}/>
              </label>
              <button onClick = {() => p.passwordSignup(this.state.emailSignup, this.state.passSignup)}>SIGN UP</button>

              <br />PASSWORD SIGNIN<br />
              <label>
                Email:
                <input name="emailSignin" type = "text" defaultValue = {this.state.emailSignin} onChange = {this.handleChange}/>
              </label>
              <label>
                Passwprd:
                <input name = "passSignin" type = "password" defaultValue = {this.state.passSignin} onChange = {this.handleChange}/>
              </label>
              <button onClick = {() => p.passwordSignin(this.state.emailSignin, this.state.passSignin)}>SIGN IN</button>
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
      passwordSignin: passwordSignin,
      passwordSignup: passwordSignup,
      googleSignin: googleSignin,
      facebookSignin: facebookSignin,
      logoutUser: logoutUser
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainAuthComponent)
