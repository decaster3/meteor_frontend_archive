import React from 'react';
import FontAwesome from 'react-fontawesome';
import AuthSocialsComponent from './auth_socials_component';

export default class AuthSignUpComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      emailSignup: '',
      passSignup: '',
      passConfirmSignup: '',
      firstNameSignup: '',
      lastNameSignup: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  render() {
    let s = this.state;
    let p = this.props.p;
    return (
      <div id="sign-up-section">
        <div>
          Sign Up
        </div>
        <AuthSocialsComponent p={p} />
        <div>
          <input type="text" name="emailSignup" onChange={this.handleChange} value={s.emailSignup} placeholder="Email"/>
        </div>
        <div>
          <input type="text" name="firstNameSignup" onChange={this.handleChange} value={s.firstNameSignup} placeholder="First Name"/>
        </div>
        <div>
          <input type="text" name="lastNameSignup" onChange={this.handleChange} value={s.lastNameSignup} placeholder="Last Name"/>
        </div>
        <div>
          <input type="password" name="passSignup" onChange={this.handleChange} value={s.passSignup} placeholder="Password"/>
        </div>
        <div>
          <input type="password" name="passConfirmSignup" onChange={this.handleChange} value={s.passConfirmSignup} placeholder="Confirm Password"/>
        </div>
        <div>
          <button onClick = {() => p.passwordSignup(s.emailSignup,s.firstNameSignup,s.lastNameSignup, s.passSignup)}>
            Sign Up
          </button>
          <a href="#" onClick={this.props.change_state}>
            Sign In
          </a>
        </div>
      </div>
    );
  }

}
