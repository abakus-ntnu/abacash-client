import { Map } from 'immutable';
import { TRANSACTION } from '../actions/types';

const initialState = Map({
  processing: false,
  error: ''
});

export default function auth(state = initialState, action) {
  switch (action.type) {

    case TRANSACTION.CREATE_TRANSACTION_PENDING: {
      return state.merge({
        processing: true
      });
    }

    case TRANSACTION.CREATE_TRANSACTION_FAILURE:
      return state.merge({
        processing: false,
        error: action.payload.json.message
      });

    case TRANSACTION.CREATE_TRANSACTION_SUCCESS:
      return state.merge({
        processing: false
      });

    default:
      return state;
  }
}
