import React, { Component } from 'react';
import Style from './MenuModal.css';
import Button, { Buttons } from '../Button';
import AbakusLogo from '../../assets/abakus_logo_dark.png';

type Props = {
  onDismiss: () => void
};

class MenuModal extends Component {

  onDismiss() {
    this.props.onDismiss();
  }

  props: Props;

  render() {
    return (
      <div className={Style.modalContainer}>
        <div className={Style.menuContainer}>
          <div className={Style.brand}>
            <img src={AbakusLogo} alt='logo' />
          </div>

          <h1>AbaCash</h1>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.</p>

        </div>

        <Buttons>
          <Button onClick={() => this.onDismiss()} label='Restart' />
        </Buttons>

        <hr />

        <Buttons>
          <Button cancel onClick={() => this.onDismiss()} label='Tilbake' />
        </Buttons>

        <h2>Made with <i className='fa fa-coffee' /> by <i className='fa fa-save' /></h2>

      </div>
    );
  }
}

export default MenuModal;
