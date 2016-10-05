// @flow
import { AUTH } from './types';

export function login(token: string) {
  return {
    type: AUTH.LOGIN,
    payload: {
      token,
    }
  };
}

export function logout() {
  return {
    type: AUTH.LOGOUT
  };
}
