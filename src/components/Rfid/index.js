import React, { Component } from 'react';
import Style from './Rfid.css';

type Props = {
  currentRfid: String | null,
  fetchCustomer?: () => void,
  onFetchSuccess: () => void,
  onFetchFailure: () => void,
};

class Rfid extends Component {

  constructor() {
    super();
    this.state = {
      currentRfid: null,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      currentRfid,
      fetchCustomer,
      onFetchSuccess = () => {},
      onFetchFailure = () => {},
    } = nextProps;

    this.setState({ currentRfid, fetchCustomer });
    if (currentRfid === null) return;

    fetchCustomer(currentRfid)
      .then((response) => onFetchSuccess(response))
      .catch((error) => onFetchFailure(error));
  }

  props: Props;

  render() {
    return <span id={Style.rfid} />;
  }

}

export default Rfid;
