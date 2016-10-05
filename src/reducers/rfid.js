import { Map } from 'immutable';
import { RFID } from '../actions/types';

const initialState = Map({
  device: null,
  currentRfid: null,
  scanning: false
});

export default function auth(state = initialState, action) {
  switch (action.type) {

    case RFID.SET_DEVICE: {
      return state.merge({
        device: action.payload.device
      });
    }

    case RFID.CARD_SCANNED: {
      return state.merge({
        currentRfid: action.payload.rfid,
        scanning: false
      });
    }

    case RFID.CLEAR_RFID: {
      return state.merge({
        currentRfid: null,
        scanning: true
      });
    }

    default:
      return state;
  }
}
