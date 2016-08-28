import React from 'react';
import Style from './ProductContainer.css';

type Props = {
    children: any
};

class ProductContainer extends React.Component {

  props: Props;

  render() {
    return (
      <div className={Style.productContainer}>
        {this.props.children}
      </div>
    );
  }

}

export default ProductContainer;
