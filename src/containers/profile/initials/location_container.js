import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { changeLocation, addLocation } from '../../../actions/profile/profile_settings_action'
import AddOrChangeLocationComponent from '../../../components/profile_page/settings/initials/add_or_change_location_component'


class LocationContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      locationChanging: false
    }
    this.changeLocationChanging = this.changeLocationChanging.bind(this)
  }
  changeLocationChanging(){
    let a = this.state.locationChanging
    this.setState({
      locationChanging: !a
    })
  }
  render(){
    var p = this.props
    var s = this.state
    var user = p.user
    if (user.currently != "NOONE"){
      switch (s.locationChanging) {
        case false:
          return(
            <div>
              {
                p.user.default_city?
                  <div>
                    {p.user.default_country}
                    {p.user.default_city}
                    <button onClick = {() => this.changeLocationChanging()}>Change location</button>
                  </div>
                :
                <AddOrChangeLocationComponent
                  changeLocation = {p.addLocation}
                  changeLocationChanging = {this.changeLocationChanging}/>
              }
            </div>
          )
        default:
          return(
            <AddOrChangeLocationComponent
              changeLocation = {p.changeLocation}
              changeLocationChanging = {this.changeLocationChanging}/>
          )
      }
  }
  else {
    return (<div>Loading</div>)
  }
  }
}
function mapStateToProps(state){
  return{
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  let C = require('../../../constants/profile/profile')
  return bindActionCreators(
    {
      changeLocation: changeLocation,
      addLocation: addLocation
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationContainer)
