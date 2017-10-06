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
      <header id="header">
        <div className="navbar">
        <div className="container">
          <div className="logo">
            <Link to='/'>
              <img src="assets/img/logo.png" className="logo" alt="" />
            </Link>
          </div>
          <Geolocation/>
          <div className="menu align-self-bottom">
            <div className="d-none d-md-block">
              <Link to='/menu'>Меню</Link>
              <span className="divider">|</span>
              <Link to='/cart'>Корзина</Link>
              <span className="divider">|</span>
              <a href="#">{userNavBar}</a>
              <span className="divider">|</span>
              <a href="#">Войти</a>
            </div>
            <div className="d-md-none">
              <i className="fa fa-bars fa-2x" aria-hidden="true" className="menu-toogle"></i>
            </div>
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
