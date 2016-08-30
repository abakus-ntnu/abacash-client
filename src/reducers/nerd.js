import { Map } from 'immutable';
import { NERD } from '../actions/types';

const initialState = Map({
  users: []
});

export default function auth(state = initialState, action) {
  switch (action.type) {
    case NERD.QUERY_NERD_SUCCESS: {
      return state.merge({
        users: action.payload.json
      });
    }

    default:
      return state;
  }
}
