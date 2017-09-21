import React, { Component } from 'react'
import Categories from './category';
import Cards from './cards/Cards';

class MainMenuComponent extends Component {
  render () {
    // var categories = {};
    //
    // const rootRef = firebase.database().ref().child('categories');
    // const namePizzaRef = rootRef.on('value', snapshot => {
    //   var allCategories = [];
    //   const prefix = "category-";
    //   categories[prefix + "all"] = [];
    //
    //   snapshot.forEach(function(childSnapshot) {
    //       var key = childSnapshot.key;
    //       var value = childSnapshot.val();
    //
    //       categories[prefix + key] = value;
    //       allCategories = allCategories.concat(value);
    //   });
    //
    //   categories[prefix + "all"] = (allCategories);
    //   var currentCategory = categories["category-all"];
    //
    //   this.setState({
    //     categories: categories,
    //     currentCategory: currentCategory
    //   })

      // TODO initCategoryFunction(this); ANIMATION
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
