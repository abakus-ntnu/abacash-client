import callAPI from './callAPI';
import { CUSTOMER } from './types';

export function fetchCustomer(param, lookupParam = 'rfid') {
  return (dispatch, getState) => {
    const system = getState().system.get('system');

    return dispatch(callAPI({
      type: CUSTOMER.FETCH_CUSTOMER,
      endpoint: `2/customers/${param}?lookupParam=${lookupParam}`,
    }));
  };
}
