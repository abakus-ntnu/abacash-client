// @flow
import { fromJS } from 'immutable';
import { CART } from '../actions/types';
import type { Reducer } from './types';

const initialState = fromJS({});

const cart: Reducer = (state = initialState, action) => {
  /*
   * The productID shoult always be a string.
   */
  switch (action.type) {
    case CART.ADD_PRODUCT: {
      const productID = action.payload.productId.toString();
      const oldProductCount = state.get(productID, 0);
      return state.merge({
        [productID]: oldProductCount + 1
      });
    }

    case CART.REMOVE_PRODUCT: {
      const productID = action.payload.productId.toString();
      const productCount = state.get(productID);
      const newProductCount = productCount - 1;
      if (newProductCount > 0) {
        return state.merge({
          [productID]: newProductCount
        });
      }
      return state.delete(productID);
    }

    case CART.CLEAR_CART: {
      return state.clear();
    }

    default:
      return state;
  }
};

export default cart;
