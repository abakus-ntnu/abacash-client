import React from 'react';
import { connect } from 'react-redux';
import { queryNerd } from '../../actions/nerd';
import { debounce } from '../../utils/debounce';
import Input from '../../components/Input';
import Style from './NewCard.css';

type State = {
  firstName: String,
  lastName: String
};

type Props = {
  users: Array<Object>,
  queryNerd: () => void,
  handleSelect: () => void
};

class SearchComponent extends React.Component {

  state: State = {
    firstName: '',
    lastName: ''
  };

  onChange(field, event) {
    this.setState({ [field]: event.target.value }, () => this.queryNerd(this.state));
  }

  queryNerd = () => debounce(this.props.queryNerd, 300)

  props: Props;

  render() {
    return (
      <div>
        <div className={Style.searchForm}>
          <div className={Style.SearchComponent}>
            <Input
              placeholder='Fornavn'
              onChange={(e) => this.onChange('firstname', e)}
              value={this.state.firstname}
            />
          </div>
          <div className={Style.SearchComponent}>
            <Input
              placeholder='Etternavn'
              onChange={(e) => this.onChange('surname', e)}
              value={this.state.surname}
            />
          </div>
        </div>
        <ul className={Style.usersList} >
          {this.props.users.map((user) => (
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

const mapStateToProps = (store) => ({
  users: store.nerd.get('users')
});

const mapDispatchToProps = {
  queryNerd
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
