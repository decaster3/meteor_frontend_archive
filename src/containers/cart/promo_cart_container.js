import React from 'react';
let C = require("../../constants/cart/cart.js")

class PromoCartContainer extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){

  }
  componentWillMount(){
      // this.props.setGiftProducts()
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
            Loaded
          </div>
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
