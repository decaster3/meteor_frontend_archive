import React, { Component } from 'react'
import MainInitialsComponent from './main_initials_component'
import MainEmailSocNetworksComponent from './main_email_soc_networks_component'
import MainAddressesComponent from './main_addresses_component'
import { connect } from 'react-redux'

class DetailSettingsComponent extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let p = this.props
    let C = require('../../../constants/profile/profile')
    switch (p.profile_settings.profile_settings_category) {
      case C.ADDRESSES_SELECTED:
        return(
          <MainAddressesComponent />
        )
      case C.EMAIL_SOC_NETWORKS_SELECTED:
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
function mapStateToProps(state){
    return {
      profile_settings: state.profile_settings
    }
}
export default connect(mapStateToProps)(DetailSettingsComponent);
