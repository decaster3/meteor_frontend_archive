import React, { Component } from 'react';

export default class Addresses extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addresses: this.props.addresses,
      listShowed: false,
      typedAddress: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.filterAddresses = this.filterAddresses.bind(this);
    this.setValue = this.setValue.bind(this);

  }

  filterAddresses() {
    var prefix = this.state.typedAddress.toLowerCase();

    return this.state.addresses.filter(address => {
      return address.toLowerCase().includes(prefix)
    })
  }

  setValue(address) {
    this.setState({typedAddress: address, listShowed: false})
  }

  handleChange(event) {
    var typedAddress = event.target.value;

    this.setState({typedAddress, listShowed: true});
  }


  render() {
    var addresses = null;
    if (this.state.listShowed) {
      var showedAddresses = this.filterAddresses();
      addresses = <ul>
        {showedAddresses.map((address, index) => {
          return <li key={index} onClick={() => this.setValue(address)}>{address}</li>
        })}
      </ul>
    }

    return (
      <div>
        <input type="text" value={this.state.typedAddress} onChange={this.handleChange} onClick={() => {this.setState({listShowed: !this.state.listShowed})}}/>
        {addresses}
      </div>
    )
	}
}
