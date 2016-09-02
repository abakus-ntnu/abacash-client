import { Map } from 'immutable';
import { NOTIFICATION } from '../actions/types';

const initialState = Map({
  notification: null
});

export default function auth(state = initialState, action) {
  switch (action.type) {

    case NOTIFICATION.ADD_NOTIFICATION: {
      return state.merge({
        notification: action.payload
      });
    }

    default:
      return state;
  }
}
