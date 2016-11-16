// @flow
import callAPI from './callAPI';
import { TRANSACTION } from './types';
import { mapCartToTransaction } from '../selectors/cart';
import type { Thunk } from './types';

export function createTransaction(): Thunk {
  return (dispatch, getState) => {
    const system = getState().system.get('system');
    const customer = getState().customer.get('customer');
    const cart = getState().cart;

    return dispatch(callAPI({
      type: TRANSACTION.CREATE_TRANSACTION,
      body: {
        products: mapCartToTransaction(cart),
        customerId: customer.get('id')
      },
      method: 'POST',
      endpoint: `${system.get('id')}/transactions`
    }));
  };
}
