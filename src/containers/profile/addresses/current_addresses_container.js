import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { removeAddress } from '../../../actions/profile/profile_settings_action'
import CurrentAddressesComponent from '../../../components/profile_page/settings/address/current_adresses_component'

class CurrentAddressesContainer extends Component {
  constructor(props){
    super(props);
  }

  render(){//
    let p = this.props
    let user = p.user
    return(
      <div>
        {
          user.addresses != undefined?
          <CurrentAddressesComponent
            userAdresses = {user.addresses}
            removeAddress = {p.removeAddress}/>
          :
          <div>
            У вас нет ни одного адреса, добавьте, чтобы быстро выбрать при заказе
          </div>
        }
      </div>
    )
  }
}
function mapStateToProps(state){
  return{
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
