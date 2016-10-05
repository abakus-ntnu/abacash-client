// @flow
import { NOTIFICATION } from './types';

export function addNotification(event) {
  return {
    type: NOTIFICATION.ADD_NOTIFICATION,
    payload: {
      ...event,
      position: 'bc'
    }
  };
}
