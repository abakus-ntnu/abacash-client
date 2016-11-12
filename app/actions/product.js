// @flow
import { arrayOf } from 'normalizr';
import { products } from '../schemas/product';
import callAPI from './callAPI';
import { PRODUCT } from './types';
import type { Thunk } from './types';

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
