// @flow
import { RFID } from './types';
import type { Action } from './types';

export function setDevice(device: string): Action {
  return {
    type: RFID.SET_DEVICE,
    payload: {
      device,
    }
  };
}
