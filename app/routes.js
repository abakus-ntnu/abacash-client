// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

import SetupContainer from './containers/Setup';
import SalesContainer from './containers/Sales';
import LaunchContainer from './containers/Launch';

import NewCustomerContainer from './containers/NewCustomer';
import NewCustomerTypeContainer from './containers/NewCustomer/TypeContainer';
import NewCustomerInfoContainer from './containers/NewCustomer/InfoContainer';
import NewCustomerReviewContainer from './containers/NewCustomer/ReviewContainer';


export default (
  <Route path='/' component={App}>
    <IndexRoute component={SetupContainer} />
    <Route path='launch' component={LaunchContainer} />
    <Route path='sales' component={SalesContainer} />
    <Route path='new' component={NewCustomerContainer}>
      <IndexRoute component={NewCustomerTypeContainer} />
      <Route path='info' component={NewCustomerInfoContainer} />
      <Route path='review' component={NewCustomerReviewContainer} />
    </Route>
  </Route>
);
