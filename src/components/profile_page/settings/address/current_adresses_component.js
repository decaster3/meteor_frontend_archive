import React, { Component } from 'react'

export default class CurrentAddressesComponent extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let p = this.props
    var addresses = Object.keys(p.userAdresses).map((key, index) => {
    var address = p.userAdresses[key];
      return (<div key = {index}>
        <span>{address.building}</span>
        <span>{address.country}</span>
        <span>{address.city}</span>
        <span>{address.flat}</span>
        <span>{address.comments}</span>
        <button onClick = {() => p.removeAddress(key)}>-</button>
      </div>)
    })
    return (
      <div>
        {addresses}
      </div>
    )
  }
}
