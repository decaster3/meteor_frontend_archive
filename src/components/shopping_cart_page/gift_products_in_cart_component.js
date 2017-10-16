import React, { Component } from 'react';

export default class GiftProductsInCartComponent extends Component {
  constructor(props){
    super(props)
  }
  render(){
    let p = this.props
    var giftElements = p.choosenGifts.map((gift, index) =>{
      return (<div key = {index}>
        <span>{gift.name}</span>
        <button onClick = {() => p.removeGiftProductFromCart(gift)}>-</button>
      </div>)
    })

    return (
      <div>
        {giftElements}
      </div>
    )
	}
}
