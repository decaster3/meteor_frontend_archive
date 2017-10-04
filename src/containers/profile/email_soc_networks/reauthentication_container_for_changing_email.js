import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { changeEmail, reacthenticateWithSocChangeEmail } from '../../../actions/profile/profile_settings_action'
import * as firebase from 'firebase';

class ReauthenticationContainerForChangingEmail extends Component {
  constructor(props){
    super(props);
    this.state = {
      password:'',
      googleProvider: new firebase.auth.GoogleAuthProvider(),
      facebookProvider: new firebase.auth.FacebookAuthProvider()
    }
    this.handleChange = this.handleChange.bind(this);
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
    let user = p.user
    let s = this.state
    var container = []
    var authProviders = []
    for (var i = 0; i < user.authProviders.length; i++){
      authProviders.push(user.authProviders[i].providerId)
    }
    if(authProviders.includes("password")){
      var emailReauth = (
        <div>
          <label>
            Password:
            <input name = "password" type = "password" defaultValue = {s.password} onChange = {this.handleChange}/>
          </label>
          <button onClick = {() => p.changeEmail(p.newEmail, s.password)}>Подтвердить</button>
        </div>)
        container.push(emailReauth)
    }
    if(authProviders.includes("facebook.com")){
      var facebookReauth = (
        <div className="facebookSignin">
          <button onClick={() => {p.reacthenticateWithSocChangeEmail(s.facebookProvider, p.newEmail)}}>Log in with facebook</button>
        </div>)
      container.push(facebookReauth)
    }
    if(authProviders.includes("google.com")){
      var facebookReauth = (
        <div className="gmailSignin">
          <button onClick={() => {p.reacthenticateWithSocChangeEmail(s.googleProvider, p.newEmail)}}>Log in with gmail</button>
        </div>)
      container.push(facebookReauth)
    }
    var showContainer = container[0]
  return (
    <div>
      {showContainer}
    </div>
  )
  }
}

function mapStateToProps(state){
  return{
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      reacthenticateWithSocChangeEmail: reacthenticateWithSocChangeEmail,
      changeEmail: changeEmail
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ReauthenticationContainerForChangingEmail)
