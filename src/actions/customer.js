import { callAPI } from './callAPI';
import { CUSTOMER } from './types';

export function fetchCustomer(rfid, systemID) {
  return callAPI({
    type: CUSTOMER.FETCH_CUSTOMER,
    endpoint: `${systemID}/customers/${rfid}`,
  });
}
