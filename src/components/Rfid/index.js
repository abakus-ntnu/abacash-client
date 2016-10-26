import { Component } from 'react';

type Props = {
  currentRfid: String | null,
  fetchCustomer?: () => void,
  onFetchSuccess: () => void,
  onFetchFailure: () => void,
};

class Rfid extends Component {

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
    return null;
  }

}

export default Rfid;
