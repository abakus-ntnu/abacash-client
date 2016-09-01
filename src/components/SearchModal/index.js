import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Style from './SearchModal.css';
import Button, { Buttons } from '../Button';
import Input from '../Input';
import { fetchCustomer } from '../../actions/customer';
import { addNotification } from '../../actions/notification';

class SearchModal extends Component {

  state = {
    search: ''
  };

  onDismiss() {
    this.props.onDismiss();
  }

  onFetch() {
    this.props.fetchCustomer(this.state.search, 'username') // lookupParam should be prop on system
      .then(() => this.props.onSuccess())
      .catch(() => {
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
    return (
      <div className={Style.modalContainer}>
        <div className={Style.inputContainer}>
          <Input
            placeholder='brukernavn' // This identifier should be set in the system object
            value={this.state.search}
            onChange={event => this.handleChange(event.target.value)}
          />
        </div>

        <Buttons>
          <Button cancel onClick={() => this.onDismiss()} label='Tilbake' />
          <Button confirm onClick={() => this.onFetch()} label='Ok' />
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
