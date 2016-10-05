// @flow
import React from 'react';
import classNames from 'classnames';
import Style from './Button.css';

type Props = {
  label: String,
  onClick: () => void,
  disabled: Boolean,
  loading: Boolean,
  confirm: Boolean,
  cancel: Boolean
};

const Button = (props: Props) => (
  <button
    className={classNames({
      [Style.buttonConfirm]: props.confirm,
      [Style.buttonCancel]: props.cancel,
      [Style.buttonLoading]: props.loading
    })}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    {props.loading ? <i className='fa fa-spin fa-circle-o-notch' /> : props.label}
  </button>
);

export default Button;
export Buttons from './Buttons';
