import { RFID } from './types';

export function setDevice(device) {
  return {
    type: RFID.SET_DEVICE,
    payload: {
      device,
    }
  };
}
