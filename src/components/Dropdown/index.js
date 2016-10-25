// @flow
import React from 'react';
import { List, Map } from 'immutable';
import classNames from 'classnames';
import Style from './Dropdown.css';

type State = {
  active: boolean,
  option: ?Map<string, string>
};

type Props = {
  onChange: (value: Map<string, string>) => void,
  options: List<Map<string, string>>,
  placeholder: string,
  displayValue: string,
  nullValue: string
};

class Dropdown extends React.Component {

  state: State = {
    active: false,
    option: null
  };

  props: Props;

  toggle() {
    this.setState({ active: !this.state.active });
  }

  handleSelect(option: Map<string, string>) {
    this.setState({
      option,
      active: !this.state.active
    });
    this.props.onChange(option);
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
        {this.state.option.get(this.props.displayValue)}
      </span>}

      <div className={Style.options}>
        <ul>
          {this.props.nullValue &&
            (<li
              onClick={() => this.handleSelect(Map())}
              className={Style.dropdownItem}
            >
              <span>{this.props.nullValue}</span>
            </li>)
          }
          {this.props.options.map((option, key) => (
            <li
              onClick={() => this.handleSelect(option)}
              key={key}
              className={Style.dropdownItem}
            >
              <span>{option.get(this.props.displayValue)}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>);
  }
}

export default Dropdown;
