import React from 'react';
import FontAwesome from 'react-fontawesome';
import AuthSocialsComponent from './auth_socials_component';

export default class AuthSignInComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      emailSignin: '',
      passSignin: '',
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
      <div id="sign-in-section">
        <div>
          Sign In
        </div>
        <AuthSocialsComponent p={p}/>
        <div className="divider"></div>
        <div>
          <input type="text" name="emailSignin" onChange={this.handleChange} value={s.emailSignin} placeholder="Email"/>
        </div>
        <div>
          <input type="password" name="passSignin" onChange={this.handleChange} value={s.passSignin} placeholder="Password"/>
        </div>
        <div>
          <button onClick = {() => this.props.p.passwordSignin(s.emailSignin, s.passSignin)}>
            Sign In
          </button>
          <a href="#" onClick={this.props.change_state}>
            Sign Up
          </a>
        </div>
      </div>
    );
  }

}
