import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Product from './product_container';

export const Products = (props) => {

    const products = props.products.map((product, index) => {
        return <Product product = {product} key = {index}/>
    });

    return (<div >{products}</div>);
};

Products.propTypes = {
  products: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    products: state.products.products
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
    },
    dispatch
  )
}

export default connect(
  mapStateToProps
)(Products);
