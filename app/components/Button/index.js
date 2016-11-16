// @flow
import React from 'react';
import classNames from 'classnames';
import Style from './Button.css';
import Buttons from './Buttons';

type Props = {
  label: string,
  onClick: () => any,
  disabled?: boolean,
  notification?: boolean,
  loading?: boolean,
  confirm?: boolean,
  cancel?: boolean
};

const Button = (props: Props) => (
  <button
    className={classNames({
      [Style.buttonConfirm]: props.confirm,
      [Style.buttonDisabled]: props.disabled,
      [Style.buttonCancel]: props.cancel,
      [Style.buttonNotification]: props.notification,
      [Style.buttonLoading]: props.loading
    })}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    {props.loading ? <i className='fa fa-spin fa-circle-o-notch' /> : props.label}
  </button>
);

export default Button;
export { Buttons };
