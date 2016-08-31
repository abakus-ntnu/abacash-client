import { Map } from 'immutable';
import { SYSTEM } from '../actions/types';

const initialState = Map({
  system: null,
});

export default function auth(state = initialState, action) {
  switch (action.type) {

    case SYSTEM.FETCH_SYSTEM_SUCCESS: {
      return state.merge({
        system: action.payload.json
      });
    }

    default:
      return state;
  }
}
