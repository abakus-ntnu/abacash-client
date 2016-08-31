import React, { PropTypes } from 'react';
import Style from './Button.css';

const Buttons = (props) => (
  <div className={Style.buttonGroup}>
    {props.children}
  </div>
);

Buttons.propTypes = {
  children: PropTypes.array,
};

export default Buttons;
