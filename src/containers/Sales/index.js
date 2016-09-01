import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import TabMenu from '../../components/TabMenu';
import ProductContainer from '../../components/ProductContainer';
import SearchModal from '../../components/SearchModal';
import Product from '../../components/Product';
import Sidebar from '../../components/Sidebar';
import Style from './Sales.css';

type Props = {
  customer?: Object
};

class SalesContainer extends Component {

  state = {
    search: false
  };

  props: Props;

  render() {
    return (
      <div>
        {this.state.search ? <SearchModal
          onDismiss={() => { this.setState({ search: false }); }}
          onSuccess={() => { this.setState({ search: false }); }}
        /> : null }
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
          <Sidebar
            customer={this.props.customer}
            findUser={() => this.setState({
              search: true
            })}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  customer: state.customer.get('customer')
});

export default connect(mapStateToProps)(SalesContainer);
