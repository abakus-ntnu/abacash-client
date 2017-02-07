// @flow
import { fromJS } from 'immutable';
import { AUTH } from '../actions/types';
import type { Reducer } from './types';

const initialState = fromJS({
  token: '',
  apiURL: '',
});

const auth: Reducer = (state = initialState, action) => {
  switch (action.type) {

    case AUTH.LOGIN: {
      return state.merge({
        token: action.payload.token,
        apiURL: action.payload.apiURL,
      });
    }

    default:
      return state;
  }
};

export default auth;
