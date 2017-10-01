import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { changeLocation, addLocation } from '../../../actions/profile/profile_settings_action'


class LocationContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      country: '',
      city: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  render(){
    let C = require('../../../constants/profile/profile')
    var p = this.props
    var s = this.state
    var user = p.user
    var profile_settings = p.profile_settings
    if (user.currently != "ANONYMOUS"){
    switch (profile_settings.changing) {
      case C.CHANGING_LOCATION:
      return(
        <div>
          <label>
            Country:
            <input name = "country" type = "country" defaultValue = {s.country} onChange = {this.handleChange}/>
          </label>
          <label>
            City:
            <input name = "city" type = "city" defaultValue = {s.city} onChange = {this.handleChange}/>
          </label>
          <button onClick = {p.exitEditMode}>Cancel</button>
          <button onClick = {() => {p.changeLocation(s.country, s.city)}}>Save</button>
        </div>
      )
      default:
          switch (Boolean(p.user.default_city)) {
            case true:
              return(
                <div>
                  {p.user.default_country}
                  {p.user.default_city}
                  <button onClick = {p.editMode}>Change location</button>
                </div>
              )
            default:
            return(<div>
                Add your location
                <label>
                  Country:
                  <input name = "country" type = "country" defaultValue = {s.country} onChange = {this.handleChange}/>
                </label>
                <label>
                  City:
                  <input name = "city" type = "city" defaultValue = {s.city} onChange = {this.handleChange}/>
                </label>
                <button onClick = {() => {p.addLocation(s.country, s.city)}}>Save</button>
              </div>
            )
          }
    }
  }
  else {
    return (<div>Loading</div>)
  }
  }
}
function mapStateToProps(state){
  return{
    profile_settings: state.profile_settings,
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  let C = require('../../../constants/profile/profile')
  return bindActionCreators(
    {
      exitEditMode: () => {return function(dispatch){
        dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      } },
      editMode: () => {return function(dispatch){
        dispatch({type: C.FIELD_CHANGING, changing: C.CHANGING_LOCATION})
      } },
      changeLocation: changeLocation,
      addLocation: addLocation
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationContainer)
