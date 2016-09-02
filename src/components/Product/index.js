import React from 'react';
import Style from './Product.css';

type Props = {
  product: Object,
  select: () => Object,
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
export Products from './Products';
