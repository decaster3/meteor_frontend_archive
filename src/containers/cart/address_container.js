import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Addresses from '../../components/shopping_cart_page/addresses'
import { setAddress, setHouse, setFlat } from '../../actions/geolocation/geolocation_actions'
import * as firebase from 'firebase';

class AddressContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addresses: []
    }
  }
  componentWillReceiveProps(nextProps){
    var city = nextProps.geolocation.city;
    if (!city || this.state.addresses.length != 0)
      return

    var addresses = [];

    firebase.database().ref().child('streets').child(city).once('value').then(function (snapshot) {
        addresses = snapshot.val();
    }).then(() => {
      if (this.state.addresses.length > 0)
        return

      this.props.setAddress(addresses[0]);
      this.setState({addresses});
    })
  }

  render() {
    if (this.state.addresses.length == 0)
      return <p>Поиск</p>
    return <Addresses addresses={this.state.addresses} location={this.props.geolocation} setAddress={this.props.setAddress} setHouse={this.props.setHouse} setFlat={this.props.setFlat}/>
  }
}

function mapStateToProps(state){
    return {
      geolocation: state.geolocation
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      setAddress: setAddress,
      setHouse: setHouse,
      setFlat: setFlat
    },
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(AddressContainer)
