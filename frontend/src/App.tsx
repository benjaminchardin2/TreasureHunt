import React from 'react';
import {
  Redirect, Route, Switch,
} from 'react-router-dom';
import {
  faUser, faKey, faArrowLeft, faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Register from './components/user/Register';
import Login from './components/user/Login';
import home from './components/home/Home';
import {
  HOME_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  REGISTER_PAGE_ROUTE,
  TREASURE_HUNT_CREATION_ROUTE, TREASURE_HUNT_FINISH_ROUTE,
  TREASURE_HUNT_JOIN_ROUTE,
  TREASURE_HUNT_LAUNCH_ROUTE, TREASURE_HUNT_PLAY_ROUTE,
  TREASURE_HUNT_SELECTION_ROUTE, TREASURE_HUNT_SUPERVISION_ROUTE,
} from './const';
import TreasureHuntCreation from './components/treasureHunt/Creation';
import treasureHuntSelection from './components/treasureHunt/Selection';
import treasureHuntLaunch from './components/treasureHunt/Launch';
import treasureHuntJoin from './components/treasureHunt/Join';
import Supervision from './components/treasureHunt/Supervision';
import Play from './components/treasureHunt/Play';
import WinningOrder from "./components/treasureHunt/WinningOrder";

library.add(faUser, faKey, faArrowLeft, faArrowRight);

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
        <Route
          exact
          path={TREASURE_HUNT_LAUNCH_ROUTE}
          component={treasureHuntLaunch}
        />
        <Route
          exact
          path={TREASURE_HUNT_JOIN_ROUTE}
          component={treasureHuntJoin}
        />
        <Route
          exact
          path={TREASURE_HUNT_SUPERVISION_ROUTE}
          component={Supervision}
        />
        <Route
          exact
          path={TREASURE_HUNT_PLAY_ROUTE}
          component={Play}
        />
        <Route
            exact
            path={TREASURE_HUNT_FINISH_ROUTE}
            component={WinningOrder}
        />
        <Route path="*" render={() => <Redirect to={HOME_PAGE_ROUTE} />} />
      </Switch>
    </div>
  );
}

export default App;
