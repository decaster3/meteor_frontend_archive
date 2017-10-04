import React, { Component } from 'react'
import EmailContainer from '../../../containers/profile/email_soc_networks/email_container'
import FacebookContainer from '../../../containers/profile/email_soc_networks/facebook_container'
import GoogleContainer from '../../../containers/profile/email_soc_networks/google_container'
import PasswordContainer from '../../../containers/profile/email_soc_networks/password_container'
export default class MainEmailSocNetworksComponent extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <EmailContainer />
        <FacebookContainer />
        <GoogleContainer />
        <PasswordContainer />
      </div>
    )
  }
}
