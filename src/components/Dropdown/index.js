import React from 'react';
import classNames from 'classnames';
import Style from './Dropdown.css';

type Props = {
  onChange: () => void,
  options: Array,
  placeholder: String,
  nullValue: String
};

class Dropdown extends React.Component {

  state = {
    active: false,
    option: { label: this.props.nullValue, value: null } || {} // enable intialVlaue=null
  };

  props: Props;

  toggle() {
    this.setState({ active: !this.state.active });
  }

  handleSelect(option) {
    this.setState({
      option,
      active: !this.state.active
    });
    this.props.onChange(option.value);
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
              onClick={() => this.handleSelect({ label: this.props.nullValue, value: null })}
              className={Style.dropdownItem}
            >
              <span>{this.props.nullValue}</span>
            </li>)
          }
          {this.props.options.map((option) => (
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
