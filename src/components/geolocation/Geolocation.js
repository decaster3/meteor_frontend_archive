import React, { Component } from 'react'
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class Geolocation extends Component {
  constructor(props){
    super(props);
    this.state = {
      country: "Кыргызстан"
    }
    this.getLocation =this.getLocation.bind(this);
    this.showPosition = this.showPosition.bind(this);
  }

  render () {

      return <p onClick = {() => this.getLocation()}>Geolocation: {this.state.country}!!!</p>
  }

  getLocation() {
    console.log(1);
    // if (navigator.geolocation) {
    //     var p = navigator.geolocation.getCurrentPosition(this.showPosition);
    //     console.log(p);
    // } else {
    //   console.log(2);
    // }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        var googleMapsClient = require('@google/maps').createClient({
          key: 'AIzaSyDeRt-ekVSI0anD_b1zE5Kl7WobsRGutvc'
        });
        googleMapsClient.reverseGeocode({
             latlng: [lat, lng],
             result_type: ['country'],
             location_type: ['ROOFTOP', 'APPROXIMATE']
           },
           (err, response) => {
             var country = response.json.results[0].formatted_address
             console.log(country);
             if (!err) {
               this.setState({country});
           }
         })

      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  showPosition(position) {
      var country = "Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude;
      this.setState({country});
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

export default (Geolocation)
