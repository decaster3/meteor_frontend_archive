import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addAddress } from '../../../actions/profile/profile_settings_action'
import AddAddressComponent from '../../../components/profile_page/settings/address/add_address_component'


class AddAddressContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      addressChanging: false
    }
    this.changeAddressChanging = this.changeAddressChanging.bind(this)
  }
  changeAddressChanging(){
    let a = this.state.addressChanging
    this.setState({
      addressChanging: !a
    })
  }
  render(){
    let s = this.state
    let p = this.props
    let user = p.user
    switch (s.addressChanging) {
      case true:
        return(
          <AddAddressComponent
            changeAddressChanging = {this.changeAddressChanging}
            addAddress = {p.addAddress} />
        )
      default:
        return(
          <div>
            <button onClick = {() => this.changeAddressChanging()}>Add address</button>
          </div>
        )
    }
  }
}

function mapStateToProps(state){
  return{
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      addAddress: addAddress
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAddressContainer)
