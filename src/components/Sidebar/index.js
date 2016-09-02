import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Map } from 'immutable';
import Style from './Sidebar.css';
import AbakusLogo from '../../assets/abakus_logo_dark.png';
import { clearCart, removeProduct } from '../../actions/cart';
import { clearCustomer } from '../../actions/customer';

type Props ={
  customer?: Object,
  clearCustomer: () => void,
  findUser: () => void,
  clearCart: () => void,
  removeProduct: () => void,
  cartItems: Map,
  products: Map
};

class Sidebar extends React.Component {

  props: Props;

  render() {
    const loggedIn = !!this.props.customer;
    const emptyCart = this.props.cartItems.size === 0;

    const products = this.props.cartItems.map((productCount, productId) => {
      const product = this.props.products.get(productId);
      return {
        ...product.toJS(),
        cartCount: productCount
      };
    });

    return (
      <div className={Style.sidebar}>

        <div className={`${Style.sidebarRow} ${Style.sidebarBox} ${Style.brand}`}>
          <img src={AbakusLogo} alt='logo' />
        </div>

        {loggedIn ?
          <div
            className={`${Style.sidebarRow} ${Style.sidebarBox} ${Style.person}`}
            onClick={this.props.clearCustomer}
          >
            <h3 className={Style.personName}>{this.props.customer.get('displayName')}</h3>
            <div className={Style.personActions}>
              <h4>
                <i className='fa fa-eject' /> Logg ut
              </h4>
              <div>
                <h4 className={Style.balance}>
                  <i className='fa fa-credit-card' />
                  {this.props.customer.get('balance')} kr
                </h4>
              </div>
            </div>
          </div>
        :
          <div
            className={classNames(Style.sidebarRow, Style.sidebarBox, Style.hoverable)}
            onClick={this.props.findUser}
          >
            <i className='fa fa-user' />
            <h3>Finn bruker</h3>
          </div>
        }

        <div className={classNames(Style.transactions, { [Style.empty]: emptyCart })}>
          {products.map((product) => (
            <div
              className={classNames(Style.sidebarRow, Style.transaction)}
              onClick={() => this.props.removeProduct(product.id)}
              key={product.id}
            >
              <div className={Style.transactionLeft}>
                <div className={Style.transactionAmount}>{product.cartCount}</div>
                <div className={Style.transactionProduct}>{product.name}</div>
              </div>
              <div>
                <div className={Style.transactionPrice}>{product.price} kr</div>
              </div>
            </div>
          ))}
        </div>

        <div className={Style.actions}>
          {loggedIn && !emptyCart ? <div
            className={classNames(Style.sidebarRow, Style.hoverable)}
            onClick={this.props.clearCart}
          >
            <i className='fa fa-times' />
            Tøm handlekurv
          </div> : null }
          <div className={Style.sidebarRow}>
            <i className='fa fa-spin fa-circle-o-notch' />
            <span>Belaster kortet</span>
          </div>
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = {
  clearCustomer,
  clearCart,
  removeProduct
};

export default connect(null, mapDispatchToProps)(Sidebar);
