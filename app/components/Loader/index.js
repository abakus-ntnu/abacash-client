// @flow
import React from 'react';
import Style from './Loader.css';

export default () => (
  <div className={Style.loaderContainer}>
    <i className='fa fa-spin fa-circle-o-notch' />
  </div>
);
