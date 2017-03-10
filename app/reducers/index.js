// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import type { Action, ActionWithoutPayload } from '../actions/types';

import config from './config';
import nerd from './nerd';
import cart from './cart';
import rfid from './rfid';
import transaction from './transaction';
import product from './product';
import system from './system';
import customer from './customer';
import notification from './notification';

const appReducer = combineReducers({
  config,
  routing,
  cart,
  rfid,
  product,
  transaction,
  system,
  nerd,
  customer,
  notification
});

export default function rootReducer(state: Object, action: Action | ActionWithoutPayload) {
  return appReducer(state, action);
}
