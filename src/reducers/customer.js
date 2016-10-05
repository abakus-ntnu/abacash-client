// @flow
import { Map } from 'immutable';
import { CUSTOMER } from '../actions/types';

const initialState = Map({});

export default function auth(state = initialState, action) {
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
}
