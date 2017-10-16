import React from 'react';
let C = require("../../constants/cart/cart.js")
import GiftProductsComponent from '../../components/shopping_cart_page/gift_products_component'
import GiftProductsInCartComponent from '../../components/shopping_cart_page/gift_products_in_cart_component'
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
          <div>
            {
              p.cart.choosenGifts?
                p.cart.choosenGifts.length > 0?
                  (<GiftProductsInCartComponent
                    removeGiftProductFromCart = {p.removeGiftProductFromCart}
                    choosenGifts = {p.cart.choosenGifts}/>)
                :
                  (<div> Вы не выбрали подарка! </div>)
              :
                (<div> Вы не выбрали подарка! </div>)
            }
            <GiftProductsComponent
              validationGiftsCurrently = {p.cart.validationGiftsCurrently}
              giftProducts = {p.cart.gitftProducts}
              addGiftProductToCart = {p.addGiftProductToCart}
              removeGiftProductFromCart = {p.removeGiftProductFromCart} />
          </div>
        )

      default:
        return(
          <div>
            Произошла проблема при загрузке подарков, пожалуйста перезагрузите страницу и проверьте подключение к интернету
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
