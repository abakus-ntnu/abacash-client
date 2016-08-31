import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { queryNerd } from '../../actions/nerd';
import { debounce } from '../../utils/debounce';
import Input from '../../components/Input';
import Style from './NewCard.css';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.queryNerd = debounce(this.props.queryNerd, 300);
    this.state = {
      firstname: '',
      surname: ''
    };
  }

  onChange(field, event) {
    this.setState({ [field]: event.target.value }, () => this.queryNerd(this.state));
  }

  render() {
    return (
      <div>
        <div className={Style.searchForm}>
          <div className={Style.SearchComponent}>
            <Input
              placeholder='Fornavn'
              onChange={e => this.onChange('firstname', e)}
              value={this.state.firstname}
            />
          </div>
          <div className={Style.SearchComponent}>
            <Input
              placeholder='Etternavn'
              onChange={e => this.onChange('surname', e)}
              value={this.state.surname}
            />
          </div>
        </div>
        <ul className={Style.usersList} >
          {this.props.users.map(user => (
            <li
              className={Style.usersRow}
              key={user.id}
              onClick={() => this.props.handleSelect(user)}
            >
              {`${user.get('name')} ${user.get('surname')}`}
            </li>)
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  users: store.nerd.get('users')
});

const mapDispatchToProps = {
  queryNerd
};

SearchComponent.propTypes = {
  users: PropTypes.array.isRequired,
  queryNerd: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
