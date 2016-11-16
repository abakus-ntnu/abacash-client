// @flow
import React from 'react';
import Button, { Buttons } from '../../components/Button';

type Props = {
  system: Object,
  push: () => void
};

export default class TypeContainer extends React.Component {

  componentDidMount() {
    if (!this.props.system.get('allowExternalCustomers')) {
      this.props.push('new/info');
    }
  }

  props: Props;

  render() {
    return (
      <div>
        <Buttons>
          <Button cancel onClick={() => { this.props.push('sales'); }} label='Avbryt' />
          <Button confirm onClick={() => { this.props.push('new/info'); }} label='Neste' />
        </Buttons>
      </div>
    );
  }
}
