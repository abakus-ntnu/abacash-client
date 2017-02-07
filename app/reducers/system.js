// @flow
import { fromJS } from 'immutable';
import { SYSTEM } from '../actions/types';
import type { Reducer } from './types';

const initialState = fromJS({
  system: null,
  seller: null
});

const system: Reducer = (state = initialState, action) => {
  switch (action.type) {

    case SYSTEM.FETCH_SYSTEM_SUCCESS: {
      return state.merge({
        system: action.payload.json
      });
    }

    case SYSTEM.SET_SELLER: {
      return state.merge({
        seller: action.payload.json
      });
    }

    default:
      return state;
  }
};

export default system;
