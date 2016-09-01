import { arrayOf } from 'normalizr';
import { products } from '../schemas/product';
import callAPI from './callAPI';
import { PRODUCT } from './types';

export function fetchProducts() {
  return (dispatch, getState) => {
    const system = getState().system.get('system');

    return dispatch(callAPI({
      type: PRODUCT.FETCH_PRODUCTS,
      schema: arrayOf(products),
      endpoint: `${system.get('id')}/products/?active=true`,
    }));
  };
}
