// @flow
import { Map } from 'immutable';
import { CUSTOMER } from '../actions/types';
import type { Reducer } from './types';

const initialState = Map({});

const customer: Reducer = (state = initialState, action) => {
  switch (action.type) {

    case CUSTOMER.FETCH_CUSTOMER_SUCCESS: {
      return state.merge({
        customer: action.payload.json
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
