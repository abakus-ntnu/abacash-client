import React, { PropTypes, Component } from 'react';
import Style from './Dropdown.css';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      option: null
    };
  }

  classes() {
    let className = `${Style.dropdown} `;
    if (this.state.active) className += `${Style.active} `;
    return className;
  }

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
    return (<div className={this.classes()}>

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
          {this.props.options.map(option => (
            <li onClick={() => this.handleSelect(option)} className={Style.dropdownItem}>
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>);
  }
}

Dropdown.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  nullValue: PropTypes.string
};

export default Dropdown;
