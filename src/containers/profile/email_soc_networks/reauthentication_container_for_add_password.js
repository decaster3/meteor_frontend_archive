import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reacthenticateWithSocAddPassword } from '../../../actions/profile/profile_settings_action'

class ReauthenticationContainerForAddPassword extends Component {
  constructor(props){
    super(props)

  }

  render(){
    let p = this.props
    var user = p.user

    const containers = user.authProviders.map((provider, index) => {
      var id = provider.providerId
      var providerName = id.substr(0, id.indexOf('\.'))
      return <button key={index} onClick={() => {p.reacthenticateWithSocAddPassword(providerName, p.newPassword)}}>Log in with {providerName}</button>
    })
    console.log(containers)
  return (
    <div>
      {containers}
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
      reacthenticateWithSocAddPassword: reacthenticateWithSocAddPassword,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ReauthenticationContainerForAddPassword)
