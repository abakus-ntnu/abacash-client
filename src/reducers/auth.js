import { fromJS } from 'immutable';
import { AUTH } from '../actions/types';

const initialState = fromJS({
  token: '',
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
