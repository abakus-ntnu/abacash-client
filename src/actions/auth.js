// @flow
import { AUTH } from './types';
import type { Dispatch } from './types';

export function login(token: string): Dispatch {
  return {
    type: AUTH.LOGIN,
    payload: {
      token,
    }
  };
}

export function logout(): Dispatch {
  return {
    type: AUTH.LOGOUT
  };
}
