// @flow
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchSystem, fetchSeller } from '../../actions/system';
import Style from './Launch.css';
import RFID from '../../components/RFID';
import Button, { Buttons } from '../../components/Button';
import { addNotification } from '../../actions/notification';

type Props = {
  system: Object,
  seller: Object,
  rfidDevice: string,
  push: () => void,
  fetchSystem: () => Promise<*>,
  fetchSeller: () => Promise<*>,
  addNotification: () => Promise<*>
};

class LaunchContainer extends React.Component {

  componentDidMount() {
    if (!this.props.system) {
      this.props.fetchSystem()
        .catch(() => {
          this.props.push('/');
        });
    }
  }

  onScan = (card) => {
    this.props.fetchSeller(card)
      .catch(() => {
        this.props.addNotification({
          title: 'Not found!',
          level: 'warning',
          message: 'Could not find the specified user',
          uid: 'user_not_found'
        });
      });
  }

  handleStart = () => {
    if (this.props.system.get('needSeller') && !this.props.seller) {
      this.props.addNotification({
        title: 'Du må registrer en selger!',
        level: 'info',
        message: 'Du må være en registrert selger. Koble til RFID-leser og skann kortet ditt.',
        autoDismiss: 0,
        uid: 'not_seller'
      });
    } else {
      this.props.push('/sales');
    }
  }

  props: Props;

  render() {
    return (
      <div className={Style.launchContainer}>
        <h1 className={Style.header}>AbaCash</h1>
        {this.props.system && <h6 className={Style.subHeader}>{this.props.system.get('name')}</h6>}
        {this.props.system && this.props.seller && this.props.system.get('needSeller') &&
          <h6 className={Style.subHeader}>
            Seller: {this.props.seller.get('displayName') || '- Scan card -'}
          </h6>
        }

        <Buttons>
          <Button cancel onClick={() => { this.props.push('/?presist=true'); }} label='Tilbake' />
          {this.props.system && <Button confirm onClick={this.handleStart} label='Start' />}
        </Buttons>

        <RFID
          device={this.props.rfidDevice}
          action={this.onScan}
        />
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  seller: store.system.get('seller'),
  system: store.system.get('system'),
  rfidDevice: store.rfid.get('device')
});

const mapDispatchToProps = {
  fetchSystem,
  fetchSeller,
  push,
  addNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchContainer);
