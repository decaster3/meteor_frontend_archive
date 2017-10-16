import React, { Component } from 'react';

export default class GiftProductsComponent extends Component {
  constructor(props){
    super(props)
  }
  render(){
    let p = this.props
    let giftProductsView = p.giftProducts.map((gift, index) => {
      return (
        <div key = {index}>
          <p>{gift.name}
            <span>
              <button onClick = {() => p.addGiftProductToCart(gift)}>
                Add gift to cart
              </button>
            </span>
          </p>
        </div>
      )
    })
    return (
      <div>
        {giftProductsView}
      </div>
    )
	}
}
