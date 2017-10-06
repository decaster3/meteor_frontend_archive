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
      userNavBar = (<div>
          <h2>Привет, {user.username}!</h2>
          <Link to='/profile'>Профиль</Link>
      </div>);
    }
    return <div>
      <Link to="/">LOGO</Link>
      <Geolocation/>
      {userNavBar}
      <Link to='/menu'>Меню</Link>
      <Link to='/cart'>Корзина</Link>
    </div>
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
