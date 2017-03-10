// @flow
import React from 'react';
import { isObject } from 'lodash';
import Loader from '../../components/Loader';
import Button, { Buttons } from '../../components/Button';
import Style from './NewCard.css';

type State = {
  action: () => Promise<*>,
  customerType: string,
  newCustomer: Object
};

type Props = {
  loading: boolean,
  system: Object,
  location: Object,
  newCustomer: Object,
  push: () => void,
  fetchCustomer: () => Promise<*>,
  createCustomer: () => Promise<*>,
  updateCustomer: () => Promise<*>
};

export default class ReviewComponent extends React.Component {

  state: State = {
    newCustomer: this.props.newCustomer,
    action: this.props.createCustomer,
    customerType: this.props.location.query.customerType
  };

  componentDidMount = () => {
    if (this.state.customerType === 'internal') this.fetchCustomer();
  }

  onConfirm = () => {
    this.state.action(this.state.newCustomer)
      .then(() => this.props.fetchCustomer(this.state.newCustomer.rfid))
      .then(() => this.props.push('sales'))
      .catch(() => {
        this.props.push('sales');
      });
  }

  fetchCustomer = () => {
    this.props.fetchCustomer(this.state.newCustomer.username, 'username')
        .then((response) => this.setState({
          action: this.props.updateCustomer,
          newCustomer: {
            ...response.value.json,
            ...this.state.newCustomer
          }
        }))
        .catch(() => {
          this.setState({
            action: this.props.createCustomer
          });
        });
  }

  props: Props;

  render() {
    const { loading, push } = this.props;
    const additionalFields = this.state.action === this.props.createCustomer ? [] : ['balance', 'customerRole'];

    if (loading) {
      return <Loader />;
    }

    return (
      <div className={Style.centerContainer}>
        {
          ['displayName', 'rfid', 'username', ...additionalFields].map((field) => {
            if (!isObject(this.state.newCustomer[field])) {
              return (
                <div key={field} className={Style.infoContainer}>
                  <span className={Style.infoLabel}>{field}</span>
                  <span>{this.state.newCustomer[field]}</span>
                </div>
              );
            }
            return (
              <div key={field} className={Style.infoContainer}>
                <span className={Style.infoLabel}>{field}</span>
                <span>{this.state.newCustomer[field].role}</span>
              </div>
            );
          })
        }

        {this.state.action === this.props.createCustomer &&
          <div key='balance' className={Style.infoContainer}>
            <span className={Style.infoLabel}>Balance</span>
            <span>0 kr</span>
          </div>
        }

        {this.state.action === this.props.createCustomer &&
          <div key='customerRole' className={Style.infoContainer}>
            <span className={Style.infoLabel}>Customer Role</span>
            <span>{this.props.system.get('defaultCustomerRole').get('role')}</span>
          </div>
        }

        <div className={Style.footer} >
          <Buttons>
            <Button onClick={() => { this.props.push(`new/info?customerType=${this.state.customerType}`); }} label='Back' />
            <Button cancel onClick={() => { push('sales'); }} label='Cancel' />
            <Button
              confirm
              loading={loading}
              onClick={this.onConfirm}
              label={this.state.action === this.props.createCustomer ? 'Create' : 'Update'}
            />
          </Buttons>
        </div>
      </div>
    );
  }
}
