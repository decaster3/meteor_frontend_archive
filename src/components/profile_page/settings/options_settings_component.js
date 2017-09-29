import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setSettingsCategory } from '../../../actions/profile/profile_settings_action'

class OptionsSettingsComponent extends Component {
  constructor(props){
    super(props);
  }

  render(){
    var C = require('../../../constants/profile/profile')
    return(
      <ul>
        <li onClick = {() => this.props.setSettingsCategory(C.INITIALS_SELECTED)}>
          Initials
        </li>
        <li onClick = {() => this.props.setSettingsCategory(C.EMAIL_SOC_NETWORKS_SELECTED)}>
          Email and Social Networks
        </li>
        <li onClick = {() => this.props.setSettingsCategory(C.ADDRESSES_SELECTED)}>
          Addresses
        </li>
      </ul>
    )
  }
}
function mapStateToProps(state){
  return {
    profile_settings: state.profile_settings
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {setSettingsCategory: setSettingsCategory},
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(OptionsSettingsComponent);
