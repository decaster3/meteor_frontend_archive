import React, { Component } from 'react'
import MainSettingsComponent from './settings/main_settings_component'
import MainHistoryContainer from '../../containers/profile/history/main_history_container'
export default class DetailSettingsComponent extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let p = this.props
    switch (p.selectedCategory) {
      case 3:
        return(
          <MainSettingsComponent />
        )
      case 2:
        return(
          <div>
            bonuses
          </div>
        )
      default:
        return(
          <div>
            <MainHistoryContainer />
          </div>
        )
    }
  }
}
