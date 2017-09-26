import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureRoutes from '../routes'


export default class Root extends Component {

  render() {
    const routes = configureRoutes();
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {routes}
        </ConnectedRouter>
      </Provider>
    );
  }
}
Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
