import React, { Component } from 'react'
import SubCategories from './sub_categories';
import Categories from './category';
import Products from '../../containers/menu/products';

class MainMenuComponent extends Component {
  constructor(props){
    super(props)
  }

  render () {

      return (
        <div>
             <h2>Меню</h2>
             <Categories/>
             <SubCategories/>
             <Products/>
        </div>
      );

  }

}
export default (MainMenuComponent)
