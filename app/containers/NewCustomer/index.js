// @flow
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchCustomer, createCustomer, updateCustomer } from '../../actions/customer';
import Style from './NewCard.css';
import TabMenu, { TabItem } from '../../components/TabMenu';
import { queryNerd } from '../../actions/nerd';

type State = {
  newCustomer: Object,
};

type Props = {
  customer: Object,
  location: Object,
  system: Object,
  loading: boolean,
  children: Array<*>,
  externalUsers: Array<Map<string, string>>,
  push: () => void,
  fetchCustomer: () => Promise<*>,
  createCustomer: () => Promise<*>,
  updateCustomer: () => Promise<*>,
  queryNerd: () => void
};

class NewCardContainer extends React.Component {

  state: State = {
    newCustomer: {
      username: this.props.location.query.username,
      rfid: this.props.location.query.rfid
    }
  };

  props: Props;

  submitNewCustomerInfo = (info) => {
    this.setState({ newCustomer: { ...this.state.newCustomer, ...info } });
  }

  render() {
    return (
      <div className={Style.newCardContainer}>
        <TabMenu>
          <TabItem disabled uri='/new' name='Customer Type' />
          <TabItem disabled uri='/new/info' name='Customer Info' />
          <TabItem disabled uri='/new/review' name='Customer Review' />
        </TabMenu>
        {React.cloneElement(this.props.children, { // eslint-disable-line
          system: this.props.system,
          customer: this.props.customer,
          newCustomer: this.state.newCustomer,
          externalUsers: this.props.externalUsers,
          submitNewCustomerInfo: this.submitNewCustomerInfo,
          push: this.props.push,
          loading: this.props.loading,
          fetchCustomer: this.props.fetchCustomer,
          queryNerd: this.props.queryNerd,
          updateCustomer: this.props.updateCustomer,
          createCustomer: this.props.createCustomer
        })}
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  externalUsers: store.nerd.get('users'),
  loading: store.customer.get('loading'),
  customer: store.customer.get('customer'),
  system: store.system.get('system')
});

const mapDispatchToProps = {
  fetchCustomer,
  createCustomer,
  updateCustomer,
  queryNerd,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCardContainer);
