import { Map } from 'immutable';
import { CUSTOMER } from '../actions/types';

const initialState = Map({
  customer: {}
});

export default function auth(state = initialState, action) {
  switch (action.type) {

    case CUSTOMER.FETCH_CUSTOMER_SUCCESS: {
      return state.merge({
        customer: action.payload.customer
      });
    }

    default:
      return state;
  }
}
