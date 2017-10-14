import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthenticateContainer from './containers/auth/authenticate_container';
import MainMenuComponent from './components/menu/main_menu_component';
import ShoppingCartContainer from './containers/cart/shopping_cart_container';
import App from './components/App';
import MainProfileComponent from './components/profile_page/main_profile_component';
import Navbar from './containers/navbar/navbar_container'

const configureRoutes = () => {
      var loggedIn = true; //firebase.auth().currentUser != null;                <Geolocation/>
      return (<div>
                <Switch>
                  <Route exact path="/" component={App} />
                  <Route path="/menu" component={MainMenuComponent}/>
                  <Route path="/profile" component={MainProfileComponent}/>
                  <Route path="/authentication" component={AuthenticateContainer}/>
                  <Route path="/cart" component={ShoppingCartContainer}/>
                </Switch>
              </div>)
      }
export default configureRoutes
