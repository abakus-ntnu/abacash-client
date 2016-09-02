import { CART } from './types';

export function addProduct(productId) {
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

export function removeProduct(productId) {
  return {
    type: CART.REMOVE_PRODUCT,
    payload: {
      productId
    }
  };
}

export function clearCart() {
  return {
    type: CART.CLEAR_CART
  };
}
