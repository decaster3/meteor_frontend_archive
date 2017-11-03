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
    this.initCategories = this.initCategories.bind(this);
  }

  componentDidMount() {
    this.initCategories(this.props)
  }

  initCategories(props) {
    var city = props.geolocation.city;
    if (city && props.categoryState == C.NOT_LOADED){
      this.props.loadingCategories(city);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.initCategories(nextProps)
  }

  render () {
    var f = (this.props.loadProducts);
    var categories;
    var categoryState = this.props.categoryState;

    switch (categoryState) {
      case C.LOADED:
        categories = this.props.categories.map((key, index) => {
          return <img onClick={() => f(this.props.geolocation.city, key)} id={key} key={index} src="http://2.bp.blogspot.com/-C6KY8tsc8Fw/T-SVFnncxjI/AAAAAAAAANw/FMiNzA8Zecw/s640/mr.bean.jpg" width="100" height="100" />
        });
        break;
      case C.LOADING:
        categories = <p>LOADING ...</p>
        break;
      default:
        categories = <p>NOT LOADED!</p>
    }

    return(
      <div >
        {categories}
      </div>)
  }
}
function mapStateToProps(state) {
  return {
    categoryState: state.categories.categoryState,
    categories: state.categories.categories,
    geolocation: state.geolocation
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
