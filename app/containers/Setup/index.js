// @flow
import React from 'react';
import { List, Map } from 'immutable';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Style from './Setup.css';
import Button, { Buttons } from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import { setDevice, listDevices } from '../../actions/rfid';
import { login } from '../../actions/auth';
import { fetchSystem } from '../../actions/system';
import { addNotification } from '../../actions/notification';

type State = {
  token: string,
  loading: boolean,
  rfid: ?string
};

type Props = {
  token: string,
  push: () => void,
  location: Object,
  setDevice: () => void,
  fetchSystem: () => Promise<*>,
  addNotification: () => void,
  devices: List<Map<string, string>>,
  listDevices: () => void,
  setDevice: () => void,
  login: () => void
};

class SetupContainer extends React.Component {

  state: State = {
    token: '',
    loading: false,
    rfid: null
  };

  componentDidMount() {
    this.props.listDevices();
    if (this.props.token.length > 0 && !this.props.location.query.presist) {
      this.props.push('/launch');
    }
  }

  onSave() {
    this.setState({ loading: true });
    this.props.setDevice(this.state.rfid);
    this.props.login(this.state.token);
    this.props.fetchSystem()
      .then(() => {
        this.props.push('/launch');
        this.setState({ loading: false });
        return null;
      })
      .catch(() => {
        this.setState({ loading: false });
        this.props.addNotification({
          title: 'Invalid token!',
          level: 'warning',
          message: 'The specified token was either expired or invalid.'
        });
      });
  }

  props: Props;

  render() {
    return (
      <div className={Style.setupContainer}>
        <h1 className={Style.header}>AbaCash</h1>
        <h6 className={Style.subHeader}>setup</h6>

        <div className={Style.inputContainer}>
          <Input
            placeholder='API token'
            onSubmit={() => this.onSave()}
            value={this.state.token}
            onChange={(token) => this.setState({ token })}
          />
        </div>

        <div className={Style.inputContainer}>
          <Dropdown
            placeholder='Select RFID device'
            nullValue='No RFID device'
            displayValue='comName'
            value={this.state.rfid}
            options={this.props.devices}
            onChange={(item) => (this.setState({ rfid: item.get('comName') }))}
          />
        </div>
        <Buttons>
          <Button onClick={() => this.props.listDevices()} label='Reload Devices' />
          <Button loading={this.state.loading} confirm onClick={() => this.onSave()} label='Save' />
        </Buttons>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  token: store.auth.get('token'),
  devices: store.rfid.get('devices')
});

const mapDispatchToProps = {
  login,
  fetchSystem,
  setDevice,
  addNotification,
  push,
  listDevices
};

export default connect(mapStateToProps, mapDispatchToProps)(SetupContainer);
