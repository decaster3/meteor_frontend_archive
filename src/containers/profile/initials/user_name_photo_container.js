import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { changeName, addAvatar, changeAvatar } from '../../../actions/profile/profile_settings_action'
import ChangeUsernameComponent from '../../../components/profile_page/settings/initials/change_username_component'

class UserNamePhotoContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      usernameChanging: false
    }
    this.changeUsernameChanging = this.changeUsernameChanging.bind(this)
  }

  changeUsernameChanging(){
    let a = this.state.usernameChanging
    this.setState({
      usernameChanging: !a
    })
  }

  render(){
    let p = this.props
    let s = this.state
    let user = p.user
    if (user.currently != "ANONYMOUS"){
      return (
        <div>
          {!s.usernameChanging?
            <div>
              {user.username}
              <button onClick = {() => this.changeUsernameChanging()}>Change initials</button>
            </div>
          :
          <ChangeUsernameComponent
            changeName = {p.changeName}
            changeUsernameChanging = {this.changeUsernameChanging}/>
          }
        </div>
      )
    }
    else {
      return( <div>Loading</div>)
    }
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
      changeName: changeName,
      addAvatar: addAvatar,
      changeAvatar: changeAvatar
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNamePhotoContainer)
