import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase'

class Product extends Component {
  constructor(props){
    super(props)
  }

  render () {
    const product = this.props.product;
    return(
      <div className="menu-pizzas-item-wrapper">
      //TODO
        <a href="category.html">
          <div className="menu-pizzas-item text-center">
            <div className="title">{product.name}</div>
            <div className="menu-pizzas-item-image-wrapper col-12">
              <img src={product.img} className="menu-pizzas-item-image mx-auto" alt=""/>
            </div>
            <div className="menu-pizzas-item-description">
              <div className="menu-pizzas-item-ingredients">
                {product.description}
              </div>
            </div>
          </div>
        </a>
      </div>
    );

  }
}
export default Product
