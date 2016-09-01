import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import TabMenu, { TabItem } from '../../components/TabMenu';
import Product, { Products } from '../../components/Product';
import SearchModal from '../../components/SearchModal';
import Sidebar from '../../components/Sidebar';
import { fetchProducts } from '../../actions/product';
import Style from './Sales.css';

class SalesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      type: this.props.productTypes.first()
    };
  }

  componentDidMount() {
    this.props.fetchProducts();
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
          <Sidebar />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.get('products'),
  productTypes: state.system.get('system').get('productTypes')
});

const mapDispatchToProps = {
  fetchProducts
};

SalesContainer.propTypes = {
  products: PropTypes.object.isRequired,
  productTypes: PropTypes.object.isRequired,
  fetchProducts: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesContainer);
