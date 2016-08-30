import React from 'react';
import Style from './Product.css';

type Props = {
  name: string,
  price: string,
  onClick: () => void
};

class Product extends React.Component {

  props: Props;

  render() {
    return (
      <div className={Style.product} onClick={this.props.onClick}>
        <span className={Style.productName}>{this.props.name}</span>
        <span className={Style.productPrice}>{this.props.price}kr</span>
      </div>
    );
  }

}

export default Product;
