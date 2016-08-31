import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { AUTH } from '../actions/types';

import auth from './auth';
import notification from './notification';

const appReducer = combineReducers({
  routing,
  auth,
  notification
});

export default function rootReducer(state, action) {
  if (action.type === AUTH.LOGOUT) {
    state = {};
  }

  return appReducer(state, action);
}
