import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {addProductToCart, createCart, removeProductFromCart} from '../../actions/cart/cart_actions'
import Categories from './category';
import Cards from './cards/Cards';

class MainMenuComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      product1: {
        product_id: "id1",
        name: "name1",
        img: "someURL",
        description: "description",
        size_of: "28",
        price: 300,
        topings: [
          {
            id: "id1",
            price: 100,
            name: "name1"
          },
          {
            id: "id2",
            price: 200,
            name: "name2"
          }
        ]
      },
      product2: {
        product_id: "id1",
        name: "name1",
        img: "someURL",
        description: "description",
        size_of: "24",
        price: 300,
        topings: [
          {
            id: "id1",
            price: 100,
            name: "name1"
          },
          {
            id: "id2",
            price: 200,
            name: "name2"
          }
        ]
      }
    }
  }
  componentDidMount(){
    this.props.createCart()
  }

  render () {

      return (
        <div>
             <h2>Меню</h2>
             <Categories/>
             <Cards/>
        </div>
      );

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

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuComponent)
