import { Map } from 'immutable';
import { PRODUCT } from '../actions/types';

const initialState = Map({
  products: {}
});

export default function auth(state = initialState, action) {
  switch (action.type) {

    case PRODUCT.FETCH_PRODUCTS_SUCCESS: {
      return state.merge({
        products: action.payload.json.entities.products
      });
    }

    default:
      return state;
  }
}
