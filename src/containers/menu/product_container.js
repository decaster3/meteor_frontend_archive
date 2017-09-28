import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProductToCart, createCart} from '../../actions/cart/cart_actions.js';
import Sizes from '../../components/menu/cards/product_sizes.js';
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
    var product = Object.assign({}, self.props.product);
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
      currentToppingCount -= 1;
      topping["count"] = currentToppingCount;
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
    var product = this.props.product;
    var price = this.calculatePrice();
    var toppings = product.toppings ? (<Toppings toppings={product.toppings} addTopping={this.addTopping} removeTopping={this.removeTopping} parent={this}/>) : null;
    var add_info =  product.sizes ? (<Sizes foo={this.trackChanges} parent={this} sizes={product.sizes}/>) : null;
    return (<Card product={product} toppings = {toppings} add_info={add_info} addProductToCart={this.addProductToCart} addProduct={this.addProduct} removeProduct={this.removeProduct} parent={this} price={price}/> );
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
