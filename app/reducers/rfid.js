// @flow
import { fromJS } from 'immutable';
import { RFID } from '../actions/types';
import type { Reducer } from './types';

const initialState = fromJS({
  device: null,
  devices: []
});

const rfid: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case RFID.SET_DEVICE: {
      return state.merge({
        device: action.payload.device
      });
    }

    case RFID.LIST_DEVICES_SUCCESS: {
      return state.merge({
        devices: action.payload
      });
    }

    default:
      return state;
  }
};

export default rfid;
