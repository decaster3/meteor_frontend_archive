import React, { Component } from 'react'
import Categories from './category';
import Cards from './cards/Cards';

class MainMenuComponent extends Component {
  render () {
    
      return (
        <div>
             <h2>Меню</h2>
             <Categories/>
             <Cards/>
        </div>
      );

  }
}
export default MainMenuComponent
