import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { AUTH } from '../actions/types';

import nerd from './nerd';
import auth from './auth';
import rfid from './rfid';
import system from './system';
import customer from './customer';

const appReducer = combineReducers({
  routing,
  auth,
  rfid,
  system,
  nerd,
  customer
});

export default function rootReducer(state, action) {
  if (action.type === AUTH.LOGOUT) {
    state = {};
  }

  return appReducer(state, action);
}
