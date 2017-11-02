import React, { Component } from 'react'
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Geolocation from "../../components/geolocation/Geolocation";
import { Link } from 'react-router-dom';

class Navbar extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    let C = require("../../constants/auth/authentication.js");
    const user = this.props.user;
    var userNavBar = ( <Link to='/authentication'>Аутентификация</Link>)
    if (user.currently == C.SIGNED_IN) {
      userNavBar = (
        <div>
          <Link to='/profile'>Профиль</Link>
        </div>);
    }
    return (
      <header>
        <div>
          <Geolocation />
          <div>
            <Link to='/'>
              <p>Logo</p>
            </Link>
          </div>
          <div>
            <div>
              <Link to='/menu'>Меню</Link>
              <span>|</span>
              <Link to='/cart'>Корзина</Link>
              <span>|</span>
              <a href="#">{userNavBar}</a>
              <span>|</span>
              <a href="#">Войти</a>
            </div>
          </div>
        </div>
    </header>)
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {

    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
