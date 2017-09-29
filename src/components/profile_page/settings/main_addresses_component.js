import React, { Component } from 'react'
import AddAddressContainer from '../../../containers/profile/addresses/add_address_container'
import CurrentAddressesContainer from '../../../containers/profile/addresses/current_addresses_container'

export default class MainAddressesComponent extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div>
        <AddAddressContainer />
        <CurrentAddressesContainer />
      </div>
    )
  }
}
