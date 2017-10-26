import React, { Component } from 'react';

export default class CheckoutButtonComponent extends Component {
  constructor(props){
    super(props)
  }

  render(){
    let p = this.props
    // return (<p>hey</p>)
    switch (p.order_possibility) {
      case "CAN_MAKE_ORDER":
        return(
          <div>
            <button
              onClick = {() => p.goToCheckout()}>
              Дальше
            </button>
          </div>)
      case "CANT_MAKE_ORDER":
        return(
            <div>
              <div>Сумма заказа должна быть больше 2500!</div>
              <button disabled = {true}> Дальше </button>
            </div>
          )
      default:
        return(
          <div>
            <button disabled = {true}>
              Дальше
            </button>
          </div>
        )
    }
	}
}
