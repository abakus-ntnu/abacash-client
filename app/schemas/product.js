// @flow
import { Schema } from 'normalizr';

export const productGroup: Schema = new Schema('product-group', { idAttribute: 'id' });
export const products: Schema = new Schema('products', { idAttribute: 'id' });
