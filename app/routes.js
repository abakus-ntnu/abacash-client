import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

import SetupContainer from './containers/Setup';
import SalesContainer from './containers/Sales';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={SetupContainer} />
    <Route path='sales' component={SalesContainer} />
  </Route>
);
