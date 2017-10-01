import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { removeAddress } from '../../../actions/profile/profile_settings_action'

class CurrentAddressesContainer extends Component {
  constructor(props){
    super(props);
  }

  render(){
    var _ = require('lodash');
    let p = this.props
    let user = p.user
    if (user.addresses){
        var addresses = Object.keys(user.addresses).map((key, index) => {
        var address = user.addresses[key];
        return (<div key = {index}>
          <span>{address.building}</span>
          <span>{address.country}</span>
          <span>{address.city}</span>
          <span>{address.flat}</span>
          <span>{address.comments}</span>
          <button onClick = {() => p.removeAddress(key)}>-</button>
        </div>)
      })
    }
    return(
      <div>
        {addresses}
      </div>
    )
  }
}
function mapStateToProps(state){
  return{
    profile_settings: state.profile_settings,
    user: state.user
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    removeAddress: removeAddress
  },
  dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrentAddressesContainer)
