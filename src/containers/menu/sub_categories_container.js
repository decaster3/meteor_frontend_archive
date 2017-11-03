import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchProducts} from '../../actions/menu/menu_product_action.js';

class SubCategories extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render () {
    var categories = null;

    if (this.props.sub_categories.length > 0){
      var f = this.props.switchProducts;
      var subCategories = this.props.sub_categories.map((category) => {return Object.assign(category)});

      subCategories.unshift("Все");
      categories = subCategories.map((key, index) => {
        return <img onClick={() => f(key)} id={key} key={index} src="http://2.bp.blogspot.com/-C6KY8tsc8Fw/T-SVFnncxjI/AAAAAAAAANw/FMiNzA8Zecw/s640/mr.bean.jpg" width="100" height="100" />
      });
    }

    return(

      <div >
        {categories}
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    sub_categories: state.products.sub_categories || []
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      switchProducts: switchProducts
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCategories);
