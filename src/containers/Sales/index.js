import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import TabMenu from '../../components/TabMenu';
import ProductContainer from '../../components/ProductContainer';
import SearchModal from '../../components/SearchModal';
import Product from '../../components/Product';
import Sidebar from '../../components/Sidebar';
import Style from './Sales.css';

class SalesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: true
    };
  }

  render() {
    return (
      <div>
        <SearchModal
          active={this.state.search}
          onDismiss={() => { this.setState({ search: false }); }}
          onSuccess={() => { this.setState({ search: false }); }}
        />
        <div className={classNames(Style.salesContainer, { [Style.blur]: this.state.search })}>
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
      </div>
    );
  }
}

export default connect()(SalesContainer);
