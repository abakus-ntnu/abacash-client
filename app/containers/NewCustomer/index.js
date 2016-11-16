// @flow
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchCustomer, createCustomer, updateCustomer } from '../../actions/customer';
import Style from './NewCard.css';
import TabMenu, { TabItem } from '../../components/TabMenu';
import { queryNerd } from '../../actions/nerd';

type State = {
  externalUser: ?Object,
  customer: Object,
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
    customer: {
      username: this.props.location.query.username,
      rfid: this.props.location.query.rfid
    },
    externalUser: null
  };

  props: Props;

  selectExternalUser = (externalUser) => {
    this.setState({ externalUser });
  }

  render() {
    return (
      <div className={Style.newCardContainer}>
        <TabMenu>
          <TabItem disabled uri='/new' name='Type' />
          <TabItem disabled uri='/new/info' name='Search' />
          <TabItem disabled uri='/new/review' name='Review' />
        </TabMenu>
        {React.cloneElement(this.props.children, {
          system: this.props.system,
          customer: this.props.customer,
          newCustomer: this.state.customer,
          externalUser: this.state.externalUser,
          externalUsers: this.props.externalUsers,
          selectExternalUser: this.selectExternalUser,
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
