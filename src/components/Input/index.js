import React, { PropTypes } from 'react';
import Style from './Input.css';

const Input = (props) => (
  <input
    className={Style.inputClass}
    type={props.type || 'text'}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
  />
);

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default Input;
