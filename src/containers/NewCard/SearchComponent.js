// @flow
import React from 'react';
import { connect } from 'react-redux';
import { queryNerd } from '../../actions/nerd';
import { debounce } from '../../utils/debounce';
import Input from '../../components/Input';
import Style from './NewCard.css';

type State = {
  firstName: string,
  lastName: string
};

type Props = {
  users: Array<Map<string, string>>,
  queryNerd: () => void,
  handleSelect: () => void
};

class SearchComponent extends React.Component {

  state: State = {
    firstName: '',
    lastName: ''
  };

  onChange(field, value) {
    this.setState({ [field]: value }, () => this.queryNerd(this.state));
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
              onChange={(value) => this.onChange('firstName', value)}
            />
          </div>
          <div className={Style.SearchComponent}>
            <Input
              placeholder='Etternavn'
              onChange={(value) => this.onChange('lastName', value)}
            />
          </div>
        </div>
        <ul className={Style.usersList} >
          {this.props.users.map((user, index) => (
            <li
              className={Style.usersRow}
              key={index}
              onClick={() => this.props.handleSelect(user)}
            >
              {`${user.get('firstName')} ${user.get('lastName')}`}
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
