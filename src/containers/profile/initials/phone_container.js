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
    switch (phone.phone.currently) {
      case "PHONE_EXIST":
        return (
          <div>
            {user.phone}
          </div>
        )
      case "PHONE_NOT_EXIST":
        return(<PhoneVerificationContainer />)
      default:
        return(<div>Loading</div>)
    }
  }
}

function mapStateToProps(state){
  return{
    phone: state.phone
  }
}

export default connect(mapStateToProps)(PhoneContainer)
