import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { changeName, addAvatar, changeAvatar } from '../../../actions/profile/profile_settings_action'

class UserNamePhotoContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      lastName: ''
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
    let p = this.props
    let s = this.state
    let user = p.user
    if (user.currently != "ANONYMOUS"){
      switch (p.profile_settings.changing) {
        case C.CHANGING_USERNAME_AVATAR:
          return (
          <div>
            <label>
              Name:
              <input name = "name" type = "name" defaultValue = {s.name} onChange = {this.handleChange}/>
            </label>
            <label>
              Last name:
              <input name = "lastName" type = "lastName" defaultValue = {s.lastName} onChange = {this.handleChange}/>
            </label>
            <button onClick = {() => {p.changeName(s.name,s.lastName)}}>Save</button>
            <button onClick = {p.exitEditMode}>Cancel</button>
          </div>)
        default:
          return(
            <div>
              {user.username}
              <button onClick = {p.editMode}>Change initials</button>
            </div>
          )
      }
    }
    else {
      return( <div>Loading</div>)
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
        dispatch({type: C.FIELD_CHANGING, changing: C.CHANGING_USERNAME_AVATAR})
      } },
      changeName: changeName,
      addAvatar: addAvatar,
      changeAvatar: changeAvatar
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNamePhotoContainer)
