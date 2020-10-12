import React from 'react';
import {Redirect, Route, Switch, withRouter,} from 'react-router-dom';
import Register from "./components/register";

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
