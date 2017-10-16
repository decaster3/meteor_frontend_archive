import React from 'react';
let C = require("../../constants/cart/cart.js")
import GiftProductsComponent from '../../components/shopping_cart_page/gift_products_component'
class PromoCartContainer extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    let p = this.props
    switch (p.cart.gitftProductsCurrently) {
      case C.GIFT_PRODUCTS_LOADING:
        return(
          <div>
            Loading
          </div>
        )
      case C.GIFT_PRODUCTS_LOADED:
        return(
          <GiftProductsComponent
            giftProducts = {p.cart.gitftProducts}
            addGiftProductToCart = {p.addGiftProductToCart}
            removeGiftProductFromCart = {p.removeGiftProductFromCart} />
        )
      default:
        return(
          <div>
            Произошла проблема при загрузке подарков, пожалуйста перезагрузите страницу
          </div>
        )
    }
    return (
      <div>
        hey
      </div>
    );
  }

}
export default PromoCartContainer
