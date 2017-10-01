import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addAddress } from '../../../actions/profile/profile_settings_action'


class AddAddressContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      country:'',
      city: '',
      street:'',
      flat:'',
      building:'',
      comments:''
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
    let s = this.state
    let p = this.props
    let user = p.user
    let profile_settings = p.profile_settings
    switch (profile_settings.changing) {
      case C.ADDING_ADDRESS:
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
            <label>
              flat:
              <input name = "flat" type = "flat" defaultValue = {s.flat} onChange = {this.handleChange}/>
            </label>
            <label>
              building:
              <input name = "building" type = "building" defaultValue = {s.building} onChange = {this.handleChange}/>
            </label>
            <label>
              comments:
              <input name = "comments" type = "comments" defaultValue = {s.comments} onChange = {this.handleChange}/>
            </label>
            <button onClick = {p.exitEditMode}>Cancel</button>
            <button onClick = {() => {p.addAddress(s.country, s.city, s.flat, s.building, s.comments)}}>Save</button>
          </div>
        )
      default:
        return(
          <div>
            <button onClick = {p.editMode}>Add address</button>
          </div>
        )
    }
    return(
      <div>
        Add Address
      </div>
    )
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
        dispatch({type: C.FIELD_CHANGING, changing: C.ADDING_ADDRESS})
      } },
      addAddress: addAddress
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAddressContainer)
