import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import TabMenu, { TabItem } from '../../components/TabMenu';
import Product, { Products } from '../../components/Product';
import SearchModal from '../../components/SearchModal';
import Sidebar from '../../components/Sidebar';
import { fetchProducts } from '../../actions/product';
import Style from './Sales.css';

type Props = {
  customer?: Object,
  products: Object,
  productTypes: Object,
  fetchProducts: () => void
};

class SalesContainer extends Component {

  state = {
    search: false,
    type: this.props.productTypes.first()
  };

  componentDidMount() {
    this.props.fetchProducts();
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
          <div className={Style.main}>

            <TabMenu>
              {this.props.productTypes.valueSeq().map(type => (
                <TabItem
                  onClick={() => { this.setState({ type }); }}
                  active={this.state.type === type}
                  name={type}
                />
              ))}
            </TabMenu>

            <Products>
              {this.props.products.valueSeq()
                .filter(product => product.get('type') === this.state.type)
                .map(product => (
                  <Product
                    key={product.get('id')}
                    product={product}
                    select={item => { console.log(item); }}
                  />
                )
              )}
            </Products>

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

const mapStateToProps = state => ({
  products: state.product.get('products'),
  customer: state.customer.get('customer'),
  productTypes: state.system.get('system').get('productTypes')
});

const mapDispatchToProps = {
  fetchProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesContainer);
