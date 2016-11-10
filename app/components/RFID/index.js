// @flow
import React from 'react';
import { connect, mifareUID } from '../../utils/rfid';

type State = {
  connected: boolean
}

type Props = {
  device: ?string,
  action: () => void
};

class RFID extends React.Component {

  state: State = {
    connected: false
  }

  componentDidMount() {
    this.connect();
  }

  props: Props;

  connect = () => {
    const { device } = this.props;
    if (device) {
      return connect(device).then(() => this.setState({ connected: true }));
    }
  }

  scan = () => {
    if (this.state.connected) {
      return mifareUID().then((result) => this.props.action(result));
    }
  }

  render() {
    return null;
  }

}

export default RFID;
