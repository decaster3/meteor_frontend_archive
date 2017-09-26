import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainAuthComponent from './components/auth_page/main_auth_component';
import MainMenuComponent from './components/menu_page/main_menu_component';
import MainShoppingCartComponent from './components/shopping_cart_page/main_shopping_cart_component';
import App from './components/App';

const configureRoutes = () => (
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/menu" component={MainMenuComponent}/>
          <Route path="/authentication" component={MainAuthComponent}/>
          <Route path="/cart" component={MainShoppingCartComponent}/>
        </Switch>)
export default configureRoutes
