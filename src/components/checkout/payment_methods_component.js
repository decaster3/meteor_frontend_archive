import React, { Component } from 'react';

export default class PaymentMethodsComponent extends Component {
  constructor(props){
    super(props)
  }
  render(){
    let p = this.props
    return (
      <div>
        <p>Способ оплаты:</p>
        <div>
          <input type="radio" value={"cash"} checked={p.paymentType == "cash"} onChange={() => p.changePayment("cash")} />
          Наличные
        </div>
        <div>
          <input type="radio" value={"card"} checked={p.paymentType == "card"} onChange={() => p.changePayment("card")} />
          Карта
        </div>
        <button onClick={() => p.makeOrder(p.paymentType, p.choosen_meteors)}>Submit</button>
      </div>
    )
	}
}
