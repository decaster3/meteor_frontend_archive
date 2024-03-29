import React, { Component } from 'react'
import MainInitialsComponent from './main_initials_component'
import MainEmailSocNetworksComponent from './main_email_soc_networks_component'
import MainAddressesComponent from './main_addresses_component'

export default class DetailSettingsComponent extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let p = this.props
    switch (p.selectedCategory) {
      case 3:
        return(
          <MainAddressesComponent />
        )
      case 2:
        return(
          <MainEmailSocNetworksComponent />
        )
      default:
        return(
          <MainInitialsComponent />
        )
    }
  }
}
