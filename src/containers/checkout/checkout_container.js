import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { makeOrder } from '../../actions/cart/cart_actions'
import PaymentMethodsComponent from '../../components/checkout/payment_methods_component'
import DeliveryInfoContainer from './delivery_info_container.js'
import WorkingTimeContainer from './working_time_container.js'
import AddressContainer from './address_container'


class CheckoutContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      paymentType: "cash"
    }
    this.changePayment = this.changePayment.bind(this)
  }
  changePayment(method){
    this.setState({
      paymentType: method
    })
  }

  render() {
    let p = this.props
    let s = this.state
    return (
      <div>
        <button onClick = {() => p.goToCheckout()}> Назад </button>
        <DeliveryInfoContainer />
        <WorkingTimeContainer />
        <PaymentMethodsComponent
          paymentType = {s.paymentType}
          choosen_meteors = {p.cart.choosen_meteors}
          makeOrder = {p.makeOrder}
          changePayment = {this.changePayment}/>
        <AddressContainer/>

      </div>
    )
  }
}

function mapStateToProps(state){
    return {
      cart: state.cart
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      makeOrder: makeOrder
    },
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer)
