import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProductToCart, createCart} from '../../actions/cart/cart_actions.js';
import AdditionInfo from '../../components/menu/cards/product_add_info.js';
import Toppings from '../../components/menu/cards/toppings.js';
import Card from '../../components/menu/cards/card.js';

class Product extends Component {

  constructor(props){
    super(props);

    this.state = {
      currentSize: {},
      toppings: {},
      toppingsCount: 0,
      productCount: 1
    };

    this.addProductToCart.bind(this);
    this.addTopping.bind(this);
    this.removeTopping.bind(this);
    this.addProduct.bind(this);
    this.removeProduct.bind(this);
    this.trackChanges.bind(this);
    this.calculatePrice.bind(this);
  }

  componentDidMount() {
    this.props.createCart();
  }

  calculatePrice() {
    var price = 0;

    var toppings = Object.keys(this.state.toppings).map((key, index) => {
      var topping = this.state.toppings[key];
      price += topping.price * topping.count;
    });

    price += this.state.currentSize.price;

    return price * this.state.productCount;
  }

  addProductToCart(self) {
    var product = Object.assign({}, self.props.card);
    product["quantity"] = self.state.productCount;

    var toppings = Object.keys(self.state.toppings).map((key, index) => {
      var topping = self.state.toppings[key];
      topping["id"] = key;
      return topping;
    })

    product["radius"] = self.state.currentSize.radius;
    product["price"] = self.state.currentSize.price;
    product["weight"] = self.state.currentSize.weight;
    product["toppings"] = toppings || [];

    self.props.addProductToCart(product);
  }

  addTopping(key, topping, self) {
    var toppings = self.state.toppings;
    var count = self.state.toppingsCount;
    if (count == 3){
      return
    }

    count += 1;

    var currentToppingCount = 0;
    if (self.state.toppings[key])
      currentToppingCount = toppings[key].count;

    currentToppingCount += 1;
    topping["count"] = currentToppingCount;
    toppings[key] = topping;

    self.setState({
      toppings,
      toppingsCount: count
    });
  }

  removeTopping(key, topping, self) {
    var toppings = self.state.toppings;
    var currentToppingCount = 0;
    if (self.state.toppings[key])
      currentToppingCount = toppings[key].count;

    if (currentToppingCount == 0)
      return
    else if (currentToppingCount == 1)
      delete toppings[key];
    else {
      topping["count"] -= 1;
      toppings[key] = topping;
    }

    var count = self.state.toppingsCount;
    count -= 1;

    self.setState({
      toppings,
      toppingsCount: count
    });
  }

  addProduct(self) {
    self.setState({productCount: self.state.productCount + 1})
  }

  removeProduct(self) {
    if (self.state.productCount > 1) {
      self.setState({productCount: self.state.productCount - 1})
    }
  }

  trackChanges(size, self){
    self.setState({
      currentSize : size
    });
  }

  render () {
    var price = this.calculatePrice();
    var toppings = (<Toppings toppings={this.props.card.toppings} addTopping={this.addTopping} removeTopping={this.removeTopping} parent={this}/>);
    var add_info = (<AdditionInfo foo={this.trackChanges} parent={this} sizes={this.props.card.sizes}/>);
    return (<Card card={this.props.card} toppings = {toppings} add_info={add_info} addProductToCart={this.addProductToCart} addProduct={this.addProduct} removeProduct={this.removeProduct} parent={this} price={price}/> );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      addProductToCart: addProductToCart,
      createCart: createCart
    },
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Product)
