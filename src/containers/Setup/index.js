import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Style from './Setup.css';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import { setDevice } from '../../actions/rfid';
import { login } from '../../actions/auth';
import { fetchSystem } from '../../actions/system';

class SetupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token || '',
      rfid: null
    };
  }

  componentDidMount() {
    if (this.props.token.length > 0 && !this.props.location.query.presist) {
      this.props.push('launch');
    }
  }

  onSave() {
    this.props.setDevice(this.state.rfid);
    this.props.login(this.state.token);
    this.props.fetchSystem()
      .then(() => {
        this.props.push('/launch');
      });
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  render() {
    return (
      <div className={Style.setupContainer}>
        <h1 className={Style.header}>AbaCash</h1>
        <h6 className={Style.subHeader}>setup</h6>

        <div className={Style.inputContainer}>
          <Input
            placeholder='API token'
            value={this.state.token}
            onChange={event => this.handleChange('token', event.target.value)}
          />
        </div>

        <div className={Style.inputContainer}>
          <Dropdown
            placeholder='Select RFID device'
            nullValue='No RFID device'
            options={[]}
            onChange={value => this.handleChange('rfid', value)}
          />
        </div>

        <Button confirm onClick={() => this.onSave()} label='Lagre' />
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
  setDevice,
  push
};

SetupContainer.propTypes = {
  token: PropTypes.string,
  push: PropTypes.func.isRequired,
  location: PropTypes.object,
  setDevice: PropTypes.func.isRequired,
  fetchSystem: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SetupContainer);
