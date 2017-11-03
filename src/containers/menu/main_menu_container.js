import React, { Component } from 'react'
import SubCategories from './sub_categories_container';
import Categories from './category_container';
import Products from './products';

class MainMenuContainer extends Component {
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
export default (MainMenuContainer)
