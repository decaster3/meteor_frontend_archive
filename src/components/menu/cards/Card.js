import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { addProductToCart} from '../../../actions/menu/menu_product_action.js';
import { bindActionCreators } from 'redux';

class Card extends Component {

  constructor(props){
    super(props);
    this.state = {
      toppings: {},
      toppingsCount: 0
    }
    this.addProduct.bind(this);
    this.addTopping.bind(this);
    this.removeTopping.bind(this);
  }

  addProduct() {
    this.props.addProductToCart(this.props.card, this.state.toppings)
  }

  addTopping(topping) {
    var count = this.state.toppingsCount;
    if (count == 3){
      return
    }
    count += 1;
    var toppings = this.state.toppings;
    var currentToppingCount = toppings[topping.name] || 0;
    currentToppingCount += 1;
    toppings[topping.name] = currentToppingCount;
    this.setState({
      toppings,
      toppingsCount: count
    });
  }

  removeTopping(topping) {
    var toppings = this.state.toppings;
    var currentToppingCount = toppings[topping.name] || 0;

    if (currentToppingCount == 0)
      return
    else if (currentToppingCount == 1)
      delete toppings[topping.name];
    else {
      currentToppingCount -= 1;
      toppings[topping.name] = currentToppingCount;
    }

    var count = this.state.toppingsCount;
    count -= 1;

    this.setState({
      toppings,
      toppingsCount: count
    });
  }

  render () {
      var t = this.props.card.toppings;
      var toppings = Object.keys(t).map((key, index) => {
          var topping = t[key];
          return <div key={index}>
            <p>{topping.name}</p>
            <p>Count: {this.state.toppings[topping.name] || 0}</p>
            <button type="button" onClick={() => this.addTopping(topping)} className="btn btn-success btn-number" >
                <span className="glyphicon glyphicon-plus"></span>
            </button>
            <button type="button" onClick={() => this.removeTopping(topping)} className="btn btn-success btn-number">
                <span className="glyphicon glyphicon-minus"></span>
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
              <a href="#" onClick={() => this.addProduct()} className="btn btn-primary btn-block">Заказать</a>

            </div>
          </div>
        </div>
      );

  }
}
function mapStateToProps(state) {
  return {

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
