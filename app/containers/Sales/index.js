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
import Button from '../../components/Button';
import RFID from '../../components/RFID';
import { clearCustomer, fetchCustomer } from '../../actions/customer';
import { fetchProducts } from '../../actions/product';
import { fetchSystem } from '../../actions/system';
import { addNotification } from '../../actions/notification';
import { addProduct } from '../../actions/cart';
import Style from './Sales.css';

type State = {
  search: boolean,
  type: string
};

type Props = {
  customer?: Object,
  error: string,
  products: Object,
  productTypes: Object,
  processing: boolean,
  customerLoading: boolean,
  fetchSystem: () => Promise<*>,
  push: () => void,
  fetchCustomer: () => Promise<*>,
  addNotification: () => void,
  fetchProducts: () => void,
  cartItems: Map<number, number>,
  addProduct: () => void,
  clearCustomer: () => void,
  rfidDevice: ?string
};

class SalesContainer extends Component {

  state: State = {
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

  inactiveTimeout: any = undefined;
  updateInterval: any = undefined;

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

  cardScan = (rfid: string) => {
    const newButton = (
      <Button
        notification
        onClick={() => this.props.push(`new?rfid=${rfid}`)}
        label='Create new user'
      />
    );
    if (!this.props.customer && !this.props.customerLoading) {
      this.props.fetchCustomer(rfid) // lookupParam should be prop on system
        .catch(() => {
          this.props.addNotification({
            title: 'Not found!',
            level: 'warning',
            children: newButton,
            message: 'Could not find the specified user',
            uid: 'user_not_found'
          });
        });
    }
  }

  props: Props;

  render() {
    return (
      <div>
        {this.state.search ? <SearchModal
          push={this.props.push}
          fetchCustomer={this.props.fetchCustomer}
          addNotification={this.props.addNotification}
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
        <RFID
          device={this.props.rfidDevice}
          action={this.cardScan}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.product.get('products'),
  loadingCustomer: state.customer.get('loading'),
  customer: state.customer.get('customer'),
  processing: state.transaction.get('processing'),
  error: state.transaction.get('error'),
  productTypes: state.system.get('system').get('productTypes'),
  rfidDevice: state.rfid.get('device'),
  cartItems: state.cart
});

const mapDispatchToProps = {
  clearCustomer,
  fetchProducts,
  fetchCustomer,
  addNotification,
  fetchSystem,
  push,
  addProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesContainer);
