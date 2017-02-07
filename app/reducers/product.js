// @flow
import { fromJS } from 'immutable';
import { PRODUCT } from '../actions/types';
import type { Reducer } from './types';

const initialState = fromJS({
  groups: [],
  products: {},
});

const product: Reducer = (state = initialState, action) => {
  switch (action.type) {

    case PRODUCT.FETCH_GROUPS_SUCCESS: {
      return state.merge({
        groups: action.payload.json.entities['product-group']
      });
    }

    case PRODUCT.FETCH_PRODUCTS_SUCCESS: {
      return state.merge({
        products: action.payload.json.entities.products
      });
    }

    default:
      return state;
  }
};

export default product;
