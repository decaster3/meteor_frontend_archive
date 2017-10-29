import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ProductsExistComponent from '../../components/shopping_cart_page/products_exist_component'
import EmptyCartComponent from '../../components/shopping_cart_page/empty_cart_component'
import AddressContainer from './address_container'
import PromoCartContainer from './promo_cart_container.js'
import * as firebase from 'firebase';

import {
  changeMeteors,
  makeOrder,
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
      stepView: true,
      paymentType: "cash",
      meteors: 0
    }
    this.setGiftProductsView = this.setGiftProductsView.bind(this)
    this.handleMeteorsChange = this.handleMeteorsChange.bind(this)
  }

  componentDidMount(){
    this.props.createCart()
    //короче вот эта функция setGiftProducts() все ломает по циферкам иди
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
  }

  handleMeteorsChange(event) {
    var meteors = event.target.value;
    this.setState({meteors});
    this.props.changeMeteors(meteors)
  }

  changePromotionView(){
    this.setState({
      stepView: !this.state.stepView
    })
  }

  setGiftProductsView(){
    this.props.setGiftProducts()
  }
  render(){
    let p = this.props
    let s = this.state
    var products = p.cart.products
    var cartElements = <div>LOADING</div>
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
            <p>Способ оплаты:</p>
            <div>
              <input type="radio" value={"cash"} checked={this.state.paymentType == "cash"} onChange={() => {this.setState({paymentType: "cash"})}} />
              Наличные
            </div>
            <div>
              <input type="radio" value={"card"} checked={this.state.paymentType == "card"} onChange={() => {this.setState({paymentType: "card"})}} />
              Карта
            </div>
            <p>Метеоры: </p>
            <input type="text" value={this.state.meteors} onChange={this.handleMeteorsChange} />
            <AddressContainer/>
            <button onClick={() => p.makeOrder(this.state.paymentType, this.state.meteors)}>Submit</button>
          </div>
        )
      }
    }
      return (
        <div>
          <EmptyCartComponent />

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
      changeMeteors: changeMeteors,
      validateTime: validateTime,
      addGiftProductToCart: addGiftProductToCart,
      removeGiftProductFromCart: removeGiftProductFromCart,
      birthdayDiscountOn: birthdayDiscountOn,
      birthdayDiscountOff: birthdayDiscountOff,
      addProductToCart: addProductToCart,
      createCart: createCart,
      removeProductFromCart: removeProductFromCart,
      makeOrder: makeOrder,
      setGiftProducts: setGiftProducts
    },
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartContainer)
