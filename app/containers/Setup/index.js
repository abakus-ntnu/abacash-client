// @flow
import React from 'react';
import { List, Map } from 'immutable';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Style from './Setup.css';
import Button, { Buttons } from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import { setDevice, listDevices } from '../../actions/rfid';
import { loadConfig } from '../../actions/config';
import { fetchSystem } from '../../actions/system';
import { addNotification } from '../../actions/notification';

type State = {
  loading: boolean,
  rfid: ?string
};

type Props = {
  token: string,
  apiURL: string,
  push: () => void,
  setDevice: () => void,
  fetchSystem: () => Promise<*>,
  loadConfig: () => Promise<*>,
  addNotification: () => void,
  devices: List<Map<string, string>>,
  listDevices: () => void,
  setDevice: () => void,
};

class SetupContainer extends React.Component {

  state: State = {
    loading: false,
    rfid: null
  };

  componentDidMount() {
    this.props.loadConfig();
    this.props.listDevices();
  }

  onSave() {
    this.setState({ loading: true });
    this.props.setDevice(this.state.rfid);
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

        {!this.props.token || !this.props.apiURL ? (
          <p>Invalid config file, apiURL or token is missing</p>
        ) : (
          <div>
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
        )}
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  token: store.config.get('token'),
  apiURL: store.config.get('apiURL'),
  devices: store.rfid.get('devices')
});

const mapDispatchToProps = {
  fetchSystem,
  setDevice,
  addNotification,
  push,
  listDevices,
  loadConfig
};

export default connect(mapStateToProps, mapDispatchToProps)(SetupContainer);
