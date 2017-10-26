import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ProductsExistComponent from '../../components/shopping_cart_page/products_exist_component'
import EmptyCartComponent from '../../components/shopping_cart_page/empty_cart_component'
import MeteorSelectionComponent from '../../components/shopping_cart_page/meteor_selection_component'
import CheckoutButtonComponent from '../../components/shopping_cart_page/checkout_button_component'
import PromoCartContainer from './promo_cart_container.js'
import CheckoutContainer from '../checkout/checkout_container'
import * as firebase from 'firebase';

import {
  changeMeteors,
  validateTime,
  addGiftProductToCart,
  removeGiftProductFromCart,
  setGiftProducts,
  addProductToCart,
  createCart,
  removeProductFromCart,
  birthdayDiscountOn,
  birthdayDiscountOff } from '../../actions/cart/cart_actions'

class ShoppingCartContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      step: -1,
      meteors: 0,
      checkout: false
    }
    this.setGiftProductsView = this.setGiftProductsView.bind(this)
    this.handleChangeMeteors = this.handleChangeMeteors.bind(this)
    this.goToCheckout = this.goToCheckout.bind(this)
  }

  componentDidMount(){
    this.props.createCart()
    this.props.setGiftProducts()
    this.props.validateTime()
    var stepFir = 0
    let stepRef = firebase.database().ref().child('products_for_promotion')
    stepRef.once('value')
      .then(function(snapshot){
        stepFir = snapshot.val().step
      }
    ).then( () => {
      this.setState({
        step: stepFir
      })
    })
    this.setState({
      meteors: this.props.cart.meteors_choosen
    })
  }

  goToCheckout(){
    var a = this.state.checkout
    this.setState({
      checkout: !a
    });
  }

  handleChangeMeteors(event) {
    this.setState({meteors: event.target.value});
    this.props.changeMeteors(event.target.value)
  }

  setGiftProductsView(){
    this.props.setGiftProducts()
  }
  render(){
    let p = this.props
    let s = this.state
    var products = p.cart.products
    var cartElements = <div>LOADING</div>
    if (!s.checkout){
    if (p.cart.products){
        cartElements = products.map((product, index) =>
        <div key = {index}>
          <span>{product.name}</span>
          <span>{product.quantity}</span>
          <button onClick = {() => p.addProductToCart(product,1)}>+</button>
          <button onClick = {() => p.removeProductFromCart(product)}>-</button>
        </div>
      );
      if(products.length > 0){
        return (
          <div>
            <ProductsExistComponent
              birthdayDiscountOff = {p.birthdayDiscountOff}
              birthdayDiscountOn = {p.birthdayDiscountOn}
              cart = {p.cart}
              cartElements = {cartElements} />

            {s.step != -1?
              (p.cart.priceTotalCart > s.step?
                <PromoCartContainer
                  cart = {p.cart}
                  setGiftProducts = {p.setGiftProducts}
                  addGiftProductToCart = {p.addGiftProductToCart}
                  removeGiftProductFromCart = {p.removeGiftProductFromCart} />
                :
              <div>
                Наберите блюд на сумму {s.step} и получите блюдо в подарок!
              </div>)

            :
              <div>
                Loading
              </div>
            }
            {//проверка метеоров у человека и вообще зареган ли

            }
            <MeteorSelectionComponent
              choosenMeteors = {s.meteors}
              totalCart = {p.cart.priceTotalCart}
              choosenMeteors = {s.meteors}
              handleChangeMeteors = {this.handleChangeMeteors}/>

            <CheckoutButtonComponent
              order_possibility = {p.cart.order_possibility}
              goToCheckout = {this.goToCheckout}/>

          </div>
        )
      }
    }
      return (
        <div>
          <EmptyCartComponent />
        </div>

      )
    } else {
      return (
        <CheckoutContainer
          goToCheckout = {this.goToCheckout}/>
      )
    }
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
      changeMeteors: changeMeteors,
      validateTime: validateTime,
      addGiftProductToCart: addGiftProductToCart,
      removeGiftProductFromCart: removeGiftProductFromCart,
      birthdayDiscountOn: birthdayDiscountOn,
      birthdayDiscountOff: birthdayDiscountOff,
      addProductToCart: addProductToCart,
      createCart: createCart,
      removeProductFromCart: removeProductFromCart,
      setGiftProducts: setGiftProducts
    },
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartContainer)
