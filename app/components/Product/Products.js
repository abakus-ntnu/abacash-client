// @flow
import React from 'react';
import Style from './Product.css';

type Props = {
    children?: Array<*>
};

const ProductContainer = (props: Props) => (
  <div className={Style.productContainer}>
    {props.children}
  </div>
);

export default ProductContainer;
