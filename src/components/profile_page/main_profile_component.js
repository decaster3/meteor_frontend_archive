import React, { Component } from 'react'
import DetailProfileComponent from './detail_profile_component'
export default class MainProfileComponent extends Component {
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
            History
          </li>
          <li onClick = {() => this.setCategory(2)}>
            Bonuses
          </li>
          <li onClick = {() => this.setCategory(3)}>
            Settings
          </li>
        </ul>
        <DetailProfileComponent
          selectedCategory = {this.state.selectedCategory}/>
      </div>
    )
  }
}
