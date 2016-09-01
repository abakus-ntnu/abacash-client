import callAPI from './callAPI';
import { TRANSACTION } from './types';

export function createTransaction(transaction) {
  return (dispatch, getState) => {
    const system = getState().system.get('system');

    return dispatch(callAPI({
      type: TRANSACTION.CREATE_TRANSACTION,
      body: transaction,
      method: 'post',
      endpoint: `${system.get('id')}/transactions`
    }));
  };
}
