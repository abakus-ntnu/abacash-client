// @flow
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchSystem } from '../../actions/system';
import Style from './Launch.css';
import Button, { Buttons } from '../../components/Button';
import { addNotification } from '../../actions/notification';

type Props = {
  system: Object,
  push: () => void,
  fetchSystem: () => void,
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

  props: Props;

  handleStart() {
    const needSeller = this.props.system.get('needSeller');
    if (needSeller) {
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

  render() {
    return (
      <div className={Style.launchContainer}>
        <h1 className={Style.header}>AbaCash</h1>
        {this.props.system && <h6 className={Style.subHeader}>{this.props.system.get('name')}</h6>}

        <Buttons>
          <Button cancel onClick={() => { this.props.push('/?presist=true'); }} label='Tilbake' />
          <Button confirm onClick={() => this.handleStart()} label='Start' />
        </Buttons>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  system: store.system.get('system')
});

const mapDispatchToProps = {
  fetchSystem,
  push,
  addNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchContainer);