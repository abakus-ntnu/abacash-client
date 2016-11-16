// @flow
import { CART } from './types';
import type { Dispatch } from './types';

export function addProduct(productId: number): Dispatch {
  return (dispatch, getState) => {
    const customerState = getState().customer;
    if (customerState.get('customer')) {
      return dispatch({
        type: CART.ADD_PRODUCT,
        payload: {
          productId
        }
      });
    }
  };
}

export function removeProduct(productId: number): Dispatch {
  return {
    type: CART.REMOVE_PRODUCT,
    payload: {
      productId
    }
  };
}

export function clearCart(): Dispatch {
  return {
    type: CART.CLEAR_CART
  };
}
