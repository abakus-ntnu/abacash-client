import { Map } from 'immutable';
import { RFID } from '../actions/types';

const initialState = Map({
  device: null,
});

export default function auth(state = initialState, action) {
  switch (action.type) {

    case RFID.SET_DEVICE: {
      return state.merge({
        device: action.payload.device
      });
    }

    default:
      return state;
  }
}
