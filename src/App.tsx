import React from 'react';
import {
  Redirect, Route, Switch,
} from 'react-router-dom';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Register from './components/user/register';
import Login from './components/user/login';
import home from './components/home';
import {
  HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE, REGISTER_PAGE_ROUTE, TREASURE_HUNT_CREATION_ROUTE, TREASURE_HUNT_SELECTION_ROUTE,
} from './const';
import TreasureHuntCreation from './components/treasureHunt/treasureHuntCreation';
import treasureHuntSelection from './components/treasureHunt/treasureHuntSelection';

library.add(faUser, faKey);

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path={REGISTER_PAGE_ROUTE}
          component={Register}
        />
        <Route
          exact
          path={LOGIN_PAGE_ROUTE}
          component={Login}
        />
        <Route
          exact
          path={HOME_PAGE_ROUTE}
          component={home}
        />
        <Route
          exact
          path={TREASURE_HUNT_CREATION_ROUTE}
          component={TreasureHuntCreation}
        />
        <Route
          exact
          path={TREASURE_HUNT_SELECTION_ROUTE}
          component={treasureHuntSelection}
        />
        <Route path="*" render={() => <Redirect to={HOME_PAGE_ROUTE} />} />
      </Switch>
    </div>
  );
}

export default App;
