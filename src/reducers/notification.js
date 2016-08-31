import { NOTIFICATION } from '../actions/types';

const initialState = null;

export default function auth(state = initialState, action) {
  switch (action.type) {

    case NOTIFICATION.ADD_NOTIFICATION: {
      return action.payload;
    }

    default:
      return state;
  }
}
