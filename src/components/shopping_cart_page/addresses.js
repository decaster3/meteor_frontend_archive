import React, { Component } from 'react';
import '../../assets/css/address.css';

export default class Addresses extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addresses: this.props.addresses,
      showedAddresses: this.props.addresses,
      typedAddress: '',
      choosenAddress: this.props.addresses[0],
      unknownStreet: false,
      addressDropdownShown: false
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
    this.setState({choosenAddress: address, addressDropdownShown: false})
  }

  handleChange(event) {
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
            return <li key={index} onClick={() => this.setValue(address)}>{address}</li>
          })}
        </ul>

      dropdown = (<div >
        <input type="text" value={this.state.typedAddress} onChange={this.handleChange} />
        {addresses}
        {error}
        </div>
      );
    }

    return (
      <div>
        <p>Улица:</p>
        <p onClick={() => {this.setState({addressDropdownShown: !this.state.addressDropdownShown})}}>{this.state.choosenAddress}</p>
        {dropdown}
      </div>
    )
	}
}
