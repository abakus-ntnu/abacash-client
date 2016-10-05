// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Style from './SearchModal.css';
import Button, { Buttons } from '../Button';
import Input from '../Input';
import { fetchCustomer } from '../../actions/customer';
import { addNotification } from '../../actions/notification';

class SearchModal extends Component {

  state = {
    search: '',
    loading: false
  };

  onDismiss() {
    this.props.onDismiss();
  }

  onFetch() {
    this.setState({ loading: true });
    this.props.fetchCustomer(this.state.search, 'username') // lookupParam should be prop on system
      .then(() => this.props.onSuccess())
      .catch(() => {
        this.setState({ loading: false });
        this.props.addNotification({
          title: 'Not found!',
          level: 'warning',
          message: 'Could not find the specified user'
        });
      });
  }

  handleChange(value) {
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
            onSubmit={() => {
              if (!disabled) {
                this.onFetch();
              }
            }}
          />
        </div>

        <Buttons>
          <Button cancel onClick={() => this.onDismiss()} label='Tilbake' />
          <Button
            confirm loading={this.state.loading}
            onClick={() => this.onFetch()} label='Ok'
            disabled={disabled}
          />
        </Buttons>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchCustomer,
  addNotification
};

SearchModal.propTypes = {
  onDismiss: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  fetchCustomer: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(SearchModal);
