// @flow
import { AUTH } from './types';
import type { Dispatch } from './types';

export function login(token: string, apiURL: string): Dispatch {
  return {
    type: AUTH.LOGIN,
    payload: {
      token,
      apiURL
    }
  };
}

export function logout(): Dispatch {
  return {
    type: AUTH.LOGOUT
  };
}
