import React, { Component } from 'react';
import '../../assets/css/address.css';

export default class Addresses extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addresses: this.props.addresses,
      showedAddresses: this.props.addresses,
      typedAddress: '',
      choosenAddress: this.props.address,
      unknownStreet: false,
      addressDropdownShown: false
    }

    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.filterAddresses = this.filterAddresses.bind(this);
    this.setAddress = this.setAddress.bind(this);

  }

  filterAddresses(prefix) {
    prefix = prefix.toLowerCase();

    return this.state.addresses.filter(address => {
      return address.toLowerCase().includes(prefix)
    })
  }

  setAddress(address) {
    this.props.setAddress(address)
    this.setState({addressDropdownShown: false})
  }

  handleAddressChange(event) {
    var typedAddress = event.target.value;

    var showedAddresses = this.filterAddresses(typedAddress);

    if (showedAddresses.length == 0)
      this.setState({typedAddress, unknownStreet: true, showedAddresses});
    else
      this.setState({typedAddress, unknownStreet: false, showedAddresses});
  }

  render() {
    var dropdown = null;
    if (this.state.addressDropdownShown) {

      var error = null;
      var addresses = null;

      if (this.state.unknownStreet)
        error = <p>Неизвестная улица!</p>
      else
        addresses = <ul className="address">
          {this.state.showedAddresses.map((address, index) => {
            return <li key={index} onClick={() => this.setAddress(address)}>{address}</li>
          })}
        </ul>

      dropdown = (<div >
        <input type="text" value={this.state.typedAddress} onChange={this.handleAddressChange} />
        {addresses}
        {error}
        </div>
      );
    }
    return (
      <div>
        <p>Улица:</p>
        <p onClick={() => {this.setState({addressDropdownShown: !this.state.addressDropdownShown})}}>{this.props.location.address}</p>
        {dropdown}
        <p>Дом:</p>
        <input type="text" value={this.props.location.home} onChange={(event) => {this.props.setHouse(event.target.value)}} />
        <p>Квартира:</p>
        <input type="number" value={(this.props.location.flat)} onChange={(event) => {this.props.setFlat(event.target.value)}} />

      </div>
    )
	}
}
