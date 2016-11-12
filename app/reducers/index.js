// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import type { Action, ActionWithoutPayload } from '../actions/types';

import { AUTH } from '../actions/types';

import nerd from './nerd';
import auth from './auth';
import cart from './cart';
import rfid from './rfid';
import transaction from './transaction';
import product from './product';
import system from './system';
import customer from './customer';
import notification from './notification';

const appReducer = combineReducers({
  routing,
  auth,
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
  if (action.type === AUTH.LOGOUT) {
    state = {};
  }

  return appReducer(state, action);
}
