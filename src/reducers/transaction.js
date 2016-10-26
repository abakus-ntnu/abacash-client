// @flow
import { Map } from 'immutable';
import { TRANSACTION } from '../actions/types';
import type { Reducer } from './types';

const initialState = Map({
  processing: false,
  error: ''
});

const transaction: Reducer = (state = initialState, action) => {
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
};

export default transaction;
