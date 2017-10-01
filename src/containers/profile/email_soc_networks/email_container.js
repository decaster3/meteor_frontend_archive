import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { changeEmail, verifyEmail } from '../../../actions/profile/profile_settings_action'


class EmailContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:''
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
    switch (p.profile_settings.changing) {
      case C.CHANGING_EMAIL:
        return(
          <div>
            <label>
              email:
              <input name = "email" type = "email" defaultValue = {s.email} onChange = {this.handleChange}/>
            </label>
            <button onClick = {() => {p.changeEmail(s.email)}}>Save</button>
            <button onClick = {p.exitEditMode}>Cancel</button>
          </div>
        )
      default:
        switch (user.emailVerified) {
          case true:
          return(
            <div>
              {p.user.email}
              <button onClick = {p.editMode}>Change</button>
            </div>
          )
          default:
          return(
            <div>
              Ваш мэйл не верефицирован
              {user.email}
              <button onClick = {() => {p.verifyEmail}}>Verify</button>
              <button onClick = {p.editMode}>Change email</button>
            </div>
          )
        }
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
        dispatch({type: C.FIELD_CHANGING, changing: C.CHANGING_EMAIL})
      } },
      changeEmail: changeEmail,
      verifyEmail: verifyEmail
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailContainer)
