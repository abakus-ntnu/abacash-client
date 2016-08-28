import React from 'react';
import Style from './Setup.css';
import AppStyle from '../../app.css';

class SetupContainer extends React.Component {

  render() {
    return (
      <div className={Style.setupContainer}>
        <h1 className={Style.header}>AbaCash</h1>
        <h6 className={Style.subHeader}>setup</h6>

        <div className={Style.inputContainer}>
          <input type='text' placeholder='API token' />
        </div>
        <button className={AppStyle.buttonConfirm}>Lagre</button>
        <h2 className={Style.errorMessage}>KEK STEK KUNNE IKKE LOGGE INN</h2>
      </div>
    );
  }

}

export default SetupContainer;
