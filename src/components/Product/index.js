// @flow
import React from 'react';
import Style from './Product.css';
import Products from './Products';

type Props = {
  product: Object,
  select: (product: Object) => void,
};

const Product = (props: Props) => (
  <div
    className={Style.product} onClick={() => props.select(props.product)}
    key={props.product.id}
  >
    <span className={Style.productName}>{props.product.name}</span>
    <span className={Style.productPrice}>{props.product.price} kr</span>
  </div>
);

export default Product;
export { Products };
