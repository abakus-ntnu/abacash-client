import callAPI from './callAPI';
import { CUSTOMER } from './types';

export function fetchCustomer(param, lookupParam = 'rfid') {
  return (dispatch, getState) => {
    const system = getState().system.get('system');

    return dispatch(callAPI({
      type: CUSTOMER.FETCH_CUSTOMERS,
      endpoint: `${system.id}/customers/${param}?lookupParam=${lookupParam}`,
    }));
  };
}
