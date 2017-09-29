import React, { Component } from 'react'
import DetailSettingsComponent from './detail_settings_component'
import OptionsSettingsComponent from './options_settings_component'

export default class MainSettingsComponent extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <OptionsSettingsComponent />
        <DetailSettingsComponent />
      </div>
    )
  }
}
