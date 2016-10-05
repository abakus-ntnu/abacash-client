// @flow
import { Map } from 'immutable';
import { RFID } from '../actions/types';
import type { Reducer } from './types';

const initialState = Map({
  device: null,
});

const rfid: Reducer = (state = initialState, action) => {
  switch (action.type) {

    case RFID.SET_DEVICE: {
      return state.merge({
        device: action.payload.device
      });
    }

    default:
      return state;
  }
};

export default rfid;
