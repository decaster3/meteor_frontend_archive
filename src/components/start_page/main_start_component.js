import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class MainStartPage extends Component {
  render () {
      return (
        <div>
             <Link to='/menu'>Меню</Link>
             <Link to='/authentication'>Аутентификация</Link>
             <Link to='/cart'>Корзина</Link>
        </div>
      )
  }
}
export default MainStartPage
