import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProductToCart} from '../../../actions/cart/cart_actions.js';

class Card extends Component {

  constructor(props){
    super(props);
    this.state = {
      toppings: {},
      toppingsCount: 0,
      productCount: 1
    }
    this.addProductToCart.bind(this);
    this.addTopping.bind(this);
    this.removeTopping.bind(this);
    this.addProduct.bind(this);
    this.removeProduct.bind(this);
  }

  addProductToCart() {
    var product = this.props.card;
    product["count"] = this.state.productCount;
    console.log(product);
    console.log(this.state.toppings);
    // this.props.addProductToCart(product, this.state.toppings);
  }

  addTopping(key, topping) {
    var toppings = this.state.toppings;
    var count = this.state.toppingsCount;
    if (count == 3){
      return
    }
    count += 1;

    var currentToppingCount = 0;
    if (this.state.toppings[key])
      currentToppingCount = toppings[key].count;

    currentToppingCount += 1;
    topping["count"] = currentToppingCount;
    toppings[key] = topping;

    this.setState({
      toppings,
      toppingsCount: count
    });
  }

  removeTopping(key, topping) {
    var toppings = this.state.toppings;
    var currentToppingCount = 0;
    if (this.state.toppings[key])
      currentToppingCount = toppings[key].count;

    if (currentToppingCount == 0)
      return
    else if (currentToppingCount == 1)
      delete toppings[key];
    else {
      topping["count"] -= 1;
      toppings[key] = topping;
    }

    var count = this.state.toppingsCount;
    count -= 1;

    this.setState({
      toppings,
      toppingsCount: count
    });
  }

  addProduct() {
    this.setState({productCount: this.state.productCount + 1})
  }

  removeProduct() {
    if (this.state.productCount > 1) {
      this.setState({productCount: this.state.productCount - 1})
    }
  }

  render () {
      var t = this.props.card.toppings;
      var toppings = Object.keys(t).map((key, index) => {
          var topping = t[key];
          var count = 0;
          if (this.state.toppings[key])
            count = this.state.toppings[key].count;
          return <div key={index}>
            <p>{topping.name}</p>
            <p>Count: {count}</p>
            <button type="button" onClick={() => this.addTopping(key, topping)} className="btn btn-success btn-number" >
                <span className="glyphicon glyphicon-plus">+</span>
            </button>
            <button type="button" onClick={() => this.removeTopping(key, topping)} className="btn btn-success btn-number">
                <span className="glyphicon glyphicon-minus">-</span>
            </button>
          </div>
      });
      return (
        <div className="card-deck col-md-3 my-card" >
          <div className="card text-white bg-dark">
            <img className="card-img-top" src={this.props.card.img}/>
            <div className="card-body">
              <div>
              <h4 className="card-title">{this.props.card.name}</h4>
              <h6 className="card-text">{this.props.card.description}</h6>
              </div>
              <div>
                {toppings}
              </div>
              <p>Count: {this.state.productCount}</p>
              <button type="button" onClick={() => this.addProduct()} className="btn btn-success btn-number" >
                  <span className="glyphicon glyphicon-plus">+</span>
              </button>
              <button type="button" onClick={() => this.removeProduct()} className="btn btn-success btn-number">
                  <span className="glyphicon glyphicon-minus">-</span>
              </button>
              <button  onClick={() => this.addProductToCart()} className="btn btn-primary btn-block">Заказать</button>

            </div>
          </div>
        </div>
      );

  }
}
function mapStateToProps(state) {
  return {
    productsCartState: state.cart.productsCartState
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      addProductToCart: addProductToCart
    },
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Card)
