import React, { Component } from 'react'
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

class SignUp extends Component {
  constructor(props){
    super(props);
    this.addRef.bind(this);
    this.handleSubmit.bind(this);
    console.log(this.props.from);
  }

  handleSubmit(){
    this.addRef();
    this.props.history.push(this.from);
  }

  addRef() {
    var data = {}

    const queryString = require('query-string');
    const params = queryString.parse(this.props.location.search);
    const parent = params.ref
    if (parent)
      data["parent"] = parent

    data["key"] = "New_user_key"; //firebase.auth().currentUser.uid;

    const url = '/api/newReferral';

    axios.post(url, data)
    .catch(error => {
      console.log(error);
    });

  }

  render () {
    return <button onClick={() => this.handleSubmit()} type="button" className="btn btn-success">
            Регистрация
          </button>
  }
}

SignUp.propTypes = {

};

function mapStateToProps(state, ownParams){
    return {
      from: (ownParams.location.state) ? ownParams.location.state.from : "/menu"
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {

    },
    dispatch
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp))
