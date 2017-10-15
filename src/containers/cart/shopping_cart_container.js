import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setGiftProducts, addProductToCart, createCart, removeProductFromCart, birthdayDiscountOn, birthdayDiscountOff } from '../../actions/cart/cart_actions'
import ProductsExistComponent from '../../components/shopping_cart_page/products_exist_component'
import EmptyCartComponent from '../../components/shopping_cart_page/empty_cart_component'
import PromoCartContainer from './promo_cart_container.js'
import * as firebase from 'firebase';

class ShoppingCartContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      step: 1
    }
    this.setGiftProductsView = this.setGiftProductsView.bind(this)
  }

  componentDidMount(){
    this.props.createCart()
    //короче вот эта функция setGiftProducts() все ломает по циферкам иди
    this.props.setGiftProducts()
    var stepFir = 0
    let authRef = firebase.database().ref().child('products_for_promotion')
    authRef.once('value')
      .then(function(snapshot){
        stepFir = snapshot.val().step
      }
    ).then( () => {
      this.setState({
        step: stepFir
      })
    })
  }

  changePromotionView(){
    this.setState({
      stepView: !this.state.stepView
    })
  }

  setGiftProductsView(){
    this.props.setGiftProducts()
  }
//там короче идет проверка на то чтобы сумма была больше чем 1000
//из файрбэйса и затем начинает грузить подарочные товары из файрбэйса
//она диспатчит всякую хуйню, из за этого все ререндерится и ломается
  render(){
    console.log(1);
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
            {s.step != 1?
              (p.cart.priceTotalCart > s.step?
                <PromoCartContainer cart = {p.cart} setGiftProducts = {p.setGiftProducts}/>:
              <div>
                Наберите блюд на сумму {s.step} и получите блюдо в подарок!
              </div>)
            :
              <div>
                Loading
              </div>
            }
          </div>
        )
      }
    }
      return (
        <EmptyCartComponent />
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
      birthdayDiscountOn: birthdayDiscountOn,
      birthdayDiscountOff: birthdayDiscountOff,
      addProductToCart: addProductToCart,
      createCart: createCart,
      removeProductFromCart:removeProductFromCart,
      setGiftProducts: setGiftProducts
    },
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartContainer)
