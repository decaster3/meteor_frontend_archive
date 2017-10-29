import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Addresses from '../../components/shopping_cart_page/addresses'

import * as firebase from 'firebase';

class AddressContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      addresses: []
    }
  }

  componentDidMount(){
    var addresses = [];
    firebase.database().ref().child('streets').once('value').then(function (snapshot) {
        addresses = snapshot.val();
    }).then(() => {
      this.setState({addresses});
    })
  }

  render() {
    if (this.state.addresses.length == 0)
      return null
    return <Addresses addresses={this.state.addresses}/>
  }
}

function mapStateToProps(state){
    return {

    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {

    },
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(AddressContainer)
