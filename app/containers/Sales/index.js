import React, { Component } from 'react';
import { connect } from 'react-redux';
import TabMenu from '../../components/TabMenu';
import ProductContainer from '../../components/ProductContainer';
import Product from '../../components/Product';
import Sidebar from '../../components/Sidebar';
import Style from './Sales.css';

class SalesContainer extends Component {
  render() {
    return (
      <div className={Style.salesContainer}>
        <div className={Style.main}>

          <TabMenu />
          <ProductContainer>
            <Product name='Fanta' price='59' />
            <Product name='Fanta' price='59' />
            <Product name='Fanta' price='59' />
            <Product name='Fanta' price='59' />
            <Product name='Fanta' price='59' />
            <Product name='Fanta' price='59' />
            <Product name='Fanta' price='59' />
          </ProductContainer>

        </div>
        <Sidebar />
      </div>
    );
  }
}

export default connect()(SalesContainer);
