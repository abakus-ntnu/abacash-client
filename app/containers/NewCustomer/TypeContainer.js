// @flow
import React from 'react';
import Button, { Buttons } from '../../components/Button';
import Style from './NewCard.css';

type Props = {
  system: Object,
  push: () => void
};

export default class TypeContainer extends React.Component {

  componentDidMount() {
    if (!this.props.system.get('allowExternalCustomers')) {
      this.props.push('new/info?customerType=internal');
    }
  }

  props: Props;

  render() {
    return (
      <div className={Style.centerContainer}>
        <Buttons>
          <Button
            square
            icon='user'
            onClick={() => { this.props.push('new/info?customerType=external'); }}
            label='external'
          />
          <Button
            square
            icon='id-badge'
            onClick={() => { this.props.push('new/info?customerType=internal'); }}
            label='internal'
          />
        </Buttons>
        <div className={Style.footer}>
          <Buttons>
            <Button cancel onClick={() => { this.props.push('sales'); }} label='Cancel' />
          </Buttons>
        </div>
      </div>
    );
  }
}
