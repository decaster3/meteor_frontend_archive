import React, { Component } from 'react';
import AuthContainer from '../../containers/auth/authenticate_container'

export default class MainAuthComponent extends Component {
  render(){
    return (
      <div>
        <AuthContainer />
      </div>
    )
	}
}
