// @flow
import { RFID } from './types';
import type { Action, Thunk } from './types';
import { list } from '../utils/rfid';

export function setDevice(device: string): Action {
  return {
    type: RFID.SET_DEVICE,
    payload: {
      device,
    }
  };
}

export function listDevices(): Thunk {
  return (dispatch) => dispatch({
    type: RFID.LIST_DEVICES,
    payload: list()
  });
}
