import React, { Component } from 'react'

export default class AddAddressComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      country:'',
      city: '',
      street:'',
      flat:'',
      building:'',
      comments:''
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
    let p = this.props
    let s = this.state
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
        <label>
          flat:
          <input name = "flat" type = "flat" defaultValue = {s.flat} onChange = {this.handleChange}/>
        </label>
        <label>
          building:
          <input name = "building" type = "building" defaultValue = {s.building} onChange = {this.handleChange}/>
        </label>
        <label>
          comments:
          <input name = "comments" type = "comments" defaultValue = {s.comments} onChange = {this.handleChange}/>
        </label>
        <button onClick = {() => p.changeAddressChanging()}>Cancel</button>
        <button onClick = {() => {p.addAddress(s.country, s.city, s.flat, s.building, s.comments, p.changeAddressChanging)}}>Save</button>
      </div>
    )
  }
}
