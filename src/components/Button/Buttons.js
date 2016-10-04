import React from 'react';
import Style from './Button.css';

type Props = {
  children: Array
};

const Buttons = (props: Props) => (
  <div className={Style.buttonGroup}>
    {props.children}
  </div>
);

export default Buttons;
