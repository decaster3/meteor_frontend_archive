import React, { Component } from 'react'
import * as firebase from 'firebase';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { loadProfile } from '../../actions/profile/profile_actions.js';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
var C = require("../../constants/profile/profile.js");
import axios from 'axios';

class Profile extends Component {
  constructor(props){
    super(props);
    this.props.loadProfile();
  }

  render () {
    var instance = axios.create({
      baseURL: 'http://localhost:4000/api',
      timeout: 10000,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    const url = '/users';
    instance.get('/users', {

    })
    .then(function ({data}) {
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log(this.props.userStatus);
    switch (this.props.userStatus) {
      case C.NOT_LOADED:
        return <p>LOADING...</p>
      case C.LOADED:
        return (
          <div>
                <h1>Profile: {this.props.user.name}</h1>
                <button type="button" className="btn btn-success">
                  <Link to={this.props.link} role="button" className="btn btn-info">Ссылка для друга</Link>
                </button>

          </div>
        );
      default:
        return <p>ERROR!!!</p>
    }
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired
};

function mapStateToProps(state){
    return {
      user: state.profile.user,
      userStatus: state.profile.userStatus,
      link: state.profile.link
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      loadProfile: loadProfile,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
