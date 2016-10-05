// @flow
import React, { Component } from 'react';
import Style from './Input.css';


type Props = {
  type: String,
  placeholder: String,
  autoFocus: Boolean,
  value: String,
  onChange: () => void,
  onSubmit?: () => void
};

class Input extends Component {

  props: Props;

  handleKeyPress(event) {
    if (event.key === 'Enter' && this.props.onSubmit) this.props.onSubmit();
  }

  render() {
    return (<input
      className={Style.inputClass}
      type={this.props.type || 'text'}
      autoFocus={this.props.autoFocus}
      placeholder={this.props.placeholder}
      value={this.props.value}
      onChange={this.props.onChange}
      onKeyPress={(event) => this.handleKeyPress(event)}
    />);
  }
}

export default Input;
