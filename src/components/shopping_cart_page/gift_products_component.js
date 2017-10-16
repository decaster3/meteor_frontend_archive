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
    let lockGiftProductsView = p.giftProducts.map((gift, index) => {
      return (
        <div key = {index}>
          <p>{gift.name}
            <span>
              <button disabled = {true} onClick = {() => p.addGiftProductToCart(gift)}>
                Add gift to cart
              </button>
            </span>
          </p>
        </div>
      )
    })
    switch (p.validationGiftsCurrently) {
      case "ONE_MORE_GIFT":
        return (
          <div>
            {giftProductsView}
          </div>
        )
      case "LOCK_GIFTS_ADDING":
        return (
          <div>
            {lockGiftProductsView}
          </div>
        )
      default:
        return (
          <div>
            Чтобы получить подарки, купите еще что нибудь
          </div>
        )
    }
	}
}
