import React, { Component } from 'react'
import EmailContainer from '../../../containers/profile/email_soc_networks/email_container'
import FacebookContainer from '../../../containers/profile/email_soc_networks/facebook_container'
import GmailContainer from '../../../containers/profile/email_soc_networks/gmail_container'

export default class MainEmailSocNetworksComponent extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <EmailContainer />
        <FacebookContainer />
        <GmailContainer />
      </div>
    )
  }
}
