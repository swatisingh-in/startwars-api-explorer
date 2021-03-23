import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Characters from './Characters';
import { HOME_ROUTE, CHARACTER_ROUTE } from '../routes/routes';

function Content() {
  return (
    <Switch>
      <Route exact path={HOME_ROUTE} component={Home} />
      <Route exact path={CHARACTER_ROUTE} component={Characters} />
    </Switch>
  );
}

export default Content;
