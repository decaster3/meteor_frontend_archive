import React, { Component } from 'react'
import { Link } from 'react-router';

class MainStartPage extends Component {
  render () {
      return (
        <div>
             <Link to='/menu'>Меню</Link>
             <Link to='/authentication'>Аутентификация</Link>
        </div>
      );

  }
}
export default MainStartPage
