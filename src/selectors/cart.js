import { fromJS } from 'immutable';

// You're welcome immutable.js
export const mapCartToTransaction = (cart) =>
  cart
    .map((productCount, productId) => fromJS(Array(productCount).fill(parseInt(productId, 10))))
    .flatten()
    .toArray();
