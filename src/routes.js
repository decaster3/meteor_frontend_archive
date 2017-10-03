import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MainAuthComponent from './components/auth_page/main_auth_component';
import SignIn from './components/auth_page/sign_in';
import SignUp from './components/auth_page/sign_up';
import MainMenuComponent from './components/menu/main_menu_component';
import Profile from './components/profile_page/profile';
import MainShoppingCartComponent from './components/shopping_cart_page/main_shopping_cart_component';
import App from './components/App';

const configureRoutes = () => {
      var loggedIn = true; //firebase.auth().currentUser != null;
      return (
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/menu" component={MainMenuComponent}/>
          <Route path="/authentication" component={MainAuthComponent}/>
          <Route path="/cart" component={MainShoppingCartComponent}/>
          <Route path="/sign_in" render={() => (!loggedIn ? (<Redirect to="/menu"/>) : (<SignIn/>))}/>
          <Route path="/sign_up" render={() => (!loggedIn ? (<Redirect to="/menu"/>) : (<SignUp/>))}/>
          <Route path="/profile" render={() => (
              !loggedIn ? (
                <Redirect to={{
                    pathname: '/sign_up',
                    state: {
                      from: "/profile"
                    }
                  }}/>
              ) : (
                <Profile/>
              )
            )}/>
        </Switch>)
      }
export default configureRoutes
