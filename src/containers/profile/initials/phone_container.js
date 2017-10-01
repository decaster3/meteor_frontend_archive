import React, { Component } from 'react'
import PhoneVerificationContainer from '../../auth/phone_verification_container'
import { connect } from 'react-redux'

class PhoneContainer extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let p = this.props
    let phone = p.phone
    let user = p.user
    if (user.currently != "ANONYMOUS"){
      switch (user.phoneVerified) {
        case true:
          return (
            <div>
              {user.phone}
            </div>
          )
        case false:
          return(<PhoneVerificationContainer />)
        default:
          return(<div>Loading</div>)
      }}
    else {
      return(<div>Loading</div>)
    }
  }
}

function mapStateToProps(state){
  return{
    user: state.user,
    phone: state.phone
  }
}

export default connect(mapStateToProps)(PhoneContainer)
