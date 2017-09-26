import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

export const Products = (props) => {

  return (
    <Cards cards = {this.state.cards} currentCategory={this.props.currentCategory}/>
  );
};

Products.propTypes = {
  cards: PropTypes.object.isRequired,
  currentCategory: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    cards: state.cards,
    currentCategory: state.currentCategory
  };
}

export default connect(
  mapStateToProps
)(Products);
