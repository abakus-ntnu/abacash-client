// @flow
import { fromJS, Map } from 'immutable';

// You're welcome immutable.js
export const mapCartToTransaction: (cart: Map<number, number>) => Array<number> = (cart) => cart
  .map((productCount, productId) => fromJS(Array(productCount).fill(parseInt(productId, 10))))
  .valueSeq()
  .flatten()
  .toJS();
