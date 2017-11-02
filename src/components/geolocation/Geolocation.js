import React, { Component } from 'react'
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { initLocation, setChaingingState, setLocation } from '../../actions/geolocation/geolocation_actions.js';
let C = require("../../constants/geolocation/geolocation.js");

class Geolocation extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.initLocation();
  }

  render () {
    const { locationState } = this.props.geolocation;
    const location = this.props.geolocation.city;

    switch (locationState) {
      case C.DETERMINED:
        var determinedCountry = <p>Текущий город {location}. <span onClick={() => this.props.setChaingingState()}>Нажмите чтобы поменять!</span></p>;
        return <div>{determinedCountry}</div>;

      case C.NOT_DETERMINE:
        var currentLocation = <p>Текущий город {location}?
          <span onClick={() => this.props.setChaingingState()}> Если нет нажмите!</span>
        </p>;
        return <div>{currentLocation}</div>;

      case C.CHANGING:
        let locations = this.props.geolocation.legalLocations;
        let countries = Object.keys(countries).map((city, index) => {
            return <p key={index} onClick={() => this.props.setLocation({city, "country": locations[city]})} >{location}</p>
        });

        var cityPicker = (<div>
            Выбирите страну:
            {countries}
        </div>);

        return <div>{cityPicker}</div>;

      default:
        return <p>Мы вас ищем:)</p>;
    }
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
      initLocation: initLocation,
      setLocation: setLocation,
      setChaingingState: setChaingingState
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Geolocation)
