import { RFID } from './types';

export function setDevice(device) {
  return {
    type: RFID.SET_DEVICE,
    payload: {
      device,
    }
  };
}

export function cardScanned(rfid) {
  return {
    type: RFID.CARD_SCANNED,
    payload: {
      rfid
    }
  };
}

export function clearRfid() {
  return {
    type: RFID.CLEAR_RFID,
  };
}
