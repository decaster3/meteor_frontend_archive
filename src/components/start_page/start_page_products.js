import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase'
import Product from './start_page_product_cart'

class Products extends Component {
  constructor(props){
    super(props)

    this.state = {
      products: []
    }
  }

  componentDidMount(){
    firebase.database().ref().child('start_page_products').once('value', snapshot => {
      var products = [];

      snapshot.forEach(function(childSnapshot) {
        var product = childSnapshot.val();
        product["product_id"] = childSnapshot.key;

        products.push(product);

      });

      this.setState({
        products
      })

    });
  }

  render () {
    var products = this.state.products.map((product, index) => {
      return <Product key={index} product={product}/>
    });

    if (products == null)
      products = (<p>LOADING...</p>);

    return(
      <section id="menu">
        <div className="container">
          <h2 className="text-center my-4">Космическое меню</h2>
          <div className="menu-slider col-12" id="menu-slider">
            <div className="menu-slider-wrapper">
              {products}
            </div>
          </div>
        </div>
      </section>
    );

  }
}
export default Products
