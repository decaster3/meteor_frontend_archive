import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendVerificationCode, afterSendVerifeingCode } from '../../actions/auth/phone_actions'
import { bindActionCreators } from 'redux';
import * as firebase from 'firebase';

let P = require("../../constants/auth/phone.js")

class PhoneVerificationContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      appVerifier: undefined,
      phoneNumber: '',
      verificationCode: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    this.setState({
      appVerifier: new firebase.auth.RecaptchaVerifier('invisible-recaptcha', {'size': 'invisible'} )
    })
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
    let phone = p.phone
    switch(phone.currently) {
        case P.PHONE_EXIST: return (
          <div><div id="invisible-recaptcha"></div>
          {phone.phoneNumber}</div>
        )
        case P.WAITING_VERIFICATION_CODE: return (
          <div><div id="invisible-recaptcha"></div>
            <br />Enter verification code<br />
            <label>
              Verification code:
              <input name="verificationCode" type = "text" defaultValue = {this.state.verificationCode} onChange = {this.handleChange}/>
              <button onClick = {() => { p.afterSendVerifeingCode(this.state.verificationCode, this.state.appVerifier) }}> Send verification code</button>
          </label>
          </div>
        )
        default: return (
          <div><div id="invisible-recaptcha"></div>
            <br />Enter phone number<br />
            <label>
              Phone number:
              <input name="phoneNumber" type = "text" defaultValue = {this.state.phoneNumber} onChange = {this.handleChange}/>
              <button onClick = {() => { p.sendVerificationCode(this.state.phoneNumber, this.state.appVerifier) }}> Send verification code</button>
          </label>
          </div>
        )
      }
  }
}

function mapStateToProps(state){
    return {
      phone: state.phone
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      afterSendVerifeingCode: afterSendVerifeingCode,
      sendVerificationCode: sendVerificationCode,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerificationContainer)
