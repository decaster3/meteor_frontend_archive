import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { linkFacebook, unlinkFacebook } from '../../../actions/profile/profile_settings_action'

class FacebookContainer extends Component {
  constructor(props){
    super(props);
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
      case C.LOADING_LINKING:
        return(
          <div>
            Ждем ответа от стороннего сервиса
          </div>
        )
      default:
      if (authProviders.includes("facebook.com") && authProviders.includes("phone") && authProviders.length == 2
      || authProviders.includes("facebook.com") && authProviders.length == 1){
        return (
          <div>
            Фейсбук ваш единственный способ зайти в приложение, чтобы убрать его, добавьте любой другой
          </div>
        )
      }
        else {
          if (authProviders.includes("facebook.com")){
            return(
              <div>
                Вы прикрепили фэйсбук аккаунт.
                Чтобы удалить его с вашей учетное записи:
                <button onClick = {() => {p.unlinkFacebook()}}>Unlink</button>
              </div>
            )
          }
          else {
            return(
              <div>
                Вы можете прикрепить ваш фейсбук
                <button onClick = {() => {p.linkFacebook()}}>Link</button>
              </div>
            )
          }
        }
    } }
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
      linkFacebook: linkFacebook,
      unlinkFacebook: unlinkFacebook
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(FacebookContainer)
