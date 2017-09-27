import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {addProductToCart, createCart, removeProductFromCart} from '../../actions/cart/cart_actions'

class ShoppingCartContainer extends Component {

  componentDidMount(){
    this.props.createCart()
  }

  render(){
    let p = this.props
    var products = p.cart.products
    var cartElements = <div>LOADING</div>
    if (products){
        cartElements = products.map((product, index) =>
        <div key = {index}>
          <span>{product.name}</span>
          <span>{product.quantity}</span>
          <button onClick = {() => p.addProductToCart(product,1)}>+</button>
          <button onClick = {() => p.removeProductFromCart(product)}>-</button>
        </div>
      );
    }
    return (
      <div>
        <span>Всего:</span><span>{p.cart.priceTotalCart}</span><br/>
        <span>Элементов в корзине:</span><span>{p.cart.products_quantity}</span>
        <h1>{cartElements}</h1>
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
      addProductToCart: addProductToCart,
      createCart: createCart,
      removeProductFromCart:removeProductFromCart
    },
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartContainer)
