import React, { Component } from 'react'
import LocationContainer from '../../../containers/profile/initials/location_container'
import PhoneContainer from '../../../containers/profile/initials/phone_container'
import UserNamePhotoContainer from '../../../containers/profile/initials/user_name_photo_container'

export default class MainInitialsComponent extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <UserNamePhotoContainer />
        <PhoneContainer />
        <LocationContainer />
      </div>
    )
  }
}
