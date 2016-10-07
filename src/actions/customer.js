// @flow
import { Map } from 'immutable';
import callAPI from './callAPI';
import { CUSTOMER } from './types';
import { clearCart } from './cart';
import type { Thunk } from './types';

export function fetchCustomer(param: string, lookupParam: string = 'rfid'): Thunk {
  return (dispatch, getState) => {
    const system = getState().system.get('system');

    return dispatch(callAPI({
      type: CUSTOMER.FETCH_CUSTOMER,
      endpoint: `${system.get('id')}/customers/${param}?lookupParam=${lookupParam}`,
    }));
  };
}

export function updateCustomer(customer: Map<string, string>): Thunk {
  return (dispatch, getState) => {
    const system = getState().system.get('system');

    return dispatch(callAPI({
      type: CUSTOMER.UPDATE_CUSTOMER,
      endpoint: `${system.get('id')}/customers/${customer.get('id')}`,
    }));
  };
}

export function createCustomer(): Thunk {
  return (dispatch, getState) => {
    const system = getState().system.get('system');

    return dispatch(callAPI({
      type: CUSTOMER.CREATE_CUSTOMER,
      endpoint: `${system.get('id')}/customers`,
    }));
  };
}

export function clearCustomer(): Thunk {
  return (dispatch) => {
    dispatch(clearCart());
    return dispatch({
      type: CUSTOMER.CLEAR_CUSTOMER,
    });
  };
}
