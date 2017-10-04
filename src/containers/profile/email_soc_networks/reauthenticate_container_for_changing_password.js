import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reacthenticateChangePassword } from '../../../actions/profile/profile_settings_action'

class ReauthenticationContainerForChngingPassword extends Component {
  constructor(props){
    super(props)
    this.state = {
      oldPassword:''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event){
    const target = event.target
    const name = target.name
    this.setState({
      [name]: event.target.value
    })
  }
  render(){
    let p = this.props
    let user = p.user
    let s = this.state
  return (
    <div>
      <label>
        Password:
        <input name = "oldPassword" type = "oldPassword" defaultValue = {s.oldPassword} onChange = {this.handleChange}/>
      </label>
      <button onClick = {() => p.reacthenticateChangePassword(s.oldPassword, p.newPassword)}>Подтвердить</button>
    </div>
  )
  }
}

function mapStateToProps(state){
  return{
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      reacthenticateChangePassword: reacthenticateChangePassword,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ReauthenticationContainerForChngingPassword)
