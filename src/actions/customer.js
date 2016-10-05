import callAPI from './callAPI';
import { CUSTOMER } from './types';
import { clearCart } from './cart';
import { clearRfid } from './rfid';

export function fetchCustomer(param, lookupParam = 'rfid') {
  return (dispatch, getState) => {
    const system = getState().system.get('system');

    return dispatch(callAPI({
      type: CUSTOMER.FETCH_CUSTOMER,
      endpoint: `${system.get('id')}/customers/${param}?lookupParam=${lookupParam}`,
    }));
  };
}

export function updateCustomer(customer) {
  return (dispatch, getState) => {
    const system = getState().system.get('system');

    return dispatch(callAPI({
      type: CUSTOMER.UPDATE_CUSTOMER,
      endpoint: `${system.get('id')}/customers/${customer.get('id')}`,
    }));
  };
}

export function createCustomer() {
  return (dispatch, getState) => {
    const system = getState().system.get('system');

    return dispatch(callAPI({
      type: CUSTOMER.CREATE_CUSTOMER,
      endpoint: `${system.get('id')}/customers`,
    }));
  };
}

export function clearCustomer() {
  return (dispatch) => {
    dispatch(clearCart());
    dispatch(clearRfid());
    return dispatch({
      type: CUSTOMER.CLEAR_CUSTOMER,
    });
  };
}
