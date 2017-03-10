// @flow
import React, { Component } from 'react';
import Style from './SearchModal.css';
import Button, { Buttons } from '../Button';
import Input from '../Input';

type State = {
  loading: boolean,
  search: string
};

type Props = {
  push: () => void,
  onDismiss: () => void,
  onSuccess: () => void,
  fetchCustomer: () => Promise<*>,
  addNotification: () => void
};

export default class SearchModal extends Component {

  state: State = {
    search: '',
    loading: false
  };

  onDismiss() {
    this.props.onDismiss();
  }

  onFetch() {
    const newButton = (
      <Button
        notification
        onClick={() => this.props.push(`new?username=${this.state.search}`)}
        label='Create new user'
      />
    );
    this.setState({ loading: true });
    this.props.fetchCustomer(this.state.search, 'username') // lookupParam should be prop on system
      .then(() => this.props.onSuccess())
      .catch(() => {
        this.setState({ loading: false });
        this.props.addNotification({
          title: 'Not found!',
          level: 'warning',
          children: newButton,
          uid: 'user_not_found',
          message: 'Could not find the specified user'
        });
      });
  }

  props: Props;

  handleChange(value: string) {
    this.setState({ search: value });
  }

  render() {
    const disabled = !this.state.search.length;
    return (
      <div className={Style.modalContainer}>
        <div className={Style.inputContainer}>
          <Input
            placeholder='brukernavn' // This identifier should be set in the system object
            autoFocus
            onChange={(search) => this.setState({ search })}
            onCancel={() => this.onDismiss()}
            onSubmit={() => {
              if (!disabled) {
                this.onFetch();
              }
            }}
          />
        </div>

        <div className={Style.footer}>
          <Buttons>
            <Button cancel onClick={() => this.onDismiss()} label='Cancel' />
            <Button
              confirm loading={this.state.loading}
              onClick={() => this.onFetch()} label='Submit'
              disabled={disabled}
            />
          </Buttons>
        </div>
      </div>
    );
  }
}
