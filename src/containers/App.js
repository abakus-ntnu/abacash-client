import React, { Component } from 'react';

type Props = {
  children: any
};

export default class App extends Component {

  props: Props;

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
