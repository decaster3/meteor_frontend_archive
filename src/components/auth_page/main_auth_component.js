import React, { Component } from 'react';
import AuthContainer from '../../containers/auth/authenticate_container';
import AuthSignInComponent from './auth_sign_in_component';
import AuthSignUpComponent from './auth_sign_up_component';

export default class MainAuthComponent extends Component {
  constructor(props){
    super(props)

    this.state = {
      sign_in: true
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

  change_state() {
    this.setState({
      sign_in: !this.state.sign_in
    });
  }

  render(){
    let p = this.props
    let user = p.user
    let s = this.state
    return (
      <div id="auth-section">
        <div>
          { this.state.sign_in ?
            <AuthSignInComponent p={p} change_state={this.change_state.bind(this)} />
            :
            <AuthSignUpComponent p={p} change_state={this.change_state.bind(this)} />
          }
        </div>
      </div>
    );
	}
}
