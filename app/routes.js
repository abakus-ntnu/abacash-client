// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

import SetupContainer from './containers/Setup';
import NewCardContainer from './containers/NewCard';
import SalesContainer from './containers/Sales';
import LaunchContainer from './containers/Launch';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={SetupContainer} />
    <Route path='launch' component={LaunchContainer} />
    <Route path='sales' component={SalesContainer} />
    <Route path='new-card' component={NewCardContainer} />
  </Route>
);
