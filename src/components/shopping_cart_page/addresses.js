import React, { Component } from 'react';

export default class Addresses extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addresses: this.props.addresses,
      listShowed: false,
      showedAddresses: this.props.addresses,
      typedAddress: '',
      unknownStreet: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.filterAddresses = this.filterAddresses.bind(this);
    this.setValue = this.setValue.bind(this);

  }

  filterAddresses(prefix) {
    prefix = prefix.toLowerCase();

    return this.state.addresses.filter(address => {
      return address.toLowerCase().includes(prefix)
    })
  }

  setValue(address) {
    this.setState({typedAddress: address, listShowed: false})
  }

  handleChange(event) {
    var typedAddress = event.target.value;

    var showedAddresses = this.filterAddresses(typedAddress);

    if (showedAddresses.length == 0)
      this.setState({typedAddress, listShowed: true, unknownStreet: true, showedAddresses});
    else
      this.setState({typedAddress, listShowed: true, unknownStreet: false, showedAddresses});


  }


  render() {
    var error = null;
    var addresses = null;

    if (this.state.unknownStreet)
      error = <p>Неизвестная улица!</p>

    if (this.state.listShowed) {
      var showedAddresses = this.state.showedAddresses;
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
        {error}
      </div>
    )
	}
}