// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import { Map } from 'immutable';
import TabMenu, { TabItem } from '../../components/TabMenu';
import Product, { Products } from '../../components/Product';
import SearchModal from '../../components/SearchModal';
import Sidebar from '../../components/Sidebar';
import { clearCustomer } from '../../actions/customer';
import { fetchProducts } from '../../actions/product';
import { fetchSystem } from '../../actions/system';
import { addProduct } from '../../actions/cart';
import Style from './Sales.css';

type Props = {
  customer?: Object,
  error: String,
  products: Object,
  productTypes: Object,
  processing: Boolean,
  fetchSystem: () => void,
  push: () => void,
  fetchProducts: () => void,
  cartItems: Map,
  addProduct: () => void,
  clearCustomer: () => void,
};

class SalesContainer extends Component {

  state = {
    search: false,
    type: this.props.productTypes.first()
  };

  componentDidMount() {
    this.props.fetchProducts();
    this.updateInterval = setInterval(() => this.updateData(), 30000);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.customer && newProps.customer !== this.props.customer) {
      this.inactiveTimeout = setTimeout(() => this.userInactive(), 20000);
    } else if (!newProps.customer && newProps.customer !== this.props.customer) {
      clearTimeout(this.inactiveTimeout);
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  updateData() {
    this.props.fetchSystem()
      .then(() => this.props.fetchProducts())
      .catch(() => {
        this.props.push('launch');
      });
  }

  userInactive = () => {
    this.props.clearCustomer();
  }

  userInteracted = () => {
    if (this.props.customer) {
      clearTimeout(this.inactiveTimeout);
      this.inactiveTimeout = setTimeout(() => this.userInactive(), 20000);
    }
  }

  cartPrice = () => {
    const productPrices = this.props.cartItems.map((productCount, productId) => {
      const product = this.props.products.get(productId);
      return productCount * product.get('price');
    });

    return productPrices.reduce((previous, current) => (previous + current), 0);
  }

  props: Props;

  render() {
    return (
      <div>
        {this.state.search ? <SearchModal
          onDismiss={() => { this.setState({ search: false }); }}
          onSuccess={() => { this.setState({ search: false }); }}
        /> : null }
        <div className={classNames(Style.salesContainer, { [Style.blur]: this.state.search })}>
          <div className={Style.main} onClick={this.userInteracted}>

            <TabMenu>
              {this.props.productTypes.valueSeq().map((type, index) => (
                <TabItem
                  onClick={() => { this.setState({ type }); }}
                  active={this.state.type === type}
                  name={type}
                  key={index}
                />
              ))}
            </TabMenu>

            <Products>
              {this.props.products.size ?
                this.props.products
                  .filter((product) => product.get('type') === this.state.type)
                  .map((product, productID) => (
                    <Product
                      product={{
                        id: productID,
                        ...product.toJS()
                      }}
                      select={(item) => { this.props.addProduct(item.id); }}
                    />
                  )
                ) : null
              }
            </Products>

          </div>
          <Sidebar
            customer={this.props.customer}
            findUser={() => this.setState({
              search: true
            })}
            cartItems={this.props.cartItems}
            error={this.props.error}
            products={this.props.products}
            processing={this.props.processing}
            totalPrice={this.cartPrice()}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.product.get('products'),
  customer: state.customer.get('customer'),
  processing: state.transaction.get('processing'),
  error: state.transaction.get('error'),
  productTypes: state.system.get('system').get('productTypes'),
  cartItems: state.cart
});

const mapDispatchToProps = {
  clearCustomer,
  fetchProducts,
  fetchSystem,
  push,
  addProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesContainer);
