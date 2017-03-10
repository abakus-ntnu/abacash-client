import React, { Component } from 'react';
import Style from './MenuModal.css';
import Button, { Buttons } from '../Button';
import AbakusLogo from '../../assets/abakus_logo_dark.png';

type Props = {
  system: Object,
  logout: () => void,
  onDismiss: () => void
};

export default class MenuModal extends Component {

  props: Props;

  render() {
    return (
      <div className={Style.modalContainer}>
        <div className={Style.menuContainer}>
          <div className={Style.brand}>
            <img src={AbakusLogo} alt='logo' />
          </div>

          <h1>AbaCash</h1>

          <p>
            A payment system created by students belonging to the Abakus Studentunion at NTNU,
            Trondheim. Feedback, Pull requests or general comments about the system is much
            appriciated.
          </p>

        </div>

        {this.props.system.get('needSeller') &&
          <Buttons>
            <Button onClick={() => this.props.logout()} label='Logout' />
          </Buttons>
        }

        <hr />

        <Buttons>
          <Button cancel onClick={() => this.props.onDismiss()} label='Tilbake' />
        </Buttons>

        <h2>Made with <i className='fa fa-coffee' /> by <i className='fa fa-save' /></h2>

      </div>
    );
  }
}
