import React, { Component } from 'react'

export default class AddOrChangeLocationComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      country: '',
      city: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  render(){
    let s = this.state
    let p = this.props
    return (
      <div>
        <label>
          Country:
          <input name = "country" type = "country" defaultValue = {s.country} onChange = {this.handleChange}/>
        </label>
        <label>
          City:
          <input name = "city" type = "city" defaultValue = {s.city} onChange = {this.handleChange}/>
        </label>
        <button onClick = {() => p.changeLocationChanging()}>Cancel</button>
        <button onClick = {() => {p.changeLocation(s.country, s.city, p.changeLocationChanging)}}>Save</button>
      </div>
    )
  }
}
