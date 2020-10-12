import React from 'react';
import {Redirect, Route, Switch, withRouter,} from 'react-router-dom';
import Register from "./components/register";
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'
import {library} from "@fortawesome/fontawesome-svg-core";

library.add(faUser, faKey)

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
            exact
            path='/register'
            component={Register}
        />
      </Switch>
    </div>
  );
}

export default App;
