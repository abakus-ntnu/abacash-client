// @flow
import { Map } from 'immutable';
import { NOTIFICATION } from '../actions/types';
import type { Reducer } from './types';

const initialState = Map({
  notification: null
});

const notification: Reducer = (state = initialState, action) => {
  switch (action.type) {

    case NOTIFICATION.ADD_NOTIFICATION: {
      return state.merge({
        notification: action.payload
      });
    }

    default:
      return state;
  }
};

export default notification;
