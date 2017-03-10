// @flow
import React from 'react';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import Input from '../../components/Input';
import Button, { Buttons } from '../../components/Button';
import Style from './NewCard.css';

type State = {
  firstname: string,
  surname: string,
  displayName: string,
  customerType: string,
  user: Object
};

type Props = {
  location: Object,
  externalUsers: Array<Object>,
  push: () => void,
  queryNerd: () => void,
  submitNewCustomerInfo: () => void
};

export default class SearchComponent extends React.Component {

  state: State = {
    firstname: '',
    surname: '',
    displayName: '',
    user: {},
    customerType: this.props.location.query.customerType
  };

  onChange(field: string, value: string) {
    this.setState(
      { [field]: value },
      () => {
        if (this.state.customerType === 'internal') this.props.queryNerd(this.state);
      }
    );
  }

  onNext = () => {
    if (this.state.customerType === 'internal') {
      this.props.submitNewCustomerInfo(this.state.user.toJS());
    }

    if (this.state.customerType === 'external') {
      this.props.submitNewCustomerInfo({
        displayName: this.state.displayName,
        username: null
      });
    }

    this.props.push(`new/review?customerType=${this.state.customerType}`);
  }

  stepIsValid = () => {
    if (this.state.customerType === 'internal' && !isEmpty(this.state.user)) {
      return false;
    }

    if (this.state.customerType === 'external' && this.state.displayName.length > 8) {
      return false;
    }

    return true;
  }

  props: Props;

  render() {
    return (
      <div className={Style.centerContainer}>

        {this.state.customerType === 'internal' &&
          <div className={Style.searchForm}>
            <div className={Style.SearchComponent}>
              <Input
                autoFocus
                value={this.state.firstname}
                placeholder='Firstname'
                onChange={(value: string) => this.onChange('firstname', value)}
              />
            </div>
            <div className={Style.SearchComponent}>
              <Input
                value={this.state.surname}
                placeholder='Surname'
                onChange={(value: string) => this.onChange('surname', value)}
              />
            </div>
          </div>
        }

        {this.state.customerType === 'external' &&
          <div className={Style.inputForm}>
            <Input
              autoFocus
              value={this.state.displayName}
              placeholder='Display Name'
              onChange={(value: string) => this.onChange('displayName', value)}
            />
          </div>
        }

        {this.state.customerType === 'internal' &&
          <ul className={Style.usersList} >
            {this.props.externalUsers.map((user, index) => (
              <li
                className={classNames(Style.usersRow,
                { [Style.selected]: user === this.state.user })
              }
                key={index}
                onClick={() => { this.setState({ user }); }}
              >
                {user.get('displayName')}
              </li>)
          )}
          </ul>
        }

        <div className={Style.footer} >
          <Buttons>
            <Button onClick={() => { this.props.push('new'); }} label='Back' />
            <Button cancel onClick={() => { this.props.push('sales'); }} label='Cancel' />
            <Button confirm disabled={this.stepIsValid()} onClick={this.onNext} label='Next' />
          </Buttons>
        </div>
      </div>
    );
  }
}
