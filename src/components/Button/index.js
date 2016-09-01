import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Style from './Button.css';

const Button = (props) => (
  <button
    className={classNames({
      [Style.buttonConfirm]: props.confirm,
      [Style.buttonCancel]: props.cancel
    })}
    disabled={props.disabled}
    onClick={props.onClick}
  >
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
