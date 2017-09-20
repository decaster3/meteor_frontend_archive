import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './store/configureStore'
import * as firebase from 'firebase';
import { startListeningToAuth } from './actions/auth/authentication_actions';

const config = {
  apiKey: "AIzaSyBMMIBgH5d_kJd5f2y9FgyJDWTsqbNOmAk",
  authDomain: "meteor-764bf.firebaseapp.com",
  databaseURL: "https://meteor-764bf.firebaseio.com",
  projectId: "meteor-764bf",
  storageBucket: "meteor-764bf.appspot.com",
  messagingSenderId: "560068246876"
};
firebase.initializeApp(config);

const store = configureStore()

ReactDOM.render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);
// NOTE: слушает, вошел ли пользователь
setTimeout(function(){
	store.dispatch( startListeningToAuth() );
});
// NOTE: хот реплейсмент при появлении новых верхних элементов в дереве редаксa
if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    ReactDOM.render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
