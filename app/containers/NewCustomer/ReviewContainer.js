// @flow
import React from 'react';
import { isObject } from 'lodash';
import Loader from '../../components/Loader';
import Button, { Buttons } from '../../components/Button';
import Style from './NewCard.css';

type State = {
  customer: Object,
  action: () => Promise<*>
};

type Props = {
  loading: boolean,
  customer: Object,
  newCustomer: Object,
  externalUser: Object,
  push: () => void,
  fetchCustomer: () => Promise<*>,
  createCustomer: () => Promise<*>,
  updateCustomer: () => Promise<*>
};

export default class ReviewComponent extends React.Component {

  state: State = {
    customer: {},
    action: this.props.createCustomer
  };

  componentDidMount = () => {
    this.fetchCustomer();
  }

  onConfirm = () => {
    this.state.action(this.state.customer)
      .then(() => this.props.fetchCustomer(this.state.customer.rfid))
      .then(() => this.props.push('sales'))
      .catch(() => {
        this.props.push('sales');
      });
  }

  fetchCustomer = () => {
    if (this.props.externalUser) {
      this.props.fetchCustomer(this.props.externalUser.toJS().username, 'username')
        .then(() => this.setState({
          action: this.props.updateCustomer,
          customer: {
            ...this.props.customer.toJS(),
            rfid: this.props.newCustomer.rfid
          }
        }))
        .catch(() => {
          this.setState({
            action: this.props.createCustomer,
            customer: {
              ...this.props.externalUser.toJS(),
              rfid: this.props.newCustomer.rfid
            }
          });
        });
    } else {
      this.setState({
        action: this.props.createCustomer,
        customer: {
          ...this.props.newCustomer.toJS()
        }
      });
    }
  }

  props: Props;

  render() {
    const { loading, push } = this.props;

    if (loading) {
      return <Loader />;
    }

    return (
      <div className={Style.centerContainer}>
        {
          Object.keys(this.state.customer).map((field) => {
            if (!isObject(this.state.customer[field])) {
              return (
                <div key={field} className={Style.infoContainer}>
                  <span className={Style.infoLabel}>{field}</span>
                  <span>{this.state.customer[field]}</span>
                </div>
              );
            }
            return null;
          })
        }
        <Buttons>
          <Button cancel onClick={() => { push('sales'); }} label='Avbryt' />
          <Button confirm loading={loading} onClick={this.onConfirm} label='OK' />
        </Buttons>
      </div>
    );
  }
}
