// @flow
import React from 'react';
import { connect } from '../../utils/rfid';

type State = {
  deviceInstance: ?Object
}

type Props = {
  device: ?string,
  action: () => void
};

class RFID extends React.Component {

  state: State = {
    deviceInstance: null
  }

  componentDidMount() {
    this.connect();
  }

  componentWillUnmount() {
    const { deviceInstance } = this.state;
    if (deviceInstance) {
      deviceInstance.close();
    }
  }

  props: Props;

  connect = () => {
    const { device } = this.props;
    if (device) {
      return connect(device).then((deviceInstance) => this.setState(
        { deviceInstance },
        this.scan
      ));
    }
  }

  scan = () => {
    if (this.state.deviceInstance) {
      this.state.deviceInstance.on('rfid', (rfid: string) => this.props.action(rfid));
    }
  }

  render() {
    return null;
  }

}

export default RFID;
