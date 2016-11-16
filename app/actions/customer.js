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

export function updateCustomer(body: Object): Thunk {
  return (dispatch, getState) => {
    const system = getState().system.get('system');

    return dispatch(callAPI({
      type: CUSTOMER.UPDATE_CUSTOMER,
      method: 'PUT',
      body,
      endpoint: `${system.get('id')}/customers/${body.id}`
    }));
  };
}

export function createCustomer(body: Object): Thunk {
  return (dispatch, getState) => {
    const system = getState().system.get('system');

    return dispatch(callAPI({
      type: CUSTOMER.CREATE_CUSTOMER,
      method: 'POST',
      body,
      endpoint: `${system.get('id')}/customers`
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
