import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainAuthComponent from './components/auth_page/main_auth_component';
import MainMenuComponent from './components/menu/main_menu_component';
import App from './components/App';

const configureRoutes = () => (
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/menu" component={MainMenuComponent}/>
          <Route path="/authentication" component={MainAuthComponent}/>

        </Switch>)
export default configureRoutes
