// @flow
import { fromJS } from 'immutable';
import { AUTH } from '../actions/types';
import type { Reducer } from './types';

const initialState = fromJS({
  token: '',
});

const auth: Reducer = (state = initialState, action) => {
  switch (action.type) {

    case AUTH.LOGIN: {
      return state.merge({
        token: action.payload.token
      });
    }

    default:
      return state;
  }
};

export default auth;
