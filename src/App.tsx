import React from 'react';
import {
  Redirect, Route, Switch, withRouter,
} from 'react-router-dom';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Register from './components/register';
import Login from './components/login';
import home from './components/home';
import { HOME_PAGE_ROUTE } from './const';

library.add(faUser, faKey);

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/register"
          component={Register}
        />
        <Route
          exact
          path="/login"
          component={Login}
        />
        <Route
          exact
          path="/home"
          component={home}
        />
        <Route path="*" render={() => <Redirect to={HOME_PAGE_ROUTE} />} />
      </Switch>
    </div>
  );
}

export default App;
