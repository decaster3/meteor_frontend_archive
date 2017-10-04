import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { linkPassword, changePassword } from '../../../actions/profile/profile_settings_action'
import ReauthenticationContainerForAddPassword from './reauthentication_container_for_add_password'
import ReauthenticationContainerForChangingPassword from './reauthenticate_container_for_changing_password'
class PasswordContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      password:'',
      newPassword: ''
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
    var authProviders = []
    for (var i = 0; i < user.authProviders.length; i++){
      authProviders.push(user.authProviders[i].providerId)
    }
    switch (p.profile_settings.changing) {
      case C.LOADING_REAUTHENTICATION:
      // кейс когда пользователь пытается реаутифицироваться с фейса или гугла
        return(<div>Подтвердите свой аккаунт, чтобы заменить почту</div>)
      case C.CHANGING_PASSWORD:
        return(
          <div>
            Новый пароль
            <input name = "newPassword" type = "newPassword" defaultValue = {s.newPassword} onChange = {this.handleChange}/>
            <button onClick = {() => p.changePassword(s.newPassword)}>Link</button>
            <button onClick = {() => p.exitEditMode()}>Cancel</button>
          </div>
        )
      case C.REAUTHENTICATE_USER_FOR_CHANGE_PASSWORD:
      return(
        <ReauthenticationContainerForChangingPassword newPassword = {s.newPassword} />
      )
      case C.REAUTHENTICATE_USER_FOR_ADD_PASSWORD:
        return(
          <ReauthenticationContainerForAddPassword newPassword = {s.password} />
        )
      case C.LOADING_LINKING:
        return(
          <div>
            Ждем ответа
          </div>
        )
      default:
      if (authProviders.includes("password") && authProviders.includes("phone") && authProviders.length == 2
        || authProviders.includes("password") && authProviders.length == 1){
          return (
            <div>
              Пароль ваш едиственный способ зайти в приложение
              <button onClick = {() => p.editMode()}>Change</button>
            </div>
          )
        }

      else{
        if (authProviders.includes("password")){
          return(
            <div>
              Вы можете заходить через пароль.
              <button onClick = {() => p.editMode()}>Change</button>
            </div>
          )
        }
        else {
            return(
              <div>
                Вы можете прикрепить вход через пароль
                <input name = "password" type = "password" defaultValue = {s.password} onChange = {this.handleChange}/>
                <button onClick = {() => p.linkPassword(s.password)}>Link</button>
              </div>
            )
          }
      }
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
      }},
      editMode: () => {return function(dispatch){
        dispatch({type: C.FIELD_CHANGING, changing: C.CHANGING_PASSWORD})
      }},
      linkPassword: linkPassword,
      changePassword: changePassword
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordContainer)
