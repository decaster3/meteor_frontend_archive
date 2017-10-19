import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setSettingsCategory } from '../../../actions/profile/profile_settings_action'
import DetailSettingsComponent from './detail_settings_component'

export default class MainSettingsComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedCategory: 1
    }
    this.setCategory = this.setCategory.bind(this)
  }
  setCategory(num){
    this.setState({
      selectedCategory: num
    })
  }

  render(){
    return(
      <div>
        <ul>
          <li onClick = {() => this.setCategory(1)}>
            Initials
          </li>
          <li onClick = {() => this.setCategory(2)}>
            Email and Social Networks
          </li>
          <li onClick = {() => this.setCategory(3)}>
            Addresses
          </li>
        </ul>
        <DetailSettingsComponent
          selectedCategory = {this.state.selectedCategory}/>
      </div>
    )
  }
}
