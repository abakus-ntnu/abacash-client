// @flow
import { fromJS } from 'immutable';
import { CONFIG } from '../actions/types';
import type { Reducer } from './types';

const initialState = fromJS({
  token: null,
  apiURL: null,
});

const config: Reducer = (state = initialState, action) => {
  switch (action.type) {

    case CONFIG.LOAD_CONFIG_SUCCESS: {
      return state.merge({
        token: action.payload.token,
        apiURL: action.payload.apiURL,
      });
    }

    default:
      return state;
  }
};

export default config;
