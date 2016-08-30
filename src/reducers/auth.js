import { Map } from 'immutable';
import { AUTH } from '../actions/types';

const initialState = Map({
  token: null,
});

export default function auth(state = initialState, action) {
  switch (action.type) {

    case AUTH.LOGIN: {
      return state.merge({
        token: action.payload.token
      });
    }

    default:
      return state;
  }
}
