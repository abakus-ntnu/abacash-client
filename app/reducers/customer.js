// @flow
import { Map } from 'immutable';
import { CUSTOMER } from '../actions/types';
import type { Reducer } from './types';

const initialState = Map({
  loading: false,
  customer: null
});

const customer: Reducer = (state = initialState, action) => {
  switch (action.type) {

    case CUSTOMER.FETCH_CUSTOMER_PENDING: {
      return state.merge({
        loading: true
      });
    }


    case CUSTOMER.FETCH_CUSTOMER_SUCCESS: {
      return state.merge({
        customer: action.payload.json,
        loading: false
      });
    }

    case CUSTOMER.FETCH_CUSTOMER_FAILURE: {
      return state.merge({
        loading: false
      });
    }

    case CUSTOMER.CLEAR_CUSTOMER:
      return state.merge({
        customer: null
      });

    default:
      return state;
  }
};

export default customer;
