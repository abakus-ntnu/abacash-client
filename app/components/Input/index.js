// @flow
import React, { Component } from 'react';
import Style from './Input.css';

type State = {
  value: string
}

type Props = {
  type?: string;
  placeholder?: string;
  autoFocus?: boolean;
  value?: string;
  onChange?: () => string;
  onCancel?: () => void;
  onSubmit?: () => void;
};

class Input extends Component {

  state: State = {
    value: this.props.value || ''
  };

  props: Props;

  handleKeyPress(event: Object) {
    if (event.key === 'Enter' && this.props.onSubmit) this.props.onSubmit();
    if (event.key === 'Escape' && this.props.onCancel) this.props.onCancel();
  }

  render() {
    return (<input
      className={Style.inputClass}
      type={this.props.type || 'text'}
      autoFocus={this.props.autoFocus}
      placeholder={this.props.placeholder}
      value={this.state.value}
      onChange={(event) => {
        const value: string = event.target.value;
        this.setState({ value });
        if (this.props.onChange) {
          this.props.onChange(value);
        }
      }}
      onKeyDown={(event) => this.handleKeyPress(event)}
    />);
  }
}

export default Input;
