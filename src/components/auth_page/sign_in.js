import React, { Component } from 'react'
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';


class SignIn extends Component {
  constructor(props){
    super(props);
  }

  render () {
    return <p>Sign in</p>
  }
}

SignIn.propTypes = {

};

function mapStateToProps(state){
    return {

    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {

    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
