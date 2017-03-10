// @flow
import { arrayOf } from 'normalizr';
import { products, productGroup } from '../schemas/product';
import callAPI from './callAPI';
import { PRODUCT } from './types';
import type { Thunk } from './types';

export function fetchProductGroups(): Thunk {
  return (dispatch, getState) => {
    const system = getState().system.get('system');

    return dispatch(callAPI({
      type: PRODUCT.FETCH_GROUPS,
      schema: arrayOf(productGroup),
      endpoint: `${system.get('id')}/product-groups`,
    }));
  };
}

export function fetchProducts(): Thunk {
  return (dispatch, getState) => {
    const system = getState().system.get('system');

    return dispatch(callAPI({
      type: PRODUCT.FETCH_PRODUCTS,
      schema: arrayOf(products),
      endpoint: `${system.get('id')}/products/?active=true`,
    }));
  };
}
