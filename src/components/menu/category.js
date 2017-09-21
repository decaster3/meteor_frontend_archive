import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as firebase from 'firebase';
import { loadProducts} from '../../actions/menu/menu_product_action.js';
import { loadingCategories} from '../../actions/menu/menu_category_action.js';
import { bindActionCreators } from 'redux';
var C = require("../../constants/menu/category.js");

class Categories extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadingCategories();
  }

  render () {
    var f = (this.props.loadProducts);
    var categories;
    var categoryState = this.props.categoryState;
    
    if (categoryState == C.LOADED) {
      categories = this.props.categories.map(function(key, index) {
        return <img onClick={() => f(key)} className="rounded-circle" id={key} key={index} src="http://2.bp.blogspot.com/-C6KY8tsc8Fw/T-SVFnncxjI/AAAAAAAAANw/FMiNzA8Zecw/s640/mr.bean.jpg" width="100" height="100" />
      });
    } else if (categoryState == C.LOADING){
      categories = <p>LOADING ...</p>
    } else {
      categories = <p>NOT LOADED!</p>
    }

    return(
      <div className="categories d-flex justify-content-center vertical-center">
        {categories}
      </div>)
  }
}
function mapStateToProps(state) {
  return {
    categoryState: state.categories.categoryState,
    categories: state.categories.categories
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      loadProducts: loadProducts,
      loadingCategories: loadingCategories
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
