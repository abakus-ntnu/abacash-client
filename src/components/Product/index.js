import React from 'react';
import Style from './Product.css';

type Props = {
  product: Object,
  select: () => Object
};

const Product = (props: Props) => (
  <div className={Style.product} onClick={() => props.select(props.product)}>
    <span className={Style.productName}>{props.product.get('name')}</span>
    <span className={Style.productPrice}>{props.product.get('price')}kr</span>
  </div>
);

export default Product;
export Products from './Products';
