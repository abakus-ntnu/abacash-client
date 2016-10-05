// @flow
import React from 'react';
import classNames from 'classnames';
import Style from './Dropdown.css';

type State = {
  active: boolean,
  option: { label: string, value?: string }
};

type Props = {
  onChange: (value: any) => void,
  options: Array<{ label: string, value: string }>,
  placeholder: string,
  nullValue: string
};

class Dropdown extends React.Component {

  state: State = {
    active: false,
    option: { label: this.props.nullValue }
  };

  props: Props;

  toggle() {
    this.setState({ active: !this.state.active });
  }

  handleSelect(option: { label: string, value?: string }) {
    this.setState({
      option,
      active: !this.state.active
    });
    if (option.value) {
      this.props.onChange(option.value);
    }
  }

  render() {
    return (<div className={classNames(Style.dropdown, { [Style.active]: this.state.active })} >

      {!this.state.option && <span
        onClick={() => this.toggle()}
        className={Style.placeholder}
      >
        {this.props.placeholder}
      </span>}

      {this.state.option && <span
        onClick={() => this.toggle()}
        className={Style.option}
      >
        {this.state.option.label}
      </span>}

      <div className={Style.options}>
        <ul>
          {this.props.nullValue &&
            (<li
              onClick={() => this.handleSelect({ label: this.props.nullValue })}
              className={Style.dropdownItem}
            >
              <span>{this.props.nullValue}</span>
            </li>)
          }
          {this.props.options.map((option: { label: string, value: string }) => (
            <li onClick={() => this.handleSelect(option)} className={Style.dropdownItem}>
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>);
  }
}

export default Dropdown;
