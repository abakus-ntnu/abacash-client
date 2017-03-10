// @flow
import React from 'react';
import classNames from 'classnames';
import Style from './Button.css';
import Buttons from './Buttons';

type Props = {
  label: string,
  icon?: string,
  onClick: () => any,
  disabled?: boolean,
  notification?: boolean,
  loading?: boolean,
  square?: boolean,
  confirm?: boolean,
  cancel?: boolean
};

const renderContent = (props: Props) => {
  if (props.loading) {
    return <i className='fa fa-spin fa-circle-o-notch' />;
  }

  return (
    <span>
      {props.icon && <i className={`fa fa-${props.icon}`} />}
      {props.label}
    </span>
  );
};

const Button = (props: Props) => (
  <button
    className={classNames({
      [Style.buttonConfirm]: props.confirm,
      [Style.buttonDisabled]: props.disabled,
      [Style.buttonCancel]: props.cancel,
      [Style.buttonNotification]: props.notification,
      [Style.buttonSquare]: props.square,
      [Style.buttonLoading]: props.loading
    })}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    {renderContent(props)}
  </button>
);

export default Button;
export { Buttons };
