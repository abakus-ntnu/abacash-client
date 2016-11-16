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
  fetchSystem: () => void,
  fetchSeller: () => void,
  addNotification: () => void
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

  setSeller = (card) => {
    this.props.fetchSeller(card);
  }

  handleStart = () => {
    const needSeller = this.props.system.get('needSeller');
    if (needSeller && !this.props.seller.get('rfid')) {
      this.props.addNotification({
        title: 'Du må være en selger!',
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
        {this.props.system.get('needSeller') &&
          <h6 className={Style.subHeader}>
            Seller: {this.props.seller.get('displayName') || '- Scan card -'}
          </h6>
        }

        <Buttons>
          <Button cancel onClick={() => { this.props.push('/?presist=true'); }} label='Tilbake' />
          <Button confirm onClick={this.handleStart} label='Start' />
        </Buttons>

        <RFID
          device={this.props.rfidDevice}
          action={this.setSeller}
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
