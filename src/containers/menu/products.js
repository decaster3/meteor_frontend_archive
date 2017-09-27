import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Product from './product_container';

export const Products = (props) => {

    const cards = props.cards.map((card, index) => {
        return <Product card = {card} key = {index}/>
    });

    return (<div >{cards}</div>);
};

Products.propTypes = {
  cards: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    cards: state.products.cards
  };
}

export default connect(
  mapStateToProps
)(Products);
