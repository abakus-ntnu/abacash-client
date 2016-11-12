// @flow
import { Map } from 'immutable';
import { SYSTEM } from '../actions/types';
import type { Reducer } from './types';

const initialState = Map({
  system: null,
});

const system: Reducer = (state = initialState, action) => {
  switch (action.type) {

    case SYSTEM.FETCH_SYSTEM_SUCCESS: {
      return state.merge({
        system: action.payload.json
      });
    }

    default:
      return state;
  }
};

export default system;
