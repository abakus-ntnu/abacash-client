import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import Style from './Setup.css';
import AppStyle from '../../app.css';
import { login } from '../../actions/auth';
import { fetchSystem } from '../../actions/system';

class SetupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { token: this.props.token || '' };
  }

  onSave() {
    this.props.login(this.state.token);
    this.props.fetchSystem()
      .then(() => {
        this.props.push('/sales');
      });
  }

  handleChange(event) {
    this.setState({ token: event.target.value });
  }

  render() {
    return (
      <div className={Style.setupContainer}>
        <h1 className={Style.header}>AbaCash</h1>
        <h6 className={Style.subHeader}>setup</h6>

        <div className={Style.inputContainer}>
          <input
            type='text'
            placeholder='API token'
            value={this.state.token}
            onChange={event => this.handleChange(event)}
          />
        </div>

        <button
          className={AppStyle.buttonConfirm}
          onClick={() => this.onSave()}
        >
          Lagre
        </button>

        <h2 className={Style.errorMessage}>KEK STEK KUNNE IKKE LOGGE INN</h2>
      </div>
    );
  }

}

const mapStateToProps = store => ({
  token: store.auth.get('token')
});

const mapDispatchToProps = {
  login,
  fetchSystem,
  push
};

SetupContainer.propTypes = {
  token: PropTypes.string,
  push: PropTypes.func.isRequired,
  fetchSystem: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SetupContainer);
