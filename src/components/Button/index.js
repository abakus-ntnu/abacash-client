import React, { PropTypes } from 'react';
import Style from './Button.css';

const classes = (props) => {
  let className = '';
  if (props.confirm) className += `${Style.buttonConfirm} `;
  if (props.cancel) className += `${Style.buttonCancel} `;
  return className;
};

const Button = (props) => (
  <button className={classes(props)} disabled={props.disabled} onClick={props.onClick}>
    {props.label}
  </button>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  confirm: PropTypes.bool,
  cancel: PropTypes.bool
};

export default Button;
export Buttons from './Buttons';
