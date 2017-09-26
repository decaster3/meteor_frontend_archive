import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, { Component } from 'react';
import Card from './Card';
import { bindActionCreators } from 'redux';

class Cards extends Component {

  constructor(props){
    super(props);
  }

  render () {
      const cards = this.props.cards.map((card, index) => {
          return <Card card={card} key = {index}/>
      });

      return (<div className ="container">
                <div className="card-deck row justify-content-center">{cards}</div>
              </div>)
  }
}

Cards.propTypes = {
  cards: PropTypes.array.isRequired,
};

function mapStateToProps(state){
  return {
    cards: state.products.cards,
  }
}

export default connect(mapStateToProps)(Cards)
