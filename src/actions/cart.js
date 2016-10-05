// @flow
import { CART } from './types';
import type { Action, ActionWithoutPayload, Dispatch } from './types';

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

export function removeProduct(productId: number): Action {
  return {
    type: CART.REMOVE_PRODUCT,
    payload: {
      productId
    }
  };
}

export function clearCart(): ActionWithoutPayload {
  return {
    type: CART.CLEAR_CART
  };
}
