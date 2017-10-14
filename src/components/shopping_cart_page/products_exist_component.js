import React, { Component } from 'react';

export default class ProductsExistComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      birthdayDiscount: true
    }
    this.change_state = this.change_state.bind(this)
  }
  change_state() {
    this.setState({
      birthdayDiscount: !this.state.birthdayDiscount
    });
  }

  render(){
    let p = this.props
    let s = this.state
    return (
      <div>
        <span>Всего:</span><span>{p.cart.priceTotalCart}</span><br/>
        <span>Элементов в корзине:</span><span>{p.cart.products_quantity}</span>
        <div>
          { s.birthdayDiscount ?
            <button
              onClick = {() => {p.birthdayDiscountOn(); this.change_state() }}>
              Birthday!
            </button>
            :
            <div>
              у вас проверят паспорт
              <button
                onClick = {() => {p.birthdayDiscountOff(); this.change_state()}}>
                No Birthday!
              </button>
            </div>
          }
        </div>
        <h1>{p.cartElements}</h1>
      </div>
    )
	}
}
