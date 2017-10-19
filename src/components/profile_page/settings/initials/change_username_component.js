import React, { Component } from 'react'

export default class ChangeUsernameComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      lastName: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });
  }//
  render(){
    let s = this.state
    let p = this.props
    return(
      <div>
        <label>
          Name:
          <input name = "name" type = "name" defaultValue = {s.name} onChange = {this.handleChange}/>
        </label>
        <label>
          Last name:
          <input name = "lastName" type = "lastName" defaultValue = {s.lastName} onChange = {this.handleChange}/>
        </label>
        <button onClick = {() => {p.changeName(s.name,s.lastName, p.changeUsernameChanging)}}>Save</button>
        <button onClick = {() => p.changeUsernameChanging()}>Cancel</button>
      </div>
    )
  }
}
