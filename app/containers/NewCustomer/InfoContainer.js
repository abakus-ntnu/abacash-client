// @flow
import React from 'react';
import classNames from 'classnames';
import Input from '../../components/Input';
import Button, { Buttons } from '../../components/Button';
import Style from './NewCard.css';

type State = {
  firstname: string,
  surname: string
};

type Props = {
  externalUser: Map<string, string>,
  externalUsers: Array<Map<string, string>>,
  push: () => void,
  queryExternalAPI: () => void,
  selectExternalUser: () => void
};

export default class SearchComponent extends React.Component {

  state: State = {
    firstname: '',
    surname: ''
  };

  onChange(field: string, value: string) {
    this.setState(
      { [field]: value },
      () => this.props.queryExternalAPI(this.state)
    );
  }

  props: Props;

  render() {
    return (
      <div className={Style.centerContainer}>
        <div className={Style.searchForm}>
          <div className={Style.SearchComponent}>
            <Input
              value={this.state.firstname}
              placeholder='Fornavn'
              onChange={(value: string) => this.onChange('firstname', value)}
            />
          </div>
          <div className={Style.SearchComponent}>
            <Input
              value={this.state.surname}
              placeholder='Etternavn'
              onChange={(value: string) => this.onChange('surname', value)}
            />
          </div>
        </div>
        <ul className={Style.usersList} >
          {this.props.externalUsers.map((user, index) => (
            <li
              className={classNames(Style.usersRow,
                { [Style.selected]: user === this.props.externalUser })
              }
              key={index}
              onClick={() => this.props.selectExternalUser(user)}
            >
              {user.get('displayName')}
            </li>)
          )}
        </ul>
        <Buttons>
          <Button cancel onClick={() => { this.props.push('sales'); }} label='Avbryt' />
          <Button
            confirm
            disabled={!this.props.externalUser}
            onClick={() => { this.props.push('new/review'); }}
            label='Neste'
          />
        </Buttons>
      </div>
    );
  }
}
