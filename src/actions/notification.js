// @flow
import { NOTIFICATION } from './types';
import type { Action } from './types';

export function addNotification(event: Object): Action {
  return {
    type: NOTIFICATION.ADD_NOTIFICATION,
    payload: {
      ...event,
      position: 'bc'
    }
  };
}
